angular.module('reports.matchbox',[])
    .controller('ReportsController', function( $scope, $http, matchConfig ) {

        $scope.reportList = []

        $scope.loadReportList = function() {
             $.ajax({
                type: 'GET',
                url: matchConfig.reportApiBaseUrl + '/reportList',
                headers: {'Content-Type': 'application/x-www-form-urlencoded',},
                success: function (data) {
                    $.each(data, function( key, value ) {
                        $scope.reportList.push({
                            'name': value.name,
                            'displayName': value.displayName,
                            'description': value.description,
                            'excelHref': matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + value.name + '&type=excel',
                            'jsonHref': matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + value.name + '&type=json',
                            'csvHref': matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + value.name + '&type=csv'
                        });
                    });
                },
                error: function (request, textStatus, errorThrown) {
                    alert(errorThrown)
                    $('#alertMessage').hide();
                    $('#errorMessage').show();
                },
                dataType: 'json'
            });

            // $http.get(matchConfig.reportApiBaseUrl + '/reportList')
            // $http.get('http://127.0.0.1:4568/reportList')
            //     .success(function (data) {
            //         $.each(data, function( key, value ) {
            //             $scope.reportList.push({
            //                 'name': value.name,
            //                 'displayName': value.displayName,
            //                 'description': value.description,
            //                 'excelHref': matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + value.name + '&type=excel',
            //                 'jsonHref': matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + value.name + '&type=json',
            //                 'csvHref': matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + value.name + '&type=csv'
            //             });
            //         });
            //     })
            //     .error(function (data, status, header, config) {
            //         console.log(data + '|' + status + '|' + header + '|' + config);
            //     });
        }

    });