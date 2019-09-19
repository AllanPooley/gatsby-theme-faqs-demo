import baseTheme from '@littleplusbig/gatsby-theme-faqs-prismic/src/gatsby-plugin-theme-ui';

export default {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    primary: '#1e3799',
    primaryLight: '#4a69bd',
    primaryDark: '#0c2461',
    placeholderText: '#4a69bd',
    controlText: 'white',
    controlTextActive: 'white',
    controlTextHover: 'white',
    controlBackground: '#1e3799',
    controlBackgroundHover: '#0c2461',
    controlBackgroundActive: '#0c2461',
    controlBorder: '#1e3799',
    controlBorderHover: '#0c2461',
    controlBorderActive: '#0c2461',
  },
};
