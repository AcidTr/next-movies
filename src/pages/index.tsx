import Head from 'next/head';
import styles from './home.module.scss';
import { FiSearch } from 'react-icons/fi'
import { useEffect } from 'react';
import api from '../services/api';
import { useState } from 'react';
import { Movie } from '../components/Movie';

interface Movie {
    id: string;
    title: string;
    posterPath: string;
    releaseDate: string;
}

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        api.get('/popular').then((response) => {
            console.log(response.data);
            const updatedMovies = response.data.results.map((currentMovie) => {
                return {
                    id: currentMovie.id,
                    title: currentMovie.title,
                    posterPath: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${currentMovie.poster_path}`,
                    releaseDate: currentMovie.release_date,
                }
            })
            setMovies(updatedMovies);
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    return (
        <>
            <Head>
                <title>Início | Movies</title>
            </Head>
            <main className={styles.content}>
                <div>
                    <FiSearch className={styles.icon} />
                    <input placeholder='Pesquise filmes...' />
                </div>
                <section>
                    {movies.map(movie => (
                        <Movie key={movie.id} movie={movie} />
                    ))}
                </section>
            </main>
        </>
    )
}
