angular.module('config.matchbox', [])
    .factory('matchConfig', function( $location ) {
        var urlPrefix = $location.protocol() + '://' + $location.host();
        if ($location.host() === 'localhost' || $location.host() === '127.0.0.1') {
            return {
                'matchApiBaseUrl': urlPrefix + ':8080/match',
                'reportApiBaseUrl': urlPrefix + ':4568',
                'treatmentArmApiBaseUrl': urlPrefix + ':4569',
                'lookApiBaseUrl': urlPrefix + ':4567',
            };
        }
        return {
            'matchApiBaseUrl': urlPrefix + ':' + $location.port() + '/match',
            'reportApiBaseUrl': urlPrefix + ':' + $location.port() + '/reportapi',
            'treatmentArmApiBaseUrl': urlPrefix + ':' + $location.port() + '/treatmentarmapi',
            'lookApiBaseUrl': urlPrefix + ':' + $location.port() + '/lookupapi',
        };
    });