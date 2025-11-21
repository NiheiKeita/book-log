import type { FormEvent } from 'react'
import type { PageProps } from '~/types'
import { BookRow } from './components/BookRow'
import { CandidateCard } from './components/CandidateCard'
import type { MyBooksViewProps } from './hooks'
import { useMyBooks } from './hooks'

export const MyBooksView = (props: PageProps<MyBooksViewProps>) => {
    const {
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
        totalCount,
        user,
    } = useMyBooks(props)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        onSearch()
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-5xl space-y-8">
                <header className="rounded-2xl bg-white p-6 shadow">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <div className="flex items-center gap-4">
                            {user.image_url ? (
                                <img src={user.image_url} alt={user.name} className="h-16 w-16 rounded-full object-cover" />
                            ) : (
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                                    {user.name.slice(0, 1)}
                                </div>
                            )}
                            <div>
                                <p className="text-sm text-slate-500">マイページ</p>
                                <h1 className="text-2xl font-bold text-slate-900">{user.name}さんの読書ログ</h1>
                                <p className="text-sm text-slate-600">
                                    公開 {publicCount} / 登録 {totalCount} 冊
                                </p>
                            </div>
                        </div>
                        <a
                            href={user.public_page_url}
                            className="ml-auto inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                        >
                            公開ページを表示
                        </a>
                    </div>
                </header>

                <section className="rounded-2xl bg-white p-6 shadow">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:flex-row">
                        <input
                            type="search"
                            value={keyword}
                            onChange={(event) => setKeyword(event.target.value)}
                            placeholder="タイトル・著者・ISBNで検索"
                            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-base focus:border-slate-500 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="rounded-lg bg-slate-900 px-6 py-2 font-semibold text-white hover:bg-slate-700"
                            disabled={isSearching}
                        >
                            {isSearching ? '検索中…' : '検索'}
                        </button>
                    </form>
                    {canRegisterFromIsbn && (
                        <div className="mt-3 flex flex-col gap-2 rounded-lg border border-dashed border-slate-300 p-3 text-sm text-slate-600 md:flex-row md:items-center">
                            <span>ISBN13 として認識しました。この本を読んだ履歴として追加しますか？</span>
                            <button
                                type="button"
                                onClick={() => void registerFromIsbn()}
                                className="rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-300"
                                disabled={isRegistering}
                            >
                                {isRegistering ? '記録中…' : 'この本を読んだ'}
                            </button>
                        </div>
                    )}
                    {feedback && <p className="mt-3 text-sm text-slate-600">{feedback}</p>}
                    <p className="mt-4 text-sm text-slate-500">登録冊数: {meta.total} / ページ {meta.current_page}</p>
                </section>

                {candidates.length > 0 && (
                    <section className="space-y-4 rounded-2xl bg-white p-6 shadow">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-900">候補</h2>
                            <p className="text-xs text-slate-500">既に取得済みの書籍から表示しています</p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            {candidates.map((book) => (
                                <CandidateCard
                                    key={book.id}
                                    book={book}
                                    disabled={registeringBookId === book.id}
                                    onRegister={() => void registerCandidate(book)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                <section className="space-y-4">
                    {books.length === 0 ? (
                        <p className="rounded-xl bg-white p-6 text-center text-slate-500 shadow">まだ本が登録されていません。</p>
                    ) : (
                        books.map((userBook) => (
                            <BookRow
                                key={userBook.id}
                                userBook={userBook}
                                disabled={removingId === userBook.id}
                                onRemove={() => onRemove(userBook.id)}
                            />
                        ))
                    )}
                </section>
            </div>
        </main>
    )
}

export default MyBooksView
