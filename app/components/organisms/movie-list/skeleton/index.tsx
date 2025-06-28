import styles from './skeleton.module.scss';

export const MovieSkeleton: React.FC = () => {
  return (
    <div className={styles.skeletonContainer}>
        <div className={styles.skeletonFilterContainer}>
            {[...Array(8)].map((_, i) => (
                <div key={i} className={styles.skeletonFilter} />
            ))}
        </div>
        {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.skeletonCard}>
                <div className={styles.skeletonThumbnail} />
                <div className={styles.skeletonText} />
                <div className={styles.skeletonTextShort} />
                <div className={styles.skeletonTextShort} />
            </div>
        ))}
    </div>
  );
};