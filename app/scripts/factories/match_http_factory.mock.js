(function () {

    angular.module('http.matchbox')
        .factory('matchApiMock', function ($http, matchConfig, $q, $log) {
            return {
                loadPatient: loadPatient,
                loadPatientList: loadPatientList
            }

            function loadPatient(id) {
                $log.info('Loading patient ' + id);
                return $http.get('data/patient_' + id + '.json');
            }

            function loadPatientList() {
                return $http.get('data/patient_list.json');
            }
        });
} ());
