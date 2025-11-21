import type { Meta, StoryObj } from '@storybook/react'
import { LoginView } from '.'

const meta: Meta<typeof LoginView> = {
    title: 'views/LoginView',
    component: LoginView,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        googleLoginUrl: '#',
        registerUrl: '#',
        auth: { user: null },
    },
}
