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
            url: "/patient?patient_id&section&molecular_id&analysis_id&surgical_event_id",
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
            url: "/treatment-arm?name&stratum&version",
            templateUrl: "views/treatment_arm.html",
            data: { pageTitle: 'Treatment Arm', requiresLogin: true },
            controller: function($scope, $stateParams) {
                $scope.taid = $stateParams.name;
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
        .state('clia-labs', {
            url: "/clia-labs?site",
            templateUrl: "views/iradmin.html",
            data: { pageTitle: 'CLIA Labs', requiresLogin: true },
            controller: function($scope, $stateParams) {
                $scope.site = $stateParams.site;
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
        .state('ocsample', {
            url: "/ocsample?sampleId",
            templateUrl: "views/ocsample.html",
            data: { pageTitle: 'Sample Quality Control Report', requiresLogin: true },
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
            url: "/ntc_quality_control?sampleId",
            templateUrl: "views/ntc_quality_control.html",
            data: { pageTitle: 'NTC Quality Control Report', requiresLogin: true },
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

    authProvider.init({
        domain: ENV.AUTH0_DOMAIN,
        clientID: ENV.AUTH0_CLIENT_ID,
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
            if (token) {
                $rootScope.showHeader = true;
                if (!jwtHelper.isTokenExpired(token)) {
                    if (!auth.isAuthenticated) {
                        auth.authenticate(store.get('profile'), token);
                    }
                }
            } else {
                $rootScope.showHeader = false;
                $location.path('/auth/login');
            }
        });
    });