import type { PageProps } from '~/types'
import { BookCard } from './components/BookCard'
import type { PublicBooksViewProps } from './hooks'
import { usePublicBooks } from './hooks'

export const PublicBooksView = (props: PageProps<PublicBooksViewProps>) => {
    const { books, owner, summary } = usePublicBooks(props)

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 py-12 text-white">
            <div className="mx-auto max-w-5xl space-y-10">
                <header className="rounded-2xl bg-white/10 p-8 shadow-lg backdrop-blur">
                    <div className="flex items-center gap-4">
                        {owner.image_url ? (
                            <img src={owner.image_url} alt={owner.name} className="h-16 w-16 rounded-full object-cover" />
                        ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-xl font-semibold">
                                {owner.name.slice(0, 1)}
                            </div>
                        )}
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Public Shelf</p>
                            <h1 className="text-3xl font-bold">{owner.name}の公開本棚</h1>
                            <p className="text-slate-200">{summary}</p>
                        </div>
                    </div>
                </header>
                {books.length === 0 ? (
                    <p className="rounded-2xl bg-white/10 p-8 text-center text-slate-200">まだ公開中の本がありません。</p>
                ) : (
                    <section className="grid gap-6 md:grid-cols-3">
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
