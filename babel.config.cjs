module.exports = (api) => {
  const isTest = api.env('test');
  api.cache.using(() => process.env.NODE_ENV);

  if (!isTest) {
    return { presets: [] };
  }

  return {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
    ],
  };
};
