import type { UserBook } from '~/types/books'

type Props = {
    books: UserBook[]
}

const pastelGradients = [
    'from-[#ffe6f3] via-[#ffd6e8] to-[#ffcce0]',
    'from-[#fef3d7] via-[#ffe7bd] to-[#ffd79a]',
    'from-[#e6f7ff] via-[#d8f0ff] to-[#c3e4ff]',
    'from-[#e9ffe9] via-[#d1f7d6] to-[#c0f0c6]',
    'from-[#f2ebff] via-[#e0d4ff] to-[#cfbcff]',
    'from-[#fff0e1] via-[#ffd9bf] to-[#ffc499]',
]

export const BookShelf = ({ books }: Props) => (
    <div className="relative overflow-hidden rounded-2xl border border-amber-100/80 bg-gradient-to-b from-[#fff8f1] via-[#ffebcf] to-[#f7d6ac] p-4 shadow-inner backdrop-blur sm:rounded-3xl sm:border-amber-200 sm:bg-[radial-gradient(circle_at_25%_18%,#fffaf3,#ffe4ba_42%,#f1cfa6_78%),linear-gradient(to_bottom,#ffedd5,#f6c38d)] sm:p-8 sm:shadow-[0_24px_50px_rgba(134,74,20,0.22)]">
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.85),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.6),transparent_38%),repeating-linear-gradient(90deg,rgba(120,53,15,0.06),rgba(120,53,15,0.06)_6px,transparent_6px,transparent_44px)] opacity-90 sm:block"
        />
        <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-4 hidden w-4 bg-gradient-to-b from-amber-200/85 via-amber-300 to-amber-600/80 shadow-[12px_0_24px_rgba(120,53,15,0.28)] sm:block"
        />
        <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-4 hidden w-4 bg-gradient-to-b from-amber-200/85 via-amber-300 to-amber-600/80 shadow-[-12px_0_24px_rgba(120,53,15,0.28)] sm:block"
        />
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(120,53,15,0.08),rgba(120,53,15,0.08)_8px,transparent_8px,transparent_46px)] opacity-70"
        />
        <div
            aria-hidden
            className="pointer-events-none absolute inset-x-8 bottom-12 hidden h-5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 shadow-[0_14px_30px_rgba(120,53,15,0.38)] sm:block"
        />
        <div
            aria-hidden
            className="pointer-events-none absolute inset-x-1 bottom-0 hidden h-10 rounded-b-3xl bg-gradient-to-b from-amber-400/95 via-amber-500 to-amber-700 shadow-[0_-16px_32px_rgba(120,53,15,0.35)] sm:block"
        />
        <div className="relative grid grid-cols-2 gap-5 sm:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] sm:gap-6">
            {books.map((userBook, index) => {
                const gradient = pastelGradients[index % pastelGradients.length]
                const number = index + 1
                const book = userBook.book

                return (
                    <div
                        key={userBook.id}
                        className={`group relative flex h-60 flex-col justify-between overflow-hidden rounded-[18px] border border-amber-200/80 bg-gradient-to-b ${gradient} px-3 pb-4 pt-5 text-amber-900 shadow-[0_12px_18px_rgba(120,53,15,0.2)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_18px_34px_rgba(120,53,15,0.28)] sm:h-64`}
                    >
                        <span className="absolute left-3 top-2 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                            #{number}
                        </span>
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-y-4 left-2 w-1.5 rounded-full bg-white/45 blur-[1px]"
                        />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-y-5 right-2 w-1.5 rounded-full bg-amber-900/15"
                        />
                        <div className="space-y-2.5 pt-2">
                            <div className="relative h-32 w-full overflow-hidden rounded-lg bg-white/70 shadow-inner">
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
                        <div className="bg-amber-900/12 h-1.5 w-full rounded-full shadow-inner" />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-x-3 bottom-[-12px] h-6 rounded-full bg-amber-900/10 blur-lg"
                        />
                    </div>
                )
            })}
        </div>
    </div>
)
