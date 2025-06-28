import React from "react";
import { IoIosSearch  } from "react-icons/io";

import styles from './movie-list-header.module.scss';

interface Props {
    title: string
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const MovieListHeader: React.FC<Props> = ({
    title,
    search,
    setSearch
}) => {
    return <div className={styles.movieListNav}>
                <h2 className={styles.moviesHeading}>{title}</h2>
                <div className={styles.searchContainer}>
                    <input type="text" placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <IoIosSearch className={styles.movieSearchIcon} />
                </div>
            </div>
}