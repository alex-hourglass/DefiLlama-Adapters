const ADDRESSES = require('../helper/coreAssets.json')

const ethereum_pitchfxs = '0x11ebe21e9d7bf541a18e1e3ac94939018ce88f0b';
const ethereum_preiusdt = '0xd9b2CB2FBAD204Fc548787EF56B918c845FCce40';

module.exports = {
  methodology: 'TVL accounts for all assets deposited into the Hourglass protocol. It also includes the amount of FXS time-locked and minted as pitchFXS.',
  ethereum: {
    tvl: async (api) => {
      await computePitchfxsTvl(api)
      await computePreiusdtTvl(api)
    }
  }
}

const computePitchfxsTvl = async (api) => {
  const balance = await api.call({
    target: ethereum_pitchfxs,
    params: [],
    abi: 'erc20:totalSupply',
  });

  api.addToken(ADDRESSES.ethereum.FXS, balance);
}

const computePreiusdtTvl = async (api) => {
  const balance = await api.call({
    target: ethereum_preiusdt,
    params: [],
    abi: 'erc20:totalSupply',
  });

  api.addToken(ADDRESSES.ethereum.USDC, balance);
}