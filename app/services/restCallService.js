
angular.module('myApp',[]);

    function restService($http) {

        var service = {
            patient:  "http://localhost:8080/match/common/rs/getBasicPatientsData",
            treatmentarm: "http://localhost:8080/match/common/rs/getBasicTreatmentArms",
            molecularsequence: "http://localhost:4567/patientSpecimenTrackingSummary",
            biopsysequence: "http://localhost:4567/patientSpecimenTrackingSummary",
            report: "http://localhost:4567/reportList"
        };

        var URL = "";
        var Data = {
            async: function (id) {

                switch (id) {
                    case 'patient':
                        URL = service.patient;
                        break;
                    case 'treatmentarm':
                        URL = service.treatmentarm;
                        break;
                    case 'molecularsequence':
                        URL = service.molecularsequence;
                        break;
                    case 'biopsysequence':
                        URL = service.biopsysequence;
                        break;
                    case 'report':
                        URL = service.report;
                        break;
                    default:
                        break;
                }

                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(URL)

                    .then(function successCallback(response) {
                        return response.data;
                        // this callback will be called asynchronously
                        // when the response is available
                    }, function errorCallback(response) {
                        alert('Error: ' + response);
                        return response.data;
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });

                return promise;
            }
        };
        return Data;
    }

angular
    .module('inspinia')
    .factory('restCallService',restService)
