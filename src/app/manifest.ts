import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Faruk Islam — Full Stack Developer',
    short_name: 'FI Portfolio',
    description: 'Full Stack Developer Portfolio',
    start_url: '/',
    display: 'standalone',
    background_color: '#030014',
    theme_color: '#6366f1',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }
}
