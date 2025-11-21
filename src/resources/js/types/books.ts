export type Book = {
    id: number
    isbn13: string
    title: string
    author?: string | null
    publisher?: string | null
    published_year?: string | null
    image_url?: string | null
}

export type UserBook = {
    id: number
    is_public: boolean
    book: Book
    created_at?: string
}

export type PaginationMeta = {
    current_page: number
    last_page: number
    per_page: number
    total: number
}
