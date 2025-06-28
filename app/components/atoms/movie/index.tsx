import React from 'react';
import { Movie as MovieObj } from '@/app/mock-data/movie';
import Image from 'next/image';
import Link from 'next/link';
import { MovieData } from '../movie-data';
import { IoIosStarOutline, IoIosTimer  } from "react-icons/io";

import styles from './movie.module.scss';

export const Movie: React.FC<MovieObj> = ({
    slug,
    name,
    rate,
    length,
    img,
}) => {
    return <li data-testid="movie-item" className={styles.movieItem}>
                <Link href={`/movies/${slug}`} className={styles.movieLink}>
                    <div className={styles.movieDesc}>
                        <svg className={styles.cardArc} xmlns="http://www.w3.org/2000/svg"><path /></svg>  
                        <h3>{name}</h3>
                        <MovieData Icon={IoIosStarOutline} text={rate} />
                        <MovieData Icon={IoIosTimer} text={length} />
                    </div>
                    <Image loading='lazy' className={styles.movieImage} width={100} height={100} alt={`${name} image`} src={`/${img}`} />
                </Link>
            </li>
}