import { useCallback, useMemo, useState } from 'react'
import { router } from '@inertiajs/react'
import axios from 'axios'
import { route } from 'ziggy-js'
import type { PageProps } from '~/types'
import type { Book, PaginationMeta, UserBook } from '~/types/books'

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
    candidates?: Book[]
}

export type UseMyBooksResult = {
    keyword: string
    setKeyword: (value: string) => void
    books: UserBook[]
    meta: PaginationMeta
    isSearching: boolean
    isRegistering: boolean
    feedback: string | null
    removingId: number | null
    onSearch: () => void
    onRemove: (bookId: number) => Promise<void>
    canRegisterFromIsbn: boolean
    registerFromIsbn: () => Promise<void>
    candidates: Book[]
    registerCandidate: (book: Book) => Promise<void>
    registeringBookId: number | null
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
    const [isRegistering, setIsRegistering] = useState(false)
    const [removingId, setRemovingId] = useState<number | null>(null)
    const [feedback, setFeedback] = useState<string | null>(null)
    const [candidates, setCandidates] = useState<Book[]>(props.candidates ?? [])
    const [registeringBookId, setRegisteringBookId] = useState<number | null>(null)

    const publicCount = useMemo(() => countPublicBooks(books), [books])
    const isbnCandidate = useMemo(() => {
        const digits = keyword.replace(/[^0-9]/g, '')
        return digits.length === 13 ? digits : null
    }, [keyword])
    const canRegisterFromIsbn = Boolean(isbnCandidate)

    const refreshBooks = useCallback((query: string, onFinish?: () => void) => {
        setIsSearching(true)
        router.get(route('me.books'), { q: query }, {
            preserveState: true,
            replace: true,
            onSuccess: (page) => {
                const nextProps = page.props as unknown as PageProps<MyBooksViewProps>
                setBooks(nextProps.books.data)
                setMeta(nextProps.books.meta)
                setCandidates(nextProps.candidates ?? [])
            },
            onFinish: () => {
                setIsSearching(false)
                onFinish?.()
            },
        })
    }, [])

    const onSearch = useCallback(() => {
        setFeedback(null)
        refreshBooks(keyword)
    }, [keyword, refreshBooks])

    const onRemove = useCallback(async (bookId: number) => {
        setRemovingId(bookId)
        setFeedback(null)
        try {
            await axios.delete(route('user-books.destroy', bookId))
            setBooks((prev) => prev.filter((item) => item.id !== bookId))
            setMeta((prev) => ({
                ...prev,
                total: Math.max(prev.total - 1, 0),
            }))
            setFeedback('登録を解除しました。')
        } catch (error) {
            setFeedback('登録の解除に失敗しました。')
        } finally {
            setRemovingId(null)
        }
    }, [])

    const appendUserBook = useCallback((book: Book, userBookId: number) => {
        setBooks((prev) => [
            {
                id: userBookId,
                is_public: false,
                book,
            },
            ...prev,
        ])
        setMeta((prev) => ({
            ...prev,
            total: prev.total + 1,
        }))
    }, [])

    const registerFromIsbn = useCallback(async () => {
        if (!isbnCandidate) {
            return
        }
        setIsRegistering(true)
        setFeedback(null)
        try {
            const { data } = await axios.post(route('books.search'), { isbn13: isbnCandidate })
            const registerResponse = await axios.post(route('user-books.store'), { book_id: data.book.id })
            setFeedback(registerResponse.data?.message ?? '登録しました。')
            if (registerResponse.data?.book && registerResponse.data?.userBookId) {
                appendUserBook(registerResponse.data.book, registerResponse.data.userBookId)
            }
            refreshBooks(keyword, () => setIsRegistering(false))
        } catch (error) {
            setIsRegistering(false)
            if (axios.isAxiosError(error)) {
                setFeedback(error.response?.data?.message ?? 'ISBN登録に失敗しました。')
                return
            }
            setFeedback('ISBN登録に失敗しました。')
        }
    }, [isbnCandidate, keyword, refreshBooks, appendUserBook])

    const registerCandidate = useCallback(async (book: Book) => {
        setRegisteringBookId(book.id)
        setFeedback(null)
        try {
            const registerResponse = await axios.post(route('user-books.store'), { book_id: book.id })
            setFeedback(registerResponse.data?.message ?? '登録しました。')
            if (registerResponse.data?.userBookId) {
                appendUserBook(book, registerResponse.data.userBookId)
            }
            refreshBooks(keyword, () => setRegisteringBookId(null))
        } catch (error) {
            setRegisteringBookId(null)
            if (axios.isAxiosError(error)) {
                setFeedback(error.response?.data?.message ?? '登録に失敗しました。')
                return
            }
            setFeedback('登録に失敗しました。')
        }
    }, [keyword, refreshBooks, appendUserBook])

    return {
        keyword,
        setKeyword,
        books,
        meta,
        isSearching,
        isRegistering,
        feedback,
        removingId,
        onSearch,
        onRemove,
        canRegisterFromIsbn,
        registerFromIsbn,
        candidates,
        registerCandidate,
        registeringBookId,
        publicCount,
        totalCount: meta.total,
        user: props.user,
    }
}
