/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'goodtok-gray',
      values: [
        {
          name: 'goodtok-gray',
          value: '#F5F5F5',
        },
        {
          name: 'goodtok-light',
          value: '#FFFFFF',
        }
      ],
    },
  }
};

export default preview;
