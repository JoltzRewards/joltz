export const availableNfts = {
  0: {
    id: 0,
    name: 'NFT 0',
    image: `${process.env.API_BASE_URL}`,
    attributes: [
      {
        trait_type: 'Background',
        trait_group: 'NFT',
        value: 'Background 1',
        id: null,
        sequence: null,
      },
      {
        trait_type: 'Layer',
        trait_group: 'NFT',
        value: 'Layer 1',
        id: null,
        sequence: null,
      },
      {
        trait_type: 'Seal',
        trait_group: 'NFT',
        value: 'Seal 1',
        id: null,
        sequence: null,
      },
    ],
  },
  1: {
    id: 1,
    name: 'NFT 1',
    image: `${process.env.API_BASE_URL}`,
    attributes: [
      {
        trait_type: 'Background',
        trait_group: 'NFT',
        value: 'Background 2',
        id: null,
        sequence: null,
      },
      {
        trait_type: 'Layer',
        trait_group: 'NFT',
        value: 'Layer 2',
        id: null,
        sequence: null,
      },
      {
        trait_type: 'Seal',
        trait_group: 'NFT',
        value: 'Seal 2',
        id: null,
        sequence: null,
      },
    ],
  },
  2: {
    id: 2,
    name: 'NFT 2',
    image: `${process.env.API_BASE_URL}`,
    attributes: [
      {
        trait_type: 'Background',
        trait_group: 'NFT',
        value: 'Background 2',
        id: null,
        sequence: null,
      },
      {
        trait_type: 'Layer',
        trait_group: 'NFT',
        value: 'Layer 2',
        id: null,
        sequence: null,
      },
      {
        trait_type: 'Seal',
        trait_group: 'NFT',
        value: 'Seal 2',
        id: null,
        sequence: null,
      },
    ],
  },
  3: {
    id: 3,
    name: 'NFT 3',
    image: `${process.env.API_BASE_URL}`,
    attributes: [
      {
        trait_type: 'Background',
        trait_group: 'NFT',
        value: 'Background 3',
        id: null,
        sequence: null,
      },
      {
        trait_type: 'Layer',
        trait_group: 'NFT',
        value: 'Layer 3',
        id: null,
        sequence: null,
      },
      {
        trait_type: 'Seal',
        trait_group: 'NFT',
        value: 'Seal 3',
        id: null,
        sequence: null,
      },
    ],
  },
}

export type NFTMetadata = typeof availableNfts[0]
