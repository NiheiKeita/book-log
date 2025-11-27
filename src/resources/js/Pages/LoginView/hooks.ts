import { FormEvent, useMemo } from 'react'
import { useForm } from '@inertiajs/react'
import { route } from 'ziggy-js'

export type LoginViewProps = {
    status?: string | null
    googleLoginUrl: string
    registerUrl: string
}

export const canSubmit = (email: string, password: string): boolean => {
    return email.trim().length > 0 && password.trim().length >= 8
}

export const useLoginView = () => {
    const form = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const isDisabled = useMemo(() => !canSubmit(form.data.email, form.data.password), [form.data.email, form.data.password])

    const submit = (event: FormEvent) => {
        event.preventDefault()
        form.post(route('login'), {
            onFinish: () => form.reset('password'),
        })
    }

    return {
        form,
        submit,
        isDisabled,
    }
}
