import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  attributify: true,
  theme: {
    extend: {
      width: {
        'task-bar-size': '48px',
      },
      height: {
        'task-bar-size': '48px',
        'search-bar-height': '36px',
      },
      colors: {
        'primary-color': '#494344',
        'second-color': '#584f55',
        'highlight-color': '#429ce3',
        'active-color': '#0078d7',
      },
    },
  },
  shortcuts: {
    key: 'text-gray-400 border-width-1px border-gray-400 rounded px-4px',
  },
});
