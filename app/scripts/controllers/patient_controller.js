(function () {

    angular.module('patient.matchbox', [])
        .controller('PatientController', PatientController);

    function PatientController($scope,
        DTOptionsBuilder,
        DTColumnDefBuilder,
        matchApiMock,
        $stateParams,
        $log,
        prompt,
        $uibModal) {

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);

        $scope.patientSequenceNumber = '';

        $scope.confirmTitle = 'Confirmation Changed';
        $scope.confirmMessage = 'Please enter a reason:';

        $scope.files = [];

        $scope.dropzoneConfig = {
            url: '/alt_upload_url',
            parallelUploads: 3,
            maxFileSize: 30
        };

        $scope.setVariantReportType = setVariantReportType;
        $scope.setVariantReportMode = setVariantReportMode;
        $scope.getVariantReportTypeClass = getVariantReportTypeClass;
        $scope.getVariantReportModeClass = getVariantReportModeClass;
        $scope.dzAddedFile = dzAddedFile;
        $scope.dzError = dzError;
        $scope.loadPatientData = loadPatientData;
        $scope.setComment = setComment;
        $scope.showWarning = showWarning;
        $scope.showConfirmation = showConfirmation;
        $scope.showComment = showComment;

        function setVariantReportType(reportType) {
            if ($scope.variantReportType === reportType) {
                return;
            }

            $scope.variantReportType = reportType;
            setVariantReport();
        }

        function setVariantReportMode(reportMode) {
            if ($scope.variantReportMode === reportMode) {
                return;
            }

            $scope.variantReportMode = reportMode;
            setVariantReport();
        }

        function getVariantReportTypeClass(reportType) {
            return $scope.variantReportType === reportType ? 'active' : '';
        }

        function getVariantReportModeClass(reportMode) {
            return $scope.variantReportMode === reportMode ? 'active' : '';
        }

        function setVariantReport() {
            $scope.variantReport = $scope.variantReports[$scope.variantReportType + '' + $scope.variantReportMode];
        }

        function loadPatientData() {
            matchApiMock
                .getPatientDetailsData($stateParams.patientSequenceNumber)
                .then(function (data) {
                    $scope.patientSequenceNumber = $stateParams.patientSequenceNumber;

                    $scope.patient = data.patient;
                    $scope.treatmentArms = data.treatmentArms;
                    $scope.timeline = data.timeline;
                    $scope.assayHistory = data.assayHistory;
                    $scope.sendouts = data.sendouts;
                    $scope.biopsy = data.biopsy;
                    $scope.variantReports = data.variantReports;
                    $scope.variantReportOptions = data.variantReportOptions;
                    $scope.variantReportOption = data.variantReportOption;
                    $scope.assignmentReport = data.assignmentReport;
                    $scope.biopsyReport = data.biopsyReport;
                    $scope.biopsyReports = data.biopsyReports;
                    $scope.patientDocuments = data.patientDocuments;
                })
                .then(function () {
                    $scope.variantReportType = 'tumorTissue';
                    $scope.variantReportMode = 'Normal';
                    setVariantReport();
                });
        }

        function dzAddedFile(file) {
            $log.debug(file);
        }

        function dzError(file, errorMessage) {
            $log.debug(errorMessage);
        }

        function setComment(value) {
            $log.debug('User entered un-confirm reason: ' + value);
        }

        function showWarning(title, message) {
            prompt({
                title: title,
                message: message
            }).then(function (comment) {
                $log.debug('User agreed after warning');
            });
        }

        function showConfirmation(title, message) {
            prompt({
                title: title,
                message: message,
                input: true
            }).then(function (comment) {
                $log.debug('User entered comment: ' + comment);
            });
        }

        function showComment(variant) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalDialogController',
                // size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $log.info(selectedItem);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

} ());
