import { Analytics } from '@vercel/analytics/react'

import { QueryProvider } from '@/components'
import { ThemeProvider } from '@/theme'
import { defaultMetadata } from '@/utils'

export const metadata = defaultMetadata

export default async function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Analytics />
        <QueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
