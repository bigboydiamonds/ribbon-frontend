import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { ERC20Token } from "../models/eth";
import { useGlobalState } from "../store/store";
import { impersonateAddress } from "../utils/development";
import { getERC20Token } from "./useERC20Token";

const useERC20TokenBalance = (
  token: ERC20Token,
  { poll, pollingFrequency }: { poll: boolean; pollingFrequency?: number } = {
    poll: true,
    pollingFrequency: 5000,
  }
) => {
  const { active, library, account: web3Account } = useWeb3React();
  const account = impersonateAddress ? impersonateAddress : web3Account;
  const [tokenBalances, setTokenBalances] = useGlobalState("tokenBalances");

  const updateBalance = useCallback(async () => {
    if (!active || !account) {
      return;
    }

    const contract = getERC20Token(library, token)!;

    const balance = await contract.balanceOf(account);
    setTokenBalances((curr) => ({
      ...curr,
      [token]: {
        balance,
        fetched: true,
      },
    }));
  }, [account, active, library, setTokenBalances, token]);

  useEffect(() => {
    updateBalance();

    let pollInterval: any = undefined;
    if (poll) {
      pollInterval = setInterval(updateBalance, pollingFrequency);
    }

    // Clear interval
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [poll, pollingFrequency, updateBalance]);

  return { ...tokenBalances[token] };
};

export default useERC20TokenBalance;

export const useERC20TokensBalance = (
  tokens: ERC20Token[],
  { poll, pollingFrequency }: { poll: boolean; pollingFrequency?: number } = {
    poll: true,
    pollingFrequency: 5000,
  }
) => {
  const { active, library } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [tokenBalances, setTokenBalances] = useGlobalState("tokenBalances");

  return { ...tokenBalances, loading };
};
