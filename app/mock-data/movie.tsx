export interface Movie {
    id: number,
    slug: string,
    name: string,
    description: string,
    genres: Array<string>,
    rate: string,
    length: string,
    img: string
}