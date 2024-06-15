/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk";
import { useReferralContract } from "./hooks/useReferralContract";
import { useState } from "react";
import { useWebApp, useInitData } from "@vkruglikov/react-telegram-web-app";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const { connected } = useTonConnect();
  const { value, address, sendDeposit } = useReferralContract();
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const webApp = useWebApp();
  const initData = useInitData();

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

    console.log(result);
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
      fetchConfig.body = {
        referralCode,
      };
    }

    const response = await fetch(`${backendUrl}/auth/register`, fetchConfig);

    const result = await response.json();

    console.log(result);
  };

  // console.log(webApp);
  // console.log(initData);

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

        {/* <p>{JSON.stringify(initData)}</p> */}

        <button onClick={loginHandler}>Login</button>
        <button onClick={registerHandler}>Register</button>
      </div>
    </div>
  );
}

export default App;
