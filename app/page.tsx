import { MovieList } from "@/app/components/organisms/movie-list";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
          <MovieList />
      </main>
    </div>
  );
}
