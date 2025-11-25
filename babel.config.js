module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@': './',
            '@types': './types',
            '@services': './services',
            '@components': './components',
            '@hooks': './hooks',
            '@utils': './utils',
            '@constants': './constants',
            '@screens': './screens',
          },
        },
      ],
    ],
  };
};
