import { useCallback, useMemo, useState } from 'react'
import { router } from '@inertiajs/react'
import axios from 'axios'
import { route } from 'ziggy-js'
import type { PageProps } from '~/types'
import type { PaginationMeta, UserBook } from '~/types/books'

export type MyBooksViewProps = {
    books: {
        data: UserBook[]
        meta: PaginationMeta
    }
    filters: {
        q: string
    }
    user: {
        name: string
        image_url?: string | null
        public_page_url: string
    }
}

export type UseMyBooksResult = {
    keyword: string
    setKeyword: (value: string) => void
    books: UserBook[]
    meta: PaginationMeta
    isSearching: boolean
    feedback: string | null
    updatingId: number | null
    onSearch: () => void
    onToggleVisibility: (bookId: number, nextState: boolean) => Promise<void>
    publicCount: number
    totalCount: number
    user: MyBooksViewProps['user']
}

export const countPublicBooks = (items: UserBook[]): number =>
    items.filter((book) => book.is_public).length

export const useMyBooks = (props: PageProps<MyBooksViewProps>): UseMyBooksResult => {
    const [keyword, setKeyword] = useState(props.filters.q ?? '')
    const [books, setBooks] = useState<UserBook[]>(props.books.data)
    const [meta, setMeta] = useState<PaginationMeta>(props.books.meta)
    const [isSearching, setIsSearching] = useState(false)
    const [updatingId, setUpdatingId] = useState<number | null>(null)
    const [feedback, setFeedback] = useState<string | null>(null)

    const publicCount = useMemo(() => countPublicBooks(books), [books])

    const onSearch = useCallback(() => {
        setIsSearching(true)
        setFeedback(null)
        router.get(route('me.books'), { q: keyword }, {
            preserveState: true,
            replace: true,
            onSuccess: (page) => {
                const nextProps = page.props as unknown as PageProps<MyBooksViewProps>
                setBooks(nextProps.books.data)
                setMeta(nextProps.books.meta)
            },
            onFinish: () => setIsSearching(false),
        })
    }, [keyword])

    const onToggleVisibility = useCallback(async (bookId: number, nextState: boolean) => {
        setUpdatingId(bookId)
        setFeedback(null)
        try {
            const { data } = await axios.patch(route('user-books.visibility', bookId), { is_public: nextState })
            setBooks((prev) => prev.map((item) => (item.id === bookId ? { ...item, is_public: data.is_public } : item)))
            setFeedback(nextState ? '公開にしました。' : '非公開にしました。')
        } catch (error) {
            setFeedback('公開設定の更新に失敗しました。')
        } finally {
            setUpdatingId(null)
        }
    }, [])

    return {
        keyword,
        setKeyword,
        books,
        meta,
        isSearching,
        feedback,
        updatingId,
        onSearch,
        onToggleVisibility,
        publicCount,
        totalCount: meta.total,
        user: props.user,
    }
}
