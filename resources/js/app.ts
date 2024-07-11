import './bootstrap'
import '../css/app.css'

import { createApp, h, DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { ZiggyVue } from '../../vendor/tightenco/ziggy'
import { createI18n } from 'vue-i18n'
import Messages from './lang'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

if (localStorage.getItem('color-theme') === 'dark') {
    document.documentElement.classList.add('dark')
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob<DefineComponent>('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(
                createI18n({
                    locale: props.initialPage.props.locale,
                    messages: Messages,
                }),
            )
            .use(ZiggyVue)
            .mount(el)
            .$nextTick(() => {
                if (el instanceof HTMLElement) {
                    delete el.dataset.page
                }
            })
    },
    progress: {
        color: '#4B5563',
    },
})
