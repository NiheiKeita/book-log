import type { Feature } from '../../hooks'

export const FeatureCard = ({ title, description }: Feature) => {
    return (
        <article className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
        </article>
    )
}
