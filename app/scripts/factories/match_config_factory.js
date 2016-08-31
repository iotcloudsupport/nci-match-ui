angular.module('matchbox.config', [])
    .factory('matchConfig', function( $location ) {
        var urlPrefix = $location.protocol() + '://' + $location.host();
        if ($location.host() === 'localhost' || $location.host() === '127.0.0.1') {
            return {
                'reportApiBaseUrl': urlPrefix + ':9292',//9292
                'treatmentArmApiBaseUrl': urlPrefix + ':10235',//':4569',
                'patientApiBaseUrl' : urlPrefix + ':10240'//9898
            };
        } else if ($location.host().endsWith('pedmatch.org')) {
            return {
                'reportApiBaseUrl': urlPrefix + ':10240',
                'treatmentArmApiBaseUrl': urlPrefix + ':10235',
                'patientApiBaseUrl' : urlPrefix + ':10240'
            };
        } else if ($location.host().endsWith('pedmatch-int.nci.nih.gov')) {
            return {
                'reportApiBaseUrl': urlPrefix + 'api/v1',
                'treatmentArmApiBaseUrl': urlPrefix + 'api/v1',
                'patientApiBaseUrl' : urlPrefix + 'api/v1'
            };
        } else {
            return {
                'reportApiBaseUrl': urlPrefix + ':' + $location.port() + '/reportapi',
                'treatmentArmApiBaseUrl': urlPrefix + ':' + $location.port() + '/treatmentarmapi',
                'patientApiBaseUrl' : urlPrefix + ':' + $location.port() + '/patientapi'
            };
        }
    });
