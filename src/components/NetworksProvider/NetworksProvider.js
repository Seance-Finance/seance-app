import React, { createContext, useContext, useState, useMemo } from 'react';

export const NetworksContext = createContext(null);

const NetworksProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const networks = [
    {
      name: 'Fantom Opera',
      asset: 'FANTOM',
      id: '250',
      url: 'https://app.seance.finance',
    },
    // {
    //   name: 'Fantom testnet',
    //   asset: 'FANTOM',
    //   id: '0xfa2',
    //   url: 'https://app.seance.finance',
    // }, -> Uncomment when developing on testnet
    // {
    //   name: 'BSC',
    //   asset: 'BNB',
    //   id: '56',
    //   url: 'https://bsc.seance.finance',
    // },
    // {
    //   name: 'HECO',
    //   asset: 'HT',
    //   id: '128',
    //   url: 'https://heco.beefy.finance',
    // },
    // {
    //   name: 'AVALANCHE',
    //   asset: 'AVAX',
    //   id: '43114',
    //   url: 'https://avax.beefy.finance',
    // },
    // {
    //   name: 'POLYGON',
    //   asset: 'POLYGON',
    //   id: '137',
    //   url: 'https://polygon.beefy.finance',
    // },
  ];

  const currentNetwork = useMemo(
    () => networks.find(network => network.id === process.env.REACT_APP_NETWORK_ID),
    [networks]
  );

  return (
    <NetworksContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        networks,
        currentNetwork,
      }}
    >
      {children}
    </NetworksContext.Provider>
  );
};

export const useNetworks = () => {
  const context = useContext(NetworksContext);

  return context;
};

export default NetworksProvider;
