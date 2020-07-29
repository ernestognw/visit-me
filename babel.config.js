module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@templates': './templates',
            '@config': './screens',
            '@assets': './assets',
            '@screens': './screens',
            '@providers': './providers',
          },
        },
      ],
    ],
  };
};
