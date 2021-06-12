import Head from 'next/head';
import styles from './home.module.scss';
import { FiSearch } from 'react-icons/fi'
import { useEffect } from 'react';
import api from '../services/api';
import { useState } from 'react';
import { Movie } from '../components/Movie';
import { useCallback } from 'react';
import { useFavorite } from '../hooks/useFavorites';

interface Movie {
    id: string;
    title: string;
    posterPath: string;
    releaseDate: string;
    isFavorite: boolean;
}

export default function Home() {

    const { favoriteMovies } = useFavorite();

    const [moviesData, setMoviesData] = useState<Movie[]>([]);
    const [seachData, setSearchData] = useState<Movie[]>([]);

    useEffect(() => {
        // fetch data from The Movie DB API and format Movie poster and release date.
        api.get('/popular').then((response) => {
            const updatedMovies: Movie[] = response.data.results.map((currentMovie) => {
                return {
                    id: currentMovie.id,
                    title: currentMovie.title,
                    posterPath: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${currentMovie.poster_path}`,
                    releaseDate: currentMovie.release_date.substr(0, 4),
                    isFavorite: favoriteMovies.includes(currentMovie.id),
                }
            })
            setSearchData(updatedMovies);
            setMoviesData(updatedMovies);
        }).catch((error) => {
            console.log(error);
        })
    }, [favoriteMovies]);

    const onChangeText = useCallback(({ target }) => {
        // converting string to lowercase to make search case insentive
        const text = target.value.toLowerCase() || '';

        setSearchData(moviesData.filter(movie => movie.title.toLowerCase().includes(text)))
    }, [moviesData])

    return (
        <>
            <Head>
                <title>Início | Movies</title>
            </Head>
            <main className={styles.content}>
                <div>
                    <FiSearch className={styles.icon} />
                    <input placeholder='Pesquise filmes...' onChange={onChangeText} />
                </div>
                <section>
                    {seachData.map(movie => (
                        <Movie key={movie.id} movie={movie} />
                    ))}
                </section>
            </main>
        </>
    )
}
