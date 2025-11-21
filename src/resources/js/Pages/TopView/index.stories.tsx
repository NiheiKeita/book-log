import type { Meta, StoryObj } from '@storybook/react'
import { TopView } from '.'

const meta: Meta<typeof TopView> = {
    title: 'views/TopView',
    component: TopView,
    parameters: {
        layout: 'fullscreen',
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        loginUrl: '#',
        auth: { user: null },
        flash: {},
    },
}
