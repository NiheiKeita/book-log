import { SHELF_ROW_SIZE } from '../../hooks'
import type { UserBook } from '~/types/books'

type Props = {
    rows: UserBook[][]
}

const pastelGradients = [
    'from-[#ffe6f3] via-[#ffd6e8] to-[#ffcce0]',
    'from-[#fef3d7] via-[#ffe7bd] to-[#ffd79a]',
    'from-[#e6f7ff] via-[#d8f0ff] to-[#c3e4ff]',
    'from-[#e9ffe9] via-[#d1f7d6] to-[#c0f0c6]',
    'from-[#f2ebff] via-[#e0d4ff] to-[#cfbcff]',
    'from-[#fff0e1] via-[#ffd9bf] to-[#ffc499]',
]

export const BookShelf = ({ rows }: Props) => (
    <div className="space-y-6">
        {rows.map((row, rowIndex) => (
            <div
                key={rowIndex}
                className="relative overflow-hidden p-0 sm:rounded-2xl sm:border sm:border-amber-100 sm:bg-gradient-to-b sm:from-[#fff8ed] sm:via-[#fff3e3] sm:to-[#ffe6cc] sm:p-5 sm:shadow-[0_16px_36px_rgba(241,163,64,0.16)]"
            >
                <div className="absolute inset-x-2 bottom-3 hidden h-3 rounded-full bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 shadow-inner sm:inset-x-4 sm:block" />
                <div className="relative flex flex-wrap items-end justify-center gap-4">
                    {row.map((userBook, index) => {
                        const gradient = pastelGradients[(rowIndex * SHELF_ROW_SIZE + index) % pastelGradients.length]
                        const number = rowIndex * SHELF_ROW_SIZE + index + 1
                        const book = userBook.book

                        return (
                            <div
                                key={userBook.id}
                                className={`group relative flex h-56 max-w-[9.5rem] basis-[48%] flex-col justify-between overflow-hidden rounded-xl border border-amber-200/70 bg-gradient-to-b ${gradient} px-3 py-4 text-amber-900 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-56 sm:w-32 sm:max-w-none sm:basis-auto`}
                            >
                                <span className="absolute left-3 top-2 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                                    #{number}
                                </span>
                                <div className="space-y-1.5 pt-2">
                                    <div className="relative h-28 w-full overflow-hidden rounded-lg bg-white/70 shadow-inner">
                                        {book.image_url ? (
                                            <img
                                                src={book.image_url}
                                                alt={book.title}
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-[11px] font-semibold text-amber-700/70">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-[13px] font-bold leading-snug text-amber-950">
                                        <span
                                            className="block overflow-hidden text-ellipsis"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                            }}
                                        >
                                            {book.title}
                                        </span>
                                    </div>
                                    <p className="truncate text-[11px] font-semibold text-amber-900/80">{book.author ?? '著者不明'}</p>
                                    <p className="truncate text-[10px] text-amber-900/70">ISBN {book.isbn13}</p>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-amber-900/10 shadow-inner" />
                                <div className="absolute inset-x-0 -bottom-3 h-3 rounded-b-2xl bg-amber-950/5 blur-[1px]" />
                            </div>
                        )
                    })}
                </div>
            </div>
        ))}
    </div>
)
