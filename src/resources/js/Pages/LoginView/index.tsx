import type { PageProps } from '~/types'
import { TextField } from './components/TextField'
import { LoginViewProps, useLoginView } from './hooks'

export const LoginView = (props: PageProps<LoginViewProps>) => {
    const { form, submit, isDisabled } = useLoginView()

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
            <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <h1 className="text-2xl font-bold text-slate-900">メールアドレスでログイン</h1>
                <p className="mt-2 text-sm text-slate-500">Googleログインを使えない場合はこちらからサインインしてください。</p>
                {props.status && <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{props.status}</p>}
                <form className="mt-6 space-y-4" onSubmit={submit}>
                    <TextField
                        id="email"
                        label="メールアドレス"
                        type="email"
                        value={form.data.email}
                        onChange={(event) => form.setData('email', event.target.value)}
                        error={form.errors.email}
                    />
                    <TextField
                        id="password"
                        label="パスワード"
                        type="password"
                        value={form.data.password}
                        onChange={(event) => form.setData('password', event.target.value)}
                        error={form.errors.password}
                    />
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input
                            type="checkbox"
                            checked={form.data.remember}
                            onChange={(event) => form.setData('remember', event.target.checked)}
                            className="h-4 w-4 rounded border-slate-300"
                        />
                        ログイン状態を保持する
                    </label>
                    <button
                        type="submit"
                        disabled={isDisabled || form.processing}
                        className="w-full rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                        ログイン
                    </button>
                </form>
                <div className="mt-8 space-y-3 text-center">
                    <p className="text-sm text-slate-500">または</p>
                    <a
                        href={props.googleLoginUrl}
                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Googleでログイン
                    </a>
                    <p className="text-xs text-slate-500">
                        まだアカウントをお持ちでない場合は{' '}
                        <a href={props.registerUrl} className="font-semibold text-slate-900 underline">
                            新規登録ページ
                        </a>{' '}
                        から作成してください。
                    </p>
                </div>
            </section>
        </main>
    )
}

export default LoginView
