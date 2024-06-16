import { useTonConnectUI } from "@tonconnect/ui-react";
import { Sender, SenderArguments } from "@ton/core";
// import { useEffect } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function useTonConnect(): { sender: Sender; connected: boolean } {
  const [tonConnectUI] = useTonConnectUI();

  async function fetchTonProofPayloadFromBackend() {
    // fetch you tonProofPayload from the backend
    const response = await fetch(`${backendUrl}/nonce`);

    const result = await response.json();

    console.log(result);

    // add tonProof to the connect request
    tonConnectUI.setConnectRequestParameters({
      state: "ready",
      value: { tonProof: result.nonce },
    });
  }

  fetchTonProofPayloadFromBackend();

  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    },
    connected: tonConnectUI.connected,
  };
}
