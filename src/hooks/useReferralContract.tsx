import { useEffect, useState } from "react";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract, toNano, fromNano } from "@ton/core";
import { ReferralDistributionV2 } from "../contracts/referralDistribution";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export function useReferralContract() {
  const client = useTonClient();
  const [val, setVal] = useState<null | string>();
  const { sender } = useTonConnect();

  const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const ReferralContract = useAsyncInitialize(async () => {
    if (!client) return;
    return client.open(
      ReferralDistributionV2.fromAddress(Address.parse(contractAddress))
    ) as OpenedContract<ReferralDistributionV2>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!ReferralContract) return;
      setVal(null);
      const val = await ReferralContract.getCurrentBalance();
      setVal(fromNano(val.toString()).slice(0, 6));
      await sleep(5000); // sleep 5 seconds and poll value again
      getValue();
    }
    getValue();
  }, [ReferralContract]);

  return {
    value: val,
    address: ReferralContract?.address.toString(),
    sendDeposit: (userId: string, amount: string, petConfigId: string) => {
      return ReferralContract?.send(
        sender,
        { value: BigInt(Number(amount)) + toNano(0.06) },
        { $$type: "Deposit", amount: BigInt(amount), userId, petConfigId }
      );
    },
    sendBuyUtils: (userId: string, amount: string, opCode: bigint) => {
      return ReferralContract?.send(
        sender,
        { value: BigInt(Number(amount)) + toNano(0.03) },
        { $$type: "BuyUtils", opCode: opCode, userId }
      );
    },
  };
}
