// Karma configuration
// Generated on Thu Mar 10 2016 18:03:58 GMT-0600 (CST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // Dependencies.
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-resource/angular-resource.js',
      // App scripts.  They are best loaded in this specific order.
      'app/app.js',
      'app/login/loginCtrl.js',
      'app/main.js',
      'app/post/postCtrl.js',
      'app/post/postFilter.js',
      'app/following/followingCtrl.js',
      'app/status/statusCtrl.js',
      'app/profile/profileCtrl.js',
      'app/services/apiSrv.js',
      'app/services/userSrv.js',
      'app/services/enterDirective.js',
      // Test scripts.
      'app/services/apiMock.js',
      'app/login/loginCtrl.spec.js',
      'app/post/postFilter.spec.js',
      'app/post/postCtrl.spec.js',
      'app/status/statusCtrl.spec.js',
      'app/MainPageCtrl.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
