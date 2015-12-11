
angular.module('myApplicationModule', [])
    .value('mode', 'app')
    .value('version', 'v1.0.1');

//HTTP Test
angular.module('reportListApp', [])
.controller('reportListAppControllerWithoutParameters', function noParametersController($scope, $http) {
    var getReportWithoutParametersData = function getReportWithoutParametersData() {
        $http.get('http://localhost:4567/reportList', {
            params: {  }
        }).success(function(data, status, headers, config) {
            $scope.report = data.Search;
        }).error(function(data, status, headers, config) {
            $scope.report = [];
        });
    };

    /* On Load */
    $scope.report = [{
        name: 'screenedVsWithaMoi',
        id: {
            description: 'This report calculates the numbers of patients having a confirmed variant report and those having one or more aMOIs.'
        },
        description: 'This report calculates the numbers of patients having a confirmed variant report and those having one or more aMOIs.',
        dataname: '-',
        displayname: '-'
    }];

    $scope.keyword = '';
    //Start describes
    getReportWithoutParametersData();

})
.controller('reportListAppController', function withParametersController($scope, $http) {
    var getReportWithParametersData = function getReportWithParametersData() {
        $http.get('http://localhost:4567/reportList', {
            params: { name: $scope.keyword }
        }).success(function(data, status, headers, config) {
            $scope.movies = data.Search;
        }).error(function(data, status, headers, config) {
            $scope.movies = [];
        });
    };

    $scope.reportwithparams = [{
        name: 'patientEligibleArmsNoTiebreaker',
        id: {
            description: 'For given patient sequence numbers, find the vcf and run rule engine with no-tie-breaker option, to determine what are the Tas that are available to the patient in question, if no tie breaker is applied. This report takes time.',
            params: [{
                "name": 'patientSequenceNumber',
                "displayName": 'Patient Sequence Number'
            }]
        },
        description: 'For given patient sequence numbers, find the vcf and run rule engine with no-tie-breaker option, to determine what are the Tas that are available to the patient in question, if no tie breaker is applied. This report takes time.',
        dataname: 'patientSequenceNumber',
        displayname: 'Patient Sequence Number'
    }];

        /* On Load */
    $scope.keyword = 'screenedVsWithaMoi';

    //Start describes
    getReportWithParametersData;

});

//Describes
describe('reportListAppController', function() {
    beforeEach(module('reportListApp'));

    var httpData = [{
        name: 'screenedVsWithaMoi',
        id: {
            description: 'This report calculates the numbers of patients having a confirmed variant report and those having one or more aMOIs.'
        },
        description: 'This report calculates the numbers of patients having a confirmed variant report and those having one or more aMOIs.',
        dataname: '-',
        displayname: '-'
    }];

    var httpParamsData = [{
        name: 'patientEligibleArmsNoTiebreaker',
        id: {
            description: 'For given patient sequence numbers, find the vcf and run rule engine with no-tie-breaker option, to determine what are the Tas that are available to the patient in question, if no tie breaker is applied. This report takes time.',
            params: [{
                "name": 'patientSequenceNumber',
                "displayName": 'Patient Sequence Number'
            }]
        },
        description: 'For given patient sequence numbers, find the vcf and run rule engine with no-tie-breaker option, to determine what are the Tas that are available to the patient in question, if no tie breaker is applied. This report takes time.',
        dataname: 'patientSequenceNumber',
        displayname: 'Patient Sequence Number'
    }];

    beforeEach(inject(function(_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $scope = {};
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('http://localhost:4567/reportList').respond({
            Search: httpData
        });
    }));

    it('should load report WITHOUT parameters', function () {
        var noParametersController = $controller('reportListAppControllerWithoutParameters', { $scope: $scope });
        //$httpBackend.flush();
        expect($scope.report).toEqual(httpData);
    });

    beforeEach(inject(function(_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $scope = {};
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('http://localhost:4567/reportList').respond({
            Search: httpParamsData
        });
    }));

    it('should load report WITH parameters', function () {
        var withParametersController = $controller('reportListAppController', { $scope: $scope });
        //$httpBackend.flush();
        expect($scope.reportwithparams).toEqual(httpParamsData);
    });

});


angular.module('app', [])
    .controller('PasswordController', function PasswordController($scope) {
        $scope.password = '';
        $scope.grade = function() {
            var size = $scope.password.length;
            if (size > 8) {
                $scope.strength = 'strong';
            } else if (size > 3) {
                $scope.strength = 'medium';
            } else {
                $scope.strength = 'weak';
            }
        };
    });

describe('PasswordController', function() {
    beforeEach(module('app'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('$scope.grade', function() {
        it('sets the strength to "strong" if the password length is >8 chars', function() {
            var $scope = {};
            var controller = $controller('PasswordController', { $scope: $scope });
            $scope.password = 'longerthaneightchars';
            $scope.grade();
            expect($scope.strength).toEqual('strong');
        });
    });
});

angular.module('reportModule', [])
    .value('data', ['10/10/2015','<a href="#">Link</a>','JSON'])
    .value('version', 'v1.0.1');

describe('Report Controlling App', function() {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('reportModule'));

    // inject() is used to inject arguments of all given functions
    it('should provide a data tested', inject(function(data) {
        //expect(data).toEqual(['10/10/2015','<a href="#">Link</a>','PDF']);
        expect(data).toEqual(['10/10/2015','<a href="#">Link</a>','JSON']);
    }));

    // The inject and module method can also be used inside of the it or beforeEach
    it('should override a version and test the new version is injected', function() {
        // module() takes functions or strings (module aliases)
        module(function($provide) {
            $provide.value('version', 'overridden'); // override version here
        });

        inject(function(version) {
            expect(version).toEqual('overridden');
        });
    });
});


// testing controller
describe('mockController', function() {
    var $httpBackend, $rootScope, createController, authRequestHandler;

    // Set up the module
    beforeEach(module('mockApp'));

    beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        // backend definition common for all tests
        authRequestHandler = $httpBackend.when('GET', '/auth.py')
            .respond({userId: 'userX'}, {'A-Token': 'xxx'});

        // Get hold of a scope (i.e. the root scope)
        $rootScope = $injector.get('$rootScope');
        // The $controller service is used to create instances of controllers
        var $controller = $injector.get('$controller');

        createController = function() {
            return $controller('mockController', {'$scope' : $rootScope });
        };
    }));


    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

});



