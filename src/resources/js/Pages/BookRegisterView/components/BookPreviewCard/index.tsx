import type { Book } from '~/types/books'

type Props = {
    book: Book
    isRegistering: boolean
    onRegister: () => void
    message?: string | null
}

export const BookPreviewCard = ({ book, isRegistering, onRegister, message }: Props) => {
    return (
        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row">
                {book.image_url ? (
                    <img src={book.image_url} alt={book.title} className="h-48 w-36 rounded-lg object-cover" loading="lazy" />
                ) : (
                    <div className="flex h-48 w-36 items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-500">
                        No Image
                    </div>
                )}
                <div className="flex-1">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Preview</p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-900">{book.title}</h3>
                    <dl className="mt-4 space-y-1 text-sm text-slate-600">
                        <div>
                            <dt className="inline text-slate-500">著者：</dt>
                            <dd className="inline">{book.author ?? '不明'}</dd>
                        </div>
                        <div>
                            <dt className="inline text-slate-500">出版社：</dt>
                            <dd className="inline">{book.publisher ?? '不明'}</dd>
                        </div>
                        <div>
                            <dt className="inline text-slate-500">出版年：</dt>
                            <dd className="inline">{book.published_year ?? '不明'}</dd>
                        </div>
                        <div>
                            <dt className="inline text-slate-500">ISBN：</dt>
                            <dd className="inline">{book.isbn13}</dd>
                        </div>
                    </dl>
                    <button
                        type="button"
                        className="mt-6 rounded-full bg-slate-900 px-6 py-3 text-white shadow hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                        onClick={onRegister}
                        disabled={isRegistering}
                    >
                        {isRegistering ? '登録中…' : 'この本を登録する'}
                    </button>
                    {message && <p className="mt-3 text-sm text-emerald-600">{message}</p>}
                </div>
            </div>
        </section>
    )
}
