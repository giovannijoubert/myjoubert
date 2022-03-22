module.exports = {
  pwa: {
    themeColor: '#2e59f6',
    name: 'myJoubert',
    manifestPath: 'manifest.json',
    workboxPluginMode: 'GenerateSW',
    iconPaths: {
      favicon32: 'logo.png',
      favicon16: 'logo.png',
      appleTouchIcon: 'logo.png',
      maskIcon: 'logo.png',
      msTileImage: 'logo.png'
    },
    workboxOptions: {
      exclude: [/\.map$/, /_redirects/]
    }
  }
};
