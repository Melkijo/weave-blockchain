///<reference types="vitest" />
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        reactRefresh({
            excludeExports: ['mapStateToProps', 'mapDispatchToProps']
        })
    ],
    test: {
        global: true,
        environment: 'jsdom',
        setupFiles: "./tests/setup"
    }
})
