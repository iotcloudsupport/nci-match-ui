angular.module('config.matchbox', [])
    .factory('matchConfig', function( $location ) {
        var urlPrefix = $location.protocol() + '://' + $location.host();
        if ($location.host() === 'localhost' || $location.host() === '127.0.0.1') {
            return {
                'matchApiBaseUrl': urlPrefix + ':8080/match',
                'lookApiBaseUrl': urlPrefix + ':4567',
                'reportApiBaseUrl': urlPrefix + ':4568',
                'treatmentArmApiBaseUrl': urlPrefix + ':4569',
                'workflowApiBaseUrl' : urlPrefix + ':4570'
            };
        }
        return {
            'matchApiBaseUrl': urlPrefix + ':' + $location.port() + '/match',
            'lookApiBaseUrl': urlPrefix + ':' + $location.port() + '/lookupapi',
            'reportApiBaseUrl': urlPrefix + ':' + $location.port() + '/reportapi',
            'treatmentArmApiBaseUrl': urlPrefix + ':' + $location.port() + '/treatmentarmapi',
            'workflowApiBaseUrl' : urlPrefix + ':' + $location.port() + '/matchapi'
        };
    });