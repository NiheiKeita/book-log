import { useMemo } from 'react'
import { router } from '@inertiajs/react'
import type { PageProps } from '~/types'

export type TopViewProps = {
    googleLoginUrl: string
    emailLoginUrl: string
    registerUrl: string
}

export type Feature = {
    title: string
    description: string
}

export type UseTopViewResult = {
    features: Feature[]
    loginLabel: string
    onPrimaryAction: () => void
    onEmailLogin: () => void
    onRegister: () => void
    isLoggedIn: boolean
    authError: string | null
}

export const formatHeroMessage = (isLoggedIn: boolean): string => {
    return isLoggedIn ? '登録済みの技術書を管理しましょう' : 'Googleアカウントで数秒ではじめられます'
}

export const useTopView = (props: PageProps<TopViewProps>): UseTopViewResult => {
    const isLoggedIn = Boolean(props.auth?.user)

    const features = useMemo<Feature[]>(() => ([
        { title: 'ISBN13からワンクリック登録', description: 'openBD・Google Books APIから書籍情報を自動取得します。' },
        { title: 'マイ検索', description: '登録済みの技術書をタイトル・著者・ISBNで瞬時に検索できます。' },
        { title: '公開プロフィール', description: '公開設定した本のみをシェアできる専用URLを自動発行。' },
    ]), [])

    return {
        features,
        isLoggedIn,
        loginLabel: isLoggedIn ? 'マイページへ' : 'Googleでログイン',
        authError: props.flash?.authError ?? null,
        onPrimaryAction: () => {
            if (isLoggedIn) {
                router.visit(route('me.books'))
                return
            }
            window.location.href = props.googleLoginUrl
        },
        onEmailLogin: () => {
            router.visit(props.emailLoginUrl)
            if (typeof window !== 'undefined') {
                window.location.href = props.emailLoginUrl
            }
        },
        onRegister: () => {
            router.visit(props.registerUrl)
            if (typeof window !== 'undefined') {
                window.location.href = props.registerUrl
            }
        },
    }
}
