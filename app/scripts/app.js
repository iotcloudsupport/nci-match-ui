(function () {
    angular.module('matchbox', [
        'auth0',
        'oc.lazyLoad',
        'login.matchbox',
        'nav.matchbox',
        'patients.matchbox',
        'treatment-arms.matchbox',
        'biopsies.matchbox',
        'molecular-sequences.matchbox',
        'reports.matchbox',
        'filters.matchbox',
        'config.matchbox',
        'http.matchbox',
        'angular-storage',
        'angular-jwt',
        'ui.router',
        'ui.bootstrap'
    ]);
})();