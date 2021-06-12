import Link from 'next/link'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import styles from './styles.module.scss'

interface Movie {
    id: string;
    title: string;
    posterPath: string;
    releaseDate: string;
    isFavorite: boolean;
}

type MovieProps = {
    movie: Movie;
}

export function Movie({ movie }: MovieProps) {
    return (
        <Link href={`/movie/${movie.id}`}>
            <a className={styles.content} >
                <img src={movie.posterPath} />
                <div>
                    {movie.isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
                    <h2>{movie.title}</h2>
                    <p>{movie.releaseDate}</p>
                </div>
            </a>
        </Link >
    )
}
