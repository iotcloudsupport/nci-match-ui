(function () {

    angular.module('patient.matchbox', [])
        .controller('PatientController', PatientController);

    function PatientController($scope,
        DTOptionsBuilder,
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
        
        $scope.biopsySampleLabel = 'Latest';

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
        $scope.editComment = editComment;
        $scope.confirmVariantReport = confirmVariantReport;

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
                    $scope.currentSendout = data.currentSendout;
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
                message: message,
                buttons: [{ label:'OK', primary: true }, { label:'Cancel', cancel: true }]
            }).then(function (comment) {
                $log.debug('User agreed after warning');
            });
        }

        function showConfirmation(title, message) {
            prompt({
                title: title,
                message: message,
                input: true,
                buttons: [{ label:'OK', primary: true }, { label:'Cancel', cancel: true }]
            }).then(function (comment) {
                $log.debug('User entered comment: ' + comment);
            });
        }

        function editComment(variant) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/templates/modal_dialog_with_comment.html',
                controller: 'ModalDialogWithCommentController',
                resolve: {
                    comment: function () {
                        return variant.comment;
                    },
                    title: function () {
                        return $scope.confirmTitle;
                    },
                    message: function () {
                        return $scope.confirmMessage;
                    }                    
                }
            });

            modalInstance.result.then(function (comment) {
                variant.comment = comment;
                $log.debug(comment);
            });
        }
        
        function confirmVariantReport() {
            prompt({
                title: 'Please confirm Variant Report approval',
                message: 'Enter comments',
                input: true,
                buttons: [{ label:'OK', primary: true }, { label:'Cancel', cancel: true }]
            }).then(function (comment) {
                if (!$scope.variantReport) {
                    $log.error('Current Variant Report is not set');
                }              
                $scope.variantReport.status = 'CONFIRMED';
            });
        }
    }

} ());
