import { FormEvent, useMemo } from 'react'
import { useForm } from '@inertiajs/react'
import { route } from 'ziggy-js'

export const canSubmit = (name: string, email: string, password: string, confirmation: string): boolean => {
    return name.trim().length > 0 && email.trim().length > 0 && password.length >= 8 && password === confirmation
}

export const useRegisterView = () => {
    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const isDisabled = useMemo(
        () => !canSubmit(form.data.name, form.data.email, form.data.password, form.data.password_confirmation),
        [form.data.name, form.data.email, form.data.password, form.data.password_confirmation],
    )

    const submit = (event: FormEvent) => {
        event.preventDefault()
        form.post(route('register'), {
            onFinish: () => form.reset('password', 'password_confirmation'),
        })
    }

    return {
        form,
        isDisabled,
        submit,
    }
}
