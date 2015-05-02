js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'
roots_config = require 'roots-config'
dynamic_content = require 'dynamic-content'
sass = require 'node-sass'

siteFiles = []

module.exports =

  # after: () ->
  # copy /archive to public/ 

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
    js_pipeline(manifest: 'assets/js/manifest.yml', out: 'js/main.js'),
    css_pipeline(files: 'assets/css/*.scss', out: 'css/main.css'),
    dynamic_content(),
    roots_config(files: siteFiles)
  ]

  'coffee-script':
    sourcemap: true

  jade:
    pretty: false

  server:
    clean_urls: true
