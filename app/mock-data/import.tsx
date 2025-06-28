import path from "path";
import PocketBase from "pocketbase";
import { promises } from 'fs';

export async function importMovies() {
    try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        await pb.admins.authWithPassword(
            process.env.POCKETBASE_ADMIN_EMAIL!,
            process.env.POCKETBASE_ADMIN_PASSWORD!
        );

        const filePath = path.join(
        process.cwd(),
            "app",
            "mock-data",
            "movie.mock-data.json"
        );
        const fileContents = await promises.readFile(filePath, "utf-8");
        const movies = JSON.parse(fileContents);

        for (const movie of movies) {
            try {
                const newMovie = await pb.collection("movies").create({
                    name: movie.name,
                    slug: movie.slug,
                    description: movie.description,
                    rate: movie.rate,
                    length: movie.length,
                    genres: JSON.stringify(movie.genres), 
                    img: movie.img,
                });
                console.log(`Created movie: ${movie.slug}`);
            } catch (error) {
                console.error(`Failed to create movie ${movie.slug}:`, error);
            }
        }

        return new Response("Movies populated successfully", { status: 200 });
    } catch (error) {
        console.error("Failed to populate movies:", error);
        return new Response("Failed to populate movies", { status: 500 });
    }
}
