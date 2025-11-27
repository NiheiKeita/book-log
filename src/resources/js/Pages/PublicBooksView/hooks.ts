import { useMemo, useState } from 'react'
import type { PageProps } from '~/types'
import type { UserBook } from '~/types/books'

export type PublicBooksViewProps = {
    owner: {
        id: number
        name: string
        image_url?: string | null
    }
    books: UserBook[]
}

export type PublicBooksViewStyle = 'cards' | 'shelf'
export const SHELF_ROW_SIZE = 4

export const summarizeBooks = (count: number): string => {
    if (count === 0) return '公開中の本はまだありません'
    if (count === 1) return '公開中の本は1冊'
    return `公開中の本は${count}冊`
}

const chunkBooks = (books: UserBook[], size: number): UserBook[][] => {
    const rows: UserBook[][] = []
    for (let i = 0; i < books.length; i += size) {
        rows.push(books.slice(i, i + size))
    }
    return rows
}

export const usePublicBooks = (props: PageProps<PublicBooksViewProps>) => {
    const total = props.books.length
    const summary = useMemo(() => summarizeBooks(total), [total])
    const [viewStyle, setViewStyle] = useState<PublicBooksViewStyle>('shelf')
    const shelfRows = useMemo(() => chunkBooks(props.books, SHELF_ROW_SIZE), [props.books])

    return {
        owner: props.owner,
        books: props.books,
        summary,
        viewStyle,
        setViewStyle,
        shelfRows,
    }
}
