import type { FormEvent } from 'react'
import type { PageProps } from '~/types'
import { BookPreviewCard } from './components/BookPreviewCard'
import type { BookRegisterViewProps } from './hooks'
import { useBookRegister } from './hooks'

export const BookRegisterView = (props: PageProps<BookRegisterViewProps>) => {
    const { isbn, handleIsbnChange, handleSearch, handleRegister, book, isSearching, isRegistering, canSearch, message, error } = useBookRegister(props)

    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        void handleSearch()
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-3xl space-y-8">
                <header>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">STEP 1</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">ISBN13から技術書を登録</h1>
                    <p className="mt-2 text-slate-600">13桁のISBNコードを入力すると書籍情報が自動取得されます。</p>
                </header>
                <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 shadow">
                    <label htmlFor="isbn" className="text-sm font-medium text-slate-700">
                        ISBN13
                    </label>
                    <div className="mt-2 flex gap-3">
                        <input
                            id="isbn"
                            name="isbn"
                            type="text"
                            value={isbn}
                            onChange={(event) => handleIsbnChange(event.target.value)}
                            placeholder="978から始まる13桁のコード"
                            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-lg tracking-[0.3em] placeholder:text-slate-400 focus:border-slate-500 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="rounded-lg bg-slate-900 px-6 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                            disabled={!canSearch || isSearching}
                        >
                            {isSearching ? '検索中…' : '検索'}
                        </button>
                    </div>
                    {!canSearch && (
                        <p className="mt-2 text-sm text-slate-500">半角数字13桁で入力してください。</p>
                    )}
                    {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
                    {message && !book && <p className="mt-3 text-sm text-emerald-600">{message}</p>}
                </form>
                {book && (
                    <BookPreviewCard
                        book={book}
                        message={message}
                        isRegistering={isRegistering}
                        onRegister={() => void handleRegister()}
                    />
                )}
            </div>
        </main>
    )
}

export default BookRegisterView
