import { Metadata } from 'next'

const description = 'Dashboard for the EVM indexer current indexing state'

const url = 'https://indexer.kindynos.mx'

const title = 'EVM Indexer'
export const defaultMetadata: Metadata = {
  description,
  icons: {
    apple: [
      {
        type: 'image/png',
        url: 'https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/8caf730a-537f-44bc-f0de-6d1d3360c500/public',
      },
      {
        sizes: '57x57',
        type: 'image/png',
        url: 'https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/e0c8283a-b169-4cea-7670-3877c4b99500/public',
      },
      {
        sizes: '60x60',
        type: 'image/png',
        url: 'https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/1f4b68fd-7315-4825-db95-107492aca500/public',
      },
      {
        sizes: '72x72',
        type: 'image/png',
        url: 'https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/9146acd9-5561-4590-63c4-5f5c88165f00/public',
      },
      {
        sizes: '76x76',
        type: 'image/png',
        url: 'https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/383898f6-f9bb-43f8-ecc9-da9c59aff700/public',
      },
      {
        sizes: '114x114',
        type: 'image/png',
        url: 'https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/1fd988a6-9686-4cc4-2c0c-58ae2853fb00/public',
      },
      {
        sizes: '120x120',
        type: 'image/png',
        url: 'https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/c857d235-9de8-454f-a3d9-2801e8b76a00/public',
      },
      {
        sizes: '144x144',
        type: 'image/png',
        url: 'https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/a160e93c-8b4e-45e5-9970-2b434c65a400/public',
      },
      {
        sizes: '152x152',
        type: 'image/png',
        url: 'https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/6ff49551-96a8-4151-0edf-49550f327400/public',
      },
      {
        sizes: '180x180',
        type: 'image/png',
        url: 'https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/27e11bdc-a437-4ba1-2d7c-3e3a2f5a3400/public',
      },
    ],
    icon: [
      { url: 'https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/8caf730a-537f-44bc-f0de-6d1d3360c500/public' },
      new URL(
        'https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/8caf730a-537f-44bc-f0de-6d1d3360c500/public',
        'https://kindynos.mx',
      ),
    ],
    other: {
      rel: 'apple-icon-precomposed',
      url: 'https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/8b26ca8b-eff3-49d0-7534-e7ae9ce6aa00/public',
    },
    shortcut: ['https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/8caf730a-537f-44bc-f0de-6d1d3360c500/public'],
  },
  manifest: '/static/manifest.json',
  openGraph: {
    description,
    title,
    type: 'website',
    url,
  },
  themeColor: '#426DA9',
  title,
}
