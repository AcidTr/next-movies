import { AppProps } from 'next/app'
import Router from 'next/router';
import { useEffect } from 'react'
import NProgress from 'nprogress';
import "nprogress/nprogress.css";

import { Header } from '../components/Header'
import { FavoriteProvider } from '../hooks/useFavorites'

import '../styles/global.scss'
import { SearchProvider } from '../hooks/useSearch';

function MyApp({ Component, pageProps }: AppProps) {

    useEffect(() => {
        NProgress.configure({
            minimum: 0.3,
            easing: 'ease',
            speed: 800,
        });


        Router.events.on('routeChangeStart', () => NProgress.start());
        Router.events.on('routeChangeComplete', () => NProgress.done());
        Router.events.on('routeChangeError', () => NProgress.done());

        return () => {
            Router.events.off('routeChangeStart', () => NProgress.start());
            Router.events.off('routeChangeComplete', () => NProgress.done());
            Router.events.off('routeChangeError', () => NProgress.done());
        }
    }, []);

    return (
        <>
            <Header />
            <FavoriteProvider>
                <SearchProvider>
                    <Component {...pageProps} />
                </SearchProvider>
            </FavoriteProvider>
        </>
    )
}

export default MyApp
