/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IAggregatedOptionsInstrument } from "./IAggregatedOptionsInstrument";

export class IAggregatedOptionsInstrumentFactory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IAggregatedOptionsInstrument {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IAggregatedOptionsInstrument;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "string[]",
        name: "venues",
        type: "string[]",
      },
      {
        internalType: "enum ProtocolAdapterTypes.OptionType[]",
        name: "optionTypes",
        type: "uint8[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "strikePrices",
        type: "uint256[]",
      },
    ],
    name: "cost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "positionID",
        type: "uint256",
      },
    ],
    name: "exerciseProfit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "positionID",
        type: "uint256",
      },
    ],
    name: "canExercise",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "venues",
        type: "string[]",
      },
      {
        internalType: "enum ProtocolAdapterTypes.OptionType[]",
        name: "optionTypes",
        type: "uint8[]",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "strikePrices",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "buyData",
        type: "bytes[]",
      },
    ],
    name: "buyInstrument",
    outputs: [
      {
        internalType: "uint256",
        name: "positionID",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "positionID",
        type: "uint256",
      },
    ],
    name: "exercisePosition",
    outputs: [
      {
        internalType: "uint256",
        name: "profit",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "underlying",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "strikeAsset",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "collateralAsset",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "expiry",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getInstrumentPositions",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "exercised",
            type: "bool",
          },
          {
            internalType: "uint8",
            name: "callVenue",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "putVenue",
            type: "uint8",
          },
          {
            internalType: "uint32",
            name: "callOptionID",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "putOptionID",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "callStrikePrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "putStrikePrice",
            type: "uint256",
          },
        ],
        internalType: "struct InstrumentPosition[]",
        name: "positions",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
