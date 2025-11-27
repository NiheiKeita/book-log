import './bootstrap'
import '../css/app.css'

import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

const appPages = import.meta.glob('./app/**/*.tsx')
const viewPages = import.meta.glob('./views/**/index.tsx')
const legacyPages = import.meta.glob('./Pages/**/*.tsx')

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
    // title: (title) => `${title} - ${appName}`,
    title: (title) => `${title} ${appName}`,
    resolve: (name) => {
        if (name.startsWith('views/')) {
            const viewPath = `./${name}/index.tsx`
            if (viewPages[viewPath]) {
                return resolvePageComponent(viewPath, viewPages)
            }

            const legacyName = name.replace(/^views\//, '')
            return resolvePageComponent(`./Pages/${legacyName}/index.tsx`, legacyPages)
        }

        const appPath = `./app/${name}.tsx`
        if (appPages[appPath]) {
            return resolvePageComponent(appPath, appPages)
        }

        return resolvePageComponent(`./Pages/${name}/index.tsx`, legacyPages)
    },
    setup({ el, App, props }) {
        const root = createRoot(el)

        root.render(<App {...props} />)
    },
    progress: {
        color: '#4B5563',
    },
})
