// import path from 'path';
// import { promises as fs } from 'fs';
// import { Movie } from '@/app/mock-data/movie';

import PocketBase from 'pocketbase'

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params;
  const pb = new PocketBase('http://127.0.0.1:8090')
  await pb.admins.authWithPassword(
      process.env.POCKETBASE_ADMIN_EMAIL!,
      process.env.POCKETBASE_ADMIN_PASSWORD!
  );
  try {
      const movie = await pb.collection('movies').getFirstListItem(`slug="${slug}"`)
      return Response.json(movie)
  } catch (error: any) {
      console.error('Error fetching movie by slug:', error.response || error.message)
      return new Response('Movie not found', { status: 404 })
  }
}

/* ------ Old GET Function using json ------ */
// export async function GET(
//   req: Request,
//   { params }: { params: { slug: string } }
// ) {
//   const { slug } = await params;

//   try {
//     const filePath = path.join(process.cwd(), 'app', 'mock-data', 'movie.mock-data.json');
//     const fileContents = await fs.readFile(filePath, 'utf-8');
//     const movies: Movie[] = JSON.parse(fileContents);

//     const movie = movies.find(m => m.slug === slug);
//     if (!movie) {
//       return new Response('Movie not found', { status: 404 });
//     }

//     return new Response(JSON.stringify(movie), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   } catch (error) {
//     return new Response('Error reading movie file', { status: 500 });
//   }
// }
