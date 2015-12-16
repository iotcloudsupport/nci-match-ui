
angular.module('myApp',[]);

    function restService($http) {
        var URL = "";
        var Data = {
            async: function (id) {

                if(id=='patient'){
                    URL = "http://localhost:8080/match/common/rs/getBasicPatientsData";
                }
                else if(id=='treatmentarm'){
                    URL = "http://localhost:8080/match/common/rs/getBasicTreatmentArms";
                }
                else if(id=='molecularsequence' || id=='biopsysequence'){
                    URL = "http://localhost:4567/patientSpecimenTrackingSummary";
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
//});


angular
    .module('inspinia')
    .factory('restCallService',restService)
