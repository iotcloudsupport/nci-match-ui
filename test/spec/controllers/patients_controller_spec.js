xdescribe('Controller: Patients Controller', function () {

    'use strict'

    function getTestData() {

        var data = {
            data:
            [
                {
                    "patient_id": "100065",
                    "gender": "Male",
                    "ethnicity": "White",
                    "current_status": "REGISTRATION",
                    "treatment_arm": "EAY131-A",
                    "current_step_number": "0",
                    "registration_date": "2016-05-09T22:06:33.000+00:00",
                    "disease_name": "Disease 1"
                },
                {
                    "patient_id": "100087",
                    "gender": "Female",
                    "ethnicity": "White",
                    "current_status": "PENDING",
                    "treatment_arm": "EAY131-B",
                    "current_step_number": "1",
                    "registration_date": "2016-05-09T22:06:33.000+00:00",
                    "disease_name": "Disease 3"
                },
                {
                    "patient_id": "100099",
                    "gender": "Male",
                    "ethnicity": "Hispanic",
                    "current_status": "ON_TREATMENT_ARM",
                    "treatment_arm": "EAY131-C",
                    "current_step_number": "2",
                    "registration_date": "2016-05-09T22:06:33.000+00:00",
                    "off_trial_date": "2016-05-09T22:06:33.000+00:00",
                    "disease_name": "Disease 3"
                }
            ]
        };

        return data;
    }

    beforeEach(module(
        'config.matchbox',
        'matchbox.patients',
        'http.matchbox'));

    var $scope;
    var matchApiMock;
    var ctrl;
    var $stateParams;
    var $log;
    var $q;
    var deferred;
    var testData;

    beforeEach(inject(function (_$rootScope_, _$controller_, _matchApiMock_, _$log_, _$q_) {
        testData = getTestData();
        deferred = _$q_.defer();
        $log = _$log_;
        $q = _$q_;
        $scope = _$rootScope_.$new();
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
        deferred.resolve(testData);

        spyOn(matchApiMock, 'loadPatientList').and.returnValue(deferred.promise);

        $scope.loadPatientList();
        $scope.$apply();

        expect(matchApiMock.loadPatientList).toHaveBeenCalled();
        expect($scope.patientList.length).toBeGreaterThan(0);
    });

});