module.exports = {
  staticFileGlobs: [
    'build/**/**.html',
    'build/**/**.css',
    'build/**/**.js',
    'build/**/**.png',
    'build/**/**.jpg',
    'build/**/**.jpeg',
    'build/**/**.svg',
    'build/**/**.gif',
    'build/**/**.webp',
    'build/**/**.ico',
  ],
  swFilePath: './build/service-worker.js',
  stripPrefix: 'build/',
  handleFetch: false,
  /*runtimeCaching: [{
    urlPattern: /this\\.is\\.a\\.regex/,
    handler: 'networkFirst'
  }]*/
}