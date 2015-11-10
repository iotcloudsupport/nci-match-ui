/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl() {

    var URL = "http://localhost:4567/patientSpecimenTrackingSummary";
    //var URL = "http://localhost:4567/generateReport?name=screenVsEnrolled";
    //var URL = "http://localhost:8080/match/common/rs/getBasicPatientsData"

    var result = [];
    $.ajax({
        type: 'GET',
        async: false,
        url: URL,
        crossDomain: true,
        success: function (data) {
            result.push(data);
            //$.each(data, function(key, value) {
            //    result.push(value._id);
            //});
            return result;
        },
        error: function(request, textStatus, errorThrown) {
            result = [];
        }
    });
    this.patientData = result;
};



/**
 * MainCtrl - generate
 */
var ClickCtrl = angular.module('ClickCtrl',[]);

//$scope.loadData = function()

//$scope.loadData = function() {
//    var URL = "http://localhost:4567/patientSpecimenTrackingSummary";
//    var response = $http.get(URL);
//    response.success(function(data, status, headers, config) {
//        $scope.profile = data;
//        alert("Ok.");
//
//    });
//
//    response.error(function(data, status, headers, config) {
//        alert("Error.");
//    });
//
//};


function handleAnchorClick($scope, $http) {

    var URL = "http://localhost:4567/generateReport?name=screenVsEnrolled";
    //var URL = "http://localhost:4567/patientSpecimenTrackingSummary";
    //var URL = "http://localhost:8080/match/common/rs/getBasicPatientsData"

    $scope.loadData = function () {
        $http.get(URL)
            .success(function (data, status, headers, config) {
                $scope.jsonData = data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<br />status: " + status +
                    "<br />headers: " + jsonFilter(header) +
                    "<br />config: " + jsonFilter(config);
            });

        //return $scope.jsonData;
    };
}



    //function handleAnchorClick($scope, $http) {
    //    //var URL = "http://localhost:4567/patientSpecimenTrackingSummary";
    //
    //    $scope.loadData = function() {
    //        //var URL = "http://localhost:4567/patientSpecimenTrackingSummary";
    //        var URL = "http://localhost:8080/match/common/rs/getBasicPatientsData";
    //
    //        var response = $http.get(URL);
    //        response.success(function(data, status, headers, config) {
    //
    //            alert("Ok")
    //            $scope.jsonData = data;
    //
    //
    //        });
    //
    //        response.error(function(data, status, headers, config) {
    //            alert("Error.");
    //        });
    //
    //    };
    //}




angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .controller('PatientCtrl', MainCtrl)
    .controller('ClickCtrl', handleAnchorClick)