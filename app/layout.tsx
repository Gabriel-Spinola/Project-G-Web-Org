import Navbar from '@/components/navbar/Navbar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/utils/Providers'
import { ToastContainer } from 'react-toastify'
import { BiComment } from 'react-icons/bi'

import './globals.css'
import './styles/main.scss'
import 'react-toastify/ReactToastify.css'

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
          <ToastContainer
            className="fixed z-10"
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          <Providers>
            <Navbar />
            <div
              id="comment-button"
              className="fixed bottom-0 w-12 h-12 flex items-center justify-center right-14 text-pure-white bg-medium-primary p-5 rounded-full mb-6"
            >
              <button>
                <BiComment size={24} />
              </button>
            </div>

            {children}
          </Providers>
        </body>
      </html>
    </>
  )
}
