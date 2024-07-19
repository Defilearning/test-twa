import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
  TupleReader,
  Dictionary,
  contractAddress,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from "@ton/core";

export type StateInit = {
  $$type: "StateInit";
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse());
    },
  };
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
    let b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw);
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse());
    },
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
    let b_0 = builder;
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
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
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

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
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

function storeTupleSendParameters(source: SendParameters) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse());
    },
  };
}

export type Deploy = {
  $$type: "Deploy";
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployOk = {
  $$type: "DeployOk";
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
    },
    parse: (src) => {
      return loadDeployOk(src.loadRef().beginParse());
    },
  };
}

export type FactoryDeploy = {
  $$type: "FactoryDeploy";
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadFactoryDeploy(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwner = {
  $$type: "ChangeOwner";
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwner(src: ChangeOwner) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2174598809, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2174598809) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return {
    $$type: "ChangeOwner" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwner(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: "ChangeOwner" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwner(source: ChangeOwner) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwner(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwnerOk = {
  $$type: "ChangeOwnerOk";
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(846932810, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwnerOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 846932810) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return {
    $$type: "ChangeOwnerOk" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: "ChangeOwnerOk" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwnerOk(src.loadRef().beginParse());
    },
  };
}

export type ReferralPer = {
  $$type: "ReferralPer";
  rank: bigint;
  percentage: bigint;
};

export function storeReferralPer(src: ReferralPer) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(4004603422, 32);
    b_0.storeInt(src.rank, 257);
    b_0.storeInt(src.percentage, 257);
  };
}

export function loadReferralPer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4004603422) {
    throw Error("Invalid prefix");
  }
  let _rank = sc_0.loadIntBig(257);
  let _percentage = sc_0.loadIntBig(257);
  return {
    $$type: "ReferralPer" as const,
    rank: _rank,
    percentage: _percentage,
  };
}

function loadTupleReferralPer(source: TupleReader) {
  let _rank = source.readBigNumber();
  let _percentage = source.readBigNumber();
  return {
    $$type: "ReferralPer" as const,
    rank: _rank,
    percentage: _percentage,
  };
}

function storeTupleReferralPer(source: ReferralPer) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.rank);
  builder.writeNumber(source.percentage);
  return builder.build();
}

function dictValueParserReferralPer(): DictionaryValue<ReferralPer> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeReferralPer(src)).endCell());
    },
    parse: (src) => {
      return loadReferralPer(src.loadRef().beginParse());
    },
  };
}

export type UpdateTreasuryAddress = {
  $$type: "UpdateTreasuryAddress";
  treasuryAddress: Address;
};

export function storeUpdateTreasuryAddress(src: UpdateTreasuryAddress) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1791588310, 32);
    b_0.storeAddress(src.treasuryAddress);
  };
}

export function loadUpdateTreasuryAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1791588310) {
    throw Error("Invalid prefix");
  }
  let _treasuryAddress = sc_0.loadAddress();
  return {
    $$type: "UpdateTreasuryAddress" as const,
    treasuryAddress: _treasuryAddress,
  };
}

function loadTupleUpdateTreasuryAddress(source: TupleReader) {
  let _treasuryAddress = source.readAddress();
  return {
    $$type: "UpdateTreasuryAddress" as const,
    treasuryAddress: _treasuryAddress,
  };
}

function storeTupleUpdateTreasuryAddress(source: UpdateTreasuryAddress) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.treasuryAddress);
  return builder.build();
}

function dictValueParserUpdateTreasuryAddress(): DictionaryValue<UpdateTreasuryAddress> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeUpdateTreasuryAddress(src)).endCell()
      );
    },
    parse: (src) => {
      return loadUpdateTreasuryAddress(src.loadRef().beginParse());
    },
  };
}

export type UpdateGovnAddress = {
  $$type: "UpdateGovnAddress";
  govnAddress: Address;
};

export function storeUpdateGovnAddress(src: UpdateGovnAddress) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1424843492, 32);
    b_0.storeAddress(src.govnAddress);
  };
}

export function loadUpdateGovnAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1424843492) {
    throw Error("Invalid prefix");
  }
  let _govnAddress = sc_0.loadAddress();
  return { $$type: "UpdateGovnAddress" as const, govnAddress: _govnAddress };
}

function loadTupleUpdateGovnAddress(source: TupleReader) {
  let _govnAddress = source.readAddress();
  return { $$type: "UpdateGovnAddress" as const, govnAddress: _govnAddress };
}

function storeTupleUpdateGovnAddress(source: UpdateGovnAddress) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.govnAddress);
  return builder.build();
}

function dictValueParserUpdateGovnAddress(): DictionaryValue<UpdateGovnAddress> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeUpdateGovnAddress(src)).endCell()
      );
    },
    parse: (src) => {
      return loadUpdateGovnAddress(src.loadRef().beginParse());
    },
  };
}

export type UpdateRewardPoolAddress = {
  $$type: "UpdateRewardPoolAddress";
  rewardPoolAddress: Address;
};

export function storeUpdateRewardPoolAddress(src: UpdateRewardPoolAddress) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2671015171, 32);
    b_0.storeAddress(src.rewardPoolAddress);
  };
}

export function loadUpdateRewardPoolAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2671015171) {
    throw Error("Invalid prefix");
  }
  let _rewardPoolAddress = sc_0.loadAddress();
  return {
    $$type: "UpdateRewardPoolAddress" as const,
    rewardPoolAddress: _rewardPoolAddress,
  };
}

function loadTupleUpdateRewardPoolAddress(source: TupleReader) {
  let _rewardPoolAddress = source.readAddress();
  return {
    $$type: "UpdateRewardPoolAddress" as const,
    rewardPoolAddress: _rewardPoolAddress,
  };
}

function storeTupleUpdateRewardPoolAddress(source: UpdateRewardPoolAddress) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.rewardPoolAddress);
  return builder.build();
}

function dictValueParserUpdateRewardPoolAddress(): DictionaryValue<UpdateRewardPoolAddress> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeUpdateRewardPoolAddress(src)).endCell()
      );
    },
    parse: (src) => {
      return loadUpdateRewardPoolAddress(src.loadRef().beginParse());
    },
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
    let b_0 = builder;
    b_0.storeUint(3095243076, 32);
    b_0.storeStringRefTail(src.userId);
    b_0.storeCoins(src.amount);
    b_0.storeStringRefTail(src.petConfigId);
  };
}

export function loadDeposit(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3095243076) {
    throw Error("Invalid prefix");
  }
  let _userId = sc_0.loadStringRefTail();
  let _amount = sc_0.loadCoins();
  let _petConfigId = sc_0.loadStringRefTail();
  return {
    $$type: "Deposit" as const,
    userId: _userId,
    amount: _amount,
    petConfigId: _petConfigId,
  };
}

function loadTupleDeposit(source: TupleReader) {
  let _userId = source.readString();
  let _amount = source.readBigNumber();
  let _petConfigId = source.readString();
  return {
    $$type: "Deposit" as const,
    userId: _userId,
    amount: _amount,
    petConfigId: _petConfigId,
  };
}

function storeTupleDeposit(source: Deposit) {
  let builder = new TupleBuilder();
  builder.writeString(source.userId);
  builder.writeNumber(source.amount);
  builder.writeString(source.petConfigId);
  return builder.build();
}

function dictValueParserDeposit(): DictionaryValue<Deposit> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeposit(src)).endCell());
    },
    parse: (src) => {
      return loadDeposit(src.loadRef().beginParse());
    },
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
    let b_0 = builder;
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
    let b_1 = new Builder();
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
    let b_2 = new Builder();
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
    let b_3 = new Builder();
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
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2156817926) {
    throw Error("Invalid prefix");
  }
  let _amount = sc_0.loadCoins();
  let _transactionId = sc_0.loadIntBig(257);
  let _referralOneAddress = sc_0.loadMaybeAddress();
  let _referralOneCommissionRate = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
  let sc_1 = sc_0.loadRef().beginParse();
  let _referralTwoAddress = sc_1.loadMaybeAddress();
  let _referralTwoCommissionRate = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
  let _referralThreeAddress = sc_1.loadMaybeAddress();
  let sc_2 = sc_1.loadRef().beginParse();
  let _referralThreeCommissionRate = sc_2.loadBit()
    ? sc_2.loadIntBig(257)
    : null;
  let _referralFourAddress = sc_2.loadMaybeAddress();
  let _referralFourCommissionRate = sc_2.loadBit()
    ? sc_2.loadIntBig(257)
    : null;
  let sc_3 = sc_2.loadRef().beginParse();
  let _referralFiveAddress = sc_3.loadMaybeAddress();
  let _referralFiveCommissionRate = sc_3.loadBit()
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

function loadTupleDistribution(source: TupleReader) {
  let _amount = source.readBigNumber();
  let _transactionId = source.readBigNumber();
  let _referralOneAddress = source.readAddressOpt();
  let _referralOneCommissionRate = source.readBigNumberOpt();
  let _referralTwoAddress = source.readAddressOpt();
  let _referralTwoCommissionRate = source.readBigNumberOpt();
  let _referralThreeAddress = source.readAddressOpt();
  let _referralThreeCommissionRate = source.readBigNumberOpt();
  let _referralFourAddress = source.readAddressOpt();
  let _referralFourCommissionRate = source.readBigNumberOpt();
  let _referralFiveAddress = source.readAddressOpt();
  let _referralFiveCommissionRate = source.readBigNumberOpt();
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

function storeTupleDistribution(source: Distribution) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  builder.writeNumber(source.transactionId);
  builder.writeAddress(source.referralOneAddress);
  builder.writeNumber(source.referralOneCommissionRate);
  builder.writeAddress(source.referralTwoAddress);
  builder.writeNumber(source.referralTwoCommissionRate);
  builder.writeAddress(source.referralThreeAddress);
  builder.writeNumber(source.referralThreeCommissionRate);
  builder.writeAddress(source.referralFourAddress);
  builder.writeNumber(source.referralFourCommissionRate);
  builder.writeAddress(source.referralFiveAddress);
  builder.writeNumber(source.referralFiveCommissionRate);
  return builder.build();
}

function dictValueParserDistribution(): DictionaryValue<Distribution> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDistribution(src)).endCell());
    },
    parse: (src) => {
      return loadDistribution(src.loadRef().beginParse());
    },
  };
}

export type Withdraw = {
  $$type: "Withdraw";
  amount: bigint;
};

export function storeWithdraw(src: Withdraw) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(195467089, 32);
    b_0.storeCoins(src.amount);
  };
}

export function loadWithdraw(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 195467089) {
    throw Error("Invalid prefix");
  }
  let _amount = sc_0.loadCoins();
  return { $$type: "Withdraw" as const, amount: _amount };
}

function loadTupleWithdraw(source: TupleReader) {
  let _amount = source.readBigNumber();
  return { $$type: "Withdraw" as const, amount: _amount };
}

function storeTupleWithdraw(source: Withdraw) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeWithdraw(src)).endCell());
    },
    parse: (src) => {
      return loadWithdraw(src.loadRef().beginParse());
    },
  };
}

export type BuyUtils = {
  $$type: "BuyUtils";
  opCode: bigint;
  userId: string;
};

export function storeBuyUtils(src: BuyUtils) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3718333563, 32);
    b_0.storeInt(src.opCode, 257);
    b_0.storeStringRefTail(src.userId);
  };
}

export function loadBuyUtils(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3718333563) {
    throw Error("Invalid prefix");
  }
  let _opCode = sc_0.loadIntBig(257);
  let _userId = sc_0.loadStringRefTail();
  return { $$type: "BuyUtils" as const, opCode: _opCode, userId: _userId };
}

function loadTupleBuyUtils(source: TupleReader) {
  let _opCode = source.readBigNumber();
  let _userId = source.readString();
  return { $$type: "BuyUtils" as const, opCode: _opCode, userId: _userId };
}

function storeTupleBuyUtils(source: BuyUtils) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.opCode);
  builder.writeString(source.userId);
  return builder.build();
}

function dictValueParserBuyUtils(): DictionaryValue<BuyUtils> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeBuyUtils(src)).endCell());
    },
    parse: (src) => {
      return loadBuyUtils(src.loadRef().beginParse());
    },
  };
}

export type UpdateUtils = {
  $$type: "UpdateUtils";
  opCode: bigint;
  utilsSetting: UtilsSetting;
};

export function storeUpdateUtils(src: UpdateUtils) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3283355226, 32);
    b_0.storeInt(src.opCode, 257);
    b_0.store(storeUtilsSetting(src.utilsSetting));
  };
}

export function loadUpdateUtils(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3283355226) {
    throw Error("Invalid prefix");
  }
  let _opCode = sc_0.loadIntBig(257);
  let _utilsSetting = loadUtilsSetting(sc_0);
  return {
    $$type: "UpdateUtils" as const,
    opCode: _opCode,
    utilsSetting: _utilsSetting,
  };
}

function loadTupleUpdateUtils(source: TupleReader) {
  let _opCode = source.readBigNumber();
  const _utilsSetting = loadTupleUtilsSetting(source.readTuple());
  return {
    $$type: "UpdateUtils" as const,
    opCode: _opCode,
    utilsSetting: _utilsSetting,
  };
}

function storeTupleUpdateUtils(source: UpdateUtils) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.opCode);
  builder.writeTuple(storeTupleUtilsSetting(source.utilsSetting));
  return builder.build();
}

function dictValueParserUpdateUtils(): DictionaryValue<UpdateUtils> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeUpdateUtils(src)).endCell());
    },
    parse: (src) => {
      return loadUpdateUtils(src.loadRef().beginParse());
    },
  };
}

export type UtilsSetting = {
  $$type: "UtilsSetting";
  name: string;
  amount: bigint;
  enabled: boolean;
};

export function storeUtilsSetting(src: UtilsSetting) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeStringRefTail(src.name);
    b_0.storeCoins(src.amount);
    b_0.storeBit(src.enabled);
  };
}

export function loadUtilsSetting(slice: Slice) {
  let sc_0 = slice;
  let _name = sc_0.loadStringRefTail();
  let _amount = sc_0.loadCoins();
  let _enabled = sc_0.loadBit();
  return {
    $$type: "UtilsSetting" as const,
    name: _name,
    amount: _amount,
    enabled: _enabled,
  };
}

function loadTupleUtilsSetting(source: TupleReader) {
  let _name = source.readString();
  let _amount = source.readBigNumber();
  let _enabled = source.readBoolean();
  return {
    $$type: "UtilsSetting" as const,
    name: _name,
    amount: _amount,
    enabled: _enabled,
  };
}

function storeTupleUtilsSetting(source: UtilsSetting) {
  let builder = new TupleBuilder();
  builder.writeString(source.name);
  builder.writeNumber(source.amount);
  builder.writeBoolean(source.enabled);
  return builder.build();
}

function dictValueParserUtilsSetting(): DictionaryValue<UtilsSetting> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeUtilsSetting(src)).endCell());
    },
    parse: (src) => {
      return loadUtilsSetting(src.loadRef().beginParse());
    },
  };
}

type ReferralDistributionV2_init_args = {
  $$type: "ReferralDistributionV2_init_args";
};

function initReferralDistributionV2_init_args(
  src: ReferralDistributionV2_init_args
) {
  return (builder: Builder) => {
    let b_0 = builder;
  };
}

async function ReferralDistributionV2_init() {
  const __code = Cell.fromBase64(
    "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"
  );
  const __system = Cell.fromBase64(
    "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"
  );
  let builder = beginCell();
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
  42468: { message: `No utils found` },
  45436: { message: `Insufficient Amount` },
  53296: { message: `Contract not stopped` },
  54615: { message: `Insufficient balance` },
  62365: { message: `Utils is not enabled` },
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
  {
    name: "BuyUtils",
    header: 3718333563,
    fields: [
      {
        name: "opCode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "userId",
        type: { kind: "simple", type: "string", optional: false },
      },
    ],
  },
  {
    name: "UpdateUtils",
    header: 3283355226,
    fields: [
      {
        name: "opCode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "utilsSetting",
        type: { kind: "simple", type: "UtilsSetting", optional: false },
      },
    ],
  },
  {
    name: "UtilsSetting",
    header: null,
    fields: [
      {
        name: "name",
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
        name: "enabled",
        type: { kind: "simple", type: "bool", optional: false },
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
    name: "utilsMap",
    arguments: [
      {
        name: "key",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
    returnType: { kind: "simple", type: "UtilsSetting", optional: true },
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
  { receiver: "internal", message: { kind: "typed", type: "UpdateUtils" } },
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
  { receiver: "internal", message: { kind: "typed", type: "BuyUtils" } },
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
      | UpdateUtils
      | UpdateTreasuryAddress
      | UpdateGovnAddress
      | UpdateRewardPoolAddress
      | Deposit
      | BuyUtils
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
      message.$$type === "UpdateUtils"
    ) {
      body = beginCell().store(storeUpdateUtils(message)).endCell();
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
      message.$$type === "BuyUtils"
    ) {
      body = beginCell().store(storeBuyUtils(message)).endCell();
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
    let builder = new TupleBuilder();
    builder.writeNumber(key);
    let source = (await provider.get("referralPer", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getUtilsMap(provider: ContractProvider, key: bigint) {
    let builder = new TupleBuilder();
    builder.writeNumber(key);
    let source = (await provider.get("utilsMap", builder.build())).stack;
    const result_p = source.readTupleOpt();
    const result = result_p ? loadTupleUtilsSetting(result_p) : null;
    return result;
  }

  async getTreasuryAddress(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("treasuryAddress", builder.build())).stack;
    let result = source.readAddress();
    return result;
  }

  async getGovnAddress(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("govnAddress", builder.build())).stack;
    let result = source.readAddress();
    return result;
  }

  async getRewardPoolAddress(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("rewardPoolAddress", builder.build()))
      .stack;
    let result = source.readAddress();
    return result;
  }

  async getCurrentBalance(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("currentBalance", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getStopped(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("stopped", builder.build())).stack;
    let result = source.readBoolean();
    return result;
  }

  async getOwner(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("owner", builder.build())).stack;
    let result = source.readAddress();
    return result;
  }
}
