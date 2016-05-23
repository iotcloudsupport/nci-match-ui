angular.module('irsample.matchbox',['ui.router'])
    .controller('SampleController', function($scope, $http, $window, $stateParams, matchConfig, DTOptionsBuilder) {
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);

        this.dtColumnDefs = [];

        this.dtInstance = {};

        $scope.samplesList = [];

        $scope.loadSamplesList = function () {
            $scope.sampleId = $stateParams.sampleId;
        };
    });
