import type { Meta, StoryObj } from '@storybook/react'
import { BookRegisterView } from '.'

const meta: Meta<typeof BookRegisterView> = {
    title: 'views/BookRegisterView',
    component: BookRegisterView,
    parameters: {
        layout: 'fullscreen',
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        prefillIsbn: '9781234567890',
        auth: { user: { id: 1, name: 'Sample', email: 'sample@example.com', email_verified_at: '2024-01-01', image_url: null } },
    },
}
