js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'
roots_config = require 'roots-config'
dynamic_content = require 'dynamic-content'
W            = require 'when'

siteFiles = []

module.exports =

  debug: true

  ignores: [
    'README.md',
    '**/layout.*',
    '**/_*',
    '.gitignore',
    'ship.*conf',
    '.divshot-cache/*',
    '.editorconfig',
    '.DS_Store',
    'layouts/*'
  ]

  extensions: [
    dynamic_content(),
    js_pipeline(manifest: 'assets/js/manifest.yml', out: 'js/main.js'),
    css_pipeline(files: 'assets/css/styles.scss', out: 'css/main.css'),
    roots_config(files: siteFiles)
  ]

  'coffee-script':
    sourcemap: true

  jade:
    pretty: true

  server:
    clean_urls: true
