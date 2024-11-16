import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/components/index.js', // 入口文件
      name: 'x-fluent',
      fileName: (format) => `x-fluent.${format}.js`,
    },
    rollupOptions: {
      external: ['lit'], // 将 Lit 设置为外部依赖
      output: {
        globals: {
          lit: 'lit',
        },
      },
    },
  },
});
