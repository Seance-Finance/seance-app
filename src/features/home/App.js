import React, { useEffect, useState } from 'react';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import Header from 'components/Header/Header';
import NetworksProvider from 'components/NetworksProvider/NetworksProvider';
import NetworksModal from 'components/NetworksModal/NetworksModal';

import { useTranslation } from 'react-i18next';

import { SnackbarProvider } from 'notistack';
import { Notifier } from 'features/common';

import appStyle from './jss/appStyle.js';

import { createWeb3Modal } from '../web3';
import { useConnectWallet, useDisconnectWallet } from './redux/hooks';
import useNightMode from './hooks/useNightMode';
import createTheme from './jss/appTheme';
import { networkSetup } from 'common/networkSetup';
import { AppContext } from './context';

const useStyles = makeStyles(appStyle);

export default function App({ children }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { connectWallet, web3, address, networkId, connected, connectWalletPending } =
    useConnectWallet();
  const { disconnectWallet } = useDisconnectWallet();
  const [web3Modal, setModal] = useState(null);

  const { isNightMode, setNightMode } = useNightMode();
  const theme = createTheme(isNightMode);

  useEffect(() => {
    setModal(createWeb3Modal(t));
  }, [setModal, t]);

  useEffect(() => {
    if (web3Modal && (web3Modal.cachedProvider || window.ethereum)) {
      connectWallet(web3Modal);
    }
  }, [web3Modal, connectWallet]);

  useEffect(() => {
    if (
      web3 &&
      address &&
      !connectWalletPending &&
      networkId &&
      Boolean(networkId !== Number(process.env.REACT_APP_NETWORK_ID))
    ) {
      networkSetup(process.env.REACT_APP_NETWORK_ID).catch(e => {
        console.error('Network setup error', e);
        alert(t('Network-Error'));
      });
    }
  }, [web3, address, networkId, connectWalletPending, t]);

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <NetworksProvider>
            <NetworksModal />
            <AppContext.Provider
              value={{
                address,
                connectWallet: () => connectWallet(web3Modal),
                disconnectWallet: () => disconnectWallet(web3, web3Modal),
                connected,
                isNightMode,
                setNightMode: () => setNightMode(mode => !mode),
              }}
            >
              <div
                style={{
                  background: theme.palette.background.hue,
                  backgroundColor: theme.palette.background.default,
                }}
              >
                <Header />
                <div className={classes.container}>
                  <div className={classes.children}>
                    {Boolean(networkId === Number(process.env.REACT_APP_NETWORK_ID)) && children}
                    <Notifier />
                  </div>
                </div>
              </div>
            </AppContext.Provider>
          </NetworksProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}
