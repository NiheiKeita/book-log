import type { PageProps } from '~/types'
import { TextField } from '../LoginView/components/TextField'
import { useRegisterView } from './hooks'

export type RegisterViewProps = {
    loginUrl: string
}

export const RegisterView = (props: PageProps<RegisterViewProps>) => {
    const { form, isDisabled, submit } = useRegisterView()

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
            <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <h1 className="text-2xl font-bold text-slate-900">メールアドレスで新規登録</h1>
                <p className="mt-2 text-sm text-slate-500">必要事項を入力してアカウントを作成してください。</p>
                <form className="mt-6 space-y-4" onSubmit={submit}>
                    <TextField
                        id="name"
                        label="名前"
                        value={form.data.name}
                        onChange={(event) => form.setData('name', event.target.value)}
                        error={form.errors.name}
                    />
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
                    <TextField
                        id="password_confirmation"
                        label="パスワード（確認）"
                        type="password"
                        value={form.data.password_confirmation}
                        onChange={(event) => form.setData('password_confirmation', event.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={isDisabled || form.processing}
                        className="w-full rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                        登録する
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-slate-500">
                    すでにアカウントをお持ちの方は{' '}
                    <a href={props.loginUrl} className="font-semibold text-slate-900 underline">
                        ログインへ戻る
                    </a>
                </p>
            </section>
        </main>
    )
}

export default RegisterView
