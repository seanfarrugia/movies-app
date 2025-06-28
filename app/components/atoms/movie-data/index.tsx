import styles from './movie-data.module.scss';

interface Props {
    Icon: React.ElementType
    text: string
}

export const MovieData: React.FC<Props> = ({
    Icon,
    text
}) =>  <span className={styles.movieData}><Icon />{text}</span>