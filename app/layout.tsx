import Navbar from '@/components/navbar/Navbar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/utils/Providers'
import { ToastContainer } from 'react-toastify'

import './globals.css'
import 'react-toastify/ReactToastify.css'
import ChatButton from '@/components/Buttons/ChatButton'

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
            <ChatButton />

            {children}
          </Providers>
        </body>
      </html>
    </>
  )
}
