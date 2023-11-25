import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/utils/Providers'
import './styles/main.scss'
import { BiComment } from 'react-icons/bi'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Projeto G',
  description: '',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <Navbar />
            <div
              id="comment-button"
              className="fixed bottom-0 right-14 text-pure-white bg-medium-primary p-5 rounded-full mb-6"
            >
              <button>
                <BiComment size={28} />
              </button>
            </div>
            {children}
          </Providers>
        </body>
      </html>
    </>
  )
}
