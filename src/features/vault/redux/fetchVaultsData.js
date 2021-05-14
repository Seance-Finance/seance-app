import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import BigNumber from 'bignumber.js';
import {
  VAULT_FETCH_VAULTS_DATA_BEGIN,
  VAULT_FETCH_VAULTS_DATA_SUCCESS,
  VAULT_FETCH_VAULTS_DATA_FAILURE,
} from './constants';
import { fetchPrice } from '../../web3';
import { erc20ABI, vaultABI } from '../../configure';
import { byDecimals } from 'features/helpers/bignumber';
import Web3 from 'web3';
import { getRpcUrl } from 'common/networkSetup';

export function fetchVaultsData({ address, web3, pools }) {
  return async dispatch => {
    dispatch({
      type: VAULT_FETCH_VAULTS_DATA_BEGIN,
    });

    if (!web3) {
      // setup default provider to get vault data
      web3 = new Web3(new Web3.providers.HttpProvider(getRpcUrl()));
    }

    const promise = new Promise((resolve, reject) => {
      Promise.all(
        pools.map(async pool => {
          const token = await new web3.eth.Contract(erc20ABI, pool.tokenAddress);

          if (address) {
            const allowanceWei = await token.methods
              .allowance(address, pool.earnContractAddress)
              .call();
            pool.allowance =
              new BigNumber(web3.utils.fromWei(allowanceWei, 'ether')).toNumber() || 0;
          }

          const vault = await new web3.eth.Contract(vaultABI, pool.earnedTokenAddress);

          const pricePerFullShare = await vault.methods.getPricePerFullShare().call();
          pool.pricePerFullShare = new BigNumber(byDecimals(pricePerFullShare, 18)).toNumber() || 1;
          const tvl = await vault.methods.underlyingBalanceInVault().call();
          pool.tvl = byDecimals(tvl, 18).toNumber();

          pool.oraclePrice = fetchPrice({ id: pool.oracleId }) || 0;

          return pool;
        })
      ).then(newPools => {
        try {
          dispatch({
            type: VAULT_FETCH_VAULTS_DATA_SUCCESS,
            data: newPools,
          });
          resolve();
        } catch (error) {
          dispatch({
            type: VAULT_FETCH_VAULTS_DATA_FAILURE,
          });
          reject(error.message || error);
        }
      });
    });

    return promise;
  };
}

export function useFetchVaultsData() {
  const dispatch = useDispatch();

  const { pools, fetchVaultsDataDone } = useSelector(
    state => ({
      pools: state.vault.pools,
      fetchVaultsData: state.vault.fetchVaultsData,
      fetchVaultsDataDone: state.vault.fetchVaultsDataDone,
    }),
    shallowEqual
  );

  const boundAction = useCallback(
    data => {
      return dispatch(fetchVaultsData(data));
    },
    [dispatch]
  );

  return {
    pools,
    fetchVaultsData: boundAction,
    fetchVaultsDataDone,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_VAULTS_DATA_BEGIN:
      return {
        ...state,
        fetchVaultsDataPending: true,
      };

    case VAULT_FETCH_VAULTS_DATA_SUCCESS:
      return {
        ...state,
        pools: action.data,
        fetchVaultsDataPending: false,
        fetchVaultsDataDone: true,
      };

    case VAULT_FETCH_VAULTS_DATA_FAILURE:
      return {
        ...state,
        fetchVaultsDataPending: false,
      };

    default:
      return state;
  }
}
