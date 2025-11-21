import type { ReactNode } from 'react'

export type HeroCardProps = {
    title: string
    message: string
    buttonLabel: string
    onClick: () => void
    supportingText?: ReactNode
}

export const HeroCard = ({ title, message, buttonLabel, onClick, supportingText }: HeroCardProps) => {
    return (
        <section className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 p-8 text-white shadow-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
                技術書読書ログ
            </p>
            <h1 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h1>
            <p className="mt-4 text-lg text-slate-200">{message}</p>
            {supportingText && <div className="mt-4 text-sm text-slate-300">{supportingText}</div>}
            <button
                type="button"
                onClick={onClick}
                className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
            >
                {buttonLabel}
            </button>
        </section>
    )
}
