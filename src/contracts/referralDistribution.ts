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

export type Deposit = {
  $$type: "Deposit";
  userId: bigint;
  amount: bigint;
};

export function storeDeposit(src: Deposit) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2321711806, 32);
    b_0.storeInt(src.userId, 257);
    b_0.storeCoins(src.amount);
  };
}

export function loadDeposit(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2321711806) {
    throw Error("Invalid prefix");
  }
  const _userId = sc_0.loadIntBig(257);
  const _amount = sc_0.loadCoins();
  return { $$type: "Deposit" as const, userId: _userId, amount: _amount };
}

export type Distribution = {
  $$type: "Distribution";
  amount: bigint;
  referralOne: Address;
  referralTwo: Address;
  referralThree: Address;
  referralFour: Address;
  referralFive: Address;
};

export function storeDistribution(src: Distribution) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2613083231, 32);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.referralOne);
    b_0.storeAddress(src.referralTwo);
    b_0.storeAddress(src.referralThree);
    const b_1 = new Builder();
    b_1.storeAddress(src.referralFour);
    b_1.storeAddress(src.referralFive);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadDistribution(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2613083231) {
    throw Error("Invalid prefix");
  }
  const _amount = sc_0.loadCoins();
  const _referralOne = sc_0.loadAddress();
  const _referralTwo = sc_0.loadAddress();
  const _referralThree = sc_0.loadAddress();
  const sc_1 = sc_0.loadRef().beginParse();
  const _referralFour = sc_1.loadAddress();
  const _referralFive = sc_1.loadAddress();
  return {
    $$type: "Distribution" as const,
    amount: _amount,
    referralOne: _referralOne,
    referralTwo: _referralTwo,
    referralThree: _referralThree,
    referralFour: _referralFour,
    referralFive: _referralFive,
  };
}

export type ReturnMessage = {
  $$type: "ReturnMessage";
  callerAddress: Address;
  amount: bigint;
};

export function storeReturnMessage(src: ReturnMessage) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeAddress(src.callerAddress);
    b_0.storeCoins(src.amount);
  };
}

export function loadReturnMessage(slice: Slice) {
  const sc_0 = slice;
  const _callerAddress = sc_0.loadAddress();
  const _amount = sc_0.loadCoins();
  return {
    $$type: "ReturnMessage" as const,
    callerAddress: _callerAddress,
    amount: _amount,
  };
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
    name: "Deposit",
    header: 2321711806,
    fields: [
      {
        name: "userId",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
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
    ],
  },
  {
    name: "Distribution",
    header: 2613083231,
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
        name: "referralOne",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "referralTwo",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "referralThree",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "referralFour",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "referralFive",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "ReturnMessage",
    header: null,
    fields: [
      {
        name: "callerAddress",
        type: { kind: "simple", type: "address", optional: false },
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
  { receiver: "internal", message: { kind: "typed", type: "Deposit" } },
  { receiver: "internal", message: { kind: "typed", type: "Distribution" } },
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
      | Deposit
      | Distribution
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
