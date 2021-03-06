(function () {
    angular.module('matchbox', [
        'auth0',
        'oc.lazyLoad',
        'matchbox.login',
        'matchbox.nav',
        'matchbox.common',
        'matchbox.dashboard',
        'matchbox.patients',
        'matchbox.patient',
        'matchbox.iradmin',
        'matchbox.qcsample',
        'matchbox.treatment-arms',
        'matchbox.treatment-arm',
        'matchbox.specimen-tracking',
        'matchbox.reports',
        'matchbox.filters',
        'matchbox.config',
        'matchbox.http',
        'matchbox.tools',
        'matchbox.service',
        'matchbox.colors',
        'angular-storage',
        'angular-jwt',
        'angular-flot',
        'ui.router',
        'ui.bootstrap',
        'cgPrompt',
        'ngDropzone',
        'ngDropdowns',
        'ngAnimate',
        'login_config',
        'd3module',
        'd3',
        'matchbox.calendar-heatmap',
        'angular.vertilize',
        'datatables',
        'ngResource',
        'dataGrid',
        'pagination',
        'ngScrollSpy'
    ]);
})();
