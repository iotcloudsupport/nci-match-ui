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

function handleAnchorClick($scope, $http) {
    var URL = "http://localhost:4567/patientSpecimenTrackingSummary";

    $scope.click = function() {
        var response = $http.get(URL);
        response.success(function(data, status, headers, config) {
            $scope.profile = data;
            alert("Ok.");

        });

        response.error(function(data, status, headers, config) {
            alert("Error.");
        });

    };
}




angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .controller('PatientCtrl', MainCtrl)
    .controller('ClickCtrl', handleAnchorClick)