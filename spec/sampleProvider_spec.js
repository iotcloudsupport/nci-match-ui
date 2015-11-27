


angular.module('myApplicationModule', [])
    .value('mode', 'app')
    .value('version', 'v1.0.1');

angular.module('reportModule', [])
    .value('data', ['10/10/2015','<a href="#">Link</a>','JSON'])
    .value('version', 'v1.0.1');

//angular.module('mockModule', [])
//    .controller('MainCtrl', function($scope, $location) {
//    $scope.isActive = function(route) {
//        return route === $location.path();
//    };
//});



// The module code
angular
    .module('mockApp', [])
    .controller('mockController', mockController);

// The controller code
function mockController($scope, $http) {
    var authToken;

    $http.get('/auth.py').success(function(data, status, headers) {
        authToken = headers('A-Token');
        $scope.user = data;
    });

    $scope.saveMessage = function(message) {
        var headers = { 'Authorization': authToken };
        $scope.status = 'Saving...';

        $http.post('/add-msg.py', message, { headers: headers } ).success(function(response) {
            $scope.status = '';
        }).error(function() {
            $scope.status = 'Failed...';
        });
    };
}

//angular.module('navigationModule', [])
//    .controller('navCtrl', navCtrl);

describe('MyApp', function() {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('myApplicationModule'));


    // inject() is used to inject arguments of all given functions
    it('should provide a version', inject(function(mode, version) {
        expect(version).toEqual('v1.0.1');
        expect(mode).toEqual('app');
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



describe('Report Controlling App', function() {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('reportModule'));

    // inject() is used to inject arguments of all given functions
    it('should provide a data tested', inject(function(data) {
        //expect(data).toEqual(['10/10/2015','<a href="#">Link</a>','PDF']);
        expect(data).toEqual(['10/10/2015','<a href="#">Link</a>','JSON']);
    }));

    // inject() is used to inject arguments of all given functions
    //it('should provide a version', inject(function(data, version) {
    //    expect(version).toEqual('v1.0.1');
    //
    //}));


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

//describe('Mock Http link', function() {
//    var scope, httpBackend, createController;
//
//    beforeEach(inject(function($rootScope, $httpBackend, $controller) {
//        httpBackend = $httpBackend;
//        scope = $rootScope.$new();
//
//        createController = function() {
//            return $controller('MainCtrl', {
//                '$scope': scope
//            });
//        };
//    }));
//
//    afterEach(function() {
//        httpBackend.verifyNoOutstandingExpectation();
//        httpBackend.verifyNoOutstandingRequest();
//    });
//
//
//    //Test Backend cotroller
//    it('should run the Test to get the link data from the go backend ##', function() {
//        var controller = createController();
//        scope.urlToScrape = 'success.com';
//
//        httpBackend.expect('GET', '/slurp?urlToScrape=http:%2F%2Fsuccess.com')
//            .respond({
//                "success": true,
//                "links": ["http://www.google.com", "http://angularjs.org", "http://amazon.com"]
//            });
//
//        // have to use $apply to trigger the $digest which will
//        // take care of the HTTP request
//        scope.$apply(function() {
//            scope.runTest();
//        });
//
//        expect(scope.parseOriginalUrlStatus).toEqual('calling');
//
//        httpBackend.flush();
//
//        expect(scope.retrievedUrls).toEqual(["http://www.google.com", "http://angularjs.org", "http://amazon.com"]);
//        expect(scope.parseOriginalUrlStatus).toEqual('waiting');
//        expect(scope.doneScrapingOriginalUrl).toEqual(true);
//    });
//});

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


    it('should fetch authentication token', function() {
        $httpBackend.expectGET('/auth.py');
        var controller = createController();
        $httpBackend.flush();
    });





    it('should send msg to server', function() {
        var controller = createController();
        $httpBackend.flush();

        // now you don’t care about the authentication, but
        // the controller will still send the request and
        // $httpBackend will respond without you having to
        // specify the expectation and response for this request

        $httpBackend.expectPOST('/add-msg.py', 'message content').respond(201, '');
        $rootScope.saveMessage('message content');
        expect($rootScope.status).toBe('Saving...');
        $httpBackend.flush();
        expect($rootScope.status).toBe('');
    });


    it('should send auth header', function() {
        var controller = createController();
        $httpBackend.flush();

        $httpBackend.expectPOST('/add-msg.py', undefined, function(headers) {
            // check if the header was sent, if it wasn't the expectation won't
            // match the request and the test will fail
            return headers['Authorization'] == 'xxx';
        }).respond(201, '');

        $rootScope.saveMessage('whatever');
        $httpBackend.flush();
    });


    it('should fail authentication', function() {

        // Notice how you can change the response even after it was set
        authRequestHandler.respond(401, '');

        $httpBackend.expectGET('/auth.py');
        var controller = createController();
        $httpBackend.flush();

        expect($rootScope.status).toBe('Failed...');
    });

});

//Report Mocking
//describe('Report Controlling Navigation Mock', function() {
//
//
//    beforeEach(module('navigationModule'));
//
//    var controller, scope, $location, DataService;
//    var tests = 0;
//
//    beforeEach(inject(function ($rootScope, $controller, _$location_, _DataService_) {
//        $location = _$location_;
//        DataService = _DataService_;
//        scope = $rootScope.$new();
//
//        controller = $controller('navCtrl', {
//            $scope: scope
//        });
//    }));
//
//
//// --- SPECS -------------------------
////    var myGlobal;
////
////    beforeEach(function() {
////        // This will run before any it function.
////        // Resetting a global state so the change in this function is testable
////        myGlobal = 10
////    });
////
////    describe('first suite', function(){
////        it('is a test', function(){
////            expect(myGlobal).toBe(10);
////            // Set the value to show that beforeEach is executed for each it function
////            myGlobal = 20;
////            expect(myGlobal).toBe(20);
////        });
////
////        it('is another test', function(){
////            expect(myGlobal).toBe(10);
////            myGlobal = 30;
////            expect(myGlobal).toBe(30);
////        });
////    });
////
////    describe('second suite', function(){
////        it('is a test', function(){
////            expect(myGlobal).toBe(10);
////        });
////    });
//});


