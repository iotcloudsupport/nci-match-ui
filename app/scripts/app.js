(function () {
    angular.module('matchbox', [
        'auth0',
        'oc.lazyLoad',
        'login.matchbox',
        'nav.matchbox',
        'dashboard.matchbox',
        'patients.matchbox',
        'patient.matchbox',
        'iradmin.matchbox',
        'service.matchbox',
        'treatment-arms.matchbox',
        'treatment-arm.matchbox',
        'specimen-tracking.matchbox',
        'reports.matchbox',
        'filters.matchbox',
        'config.matchbox',
        'http.matchbox',
        'angular-storage',
        'angular-jwt',
        'angular-flot',
        'ui.router',
        'ui.bootstrap',
        'cgPrompt',
        'ngDropzone',
        'ngDropdowns'
    ]);
})();