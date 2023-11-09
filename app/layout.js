import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bun Links',
  description: 'URL shortening web application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-black ${inter.className}`}>
        {children}
      </body>
    </html>
  )
}
