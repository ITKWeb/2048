module.exports = {
  
  build_dir: 'build',
  compile_dir: 'bin',
  server_webinf: '../server/src/main/webapp',

  nojs_sentence: 'Please, activate javascript in your browser !',
  
  app_files: {
    favicon: 'app/assets/img/favicon.png',
    first: [ 'app/src/app.js' ],
    js: [ 'app/src/**/*.js' ],
    tpl: [ 'app/src/**/*.tpl.html' ],
    html: [ 'app/index.tpl.html' ],
    stylesheet: ['app/stylesheets/reset.css','app/stylesheets/iconfont.css', 'app/stylesheets/**/*.css'],
    assets: ['app/assets/**/*']
  },

  test_files: {
    js: [
      'test/**/*.js'
    ]
  },

  vendor_files: {
    js: [
      'app/vendor/underscore/underscore.js',
      'app/vendor/angular/angular.js',
      'app/vendor/angular-route/angular-route.js',
      'app/vendor/angular-resource/angular-resource.js'
    ],
    css: [
    ],
    assets: [
    ]
  },
};
