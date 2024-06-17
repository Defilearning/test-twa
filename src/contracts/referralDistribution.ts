/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  contractAddress,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
} from "@ton/core";

export type StateInit = {
  $$type: "StateInit";
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  const sc_0 = slice;
  const _code = sc_0.loadRef();
  const _data = sc_0.loadRef();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

export type Context = {
  $$type: "Context";
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Cell;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  const sc_0 = slice;
  const _bounced = sc_0.loadBit();
  const _sender = sc_0.loadAddress();
  const _value = sc_0.loadIntBig(257);
  const _raw = sc_0.loadRef();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

export type SendParameters = {
  $$type: "SendParameters";
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeBit(src.bounce);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.value, 257);
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadSendParameters(slice: Slice) {
  const sc_0 = slice;
  const _bounce = sc_0.loadBit();
  const _to = sc_0.loadAddress();
  const _value = sc_0.loadIntBig(257);
  const _mode = sc_0.loadIntBig(257);
  const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

export type Deploy = {
  $$type: "Deploy";
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  return { $$type: "Deploy" as const, queryId: _queryId };
}

export type DeployOk = {
  $$type: "DeployOk";
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

export type FactoryDeploy = {
  $$type: "FactoryDeploy";
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  const _cashback = sc_0.loadAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

export type ChangeOwner = {
  $$type: "ChangeOwner";
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwner(src: ChangeOwner) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2174598809, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwner(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2174598809) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  const _newOwner = sc_0.loadAddress();
  return {
    $$type: "ChangeOwner" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

export type ChangeOwnerOk = {
  $$type: "ChangeOwnerOk";
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(846932810, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwnerOk(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 846932810) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  const _newOwner = sc_0.loadAddress();
  return {
    $$type: "ChangeOwnerOk" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

export type ReferralPer = {
  $$type: "ReferralPer";
  rank: bigint;
  percentage: bigint;
};

export function storeReferralPer(src: ReferralPer) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(4004603422, 32);
    b_0.storeInt(src.rank, 257);
    b_0.storeInt(src.percentage, 257);
  };
}

export function loadReferralPer(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 4004603422) {
    throw Error("Invalid prefix");
  }
  const _rank = sc_0.loadIntBig(257);
  const _percentage = sc_0.loadIntBig(257);
  return {
    $$type: "ReferralPer" as const,
    rank: _rank,
    percentage: _percentage,
  };
}

export type UpdateTreasuryAddress = {
  $$type: "UpdateTreasuryAddress";
  treasuryAddress: Address;
};

export function storeUpdateTreasuryAddress(src: UpdateTreasuryAddress) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(1791588310, 32);
    b_0.storeAddress(src.treasuryAddress);
  };
}

export function loadUpdateTreasuryAddress(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 1791588310) {
    throw Error("Invalid prefix");
  }
  const _treasuryAddress = sc_0.loadAddress();
  return {
    $$type: "UpdateTreasuryAddress" as const,
    treasuryAddress: _treasuryAddress,
  };
}

export type UpdateGovnAddress = {
  $$type: "UpdateGovnAddress";
  govnAddress: Address;
};

export function storeUpdateGovnAddress(src: UpdateGovnAddress) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(1424843492, 32);
    b_0.storeAddress(src.govnAddress);
  };
}

export function loadUpdateGovnAddress(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 1424843492) {
    throw Error("Invalid prefix");
  }
  const _govnAddress = sc_0.loadAddress();
  return { $$type: "UpdateGovnAddress" as const, govnAddress: _govnAddress };
}

export type UpdateRewardPoolAddress = {
  $$type: "UpdateRewardPoolAddress";
  rewardPoolAddress: Address;
};

export function storeUpdateRewardPoolAddress(src: UpdateRewardPoolAddress) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2671015171, 32);
    b_0.storeAddress(src.rewardPoolAddress);
  };
}

export function loadUpdateRewardPoolAddress(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2671015171) {
    throw Error("Invalid prefix");
  }
  const _rewardPoolAddress = sc_0.loadAddress();
  return {
    $$type: "UpdateRewardPoolAddress" as const,
    rewardPoolAddress: _rewardPoolAddress,
  };
}

export type Deposit = {
  $$type: "Deposit";
  userId: string;
  amount: bigint;
  petConfigId: string;
};

export function storeDeposit(src: Deposit) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(3095243076, 32);
    b_0.storeStringRefTail(src.userId);
    b_0.storeCoins(src.amount);
    b_0.storeStringRefTail(src.petConfigId);
  };
}

export function loadDeposit(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 3095243076) {
    throw Error("Invalid prefix");
  }
  const _userId = sc_0.loadStringRefTail();
  const _amount = sc_0.loadCoins();
  const _petConfigId = sc_0.loadStringRefTail();
  return {
    $$type: "Deposit" as const,
    userId: _userId,
    amount: _amount,
    petConfigId: _petConfigId,
  };
}

export type Distribution = {
  $$type: "Distribution";
  amount: bigint;
  transactionId: bigint;
  referralOneAddress: Address | null;
  referralOneCommissionRate: bigint | null;
  referralTwoAddress: Address | null;
  referralTwoCommissionRate: bigint | null;
  referralThreeAddress: Address | null;
  referralThreeCommissionRate: bigint | null;
  referralFourAddress: Address | null;
  referralFourCommissionRate: bigint | null;
  referralFiveAddress: Address | null;
  referralFiveCommissionRate: bigint | null;
};

export function storeDistribution(src: Distribution) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2156817926, 32);
    b_0.storeCoins(src.amount);
    b_0.storeInt(src.transactionId, 257);
    b_0.storeAddress(src.referralOneAddress);
    if (
      src.referralOneCommissionRate !== null &&
      src.referralOneCommissionRate !== undefined
    ) {
      b_0.storeBit(true).storeInt(src.referralOneCommissionRate, 257);
    } else {
      b_0.storeBit(false);
    }
    const b_1 = new Builder();
    b_1.storeAddress(src.referralTwoAddress);
    if (
      src.referralTwoCommissionRate !== null &&
      src.referralTwoCommissionRate !== undefined
    ) {
      b_1.storeBit(true).storeInt(src.referralTwoCommissionRate, 257);
    } else {
      b_1.storeBit(false);
    }
    b_1.storeAddress(src.referralThreeAddress);
    const b_2 = new Builder();
    if (
      src.referralThreeCommissionRate !== null &&
      src.referralThreeCommissionRate !== undefined
    ) {
      b_2.storeBit(true).storeInt(src.referralThreeCommissionRate, 257);
    } else {
      b_2.storeBit(false);
    }
    b_2.storeAddress(src.referralFourAddress);
    if (
      src.referralFourCommissionRate !== null &&
      src.referralFourCommissionRate !== undefined
    ) {
      b_2.storeBit(true).storeInt(src.referralFourCommissionRate, 257);
    } else {
      b_2.storeBit(false);
    }
    const b_3 = new Builder();
    b_3.storeAddress(src.referralFiveAddress);
    if (
      src.referralFiveCommissionRate !== null &&
      src.referralFiveCommissionRate !== undefined
    ) {
      b_3.storeBit(true).storeInt(src.referralFiveCommissionRate, 257);
    } else {
      b_3.storeBit(false);
    }
    b_2.storeRef(b_3.endCell());
    b_1.storeRef(b_2.endCell());
    b_0.storeRef(b_1.endCell());
  };
}

export function loadDistribution(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2156817926) {
    throw Error("Invalid prefix");
  }
  const _amount = sc_0.loadCoins();
  const _transactionId = sc_0.loadIntBig(257);
  const _referralOneAddress = sc_0.loadMaybeAddress();
  const _referralOneCommissionRate = sc_0.loadBit()
    ? sc_0.loadIntBig(257)
    : null;
  const sc_1 = sc_0.loadRef().beginParse();
  const _referralTwoAddress = sc_1.loadMaybeAddress();
  const _referralTwoCommissionRate = sc_1.loadBit()
    ? sc_1.loadIntBig(257)
    : null;
  const _referralThreeAddress = sc_1.loadMaybeAddress();
  const sc_2 = sc_1.loadRef().beginParse();
  const _referralThreeCommissionRate = sc_2.loadBit()
    ? sc_2.loadIntBig(257)
    : null;
  const _referralFourAddress = sc_2.loadMaybeAddress();
  const _referralFourCommissionRate = sc_2.loadBit()
    ? sc_2.loadIntBig(257)
    : null;
  const sc_3 = sc_2.loadRef().beginParse();
  const _referralFiveAddress = sc_3.loadMaybeAddress();
  const _referralFiveCommissionRate = sc_3.loadBit()
    ? sc_3.loadIntBig(257)
    : null;
  return {
    $$type: "Distribution" as const,
    amount: _amount,
    transactionId: _transactionId,
    referralOneAddress: _referralOneAddress,
    referralOneCommissionRate: _referralOneCommissionRate,
    referralTwoAddress: _referralTwoAddress,
    referralTwoCommissionRate: _referralTwoCommissionRate,
    referralThreeAddress: _referralThreeAddress,
    referralThreeCommissionRate: _referralThreeCommissionRate,
    referralFourAddress: _referralFourAddress,
    referralFourCommissionRate: _referralFourCommissionRate,
    referralFiveAddress: _referralFiveAddress,
    referralFiveCommissionRate: _referralFiveCommissionRate,
  };
}

export type Withdraw = {
  $$type: "Withdraw";
  amount: bigint;
};

export function storeWithdraw(src: Withdraw) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(195467089, 32);
    b_0.storeCoins(src.amount);
  };
}

export function loadWithdraw(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 195467089) {
    throw Error("Invalid prefix");
  }
  const _amount = sc_0.loadCoins();
  return { $$type: "Withdraw" as const, amount: _amount };
}

type ReferralDistributionV2_init_args = {
  $$type: "ReferralDistributionV2_init_args";
};

function initReferralDistributionV2_init_args(
  _src: ReferralDistributionV2_init_args
) {
  return (_builder: Builder) => {};
}

async function ReferralDistributionV2_init() {
  const __code = Cell.fromBase64(
    "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"
  );
  const __system = Cell.fromBase64(
    "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"
  );
  const builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initReferralDistributionV2_init_args({
    $$type: "ReferralDistributionV2_init_args",
  })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const ReferralDistributionV2_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack undeflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  13: { message: `Out of gas error` },
  32: { message: `Method ID not found` },
  34: { message: `Action is invalid or not supported` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  2845: { message: `Total Percentage >= 100` },
  5749: { message: `Only govn address can call this function` },
  20131: { message: `Rank not available` },
  40368: { message: `Contract stopped` },
  45436: { message: `Insufficient Amount` },
  53296: { message: `Contract not stopped` },
  54615: { message: `Insufficient balance` },
};

const ReferralDistributionV2_types: ABIType[] = [
  {
    name: "StateInit",
    header: null,
    fields: [
      { name: "code", type: { kind: "simple", type: "cell", optional: false } },
      { name: "data", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "Context",
    header: null,
    fields: [
      {
        name: "bounced",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "raw", type: { kind: "simple", type: "slice", optional: false } },
    ],
  },
  {
    name: "SendParameters",
    header: null,
    fields: [
      {
        name: "bounce",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      { name: "code", type: { kind: "simple", type: "cell", optional: true } },
      { name: "data", type: { kind: "simple", type: "cell", optional: true } },
    ],
  },
  {
    name: "Deploy",
    header: 2490013878,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "DeployOk",
    header: 2952335191,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "FactoryDeploy",
    header: 1829761339,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "cashback",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "ChangeOwner",
    header: 2174598809,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "newOwner",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "ChangeOwnerOk",
    header: 846932810,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "newOwner",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "ReferralPer",
    header: 4004603422,
    fields: [
      {
        name: "rank",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "percentage",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "UpdateTreasuryAddress",
    header: 1791588310,
    fields: [
      {
        name: "treasuryAddress",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "UpdateGovnAddress",
    header: 1424843492,
    fields: [
      {
        name: "govnAddress",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "UpdateRewardPoolAddress",
    header: 2671015171,
    fields: [
      {
        name: "rewardPoolAddress",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "Deposit",
    header: 3095243076,
    fields: [
      {
        name: "userId",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "petConfigId",
        type: { kind: "simple", type: "string", optional: false },
      },
    ],
  },
  {
    name: "Distribution",
    header: 2156817926,
    fields: [
      {
        name: "amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "transactionId",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "referralOneAddress",
        type: { kind: "simple", type: "address", optional: true },
      },
      {
        name: "referralOneCommissionRate",
        type: { kind: "simple", type: "int", optional: true, format: 257 },
      },
      {
        name: "referralTwoAddress",
        type: { kind: "simple", type: "address", optional: true },
      },
      {
        name: "referralTwoCommissionRate",
        type: { kind: "simple", type: "int", optional: true, format: 257 },
      },
      {
        name: "referralThreeAddress",
        type: { kind: "simple", type: "address", optional: true },
      },
      {
        name: "referralThreeCommissionRate",
        type: { kind: "simple", type: "int", optional: true, format: 257 },
      },
      {
        name: "referralFourAddress",
        type: { kind: "simple", type: "address", optional: true },
      },
      {
        name: "referralFourCommissionRate",
        type: { kind: "simple", type: "int", optional: true, format: 257 },
      },
      {
        name: "referralFiveAddress",
        type: { kind: "simple", type: "address", optional: true },
      },
      {
        name: "referralFiveCommissionRate",
        type: { kind: "simple", type: "int", optional: true, format: 257 },
      },
    ],
  },
  {
    name: "Withdraw",
    header: 195467089,
    fields: [
      {
        name: "amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
    ],
  },
];

const ReferralDistributionV2_getters: ABIGetter[] = [
  {
    name: "referralPer",
    arguments: [
      {
        name: "key",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "treasuryAddress",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: false },
  },
  {
    name: "govnAddress",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: false },
  },
  {
    name: "rewardPoolAddress",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: false },
  },
  {
    name: "currentBalance",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "stopped",
    arguments: [],
    returnType: { kind: "simple", type: "bool", optional: false },
  },
  {
    name: "owner",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: false },
  },
];

const ReferralDistributionV2_receivers: ABIReceiver[] = [
  { receiver: "internal", message: { kind: "typed", type: "ReferralPer" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "UpdateTreasuryAddress" },
  },
  {
    receiver: "internal",
    message: { kind: "typed", type: "UpdateGovnAddress" },
  },
  {
    receiver: "internal",
    message: { kind: "typed", type: "UpdateRewardPoolAddress" },
  },
  { receiver: "internal", message: { kind: "typed", type: "Deposit" } },
  { receiver: "internal", message: { kind: "typed", type: "Distribution" } },
  { receiver: "internal", message: { kind: "typed", type: "Withdraw" } },
  { receiver: "internal", message: { kind: "text", text: "Withdraw All" } },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
  { receiver: "internal", message: { kind: "text", text: "Resume" } },
  { receiver: "internal", message: { kind: "text", text: "Stop" } },
  { receiver: "internal", message: { kind: "typed", type: "ChangeOwner" } },
];

export class ReferralDistributionV2 implements Contract {
  static async init() {
    return await ReferralDistributionV2_init();
  }

  static async fromInit() {
    const init = await ReferralDistributionV2_init();
    const address = contractAddress(0, init);
    return new ReferralDistributionV2(address, init);
  }

  static fromAddress(address: Address) {
    return new ReferralDistributionV2(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: ReferralDistributionV2_types,
    getters: ReferralDistributionV2_getters,
    receivers: ReferralDistributionV2_receivers,
    errors: ReferralDistributionV2_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message:
      | ReferralPer
      | UpdateTreasuryAddress
      | UpdateGovnAddress
      | UpdateRewardPoolAddress
      | Deposit
      | Distribution
      | Withdraw
      | "Withdraw All"
      | Deploy
      | "Resume"
      | "Stop"
      | ChangeOwner
  ) {
    let body: Cell | null = null;
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "ReferralPer"
    ) {
      body = beginCell().store(storeReferralPer(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UpdateTreasuryAddress"
    ) {
      body = beginCell().store(storeUpdateTreasuryAddress(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UpdateGovnAddress"
    ) {
      body = beginCell().store(storeUpdateGovnAddress(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UpdateRewardPoolAddress"
    ) {
      body = beginCell().store(storeUpdateRewardPoolAddress(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "Deposit"
    ) {
      body = beginCell().store(storeDeposit(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "Distribution"
    ) {
      body = beginCell().store(storeDistribution(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "Withdraw"
    ) {
      body = beginCell().store(storeWithdraw(message)).endCell();
    }
    if (message === "Withdraw All") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "Deploy"
    ) {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (message === "Resume") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (message === "Stop") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "ChangeOwner"
    ) {
      body = beginCell().store(storeChangeOwner(message)).endCell();
    }
    if (body === null) {
      throw new Error("Invalid message type");
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getReferralPer(provider: ContractProvider, key: bigint) {
    const builder = new TupleBuilder();
    builder.writeNumber(key);
    const source = (await provider.get("referralPer", builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }

  async getTreasuryAddress(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("treasuryAddress", builder.build()))
      .stack;
    const result = source.readAddress();
    return result;
  }

  async getGovnAddress(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("govnAddress", builder.build())).stack;
    const result = source.readAddress();
    return result;
  }

  async getRewardPoolAddress(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("rewardPoolAddress", builder.build()))
      .stack;
    const result = source.readAddress();
    return result;
  }

  async getCurrentBalance(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("currentBalance", builder.build()))
      .stack;
    const result = source.readBigNumber();
    return result;
  }

  async getStopped(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("stopped", builder.build())).stack;
    const result = source.readBoolean();
    return result;
  }

  async getOwner(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("owner", builder.build())).stack;
    const result = source.readAddress();
    return result;
  }
}
