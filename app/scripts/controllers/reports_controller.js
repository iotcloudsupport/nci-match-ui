

angular.module('reports.matchbox',[])
    .controller('ReportsController', function( $scope, $http, matchConfig ) {

        $scope.reportList = [];

        $scope.loadReportList = function() {

            //$http.get(matchConfig.reportApiBaseUrl + "/reportList", {  headers: {"Content-Type": "application/x-www-form-urlencoded"} })
            //    .success(function(response) {
            //
            //        alert("error-->" + JSON.stringify(response));
            //
            //        $scope.response = response;
            //        $scope.loading = false;
            //    }).error(function(error){
            //
            //        alert("error-->" + JSON.stringify(error));
            //
            //        $scope.error = error;
            //    });


            //$http.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

            $http({
                url:  matchConfig.reportApiBaseUrl + "/reportList",
                method: "GET",
                //data: "",
                dataType: "json",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}

                //headers: {"Content-Type": "application/x-www-form-urlencoded"}
            }).success(function(response){

                alert(JSON.stringify(response))

                $scope.response = response;
            }).error(function (data, status, header, config) {

                alert("error-->" + JSON.stringify(header))

                $scope.error = error;
            });
        };
    });





            // $.ajax({
            //    type: 'GET',
            //    url: matchConfig.reportApiBaseUrl + '/reportList',
            //    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            //    success: function (data) {
            //        $.each(data, function( key, value ) {
            //            var name = "-";
            //            var displayName = "-";
            //            var description = "-";
            //            name = value.name;
            //            displayName = value.displayName;
            //            description = value.description;
            //
            //            $scope.reportList.push({
            //                'name': name,
            //                'displayName': displayName,
            //                'description': description,
            //                'excelHref': matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + name + '&type=excel',
            //                'jsonHref': matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + name + '&type=json',
            //                'csvHref': matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + name + '&type=csv'
            //            });
            //        });
            //    },
            //    error: function (request, textStatus, errorThrown) {
            //        $('#alertMessage').hide();
            //        $('#errorMessage').show();
            //    },
            //    dataType: 'json'
            //});

            //.controller('ReportsController', function(httpReports,$scope) {
            //    $scope.reportList = [];
            //    $scope.clearData = function() {
            //        $scope.reportList = [];
            //    };
            //    $scope.loadReportList = function() {
            //        // Call the async method and then do stuff with what is returned inside our own then function
            //        httpReports.async()
            //            .then(function(d) {
            //
            //                alert(JSON.stringify(d))
            //                //$scope.patientList = d.data;
            //                //$scope.data = d;
            //            });
            //    };
            //});



            //$http.get(matchConfig.reportApiBaseUrl + '/reportList')
            //    .success(function (data) {
            //        $.each(data, function( key, value ) {
            //            var name = "-";
            //            var displayName = "-";
            //            var description = "-";
            //            name = value.name;
            //            displayName = value.displayName;
            //            description = value.description;
            //
            //            $scope.reportList.push({
            //                'name': name,
            //                'displayName': displayName,
            //                'description': description,
            //                'excelHref': matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + name + '&type=excel',
            //                'jsonHref': matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + name + '&type=json',
            //                'csvHref': matchConfig.reportApiBaseUrl + '/downloadReportFile?name=' + name + '&type=csv'
            //            });
            //        });
            //    })
            //    .error(function (data, status, header, config) {
            //        $('#alertMessage').hide();
            //        $('#errorMessage').show();
            //    });


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
