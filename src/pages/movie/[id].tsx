import { useCallback } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from "next"
import Link from "next/link"
import { AiOutlineArrowLeft, AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaImdb } from 'react-icons/fa'
import { GiTomato } from 'react-icons/gi'
import api from "../../services/api";

import styles from './styles.module.scss'
import { useFavorite } from '../../hooks/useFavorites';
import { useState } from 'react';

interface Movie {
    id: string;
    title: string;
    posterPath: string;
    releaseDate: string;
    backdropPath: string;
    overview: string;
    runtime: number; // duração
    tagline: string;
    cast: {
        name: string;
        character: string
    }[];
    director: string;
    genres: {
        id: string;
        name: string;
    }[]
}

type MovieProps = { movie: Movie }

export default function Movie({ movie }: MovieProps) {

    const { setFavorites, favoriteMovies } = useFavorite();

    const [isFavorite, setIsFavorite] = useState(favoriteMovies.includes(movie.id))

    const handleFavorite = useCallback((movieId) => {
        setFavorites({ movieId });
        setIsFavorite(state => !state)
    }, []);

    return (
        <>
            <Head>
                <title> {movie.title} - ({movie.releaseDate}) | Movies</title>
            </Head>
            <div style={{ backgroundImage: `url(${movie.backdropPath})` }} className={styles.backgroundImage} >
                <div>
                    <Link href='/'>
                        <a className={styles.backIcon}>
                            <AiOutlineArrowLeft />
                        </a>
                    </Link>
                    <section className={styles.content}>
                        <img src={movie.posterPath} />
                        <div className={styles.movieInfo}>
                            <span>
                                {movie.runtime} min
                            </span>
                            <span>
                                • {movie.releaseDate}
                            </span>
                            {movie.genres.map(genre => (
                                <span key={genre.id}>
                                    • {genre.name}
                                </span>
                            ))}
                            <h2>{movie.title}</h2>
                            <div>
                                <button type="button">
                                    <a href={`https://www.imdb.com/find?q=${movie.title}`} target="_blank">
                                        <FaImdb />
                                        imdb
                                    </a>
                                </button>
                                <button type="button">
                                    <a href={`https://www.rottentomatoes.com/search?search=${movie.title}`} target="_blank">
                                        <GiTomato />
                                        rotten tomatoes
                                    </a>
                                </button>
                                <button type="button" onClick={() => handleFavorite(movie.id)}>
                                    {isFavorite ? (
                                        <>
                                            <AiFillHeart />
                                            favorito
                                        </>
                                    ) : (
                                        <>
                                            <AiOutlineHeart />
                                            Adicionar aos favoritos
                                        </>
                                    )}
                                </button>
                            </div>
                            <h3>
                                {movie.tagline}
                            </h3>
                            <p>{movie.overview}</p>

                            <ol>
                                {movie.cast.map(actor => (
                                    <li key={actor.name}>
                                        <p>
                                            {actor.character}
                                        </p>
                                        <p>
                                            {actor.name}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params;
    try {

        const response = await api.get(`/${id}`);
        const creditsResponse = await api.get(`/${id}/credits`);

        const formattedCast = creditsResponse.data.cast.map(actor => {
            return { name: actor.name, character: actor.character }
        });

        const director = creditsResponse.data.crew.find(crewItem => crewItem.job === 'Director')

        const formattedMovie: Movie = {
            id: response.data.id,
            title: response.data.title,
            posterPath: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${response.data.poster_path}`,
            releaseDate: response.data.release_date.substr(0, 4),
            backdropPath: `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${response.data.backdrop_path}`,
            overview: response.data.overview,
            runtime: response.data.runtime,
            tagline: response.data.tagline,
            cast: formattedCast.slice(0, 6),
            director,
            genres: response.data.genres,
        }


        return { redirect: false, props: { movie: formattedMovie } }
    } catch (error) {
        console.log(error)
        return { redirect: { destination: '/', permanent: true }, props: {} }
    }
}
