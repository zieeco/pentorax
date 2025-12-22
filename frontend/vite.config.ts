// import {defineConfig} from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
// 	plugins: [react()],
// 	optimizeDeps: {
// 		exclude: ['lucide-react'],
// 	},
// });

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		include: ['react', 'react-dom'],
		exclude: ['lucide-react'],
		force: true, // Force dependency pre-bundling
		esbuildOptions: {
			target: 'esnext',
		},
	},
	build: {
		target: 'esnext',
		minify: 'esbuild',
		sourcemap: false,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		hmr: {
			overlay: false, // Disable error overlay which can cause memory issues
		},
		watch: {
			ignored: ['**/node_modules/**', '**/dist/**', '**/public/**'],
		},
		proxy: {
			'/api': {
				target: 'http://localhost:8000',
				changeOrigin: true,
				secure: false,
				configure: (proxy, _options) => {
					proxy.on('error', (err, _req, _res) => {
						console.log('proxy error', err);
					});
					proxy.on('proxyReq', (_proxyReq, req, _res) => {
						console.log('Sending Request to the Target:', req.method, req.url);
					});
					proxy.on('proxyRes', (proxyRes, req, _res) => {
						console.log(
							'Received Response from the Target:',
							proxyRes.statusCode,
							req.url
						);
					});
				},
			},
		},
	},
});