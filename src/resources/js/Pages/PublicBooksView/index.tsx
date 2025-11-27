import type { PageProps } from '~/types'
import { BookCard } from './components/BookCard'
import type { PublicBooksViewProps } from './hooks'
import { usePublicBooks } from './hooks'

export const PublicBooksView = (props: PageProps<PublicBooksViewProps>) => {
    const { books, owner, summary } = usePublicBooks(props)

    return (
        <main className="min-h-screen bg-[#f5f5f5] px-4 py-10 text-slate-900">
            <div className="mx-auto max-w-5xl space-y-8">
                <header className="rounded-xl border border-amber-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        {owner.image_url ? (
                            <img src={owner.image_url} alt={owner.name} className="h-16 w-16 rounded-full object-cover" />
                        ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-xl font-semibold text-amber-700">
                                {owner.name.slice(0, 1)}
                            </div>
                        )}
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-amber-600">Public Shelf</p>
                            <h1 className="text-3xl font-bold text-slate-900">{owner.name}の公開本棚</h1>
                            <p className="text-sm text-slate-600">{summary}</p>
                        </div>
                    </div>
                </header>
                {books.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">まだ公開中の本がありません。</p>
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
