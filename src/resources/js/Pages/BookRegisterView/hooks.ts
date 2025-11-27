import axios from 'axios'
import { route } from 'ziggy-js'
import { useCallback, useMemo, useState } from 'react'
import type { Book } from '~/types/books'

export type BookRegisterViewProps = {
    prefillIsbn?: string | null
}

type Status = 'idle' | 'searching' | 'registering'

export type UseBookRegisterResult = {
    isbn: string
    book: Book | null
    isSearching: boolean
    isRegistering: boolean
    message: string | null
    error: string | null
    canSearch: boolean
    handleIsbnChange: (value: string) => void
    handleSearch: () => Promise<void>
    handleRegister: () => Promise<void>
}

export const sanitizeIsbn = (value: string): string => value.replace(/[^0-9]/g, '').slice(0, 13)

export const isIsbnComplete = (value: string): boolean => sanitizeIsbn(value).length === 13

export const useBookRegister = (props: BookRegisterViewProps): UseBookRegisterResult => {
    const [isbn, setIsbn] = useState(() => sanitizeIsbn(props.prefillIsbn ?? ''))
    const [book, setBook] = useState<Book | null>(null)
    const [status, setStatus] = useState<Status>('idle')
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const canSearch = useMemo(() => isIsbnComplete(isbn), [isbn])

    const handleIsbnChange = useCallback((value: string) => {
        setIsbn(sanitizeIsbn(value))
    }, [])

    const handleSearch = useCallback(async () => {
        if (!canSearch) {
            setError('ISBN13は13桁で入力してください。')
            return
        }
        setStatus('searching')
        setError(null)
        setMessage(null)
        try {
            const { data } = await axios.post<{ book: Book }>(route('books.search'), { isbn13: isbn })
            setBook(data.book)
            setMessage('書籍情報を取得しました。')
        } catch (err) {
            setBook(null)
            setError('書籍情報の取得に失敗しました。ISBNをご確認ください。')
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setError(err.response.data.message as string)
            }
        } finally {
            setStatus('idle')
        }
    }, [canSearch, isbn])

    const handleRegister = useCallback(async () => {
        if (!book) {
            return
        }
        setStatus('registering')
        setError(null)
        try {
            const { data } = await axios.post(route('user-books.store'), { book_id: book.id })
            setMessage(data.message ?? '登録しました。')
        } catch (err) {
            setError('登録に失敗しました。時間をおいて再度お試しください。')
        } finally {
            setStatus('idle')
        }
    }, [book])

    return {
        isbn,
        book,
        isSearching: status === 'searching',
        isRegistering: status === 'registering',
        message,
        error,
        canSearch,
        handleIsbnChange,
        handleSearch,
        handleRegister,
    }
}
