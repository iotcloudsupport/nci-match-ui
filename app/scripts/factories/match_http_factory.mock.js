(function () {

    angular.module('http.matchbox')
        .factory('matchApiMock', function ($http, matchConfig, $q, $log) {
            return {
                loadPatient: loadPatient,
                loadPatientList: loadPatientList
            }

            function loadPatient() {
                return $http.get('data/patient_PAT123.json');
            }

            function loadPatientList() {
                var deferred = $q.defer();

                var data = [
                    {
                        "patient_id": "100065",
                        "gender": "Male",
                        "ethnicity": "White",
                        "current_status": "REGISTRATION",
                        "treatment_arm": "EAY131-A",
                        "current_step_number": "1.0",
                        "registration_date": "2016-05-09T22:06:33.000+00:00",
                        "disease_name": "Disease 1"
                    },
                    {
                        "patient_id": "100087",
                        "gender": "Female",
                        "ethnicity": "White",
                        "current_status": "PENDING",
                        "treatment_arm": "EAY131-B",
                        "current_step_number": "1.1",
                        "registration_date": "2016-05-09T22:06:33.000+00:00",
                        "disease_name": "Disease 3"
                    },
                    {
                        "patient_id": "100099",
                        "gender": "Male",
                        "ethnicity": "Hispanic",
                        "current_status": "ON_TREATMENT_ARM",
                        "treatment_arm": "EAY131-C",
                        "current_step_number": "2.0",
                        "registration_date": "2016-05-09T22:06:33.000+00:00",
                        "off_trial_date": "2016-05-09T22:06:33.000+00:00",
                        "disease_name": "Disease 3"
                    }
                ];

                deferred.resolve({data: data});
                return deferred.promise;
            }
        });
} ());
