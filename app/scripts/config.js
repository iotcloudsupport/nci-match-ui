function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, authProvider, $httpProvider, jwtInterceptorProvider, ENV) {
    $urlRouterProvider.otherwise("dashboard");



    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
        .state('index', {
            abstract: true,
            url: "/",
            templateUrl: "views/common/content.html"
        })
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            data: { pageTitle: 'Dashboard', requiresLogin: true },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/jquery.dataTables.min.js','bower_components/datatables/media/css/dataTables.bootstrap.min.css']
                        },
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/dataTables.bootstrap.min.js']
                        },
                        {
                            name: 'datatables',
                            files: ['bower_components/angular-datatables/dist/angular-datatables.min.js']
                        },
                        {
                            files: ['bower_components/chartjs/Chart.min.js']
                        },
                        {
                            name: 'angles',
                            files: ['bower_components/angles/angles.js']
                        }
                    ]);
                }
            }
        })
        .state('patients', {
            url: "/patients",
            templateUrl: "views/patients.html",
            data: { pageTitle: 'Patients', requiresLogin: true },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/jquery.dataTables.min.js','bower_components/datatables/media/css/dataTables.bootstrap.min.css']
                        },
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/dataTables.bootstrap.min.js']
                        },
                        {
                            name: 'datatables',
                            files: ['bower_components/angular-datatables/dist/angular-datatables.min.js']
                        }
                    ]);
                }
            }
        })
        .state('patient', {
            url: "/patient/:patientSequenceNumber",
            templateUrl: "views/patient.html",
            data: { pageTitle: 'Patient', requiresLogin: true },
            controller: 'PatientController',
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: [
                                'bower_components/datatables/media/js/jquery.dataTables.min.js',
                                'bower_components/datatables/media/css/dataTables.bootstrap.min.css'
                            ]
                        },
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/dataTables.bootstrap.min.js']
                        },
                        {
                            name: 'datatables',
                            files: ['bower_components/angular-datatables/dist/angular-datatables.min.js']
                        },
                        {
                            files: [
                                'bower_components/dropzone/downloads/css/basic.css',
                                'bower_components/dropzone/downloads/css/dropzone.css',
                                'bower_components/dropzone/downloads/dropzone.min.js'
                            ]
                        }
                    ]);
                }
            }
        })
        .state('treatment-arms', {
            url: "/treatment-arms",
            templateUrl: "views/treatment_arms.html",
            data: { pageTitle: 'Treatment Arms', requiresLogin: true },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/jquery.dataTables.min.js','bower_components/datatables/media/css/dataTables.bootstrap.min.css']
                        },
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/dataTables.bootstrap.min.js']
                        },
                        {
                            name: 'datatables',
                            files: ['bower_components/angular-datatables/dist/angular-datatables.min.js']
                        }
                    ]);
                }
            }
        })
        .state('treatment-arm', {
            url: "/treatment-arm/:treatmentArmId",
            //url: "/treatment-arm/:treatmentArmId/:treatmentArmVersion",
            templateUrl: "views/treatment_arm.html",
            data: { pageTitle: 'Treatment Arm', requiresLogin: true },
            controller: function($scope, $stateParams) {
                $scope.taid = $stateParams.treatmentArmId;
                $scope.tavsn = $stateParams.treatmentArmVersion;
            },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/jquery.dataTables.min.js','bower_components/datatables/media/css/dataTables.bootstrap.min.css']
                        },
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/dataTables.bootstrap.min.js']
                        },
                        {
                            name: 'datatables',
                            files: ['bower_components/angular-datatables/dist/angular-datatables.min.js']
                        }
                    ]);
                }
            }
        })
        .state('specimen-tracking', {
            url: "/specimen-tracking",
            templateUrl: "views/specimen_tracking.html",
            data: { pageTitle: 'Specimen Tracking', requiresLogin: true },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/jquery.dataTables.min.js','bower_components/datatables/media/css/dataTables.bootstrap.min.css']
                        },
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/dataTables.bootstrap.min.js']
                        },
                        {
                            name: 'datatables',
                            files: ['bower_components/angular-datatables/dist/angular-datatables.min.js']
                        }
                    ]);
                }
            }
        })
        .state('reports', {
            url: "/reports",
            templateUrl: "views/reports.html",
            data: { pageTitle: 'Reports', requiresLogin: true },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/jquery.dataTables.min.js','bower_components/datatables/media/css/dataTables.bootstrap.min.css']
                        },
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/dataTables.bootstrap.min.js']
                        },
                        {
                            name: 'datatables',
                            files: ['bower_components/angular-datatables/dist/angular-datatables.min.js']
                        }
                    ]);
                }
            }
        })
        .state('iradmin', {
            url: "/iradmin/:branch",
            templateUrl: "views/iradmin.html",
            data: { pageTitle: 'IR Reporters', requiresLogin: true },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/jquery.dataTables.min.js','bower_components/datatables/media/css/dataTables.bootstrap.min.css']
                        },
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/dataTables.bootstrap.min.js']
                        },
                        {
                            name: 'datatables',
                            files: ['bower_components/angular-datatables/dist/angular-datatables.min.js']
                        },
                        {
                            files: ['bower_components/chartjs/Chart.min.js']
                        },
                        {
                            name: 'angles',
                            files: ['bower_components/angles/angles.js']
                        }
                    ]);
                }
            }
        })
        .state('ngsample', {
            url: "/ngsample/:sampleId",
            templateUrl: "views/ngsample.html",
            data: { pageTitle: 'IR Sample Control Variant Report', requiresLogin: true },
            controller: function($scope, $stateParams) {
                $scope.sid = $stateParams.sampleId;
            },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/jquery.dataTables.min.js','bower_components/datatables/media/css/dataTables.bootstrap.min.css']
                        },
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/dataTables.bootstrap.min.js']
                        },
                        {
                            name: 'datatables',
                            files: ['bower_components/angular-datatables/dist/angular-datatables.min.js']
                        }
                    ]);
                }
            }
        })
        .state('ocsample', {
            url: "/ocsample/:sampleId",
            templateUrl: "views/ocsample.html",
            data: { pageTitle: 'IR Sample Quality Control Report', requiresLogin: true },
            controller: function($scope, $stateParams) {
                $scope.sid = $stateParams.sampleId;
            },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/jquery.dataTables.min.js','bower_components/datatables/media/css/dataTables.bootstrap.min.css']
                        },
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/dataTables.bootstrap.min.js']
                        },
                        {
                            name: 'datatables',
                            files: ['bower_components/angular-datatables/dist/angular-datatables.min.js']
                        }
                    ]);
                }
            }
        })
        .state('ntcsample', {
            url: "/ntcsample/:sampleId",
            templateUrl: "views/ntcsample.html",
            data: { pageTitle: 'IR NTC Control Variant Report', requiresLogin: true },
            controller: function($scope, $stateParams) {
                $scope.sid = $stateParams.sampleId;
            },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/jquery.dataTables.min.js','bower_components/datatables/media/css/dataTables.bootstrap.min.css']
                        },
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/dataTables.bootstrap.min.js']
                        },
                        {
                            name: 'datatables',
                            files: ['bower_components/angular-datatables/dist/angular-datatables.min.js']
                        }
                    ]);
                }
            }
        })
        .state('ntc_quality_control', {
            url: "/ntc_quality_control/:sampleId",
            templateUrl: "views/ntc_quality_control.html",
            data: { pageTitle: 'IR NTC Quality Control Report', requiresLogin: true },
            controller: function($scope, $stateParams) {
                $scope.sid = $stateParams.sampleId;
            },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/jquery.dataTables.min.js','bower_components/datatables/media/css/dataTables.bootstrap.min.css']
                        },
                        {
                            serie: true,
                            files: ['bower_components/datatables/media/js/dataTables.bootstrap.min.js']
                        },
                        {
                            name: 'datatables',
                            files: ['bower_components/angular-datatables/dist/angular-datatables.min.js']
                        }
                    ]);
                }
            }
        })
        .state('auth', {
            abstract: true,
            url: "/auth",
            templateUrl: "views/common/auth_content.html"
        })
        .state('auth.login', {
            url: "/login",
            templateUrl: "views/login.html",
            data: { pageTitle: 'Login' }
        })

    // process.env.NODE_ENV = 'dev';
    // process.env.AUTH0_CLIENT_ID='ncimatch.auth0.com';
    // process.env.AUTH0_CLIENT_SECRET='uCkLRzSlYP3CFOm1pHVn5lYzBMceCgEH';

    // authProvider.init({
    //     domain: 'ncimatch.auth0.com',
    //     clientID: 'uCkLRzSlYP3CFOm1pHVn5lYzBMceCgEH',
    //     loginUrl: 'auth.login'
    // });

    authProvider.init({
        domain: ENV.domain,
        clientID: ENV.clientID,
        loginUrl: ENV.loginUrl
    });

    jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('token');
    }

    $httpProvider.interceptors.push('jwtInterceptor');
}

angular.module('matchbox')
    .config(config)
    .run(function($rootScope, $state, auth, store, jwtHelper, $location, ENV) {

        $rootScope.$state = $state;
        $rootScope.$on('$locationChangeStart', function() {
            var token = store.get('token');

            // alert("ENV.clientID-->" + ENV.clientID + " --- " +  ENV.domain)

            // alert("TOKEN-->" + token)

            if (token) {
                $rootScope.showHeader = true; //Open the headers
                if (!jwtHelper.isTokenExpired(token)) {
                    if (!auth.isAuthenticated) {
                        auth.authenticate(store.get('profile'), token);
                    }
                }
            } else {
                $rootScope.showHeader = false; //Close the headers
                $location.path('/auth/login');
            }
        });
    });