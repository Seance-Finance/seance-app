import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_BALANCES_BEGIN,
  VAULT_FETCH_BALANCES_SUCCESS,
  VAULT_FETCH_BALANCES_FAILURE,
} from './constants';
import { erc20ABI } from 'features/configure';
import BigNumber from 'bignumber.js';

export function fetchBalances({ address, web3, tokens }) {
  return async dispatch => {
    dispatch({
      type: VAULT_FETCH_BALANCES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const tokensList = [];
      for (let key in tokens) {
        tokensList.push({
          token: key,
          tokenAddress: tokens[key].tokenAddress,
          tokenBalance: tokens[key].tokenBalance,
        });
      }

      Promise.all(
        tokensList.map(async token => {
          const tokenContract = await new web3.eth.Contract(erc20ABI, token.tokenAddress);
          const tokenBalance = await tokenContract.methods.balanceOf(address).call();
          return { tokenBalance };
        })
      ).then(result => {
        try {
          const newTokens = {};
          for (let i = 0; i < tokensList.length; i++) {
            newTokens[tokensList[i].token] = {
              tokenAddress: tokensList[i].tokenAddress,
              tokenBalance: new BigNumber(result[i].tokenBalance).toNumber() || 0,
            };
          }

          dispatch({
            type: VAULT_FETCH_BALANCES_SUCCESS,
            data: newTokens,
          });
          resolve();
        } catch (error) {
          dispatch({
            type: VAULT_FETCH_BALANCES_FAILURE,
          });
          reject(error.message || error);
        }
      });
    });

    return promise;
  };
}

export function useFetchBalances() {
  const dispatch = useDispatch();

  const { tokens, fetchBalancesPending, fetchBalancesDone } = useSelector(
    state => ({
      tokens: state.vault.tokens,
      fetchBalancesDone: state.vault.fetchBalancesDone,
      fetchBalancesPending: state.vault.fetchBalancesPending,
    }),
    shallowEqual
  );

  const boundAction = useCallback(
    data => {
      return dispatch(fetchBalances(data));
    },
    [dispatch]
  );

  return {
    tokens,
    fetchBalances: boundAction,
    fetchBalancesDone,
    fetchBalancesPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_BALANCES_BEGIN:
      return {
        ...state,
        fetchBalancesPending: true,
      };

    case VAULT_FETCH_BALANCES_SUCCESS:
      return {
        ...state,
        tokens: action.data,
        fetchBalancesDone: true,
        fetchBalancesPending: false,
      };

    case VAULT_FETCH_BALANCES_FAILURE:
      return {
        ...state,
        fetchBalancesPending: false,
      };

    default:
      return state;
  }
}
