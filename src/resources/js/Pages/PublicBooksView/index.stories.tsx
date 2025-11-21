import type { Meta, StoryObj } from '@storybook/react'
import { PublicBooksView } from '.'

const meta: Meta<typeof PublicBooksView> = {
    title: 'views/PublicBooksView',
    component: PublicBooksView,
    parameters: {
        layout: 'fullscreen',
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        owner: { id: 1, name: 'Public User', image_url: null },
        books: [
            { id: 1, is_public: true, book: { id: 1, isbn13: '978', title: '公開本', author: '著者A', image_url: null } },
        ],
        auth: { user: null },
    },
}
