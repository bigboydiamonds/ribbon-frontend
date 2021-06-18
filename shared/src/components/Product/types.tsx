import React from "react";
import { VaultList, VaultOptions } from "../../constants/constants";
import { Assets } from "../../store/types";

export const ProductList = [
  "yield",
  "volatility",
  "principalProtection",
  "capitalAccumulation",
] as const;

export type ProductType = typeof ProductList[number];

export interface DynamicMarginProps {
  empty: number;
}

export interface ProductTabProps {
  selected: boolean;
  type: ProductType;
}

export interface HeaderScrollIndicatorProps {
  direction: "left" | "right";
  show: boolean;
}

export interface ProductCatalogueProps {
  dynamicMargin: boolean;
  onVaultPress: (vault: VaultOptions) => void;
}

export type DesktopViewType = "grid" | "gallery";

export const VaultStrategyList = ["COVERED-CALL", "PUT-SELLING"] as const;
export type VaultStrategy = typeof VaultStrategyList[number];
export const VaultStrategyMap: {
  [strategy in VaultStrategy]: VaultOptions[];
} = {
  "COVERED-CALL": ["rETH-THETA", "rBTC-THETA"],
  "PUT-SELLING": ["rUSDC-ETH-P-THETA", "rUSDC-BTC-P-THETA"],
};

export const VaultSortByList = [
  "SORT BY",
  "NEWEST FIRST",
  "OLDEST FIRST",
  "YIELD: HIGH TO LOW",
  "YIELD: LOW TO HIGH",
] as const;
export type VaultSortBy = typeof VaultSortByList[number];
export const VaultReleaseOrder: VaultOptions[] = VaultList;

export interface VaultFilterProps {
  filterStrategies: VaultStrategy[];
  filterAssets: Assets[];
  sort: VaultSortBy;
  setFilterStrategies: React.Dispatch<React.SetStateAction<VaultStrategy[]>>;
  setFilterAssets: React.Dispatch<React.SetStateAction<Assets[]>>;
  setSort: React.Dispatch<React.SetStateAction<VaultSortBy>>;
}
