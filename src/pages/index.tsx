import Head from "next/head";
import styles from "./home.module.scss";
import { FiSearch } from "react-icons/fi";
import { useEffect, useMemo } from "react";
import NProgress from "nprogress";

import api from "../services/api";
import { useState } from "react";
import { Movie } from "../components/Movie";
import { useCallback } from "react";
import { useFavorite } from "../hooks/useFavorites";
import { useSearch } from "../hooks/useSearch";

interface Movie {
    id: string;
    title: string;
    posterPath: string;
    releaseDate: string;
    isFavorite: boolean;
}

export default function Home() {
    const { query, setQuery, moviesResult, searchMovies } = useSearch();

    const { favoriteMovies } = useFavorite();

    const [loading, setLoading] = useState(false);

    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

    useEffect(() => {
        // fetch data from The Movie DB API and format Movie poster and release date.
        api.get("/movie/popular")
            .then((response) => {
                const updatedMovies: Movie[] = response.data.results.map(
                    (currentMovie) => {
                        return {
                            id: currentMovie.id,
                            title: currentMovie.title,
                            posterPath: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${currentMovie.poster_path}`,
                            releaseDate:
                                currentMovie.release_date?.substr(0, 4) ||
                                "Não informado",
                            isFavorite: favoriteMovies.includes(
                                currentMovie.id
                            ),
                        };
                    }
                );
                setPopularMovies(updatedMovies);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [favoriteMovies, query]);

    useEffect(() => {
        /*  Search movies if there is a query.
            Workaround to update movies components
            when comming back from movieDetails
            after adding/removing from favorites
         */
        setLoading(true);
        NProgress.start();
        searchMovies(query).finally(() => {
            setLoading(false);
            NProgress.done();
        });
    }, [query]);

    const onChangeText = useCallback(({ target }) => {
        const text = target.value || "";

        setQuery(text);
    }, []);

    const renderSection = useMemo(() => {
        if (moviesResult.length <= 0 && query && !loading) {
            return (
                <div>
                    <FiSearch className={styles.icon} />
                    <h3>
                        Não encontramos
                        <br />
                        filmes para a sua <br /> pesquisa :(
                    </h3>
                </div>
            );
        }

        if (moviesResult.length > 0) {
            return moviesResult.map((movie: Movie) => (
                <Movie key={movie.id} movie={movie} />
            ));
        }

        return popularMovies.map((movie: Movie) => (
            <Movie key={movie.id} movie={movie} />
        ));
    }, [moviesResult, popularMovies, query, loading]);

    return (
        <>
            <Head>
                <title>Início | Movies</title>
            </Head>
            <main className={styles.content}>
                <div>
                    <FiSearch className={styles.icon} />
                    <input
                        placeholder="Pesquise filmes..."
                        onChange={onChangeText}
                        value={query}
                    />
                </div>
                <h2>
                    {moviesResult.length ? "Resultados" : "Filmes Populares"}
                </h2>
                <section>{renderSection}</section>
            </main>
        </>
    );
}
