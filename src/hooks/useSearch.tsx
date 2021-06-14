import React, {
    createContext,
    useContext,
    ReactNode,
    useState,
    useCallback,

} from 'react';
import { useEffect } from 'react';
import api from '../services/api';
import { useFavorite } from './useFavorites';


interface SearchContextData {
    moviesResult: Object[]
    searchMovies: (query: string) => Promise<void>;
    query: string;
    setQuery: (query: string) => void;
}

interface SearchProviderProps {
    children: ReactNode;
}

const FavoriteContext = createContext<SearchContextData>({} as SearchContextData);

export const SearchProvider = ({ children }: SearchProviderProps) => {
    const { favoriteMovies } = useFavorite();
    const [query, setQuery] = useState('');
    const [moviesResult, setMoviesResult] = useState([]);

    const searchMovies = useCallback(async (query) => {
        setQuery(query);
        try {
            const response = await api.get(`/search/movie?query=${query}`);
            const updatedMovies = response.data.results.map((currentMovie) => {
                return {
                    id: currentMovie.id,
                    title: currentMovie.title,
                    posterPath: currentMovie.poster_path ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${currentMovie.poster_path}` : '/no-image.jpg',
                    releaseDate: currentMovie.release_date?.substr(0, 4) || 'Não informado',
                    isFavorite: favoriteMovies.includes(currentMovie.id),
                }
            })
            setMoviesResult(updatedMovies);
        } catch (err) {
            setMoviesResult([]);
            console.log(err.response)
        }

    }, [favoriteMovies]);

    return (
        <FavoriteContext.Provider
            value={{
                moviesResult,
                searchMovies,
                query,
                setQuery,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};

export function useSearch(): SearchContextData {
    const context = useContext(FavoriteContext);

    if (!context) {
        throw new Error('useSearch must be used within an SearchProvider');
    }

    return context;
}
