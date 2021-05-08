export const fantomPools = [
  {
    id: 'spirit-wftm-usdc',
    logo: 'busd-pairs/USDC-BUSD.svg',
    name: 'WFTM-USDC LP',
    token: 'WFTM-USDC LP',
    tokenDescription: 'Spiritswap',
    tokenAddress: '0xe7E90f5a767406efF87Fdad7EB07ef407922EC1D',
    tokenDecimals: 18,
    tokenDescriptionUrl: '#',
    earnedToken: 'WFTM-USDC LP',
    earnedTokenAddress: '0x48bdeECB1B4b3a0a6012bffFa24285D2aA85CF56',
    earnContractAddress: '0x48bdeECB1B4b3a0a6012bffFa24285D2aA85CF56',
    pricePerFullShare: 1,
    tvl: 0,
    oracle: 'lps',
    oracleId: 'cakev2-cake-bnb', // TODO: change
    oraclePrice: 0,
    depositsPaused: false,
    status: 'active',
    platform: 'Spirit',
    assets: ['FTM', 'USDC'],
    callFee: 0.5,
    addLiquidityUrl:
      'https://swap.spiritswap.finance/#/add/0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83/0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
    buyTokenUrl: 'https://swap.spiritswap.finance/#/swap',
  },
];
