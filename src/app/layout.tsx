import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TosterContext from './context/TosterContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Messenger',
  description: 'Developed By Harvindar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <TosterContext/>
        {children}
      </body>
    </html>
  )
}
