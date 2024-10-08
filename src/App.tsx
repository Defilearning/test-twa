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
import { beginCell, toNano, Address } from "@ton/ton";
import { useTonClient } from "./hooks/useTonClient";
import {
  JettonWallet,
  JettonMaster,
} from "@ton/ton";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const client = useTonClient();
  const [tonConnectUI] = useTonConnectUI();
  const { connected } = useTonConnect();
  const { value, address, sendDeposit, sendBuyUtils } = useReferralContract();
  const [userId, setUserId] = useState("");
  const [utilsType, setUtilsType] = useState("");
  const [petConfigId, sePetConfigId] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
    setUserId(result.user.id);
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

  const depositHandler = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fetchConfig: any = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        petConfigId,
      }),
    };

    try {
      setErrorMessage("");
      const response = await fetch(
        `${backendUrl}/player-status/buy-pet`,
        fetchConfig
      );

      const result: any = await response.json();

      sendDeposit(userId, result.amount, result.petConfigId);

      console.log(result);
    } catch (err: any) {
      console.log(err);
      if (err.message) {
        setErrorMessage(err.message);
      }
    }
  };

  const buyUtilsHandler = async () => {
    if (utilsType !== "AutoPickup" && utilsType !== "Boost") {
      setErrorMessage("Utils can only be 'AutoPickup' or 'Boost'");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fetchConfig: any = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        type: utilsType,
      }),
    };

    try {
      setErrorMessage("");
      const response = await fetch(
        `${backendUrl}/player-status/buy-util`,
        fetchConfig
      );

      const result: any = await response.json();

      sendBuyUtils(userId, result.amount, BigInt(result.opCode));

      console.log(result);
    } catch (err: any) {
      console.log(err);
      if (err.message) {
        setErrorMessage(err.message);
      }
    }
  };

  useEffect(() => {
    const fetchMe = async () => {
      const response = await fetch(`${backendUrl}/auth/me`);

      const result = await response.json();

      console.log(result);
    };

    fetchMe();
  }, []);

  const bindWalletHandler = async () => {
    if (!wallet) {
      throw new Error("No wallet is connected");
    }

    console.log("wallet");
    console.log(wallet);

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

  const transferNotCoinsHandler = async () => {
    // transfer#0f8a7ea5 query_id:uint64 amount:(VarUInteger 16) destination:MsgAddress
    // response_destination:MsgAddress custom_payload:(Maybe ^Cell)
    // forward_ton_amount:(VarUInteger 16) forward_payload:(Either Cell ^Cell)
    // = InternalMsgBody;
    
    if(!client){
      return
    }

    const destinationAddress = Address.parse(
      "UQBPvPfY5owBR0yCsOHr-_HVRrypmUI0uTplUdnWzAlwkQr0" // treasury address
    );

    const forwardPayload = beginCell()
      .storeUint(0, 32) // 0 opcode means we have a comment
      .storeStringTail("Hello, TON!")
      .endCell();

    const body = beginCell()
      .storeUint(0xf8a7ea5, 32) // opcode for jetton transfer
      .storeUint(0, 64) // query id
      .storeCoins(toNano("5")) // Jetton amount for transfer (decimals = 6 - USDT, 9 - default). Function toNano use decimals = 9 (remember it)
      .storeAddress(destinationAddress) // TON wallet destination address
      .storeAddress(destinationAddress) // response excess destination
      .storeBit(0) // no custom payload
      .storeCoins(toNano("0.02")) // forward amount (if >0, will send notification message)
      .storeBit(1) // we store forwardPayload as a reference
      .storeRef(forwardPayload)
      .endCell();


      const jettonMaster = JettonMaster.create(
        Address.parse("EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT") // jetton master address
      );
    
      const jettonMasterContract = client.open(jettonMaster);
    
      const jettonWalletAddress = await jettonMasterContract.getWalletAddress(
        Address.parse("UQBIpSWj7JWgCAvWfUHeB5t-r5BlpbSe0YTrhDQ8sQe2jjnu") // user wallet address
      );
    
      console.log(jettonWalletAddress);
    
      const jettonWallet = JettonWallet.create(jettonWalletAddress);
    
      const jettonWalletContract = client.open(jettonWallet);

    const myTransaction = {
      validUntil: Math.floor(Date.now() / 1000) + 360,
      messages: [
        {
          address: jettonWalletContract.address.toString(), // sender jetton wallet
          amount: toNano("0.05").toString(), // for commission fees, excess will be returned
          payload: body.toBoc().toString("base64"), // payload with jetton transfer and comment body
        },
      ],
    };

    await tonConnectUI.sendTransaction(myTransaction);
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
          <p>UserId: {userId}</p>
        </div>

        <div className="Card">
          <label htmlFor="utilsTypeInput">Uitls Type</label>
          <div>
            <input
              type="text"
              id="utilsTypeInput"
              onChange={(e) => setUtilsType(e.target.value)}
              value={utilsType}
            />
          </div>
        </div>

        <div className="Card">
          <label htmlFor="petConfigIdInput">Pet Config Id</label>
          <div>
            <input
              type="text"
              id="petConfigIdInput"
              onChange={(e) => sePetConfigId(e.target.value)}
              value={petConfigId}
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

        {errorMessage && <div className="Error">{errorMessage}</div>}

        <a
          className={`Button ${connected ? "Active" : "Disabled"}`}
          onClick={depositHandler}
        >
          Deposit
        </a>
        <a
          className={`Button ${connected ? "Active" : "Disabled"}`}
          onClick={buyUtilsHandler}
        >
          Buy Utils
        </a>

        <a href="https://t.me/share/url?url=https://app.tonbuddy.com">Share</a>
        {/* <p>{JSON.stringify(accessToken)}</p> */}

        <button onClick={loginHandler}>Login</button>
        <button onClick={registerHandler}>Register</button>
        <button onClick={bindWalletHandler}>Bind Wallet</button>
        <button onClick={transferNotCoinsHandler}>Transfer Not Coin</button>
      </div>
    </div>
  );
}

export default App;
