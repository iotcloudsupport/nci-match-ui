angular.module('config.matchbox', [])
    .factory('matchConfig', function( $location ) {
        var urlPrefix = $location.protocol() + '://' + $location.host();
        if ($location.host() === 'localhost' || $location.host() === '127.0.0.1') {
            return {
                'matchApiBaseUrl': urlPrefix + ':8080/match',
                'lookApiBaseUrl': urlPrefix + ':9595',//9595
                'reportApiBaseUrl': urlPrefix + ':9292',//9292
                'treatmentArmApiBaseUrl': urlPrefix + ':10235',//':4569',
                'workflowApiBaseUrl' : urlPrefix + ':4570',
                'activityFeedApiBaseUrl' : urlPrefix + ':9898'//9898
            };
        }
        return {
            'matchApiBaseUrl': urlPrefix + ':' + $location.port() + '/match',
            'lookApiBaseUrl': urlPrefix + ':' + $location.port() + '/lookupapi',
            'reportApiBaseUrl': urlPrefix + ':' + $location.port() + '/reportapi',
            'treatmentArmApiBaseUrl': urlPrefix + ':' + $location.port() + '/treatmentarmapi',
            'workflowApiBaseUrl' : urlPrefix + ':' + $location.port() + '/matchapi',
            'activityFeedApiBaseUrl' : urlPrefix + ':' + $location.port() + '/newsFeed/1'
        };
    });
