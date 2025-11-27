import type { PageProps } from '~/types'
import type { TopViewProps } from './hooks'
import { formatHeroMessage, useTopView } from './hooks'
import { HeroCard } from './components/HeroCard'
import { FeatureCard } from './components/FeatureCard'

export const TopView = (props: PageProps<TopViewProps>) => {
    const { features, loginLabel, onPrimaryAction, onEmailLogin, onRegister, isLoggedIn, authError } = useTopView(props)

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-5xl space-y-10">
                {authError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                        {authError}
                    </div>
                )}
                <HeroCard
                    title="技術書のインプットを見える化"
                    message={formatHeroMessage(isLoggedIn)}
                    buttonLabel={loginLabel}
                    onClick={onPrimaryAction}
                    supportingText={<p>ISBN13を入力するだけで、openBDとGoogle Books APIからデータを取り込みます。</p>}
                />
                {!isLoggedIn && (
                    <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
                        <button
                            type="button"
                            onClick={onEmailLogin}
                            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
                        >
                            メールアドレスでログイン
                        </button>
                        <button
                            type="button"
                            onClick={onRegister}
                            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
                        >
                            メールで新規登録
                        </button>
                    </div>
                )}
                <section>
                    <h2 className="text-xl font-semibold text-slate-800">できること</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                        {features.map((feature) => (
                            <FeatureCard key={feature.title} {...feature} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default TopView
