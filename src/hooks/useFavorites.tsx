import { parseCookies, setCookie } from 'nookies';
import React, {
    createContext,
    useContext,
    ReactNode,
    useState,
    useCallback,

} from 'react';
import { useEffect } from 'react';

interface setFavoritesDTO {
    movieId: string
}


interface FavoriteContextData {
    favoriteMovies: string[];
    setFavorites: (data: setFavoritesDTO) => void;
}

interface FavoriteProviderProps {
    children: ReactNode;
}

const FavoriteContext = createContext<FavoriteContextData>({} as FavoriteContextData);

export const FavoriteProvider = ({ children }: FavoriteProviderProps) => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);


    // get favorite movies id from cookies and set it on favoriteMovies state
    useEffect(() => {
        const { 'movies.favorites': favorites } = parseCookies();

        setFavoriteMovies(JSON.parse(favorites));
    }, []);

    // recieves a options param with movieId and set it on favoriteMovies state and cookies.
    const setFavorites = useCallback(({ movieId }: setFavoritesDTO) => {
        let updatedFavoriteMovies = [];

        if (favoriteMovies.includes(movieId)) {
            updatedFavoriteMovies = favoriteMovies.filter(favoriteMovie => favoriteMovie !== movieId);
        } else {
            updatedFavoriteMovies = [...favoriteMovies, movieId]
        }

        setCookie(undefined, 'movies.favorites', JSON.stringify(updatedFavoriteMovies || []), {
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
        })
        setFavoriteMovies(updatedFavoriteMovies);
    }, [favoriteMovies]);


    return (
        <FavoriteContext.Provider
            value={{
                favoriteMovies,
                setFavorites
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};

export function useFavorite(): FavoriteContextData {
    const context = useContext(FavoriteContext);

    if (!context) {
        throw new Error('useFavorite must be used within an FavoriteProvider');
    }

    return context;
}
