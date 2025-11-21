import type { ChangeEventHandler } from 'react'

export type TextFieldProps = {
    id: string
    label: string
    type?: 'text' | 'email' | 'password'
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
    error?: string
}

export const TextField = ({ id, label, type = 'text', value, onChange, error }: TextFieldProps) => (
    <label className="block">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            className={`mt-1 w-full rounded-lg border px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-slate-500 ${error ? 'border-red-500' : 'border-slate-300'}`}
            autoComplete={type === 'password' ? 'current-password' : 'email'}
        />
        {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </label>
)
