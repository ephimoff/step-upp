import '@/styles/globals.css';
export { reportWebVitals } from 'next-axiom';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Rubik, Nunito } from '@next/font/google';

import { UserContextProvider } from '@/contexts/user.context';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <UserContextProvider>
          <main className={`${rubik.variable} font-sans`}>
            <Component {...pageProps} />
          </main>
        </UserContextProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
