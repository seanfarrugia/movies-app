import PocketBase from 'pocketbase'
// import path from "path";
// import { promises } from "fs";
// import { Movie } from "@/app/mock-data/movie";
// import { importMovies } from "@/app/mock-data/import";

export async function GET() {
    try {
        const pb = new PocketBase('http://127.0.0.1:8090')
        await pb.admins.authWithPassword(
            process.env.POCKETBASE_ADMIN_EMAIL!,
            process.env.POCKETBASE_ADMIN_PASSWORD!
        );
        
        const records = await pb.collection('movies').getFullList()
        return Response.json(records)
    } catch (error) {
        console.error('PocketBase fetch error:', error)
        return new Response('Error fetching movies from PocketBase', { status: 500 })
    }
}

/* ------ Old GET Function using json ------ */
// export async function GET() {
//     try {
//         const filePath = path.join(process.cwd(), 'app', 'mock-data', 'movie.mock-data.json')
//         const fileContents = await promises.readFile(filePath, 'utf-8')
//         const data: Movie[] = JSON.parse(fileContents)
//         // importMovies()
//         return Response.json(data)
//     } catch (error) {
//         return new Response('Error reading data file', { status: 500 })
//     }
// }