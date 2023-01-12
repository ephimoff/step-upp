import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Josefin_Sans, Nunito, Inter } from '@next/font/google';

import { UserContextProvider } from '@/contexts/user.context';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin',
});
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <main className={`${nunito.variable} font-sans`}>
          <Component {...pageProps} />
        </main>
      </UserContextProvider>
    </SessionProvider>
  );
}
