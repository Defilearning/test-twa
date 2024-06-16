/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import {
  TonConnectButton,
  TonProofItemReplySuccess,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk";
import { useReferralContract } from "./hooks/useReferralContract";
import { useEffect, useState } from "react";
import { useInitData } from "@vkruglikov/react-telegram-web-app";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [tonConnectUI] = useTonConnectUI();
  const { connected } = useTonConnect();
  const { value, address, sendDeposit } = useReferralContract();
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [accessToken, setAccessToken] = useState("");
  // const webApp = useWebApp();
  const initData = useInitData();
  const wallet = useTonWallet();

  useEffect(() => {
    async function fetchTonProofPayloadFromBackend() {
      // fetch you tonProofPayload from the backend
      const response = await fetch(`${backendUrl}/nonce`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();

      console.log(result);

      // add tonProof to the connect request
      tonConnectUI.setConnectRequestParameters({
        state: "ready",
        value: { tonProof: result.nonce },
      });
    }

    if (!accessToken) return;
    fetchTonProofPayloadFromBackend();
  }, [accessToken, tonConnectUI]);

  const loginHandler = async () => {
    if (!initData || !initData[1]) return;

    const response = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        twa: initData[1],
      },
    });

    const result = await response.json();

    setAccessToken(result.token.accessToken);
  };

  const registerHandler = async () => {
    if (!initData || !initData[1]) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fetchConfig: any = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        twa: initData[1],
      },
    };

    if (referralCode) {
      fetchConfig.body = JSON.stringify({
        referralCode,
      });
    }

    const response = await fetch(`${backendUrl}/auth/register`, fetchConfig);

    const result = await response.json();

    console.log(result);
  };

  useEffect(() => {
    const fetchMe = async () => {
      const response = await fetch(`${backendUrl}/auth/me`);

      const result = await response.json();

      console.log(result);
    };

    fetchMe();
  }, []);

  // console.log(webApp);
  // console.log(initData);
  console.log(wallet);

  const bindWalletHandler = async () => {
    if (!wallet) {
      throw new Error("No wallet is connected");
    }

    if (!wallet.connectItems && !wallet.connectItems) {
      throw new Error("No connected Items");
    }

    const tonProofReply = wallet.connectItems
      .tonProof as TonProofItemReplySuccess;

    if (!tonProofReply) {
      throw new Error("No tonProofReply");
    }

    const toBindData: any = {
      address: wallet.account.address,
      domain: tonProofReply.proof.domain.value,
      stateInit: wallet.account.walletStateInit,
      signature: tonProofReply.proof.signature,
      payload: tonProofReply.proof.payload,
      timestamp: tonProofReply.proof.timestamp,
    };

    const response = await fetch(`${backendUrl}/users/bind-wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(toBindData),
    });

    const result = await response.json();

    console.log(result);
  };

  return (
    <div className="App">
      <div className="Container">
        <TonConnectButton />

        <div className="Card">
          <b>Referral Distribution Address</b>
          <div className="Hint">{address?.slice(0, 30) + "..."}</div>
        </div>

        <div className="Card">
          <b>Contract Value in Ton</b>
          <div>{value ?? "Loading..."}</div>
        </div>

        <div className="Card">
          <label htmlFor="userIdInput">UserId</label>
          <div>
            <input
              id="userIdInput"
              type="number"
              onChange={(e) => setUserId(e.target.value)}
              value={userId}
            />
          </div>
        </div>

        <div className="Card">
          <label htmlFor="amountInput">Ton to distribute</label>
          <div>
            <input
              type="number"
              id="amountInput"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </div>
        </div>

        <div className="Card">
          <label htmlFor="referralCodeInput">ReferralCode</label>
          <div>
            <input
              type="text"
              id="referralCodeInput"
              onChange={(e) => setReferralCode(e.target.value)}
              value={referralCode}
            />
          </div>
        </div>

        <a
          className={`Button ${connected ? "Active" : "Disabled"}`}
          onClick={() => {
            sendDeposit(userId, amount);
          }}
        >
          Deposit
        </a>

        <p>{JSON.stringify(accessToken)}</p>

        <button onClick={loginHandler}>Login</button>
        <button onClick={registerHandler}>Register</button>
        <button onClick={bindWalletHandler}>Bind Wallet</button>
      </div>
    </div>
  );
}

export default App;
