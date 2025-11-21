import type { UserBook } from '~/types/books'

type Props = {
    userBook: UserBook
    disabled: boolean
    onToggle: (nextState: boolean) => void
}

export const BookRow = ({ userBook, disabled, onToggle }: Props) => {
    const nextState = !userBook.is_public

    return (
        <article className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
            <div className="flex items-start gap-4">
                {userBook.book.image_url ? (
                    <img src={userBook.book.image_url} alt={userBook.book.title} className="h-24 w-16 rounded object-cover" loading="lazy" />
                ) : (
                    <div className="flex h-24 w-16 items-center justify-center rounded bg-slate-100 text-xs text-slate-500">No Image</div>
                )}
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">{userBook.book.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{userBook.book.author ?? '著者情報なし'}</p>
                    <p className="text-xs text-slate-500">ISBN {userBook.book.isbn13}</p>
                </div>
            </div>
            <div className="md:ml-auto">
                <button
                    type="button"
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${userBook.is_public ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} disabled:cursor-not-allowed disabled:opacity-60`}
                    onClick={() => onToggle(nextState)}
                    disabled={disabled}
                >
                    {userBook.is_public ? '公開中' : '非公開'}
                </button>
            </div>
        </article>
    )
}
