describe('Controller: Patients Controller', function () {

    'use strict'

    function getTestData() {

        var data = [
            {
                patientSequenceNumber: 100065,
                gender: 'Male',
                ethnicity: 'White',
                status: 'REGISTRATION',
                treatmentArm: 'EAY131-A',
                step: 0,
                registrationDate: 1441165873572,
                diseases: 'Disease 1'
            },
            {
                patientSequenceNumber: 100087,
                gender: 'Female',
                ethnicity: 'White',
                status: 'PENDING',
                treatmentArm: 'EAY131-B',
                step: 1,
                registrationDate: 1430165873572,
                diseases: 'Disease 3'
            },
            {
                patientSequenceNumber: 100099,
                gender: 'Male',
                ethnicity: 'Hispanic',
                status: 'ON_TREATMENT_ARM',
                treatmentArm: 'EAY131-C',
                step: 2,
                registrationDate: 1440765873572,
                offTrialDate: 1440165878572,
                diseases: 'Disease 3'
            }
        ];

        return data;
    }

    beforeEach(module(
        'config.matchbox',
        'patients.matchbox',
        'http.matchbox'));

    var $scope;
    var matchApiMock;
    var ctrl;
    var $stateParams;
    var $log;
    var $q;

    beforeEach(inject(function (_$rootScope_, _$controller_, _matchApiMock_, _$log_, _$q_) {
        $log = _$log_;
        $q = _$q_;
        $scope = {};
        matchApiMock = _matchApiMock_;
        ctrl = _$controller_('PatientsController', {
            $scope: $scope,
            DTOptionsBuilder: {
                newOptions: function () {
                    return {
                        withDisplayLength: function (length) {
                            return 100;
                        }
                    };
                }
            },
            matchApiMock: _matchApiMock_
        });
    }));

    it('should have DataTable objects defined', function () {
        expect(ctrl.dtOptions).toBeDefined();
        expect(ctrl.dtColumnDefs).toBeDefined();
        expect(ctrl.dtInstance).toBeDefined();
    });

    it('should have empty list until load is called', function () {
        expect($scope.patientList).toBeDefined();
        expect($scope.patientList.length).toBe(0);
    });

    it('should call api load method and have the list populated', function () {
        spyOn(matchApiMock, 'getPatientListData').and.callFake(function () {
            var deferred = $q.defer();

            var data = getTestData();

            $scope.patientList = data

            deferred.resolve(data);
            return deferred.promise;
        });

        $scope.loadPatientList();
        expect(matchApiMock.getPatientListData).toHaveBeenCalled();
        expect($scope.patientList.length).toBeGreaterThan(0);
    });

});