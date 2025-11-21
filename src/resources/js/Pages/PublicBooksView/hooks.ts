import { useMemo } from 'react'
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

export const summarizeBooks = (count: number): string => {
    if (count === 0) return '公開中の本はまだありません'
    if (count === 1) return '公開中の本は1冊'
    return `公開中の本は${count}冊`
}

export const usePublicBooks = (props: PageProps<PublicBooksViewProps>) => {
    const total = props.books.length
    const summary = useMemo(() => summarizeBooks(total), [total])

    return {
        owner: props.owner,
        books: props.books,
        summary,
    }
}
