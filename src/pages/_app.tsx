import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { FavoriteProvider } from '../hooks/useFavorites'

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <FavoriteProvider>
                <Component {...pageProps} />
            </FavoriteProvider>
        </>
    )
}

export default MyApp
