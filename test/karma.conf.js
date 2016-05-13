// Karma configuration
// Generated on Wed Dec 30 2015 12:25:11 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // bower:js
      '../bower_components/jquery/dist/jquery.js',
      '../bower_components/angular/angular.js',
      '../bower_components/bootstrap/dist/js/bootstrap.js',
      '../bower_components/angular-animate/angular-animate.js',
      '../bower_components/angular-cookies/angular-cookies.js',
      '../bower_components/angular-resource/angular-resource.js',
      '../bower_components/angular-sanitize/angular-sanitize.js',
      '../bower_components/angular-touch/angular-touch.js',
      '../bower_components/jquery-ui/jquery-ui.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      '../bower_components/angular-ui-router/release/angular-ui-router.js',
      '../bower_components/moment/moment.js',
      // flot
      '../bower_components/flot/jquery.flot.js',
      '../bower_components/flot.tooltip.pib/js/jquery.flot.tooltip.min.js',
      '../bower_components/flot/jquery.flot.pie.js',
      '../bower_components/flot/jquery.flot.resize.js',
      '../bower_components/angular-flot/angular-flot.js',
      // matchbox custom scripts
      '../app/scripts/**/*.js',
      // matchbox custom script specs
      'spec/filters/*.js',
      'spec/factories/*.js',
      'spec/controllers/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '../app/scripts/controllers/*.js': ['coverage'],
      '../app/scripts/factories/*.js': ['coverage'],
      '../app/scripts/filters/*.js': ['coverage']
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      subdir: 'report-lcov'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'junit', 'coverage'],


    junitReporter: {
      outputDir: 'junit/',
      outputFile: 'test-results.xml',
      suite: 'matchbox',
      useBrowserName: false
    },


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
    browsers: [
      'PhantomJS'
    ],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-coverage'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
}
