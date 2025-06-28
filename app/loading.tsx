import styles from './loading.module.scss'
export default function Loading() {
    return  <div className={styles.loaderContainer}>
                <span className={styles.loader}></span>
            </div>
}