describe('Controller: Ir Sample Controller', function () {

    beforeEach(module('config.matchbox', 'http.matchbox', 'irsample.matchbox'));

    var sampleCtrl,
        httpBackend,
        secondController,
        scope;


    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        scope = {};
        httpBackend = $httpBackend;
        // stateParams = { sampleId: 1 }; //mock your stateparams object with your id
        scope = $rootScope.$new();

        // secondController = $controller('SampleController', {
        //     sampleId: '12345'
        // });
        // scope.$state = $stateParams;

        sampleCtrl = $controller('SampleController', {
            $scope: $rootScope,
            DTOptionsBuilder: {
                newOptions: function () {
                    return {
                        withDisplayLength: function (length) {
                            return 100;
                        }
                    };
                }
            }
        });
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should have assigned right pattern to numberPattern', function(){
        expect(scope.loadSamplesList).toBeDefined();
    });

});