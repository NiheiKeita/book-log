import type { Meta, StoryObj } from '@storybook/react'
import { RegisterView } from '.'

const meta: Meta<typeof RegisterView> = {
    title: 'views/RegisterView',
    component: RegisterView,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        loginUrl: '#',
        auth: { user: null },
    },
}
