import type { UserBook } from '~/types/books'

type Props = {
    userBook: UserBook
}

export const BookCard = ({ userBook }: Props) => {
    const book = userBook.book
    return (
        <article className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
            {book.image_url ? (
                <img src={book.image_url} alt={book.title} className="h-48 w-full rounded-lg object-cover" loading="lazy" />
            ) : (
                <div className="flex h-48 w-full items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-500">No Image</div>
            )}
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{book.title}</h3>
            <p className="text-sm text-slate-600">{book.author ?? '著者情報なし'}</p>
        </article>
    )
}
