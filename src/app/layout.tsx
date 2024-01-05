import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './provider'
import BottomNavigation from './component/BottomNavigation'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Saminta',
  description: 'Antrian Mabar Nomor 1!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main>
            <div className={`w-full flex align-center items-center justify-center`}>
              <div className="relative h-screen w-full sm:w-4/6 xl:max-w-2xl bg-stone-800 text-white">
                <div className="h-full relative flex flex-col justify-center pt-8 pb-28 px-6 overflow-hidden ">
                  {children}
                </div>
                <div className='fixed bottom-0 w-inherit'>
                  <BottomNavigation />
                </div>
              </div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
