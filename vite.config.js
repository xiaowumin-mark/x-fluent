import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/components/index.js', // 入口文件
      name: 'x-fluent',
      fileName: (format) => `x-fluent.${format}.js`,
      formats: ['es', 'umd'], // 打包格式
    },
    rollupOptions: {
      external: ['lit'], // 将 Lit 设置为外部依赖
      output: {
        globals: {
          lit: 'lit',
        },
      },
      minify: 'terser',
    },
  },
  server: {
    port: 8081,
  },
});
