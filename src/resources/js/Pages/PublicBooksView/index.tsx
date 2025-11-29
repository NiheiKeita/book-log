import type { ChangeEvent } from 'react'
import type { PageProps } from '~/types'
import { BookCard } from './components/BookCard'
import { BookShelf } from './components/BookShelf'
import type { PublicBooksViewProps, PublicBooksViewStyle } from './hooks'
import { usePublicBooks } from './hooks'

export const PublicBooksView = (props: PageProps<PublicBooksViewProps>) => {
    const { books, owner, summary, viewStyle, setViewStyle, shelfRows } = usePublicBooks(props)

    const handleViewChange = (event: ChangeEvent<HTMLSelectElement>) =>
        setViewStyle(event.target.value as PublicBooksViewStyle)

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#fff9f0] via-[#fff3e4] to-[#ffe3c2] px-2 py-10 text-slate-900 sm:px-4">
            <div className="mx-auto w-full max-w-5xl space-y-8">
                <header className="rounded-2xl border border-amber-200/80 bg-white/80 p-6 shadow-md backdrop-blur">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                        <div className="flex items-center gap-4">
                            {owner.image_url ? (
                                <img src={owner.image_url} alt={owner.name} className="h-16 w-16 rounded-full object-cover" />
                            ) : (
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-xl font-semibold text-amber-700">
                                    {owner.name.slice(0, 1)}
                                </div>
                            )}
                            <div>
                                <p className="text-xs uppercase tracking-[0.35em] text-amber-600">Public Shelf</p>
                                <h1 className="text-3xl font-bold text-slate-900">{owner.name}の本棚</h1>
                                <p className="text-sm text-slate-600">{summary}</p>
                            </div>
                        </div>
                        <div className="ml-auto flex items-center gap-3 rounded-full border border-amber-200 bg-white/80 px-4 py-2 shadow-sm">
                            <div className="text-sm font-semibold text-amber-800">表示スタイル</div>
                            <label className="relative">
                                <select
                                    value={viewStyle}
                                    onChange={handleViewChange}
                                    className="appearance-none rounded-full border border-amber-200 bg-white px-4 py-2 pr-10 text-sm font-semibold text-amber-800 shadow-inner transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                                >
                                    <option value="shelf">木の本棚ビュー</option>
                                    <option value="cards">シンプルカード</option>
                                </select>
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-amber-500">▼</span>
                            </label>
                        </div>
                    </div>
                </header>
                {books.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-500 shadow-sm">
                        まだ公開中の本がありません。
                    </p>
                ) : viewStyle === 'shelf' ? (
                    <section className="space-y-4 rounded-2xl border border-amber-100/70 bg-white/60 p-3 shadow-inner backdrop-blur sm:p-4">
                        <BookShelf rows={shelfRows} />
                    </section>
                ) : (
                    <section className="space-y-4">
                        {books.map((userBook) => (
                            <BookCard key={userBook.id} userBook={userBook} />
                        ))}
                    </section>
                )}
            </div>
        </main>
    )
}

export default PublicBooksView
