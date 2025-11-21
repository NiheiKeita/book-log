import type { UserBook } from '~/types/books'

type Props = {
    userBook: UserBook
}

export const BookCard = ({ userBook }: Props) => {
    const book = userBook.book
    return (
        <article className="flex gap-4 rounded-xl border border-amber-200 bg-white p-4 shadow-sm">
            {book.image_url ? (
                <img
                    src={book.image_url}
                    alt={book.title}
                    className="h-28 w-20 flex-shrink-0 rounded bg-white object-contain"
                    loading="lazy"
                />
            ) : (
                <div className="flex h-28 w-20 flex-shrink-0 items-center justify-center rounded bg-slate-100 text-xs text-slate-500">
                    No Image
                </div>
            )}
            <div className="flex-1">
                <h3 className="text-base font-semibold text-slate-900">{book.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{book.author ?? '著者情報なし'}</p>
                <p className="text-xs text-slate-500">ISBN {book.isbn13}</p>
            </div>
        </article>
    )
}
