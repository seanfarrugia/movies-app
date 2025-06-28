'use client'
import React, {useEffect, useState} from 'react';
import { Movie } from '@/app/mock-data/movie';
import { Movie as MovieItem } from '../../molecules/movie';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoFunnelOutline } from "react-icons/io5";
import { MovieListHeader } from '../../molecules/movie-list-header';
import { MovieSkeleton } from './skeleton';

import styles from './movie-list.module.scss';

export const MovieList: React.FC = () => {
    useEffect(() => {
        fetch('/api/movies')
            .then(res => res.json())
            .then(data => setMovies(data));
    }, []);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState<string[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const genre = e.currentTarget.textContent!;
        setFilters(prevFilters => {
            if (prevFilters.includes(genre)) {
                return prevFilters.filter(f => f !== genre);
            } else {
                return [...prevFilters, genre];
            }
        });
    };

    const closeClick = () => {
        setFilters([]);
        setSearch('');
    };

    const filteredMovies = movies.filter((movie) => {
        const matchesSearch = movie.name.toLowerCase().includes(search.toLowerCase());

        if (filters.length === 0) {
            return matchesSearch;
        }

        const hasGenreMatch = movie.genres.some(genre => filters.includes(genre));

        return matchesSearch && hasGenreMatch;
    });
    const allGenres = movies.flatMap((movie) => movie.genres);
    const uniqueGenres = Array.from(new Set(allGenres));

    return <div className={styles.moviesContainer}>
                <MovieListHeader title='Betsson Movies' search={search} setSearch={setSearch} />
                {movies.length ? 
                    <>
                        <div className={styles.movieFilterContainer}>
                            <span className={styles.movieFilterBy}><IoFunnelOutline />Filter By: </span>
                            {uniqueGenres.map((genre, index) => {
                                const isActive = filters.includes(genre);
                                return <button onClick={handleClick} key={index} type='button' className={`${styles.movieFilter} ${isActive && styles.active || ''}`}>{genre}</button>
                            })}
                        </div>
                        {(filters.length || search) && (
                            <div className={styles.filterContainer}>
                                Movies Found: {filteredMovies.length}
                                <button className={styles.removeFilter} onClick={closeClick} type='button'>
                                    <IoIosCloseCircleOutline />
                                    Remove All Filters
                                </button>
                            </div>
                        )}
                        
                        {filteredMovies && <ul className={styles.movieList}>
                            {filteredMovies.map((movie: Movie, index: number) => {
                                return <MovieItem key={index} {...movie} />
                            })}
                        </ul>}
                    </>
                : <MovieSkeleton />}
            </div>
}