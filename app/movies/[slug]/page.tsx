import { Movie } from '@/app/mock-data/movie';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { MovieData } from '@/app/components/atoms/movie-data';
import { IoMdArrowDroprightCircle, IoIosStarOutline, IoIosTimer, IoIosArrowRoundBack   } from "react-icons/io";

import styles from './page.module.scss'

interface MoviePageProps {
  params: Promise<{ slug: string }>
}

export default async function MoviePage({ params }: MoviePageProps) {
  const {slug} = await params;

  const host = (await headers()).get('host')
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const res = await fetch(`${protocol}://${host}/api/movies/${slug}`);
  
  if (!res.ok) {
    return notFound();
  }

  const movie: Movie = await res.json();

  return (
    <>
      <div className={styles.placeholderContainer}>
        <IoMdArrowDroprightCircle />
        <Link className={styles.homeButton} href={'/'}><IoIosArrowRoundBack  /> <span>Return to Movies</span></Link>
      </div>
      <div className={styles.movieContentOuter}>
        <div className={styles.movieContentContainer}>
          <Image className={styles.movieImage} src={`/${movie.img}`} alt={`${movie.name} image`} width={300} height={300} loading='eager' />
          <div className={styles.movieContent}>
            <span className={styles.movieId}>{`ID: ${movie.id}`}</span>
            <h1>{movie.name}</h1>
            <MovieData Icon={IoIosStarOutline} text={movie.rate} />
            <MovieData Icon={IoIosTimer} text={movie.length} />
            {movie.genres && <ul>
                {movie.genres.map((genre, index) => {
                  return <li key={index} className={styles.movieGenre}>{genre}</li>
                })}  
              </ul>
            }
          </div>
        </div>
        <div className={styles.movieDesc}>
          <h2>Movie Description</h2>
          <p>{movie.description}</p>
        </div>
      </div>
    </>
  );
}