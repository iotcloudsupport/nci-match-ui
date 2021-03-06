'use strict';
module.exports = function (grunt) {
	
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Show grunt task time
    require('time-grunt')(grunt);

    //Shell grunt
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

    // Configurable paths for the app
    var appConfig = {
        app: 'app',
        dist: 'dist'
    };

    var SETUP = "";

    // Grunt configuration
    grunt.initConfig({

        testDir: 'app/tar',
        readDir: 'app/scripts/env',

        exec: {
            echo_grunt_version: {
                cmd: function () {
                    return 'echo ' + this.version;
                }
            },
            echo_auth: {
                cmd: function () {
                    var LOG_USER = "$AUTH0_CLIENT_ID";
                    var DB_PASSWORD = "password";
                    var SESSION_ID = "$TERM_SESSION_ID";
                    var SETUP = 'echo $AUTH0_CLIENT_ID';
                    return SETUP;
                }
            }
        },

        // SET ENVIRONMENTS
        ngconstant: {
            // Options for all targets
            options: {
                space: '  ',
                wrap: '"use strict";\n\n {\%= __ngModule %}',
                name: 'login_config'
            },
            // Environment targets
            development: {
                options: {
                    dest: 'app/scripts/env/login_config.js'
                    // wrap: true
                    // dest: 'login_config.js'
                },
                constants: {
                    ENV: {
                        'name': 'development',
                        'AUTH0_DOMAIN': 'ncimatch.auth0.com',
                        'AUTH0_CLIENT_ID': 'uCkLRzSlYP3CFOm1pHVn5lYzBMceCgEH',
                        'loginUrl': 'auth.login'
                    },
                    PRO: {
                        'name': 'production',
                        'AUTH0_DOMAIN': 'ncimatch.auth0.com_prod',
                        'AUTH0_CLIENT_ID': 'uCkLRzSlYP3CFOm1pHVn5lYzBMceCgEH_prod',
                        'loginUrl': 'auth.login_prod'

                    },
                    UT: {
                        'name': 'test',
                        'AUTH0_DOMAIN': 'ncimatch.auth0.com_test',
                        'AUTH0_CLIENT_ID': 'uCkLRzSlYP3CFOm1pHVn5lYzBMceCgEH_test',
                        'loginUrl': 'auth.login_test'
                    }
                }
            },
            production: {
                options: {
                    dest: 'app/env/login_config.js'
                },
                constants: {
                    ENV: {
                        name: 'production',
                        domain: 'ncimatch_prod.auth0.com',
                        clientID: 'uCkLRzSlYP3CFOm1pHVn5lYzBMceCgEH_PROD',
                        loginUrl: 'auth.login_prod'
                    }
                }
            }
        },
        spawn: {
            echo: {
                command: "echo",
                commandArgs: ["{0}"],
                directory: "./tests",
                pattern: "**/*.js",
                useQuotes: true,
                quoteDelimiter: "\"",
                groupFiles: true,
                fileDelimiter: " ",
                ignore: ["notNeededFile.js"]
            },
            list: {
                command: "ls",
                commandArgs: ["-la", "{0}"],
                directory: "./tests"
            },
            shelltest: {
                command: "mocha",
                commandArgs: ["--reporter", "spec", "{0}"],
                directory: "./tests",
                pattern: "**/*.js"
            },
            webstart: {
                command: 'node',
                commandArgs: ['{0}'],
                directory: './',
                groupFiles: true,
                passThrough: false,
                pattern: 'www',
                opts: {
                    stdio: 'inherit',
                    cwd: __dirname + '/'
                }
            }
            // *** - grunt-spawn: WebStart for Express {End}
        },

        // Project settings
        inspinia: appConfig,

        // The grunt server settings
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            container: {
                options: {
                    hostname: '0.0.0.0',
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= inspinia.dist %>'
                }
            }
        },
        // Compile less to css
        less: {
            development: {
                options: {
                    compress: true,
                    optimization: 2
                },
                files: {
                    "app/styles/style.css": "app/less/style.less"
                }
            }
        },
        // Watch for changes in live edit
        watch: {
            styles: {
                files: ['app/less/**/*.less'],
                tasks: ['less', 'copy:styles'],
                options: {
                    nospawn: true,
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            js: {
                files: ['<%= inspinia.app %>/scripts/{,*/}*.js'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= inspinia.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= inspinia.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            data: {
                files: ['<%= inspinia.app %>/data/{,*/}*.json'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            }
        },
        // If you want to turn on uglify you will need write your angular code with string-injection based syntax
        // For example this is normal syntax: function exampleCtrl ($scope, $rootScope, $location, $http){}
        // And string-injection based syntax is: ['$scope', '$rootScope', '$location', '$http', function exampleCtrl ($scope, $rootScope, $location, $http){}]
        uglify: {
            options: {
                mangle: false
            }
        },
        // Clean dist folder
        clean: {
            js: ['env/*.js'],
            folder: ['app/tar'],
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= inspinia.dist %>/{,*/}*',
                        '!<%= inspinia.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= inspinia.app %>',
                        dest: '<%= inspinia.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'styles/patterns/*.*',
                            'img/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/fontawesome',
                        src: ['fonts/*.*'],
                        dest: '<%= inspinia.dist %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap',
                        src: ['fonts/*.*'],
                        dest: '<%= inspinia.dist %>'
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= inspinia.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= inspinia.dist %>/scripts/{,*/}*.js',
                    '<%= inspinia.dist %>/styles/{,*/}*.css',
                    '<%= inspinia.dist %>/styles/fonts/*'
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= inspinia.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= inspinia.dist %>'
                }]
            }
        },
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },
        // Generate and compress tar file
        compress: {
            dist: {
                options: {
                    archive: "nci-match-ui.tgz",
                    pretty: true
                },
                files: [{
                    expand: true,
                    src: ['**'],
                    cwd: 'app/',
                    dest: 'app/'
                }, {
                    expand: true,
                    src: ['**'],
                    cwd: 'bower_components/',
                    dest: 'bower_components/'
                }]
            }
        },
        usemin: {
            html: ['dist/index.html']
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }
    });

    // grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('default', ['shell']);
    grunt.loadNpmTasks('grunt-exec');
    grunt.registerTask('default', 'replace');

    grunt.loadNpmTasks('grunt-spawn');
    grunt.registerTask("shelltest", ["spawn:shelltest"]);

    grunt.registerTask('live', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'ngconstant:development',
            'copy:styles',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('prod', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'ngconstant:production',
            'copy:styles',
            'connect:livereload',
            'watch'
        ]);
    });

    // SHELL CONFIGURATION
    grunt.registerTask('default', function () {
        var exec = require('child_process').exec,child,done = grunt.task.current.async();
        child = exec('echo "$AUTH0_DOMAIN"',
            function(error, stdout, stderr){
                grunt.log.writeln('SET FOR SHELL ENV VARIABLE: ' + stdout + " Error 1: " + stderr + "Error 2: " + error );

                if(stdout.trim() === 'ncimatch.auth0.com') {
                    grunt.log.writeln('TAR file for Grunt started. ENV: ' + stdout);
                    grunt.task.run([
                        'buildtest'
                    ]);
                }
                // Technique recommended on #grunt IRC channel. Tell Grunt asych function is finished.
                // Pass error for logging; if operation completes successfully error will be null.
                done(error);
            }
        );
    });

    // Run build version of app
    grunt.registerTask('server', [
        'build',
        'connect:dist:keepalive'
    ]);

    // Run the unit tests
    grunt.registerTask('test', [
        'karma'
    ]);

    // Build version for production
    grunt.registerTask('buildtest', [
        'clean:dist',
        'less',
        'useminPrepare',
        'concat',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin',
        'ngconstant:development',
        'compress:dist'
    ]);

    // Build version for production
    grunt.registerTask('build', [
        'clean:dist',
        'less',
        'useminPrepare',
        'concat',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin',
        'compress:dist'
    ]);

    // Run the unit tests, build it, and compress it.
    grunt.registerTask('default_org', [
        'test',
        'build'
    ]);

};
