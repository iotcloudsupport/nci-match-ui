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

        $scope.patient_id = '';
        $scope.warningResult = false;

        $scope.confirmTitle = 'Confirmation Changed';
        $scope.confirmMessage = 'Please enter a reason:';
        
        $scope.biopsySampleLabel = 'Latest';

        $scope.files = [];

        $scope.currentSpecimen = {};

        $scope.dropzoneConfig = {
            url: '/alt_upload_url',
            parallelUploads: 3,
            maxFileSize: 30
        };

        $scope.getCurrentAssignment = getCurrentAssignment;
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
        $scope.rejectVariantReport = rejectVariantReport;
        $scope.setupScope = setupScope;
        $scope.setupVariantReport = setupVariantReport;
        $scope.showPrompt = showPrompt;

        function getCurrentAssignment() {
            return $scope.data && 
                $scope.data.current_assignment &&
                $scope.data.current_assignment.treatment_arms &&
                $scope.data.current_assignment.treatment_arms.selected &&
                $scope.data.current_assignment.treatment_arms.selected.length ? $scope.data.current_assignment.treatment_arms.selected[0].treatment_arm : "Not Selected";
        }

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
            var selected = $scope.variantReportType + '' + $scope.variantReportMode;
            if ($scope.variantReports && selected in $scope.variantReports)
                $scope.variantReport = $scope.variantReports[$scope.variantReportType + '' + $scope.variantReportMode];
            else
                $scope.variantReport = {};
        }

        function loadPatientData() {
            matchApiMock
                .loadPatient()
                .then(setupScope)
                .then(setupVariantReport);
        }

        function setupScope(data){
            $scope.patient_id = $stateParams.patient_id;
            var scopeData = {};
            angular.copy(data, scopeData);
            $scope.data = scopeData;

            if (scopeData.specimen && scopeData.specimen.specimen_shipments) {
                $scope.currentSpecimen = scopeData.specimen.specimen_shipments[scopeData.specimen.specimen_shipments.length - 1];
            }

            // $scope.patient = data.patient;
            // $scope.treatmentArms = data.treatmentArms;
            // $scope.timeline = data.timeline;
            // $scope.assayHistory = data.assayHistory;
            // $scope.sendouts = data.sendouts;
            // $scope.biopsy = data.biopsy;
            // $scope.variantReports = data.variantReports;
            // $scope.variantReportOptions = data.variantReportOptions;
            // $scope.variantReportOption = data.variantReportOption;
            // $scope.assignmentReport = data.assignmentReport;
            // $scope.biopsyReport = data.biopsyReport;
            // $scope.biopsyReports = data.biopsyReports;
            // $scope.patientDocuments = data.patientDocuments;
            // $scope.currentSendout = data.currentSendout;
        }

        function setupVariantReport() {
            $scope.variantReportType = 'tumorTissue';
            $scope.variantReportMode = 'Normal';
            setVariantReport();
        }

        function dzAddedFile(file) {
            // $log.debug(file);
        }

        function dzError(file, errorMessage) {
            // $log.debug(errorMessage);
        }
        
        function setComment(value) {
            //$log.debug('User entered un-confirm reason: ' + value);
        }

        function showPrompt(options) {
            return prompt(options);
        }

        function showWarning(title, message) {
            $scope.warningResult = false;
            showPrompt({
                title: title,
                message: message,
                buttons: [{ label:'OK', primary: true }, { label:'Cancel', cancel: true }]
            }).then(function () {
                $scope.warningResult = true;
                $log.debug('User agreed after warning');
            });
        }

        function showConfirmation(title, message) {
            showPrompt({
                title: title,
                message: message,
                input: true,
                buttons: [{ label:'OK', primary: true }, { label:'Cancel', cancel: true }]
            }).then(function (comment) {
                $log.debug('User entered comment: ' + comment);
            });
        }

        function editComment(variant) {
            $log('Variant = ' + variant);
            
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
            showPrompt({
                title: 'Confirm Variant Report',
                message: 'Are you sure you want to confirm the Variant Report',
                buttons: [{ label:'OK', primary: true }, { label:'Cancel', cancel: true }]
            }).then(function (comment) {
                if (!$scope.variantReport) {
                    $log.error('Current Variant Report is not set');
                } else {
                    $scope.variantReport.status = 'CONFIRMED';
                }              
            });
        }
        
        function rejectVariantReport() {
            showPrompt({
                title: 'Reject Variant Report',
                message: 'Are you sure you want to reject the Variant Report? Please enter reason:',
                input: true,
                buttons: [{ label:'OK', primary: true }, { label:'Cancel', cancel: true }]
            }).then(function (comment) {
                if (!$scope.variantReport) {
                    $log.error('Current Variant Report is not set');
                } else {                    
                    $scope.variantReport.status = 'RECTED';
                }       
            });
        }
    }

} ());
