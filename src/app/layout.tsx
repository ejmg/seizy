import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'seizy',
  description: 'an application to track the health of my chronically epileptic dog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn('bg-indigo-900 text-slate-900 antialiased p-1', inter.className)}>
      <body className='min-h-screen'>
        {/* TODO: basic navbar */}
        <div className='h-10 w-full text-slate-50'>
          <p>navbar</p>
        </div>
        <div className='container max-w-7xl mx-auto h-full bg-neutral-300 rounded-lg'>
          {children}
        </div>
      </body>
    </html>
  )
}
