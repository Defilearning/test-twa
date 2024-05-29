import { useEffect, useState } from "react";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract, toNano, fromNano } from "@ton/core";
import { ReferralDistributionV2 } from "../contracts/referralDistribution";

export function useReferralContract() {
  const client = useTonClient();
  const [val, setVal] = useState<null | string>();
  const { sender } = useTonConnect();

  const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const ReferralContract = useAsyncInitialize(async () => {
    if (!client) return;
    return client.open(
      ReferralDistributionV2.fromAddress(
        Address.parse("kQBTT8cqTKhqCmRcE4nPIUK8T8dF9C29UtwUGLsk8ylIyJRu")
      )
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
    sendDeposit: (userId: string, amount: string) => {
      return ReferralContract?.send(
        sender,
        { value: toNano(Number(amount) + 0.04) },
        { $$type: "Deposit", amount: toNano(amount), userId: BigInt(userId) }
      );
    },
  };
}
