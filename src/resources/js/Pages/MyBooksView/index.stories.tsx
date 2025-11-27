import type { Meta, StoryObj } from '@storybook/react'
import { MyBooksView } from '.'

const meta: Meta<typeof MyBooksView> = {
    title: 'views/MyBooksView',
    component: MyBooksView,
    parameters: {
        layout: 'fullscreen',
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        auth: { user: { id: 1, name: 'Story User', email: 'story@example.com', email_verified_at: '2024-01-01', image_url: null } },
        books: {
            data: [
                {
                    id: 1,
                    is_public: true,
                    book: { id: 1, isbn13: '9780000000000', title: 'Storybook Driven', author: 'Jane Doe', image_url: null },
                },
            ],
            meta: { current_page: 1, last_page: 1, per_page: 20, total: 1 },
        },
        filters: { q: '' },
        user: { name: 'Story User', image_url: null, public_page_url: '#' },
    },
}
