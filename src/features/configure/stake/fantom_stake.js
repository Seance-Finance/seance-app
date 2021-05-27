import { govPoolABI } from '../abi';

export const fantomStakePools = [
  {
    // testing purposes only
    id: 'moo_belt_eth-icarus',
    name: 'Icarus Finance',
    logo: 'single-assets/ETH.png',
    token: 'mooBeltETH',
    tokenDecimals: 18,
    tokenAddress: '0xf2064C230b285AA6Cf45c6267DA86a8E3505D0AA',
    tokenOracle: 'tokens',
    tokenOracleId: 'ETH',
    earnedToken: 'ICA',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0x95111f630ac215eb74599ed42c67e2c2790d69e2',
    earnContractAddress: '0xf6259516B5c38a110f634FcC2f14fEF02a318B66',
    earnContractAbi: govPoolABI,
    earnedOracle: 'tokens',
    earnedOracleId: 'ICA',
    partnership: true,
    status: 'active',
    hideCountdown: false,
    isMooStaked: true,
    periodFinish: 1520495415,
    partner: {
      logo: 'stake/icarus/logo.png',
      background: 'stake/icarus/background.png',
      text:
        'icarus.finance is a first of its kind decentralized mining protocol that brings Bitcoin and Ethereum hashrate to the Binance Smart Chain, combining it with further DeFi applications Do you want to mine, or farm crypto assets? Perhaps both? No problem! At icarus.finance, you choose"\n',
      website: 'http://icarus.finance',
      social: {
        telegram: 'https://t.me/icarus_finance',
        twitter: 'https://twitter.com/zetta_icarus',
      },
    },
  },
];
