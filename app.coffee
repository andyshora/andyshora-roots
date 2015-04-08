js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'
roots_config = require 'roots-config'
dynamic_content = require 'dynamic-content'
sass = require 'node-sass'

siteFiles = []

beforeHook = () ->
  console.log 'beforeHook'
  sass.render {
    file: 'assets/css/main.scss',
    outFile: 'zamain.css',
    success: (result) -> console.log 'success', result.css
    error: -> console.log 'error'
  }


module.exports =

  before: beforeHook,

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
    pretty: true

  server:
    clean_urls: true
