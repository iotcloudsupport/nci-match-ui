function config($stateProvider, $urlRouterProvider, authProvider, $httpProvider, jwtInterceptorProvider) {
    $urlRouterProvider.otherwise("/index/dashboard");

    $stateProvider
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            data: { pageTitle: 'Dashboard', requiresLogin: true }
        })
        .state('index.patients', {
            url: "/patients",
            templateUrl: "views/patients.html",
            data: { pageTitle: 'Patients', requiresLogin: true }
        })
        .state('index.treatment-arms', {
            url: "/treatment-arms",
            templateUrl: "views/treatment_arms.html",
            data: { pageTitle: 'Treatment Arms', requiresLogin: true }
        })
        .state('index.biopsies', {
            url: "/biopsies",
            templateUrl: "views/biopsies.html",
            data: { pageTitle: 'Biopsy Sequence Numbers', requiresLogin: true }
        })
        .state('index.molecular-sequences', {
            url: "/molecular-sequences",
            templateUrl: "views/molecular_sequences.html",
            data: { pageTitle: 'Molecular Sequence Numbers', requiresLogin: true }
        })
        .state('index.reports', {
            url: "/reports",
            templateUrl: "views/reports.html",
            data: { pageTitle: 'Reports', requiresLogin: true },
        })
        .state('auth', {
            abstract: true,
            url: "/auth",
            templateUrl: "views/common/auth_content.html",
        })
        .state('auth.login', {
            url: "/login",
            templateUrl: "views/login.html",
            data: { pageTitle: 'Login' }
        })

    authProvider.init({
        domain: 'ncimatch.auth0.com',
        clientID: 'uCkLRzSlYP3CFOm1pHVn5lYzBMceCgEH',
        loginUrl: 'auth.login'
    });

    jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('token');
    }

    $httpProvider.interceptors.push('jwtInterceptor');
}

angular
    .module('matchbox')
    .config(config)
    .run(function($rootScope, $state, auth, store, jwtHelper, $location) {
        $rootScope.$state = $state;
        $rootScope.$on('$locationChangeStart', function() {
            var token = store.get('token');

            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    if (!auth.isAuthenticated) {
                        auth.authenticate(store.get('profile'), token);
                    }
                }
            } else {
                $location.path('/auth/login');
            }
        });
    });