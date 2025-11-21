import type { Book } from '~/types/books'

type Props = {
    book: Book
    disabled: boolean
    onRegister: () => void
}

export const CandidateCard = ({ book, disabled, onRegister }: Props) => {
    return (
        <article className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            {book.image_url ? (
                <img src={book.image_url} alt={book.title} className="h-24 w-16 rounded object-cover" loading="lazy" />
            ) : (
                <div className="flex h-24 w-16 items-center justify-center rounded bg-slate-100 text-xs text-slate-500">No Image</div>
            )}
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900">{book.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{book.author ?? '著者情報なし'}</p>
                <p className="text-xs text-slate-500">ISBN {book.isbn13}</p>
                <button
                    type="button"
                    onClick={onRegister}
                    disabled={disabled}
                    className="mt-3 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-300"
                >
                    {disabled ? '記録中…' : 'この本を読んだ'}
                </button>
            </div>
        </article>
    )
}
