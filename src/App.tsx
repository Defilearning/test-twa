import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk";
import { useReferralContract } from "./hooks/useReferralContract";
import { useState } from "react";
import { useWebApp, useInitData } from "@vkruglikov/react-telegram-web-app";

function App() {
  const { connected } = useTonConnect();
  const { value, address, sendDeposit } = useReferralContract();
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const webApp = useWebApp();
  const initData = useInitData();

  console.log(webApp);
  console.log(initData);

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

        <a
          className={`Button ${connected ? "Active" : "Disabled"}`}
          onClick={() => {
            sendDeposit(userId, amount);
          }}
        >
          Deposit
        </a>
      </div>
    </div>
  );
}

export default App;
