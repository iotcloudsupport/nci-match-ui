(function () {

    angular.module('patient.matchbox', [])
        .controller('PatientController', PatientController);

    function PatientController($scope,
        DTOptionsBuilder,
        matchApiMock,
        $stateParams,
        $log,
        prompt,
        $uibModal,
        $state,
        $window) {

        var vm = this;

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);

        vm.enabledFileButtonClass = 'btn-success';
        vm.disabledFileButtonClass = 'btn-default btn-outline-default disabled';

        $scope.activeTab = 'summary';

        $scope.patient_id = '';
        $scope.warningResult = false;

        $scope.confirmTitle = 'Confirmation Changed';
        $scope.confirmMessage = 'Please enter a reason:';

        $scope.surgicalEventLabel = 'Latest';
        $scope.surgicalEventOptions = [];
        $scope.surgicalEventOption = null;

        $scope.files = [];

        $scope.currentSurgicalEvent = null;
        $scope.currentAnalisys = null;
        $scope.currentShipment = null;
        $scope.currentVariantReport = null;
        $scope.currentBloodVariantReport = null;

        $scope.currentTreatmentArm = 'Not Selected';

        $scope.variantReports = [];

        $scope.variantReportOptions = [];
        $scope.variantReportOption = null;

        $scope.bloodVariantReportOptions = [];
        $scope.bloodVariantReportOption = null;

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
        $scope.showWarning = showWarning;
        $scope.showConfirmation = showConfirmation;
        $scope.editComment = editComment;
        $scope.confirmVariantReport = confirmVariantReport;
        $scope.rejectVariantReport = rejectVariantReport;
        $scope.setupScope = setupScope;
        $scope.showPrompt = showPrompt;
        $scope.getFileButtonClass = getFileButtonClass;
        $scope.getAllFilesButtonClass = getAllFilesButtonClass;
        $scope.loadVariantReportChart = loadVariantReportChart;
        $scope.loadBloodVariantReportChart = loadBloodVariantReportChart;
        $scope.onSurgicalEventSelected = onSurgicalEventSelected;
        $scope.onBloodVariantReportSelected = onBloodVariantReportSelected;
        $scope.onVariantReportSelected = onVariantReportSelected;
        $scope.showVariantReportActions = showVariantReportActions;
        $scope.setActiveTab = setActiveTab;

        function setActiveTab(tab) {
            $scope.activeTab = tab;
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
            if ($scope.variantReports && selected in $scope.variantReports) {
                $scope.currentVariantReport = $scope.variantReports[$scope.variantReportType + '' + $scope.variantReportMode];
            } else {
                $scope.currentVariantReport = null;
            }
        }

        function loadPatientData() {
            matchApiMock
                .loadPatient($stateParams.patient_id)
                .then(setupScope, handleError);
        }

        function handleError(e) {
            $log.error(e);
            $log.info('Error while retriving data from the service. Transferring back to patient list');
            $state.transitionTo('patients')
            return;
        }

        function setupScope(data) {
            if (!data || !data.data) {
                $log.error('The web service didn\'t send patient data. Transferring back to patient list');
                $state.transitionTo('patients')
            }

            $scope.patient_id = $stateParams.patient_id;
            var scopeData = {};
            angular.copy(data.data, scopeData);
            $scope.data = scopeData;

            __addMockData(); //TODO:RZ remove after we have the data

            setupTimeline();
            setupSurgicalEventOptions();
            setupVariantReports();
            setupVariantReportOptions();
            setupCurrentTreatmentArm();
        }

        function __addMockData() {
            // $scope.data.ta_history = [
            //     {
            //         'name':'APEC1621-A', 
            //         'version':'2015-08-06', 
            //         'stratum':'s124', 
            //         'title':'APEC1621-A (2015-08-06)', 
            //         'step': 'Step 2.0', 
            //         'assignment_reason': 'The patient and treatment match on variand identifier [ABSF, DEDF].', 
            //         'assignment_date':'2016-06-25T14:46:10+34:00'
            //     }
            // ];
        }

        function setupTimeline() {
            var now = moment();

            for (var i = 0; i < $scope.data.timeline.length; i++) {
                var timelineEvent = $scope.data.timeline[i];
                var eventDateMoment = moment(timelineEvent.event_date);
                var diff = eventDateMoment.diff(now, "DD/MM/YYYY HH:mm:ss");
                timelineEvent.from_now = moment.duration(diff).humanize(true);
            }
        }

        function setupSurgicalEventOptions() {
            if (!$scope.data.specimen_history) {
                $log.error('The web service didn\'t send Secimen History');
                return;
            }

            for (var i = 0; i < $scope.data.specimen_history.length; i++) {
                var surgicalEvent = $scope.data.specimen_history[i];

                var item = {
                    text: 'Surgical Event ' + surgicalEvent.surgical_event_id,
                    value: {
                        event_index: i,
                        surgical_event_id: surgicalEvent.surgical_event_id
                    }
                }

                if (!$scope.surgicalEventOption) {
                    $scope.surgicalEventOption = item;
                    selectSurgicalEvent(item);
                }

                $scope.surgicalEventOptions.push(item);
            }

            selectSurgicalEvent($scope.surgicalEventOptions[$scope.surgicalEventOptions.length - 1]);
        }

        function setupVariantReports() {
            $scope.variantReports = [];

            if (!$scope.data.variant_reports || !$scope.data.variant_reports.length) {
                $log.error('The web service didn\'t send Variant Reports');
                return;
            }

            for (var i = 0; i < $scope.data.variant_reports.length; i++) {
                $scope.data.variant_reports[i].variant_report_mode = 'FILTERED';
                $scope.variantReports['' + $scope.data.variant_reports[i].variant_report_type + $scope.data.variant_reports[i].variant_report_mode] = $scope.data.variant_reports[i];

                //TODO:RZ this is for demo only, remove after QC reports are implemented
                var qcReport = {};
                angular.copy($scope.data.variant_reports[i], qcReport);
                qcReport.variant_report_mode = 'QC';

                $scope.variantReports['' + qcReport.variant_report_type + qcReport.variant_report_mode] = qcReport;
            }

            $scope.variantReportType = 'TISSUE';
            $scope.variantReportMode = 'FILTERED';

            setVariantReport();
        }

        function setupVariantReportOptions() {
            if (!$scope.data.variant_reports || !$scope.data.variant_reports.length) {
                return;
            }

            for (var i = 0; i < $scope.data.variant_reports.length; i++) {
                var variantReport = $scope.data.variant_reports[i];

                if (variantReport.surgical_event_id) {
                    var surgicalEventOption = findSurgicalEventOption(variantReport.surgical_event_id);
                    if (surgicalEventOption) {
                        var variantReportItem = {
                            text: 'Variant Report Analysis ID ' + variantReport.analysis_id + ' | Surgical Event ' + variantReport.surgical_event_id,
                            value: {
                                surgical_event_id: variantReport.surgical_event_id,
                                analysis_id: variantReport.analysis_id
                            }
                        }

                        if (!$scope.variantReportOption) {
                            $scope.variantReportOption = variantReportItem;
                            selectVariantReport(variantReportItem);
                        }

                        $scope.variantReportOptions.push(variantReportItem);
                    } else {
                        $log.error('Unable to find Surgical Event by ' + variantReport.surgical_event_id);
                    }
                } else if (variantReport.variant_report_type === 'BLOOD') {
                    var bloodVariantReportItem = {
                        text: 'Variant Report Analysis ID ' + variantReport.analysis_id,
                        value: {
                            analysis_id: variantReport.analysis_id
                        }
                    }

                    if (!$scope.bloodVariantReportOption) {
                        $scope.bloodVariantReportOption = bloodVariantReportItem;
                    }

                    if (!$scope.currentBloodVariantReport) {
                        $scope.currentBloodVariantReport = variantReport;
                    }

                    $scope.bloodVariantReportOptions.push(variantReport);
                }
                else {
                    $log.error('Invalid Variant Report type ' + variantReport.variant_report_type);
                }
            }
        }

        function findSurgicalEventOption(surgical_event_id) {
            for (var i = 0; i < $scope.surgicalEventOptions.length; i++) {
                var item = $scope.surgicalEventOptions[i];
                if (item.value.surgical_event_id === surgical_event_id) {
                    return item;
                }
            }
            return null;
        }

        function setupCurrentTreatmentArm() {
            $scope.currentTreatmentArm = $scope.data &&
                $scope.data.current_assignment &&
                $scope.data.current_assignment.treatment_arms &&
                $scope.data.current_assignment.treatment_arms.selected &&
                $scope.data.current_assignment.treatment_arms.selected.length ? $scope.data.current_assignment.treatment_arms.selected[0].treatment_arm : "Not Selected";
        }

        function dzAddedFile(file) {
            // $log.debug(file);
        }

        function dzError(file, errorMessage) {
            // $log.debug(errorMessage);
        }

        function editComment(variant) {
            $log.debug('Variant = ' + variant);

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
                $log.debug('comment');
                $log.debug(comment);
            });
        }

        function showPrompt(options) {
            return prompt(options);
        }

        function showWarning(title, message) {
            $scope.warningResult = false;
            showPrompt({
                title: title,
                message: message,
                buttons: [{ label: 'OK', primary: true }, { label: 'Cancel', cancel: true }]
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
                buttons: [{ label: 'OK', primary: true }, { label: 'Cancel', cancel: true }]
            }).then(function (comment) {
                $log.debug('User entered comment: ' + comment);
            });
        }

        function confirmVariantReport() {
            showPrompt({
                title: 'Confirm Variant Report',
                message: 'Are you sure you want to confirm the Variant Report',
                buttons: [{ label: 'OK', primary: true }, { label: 'Cancel', cancel: true }]
            }).then(function (comment) {
                if (!$scope.currentVariantReport) {
                    $log.error('Current Variant Report is not set');
                } else {
                    $scope.currentVariantReport.status = 'CONFIRMED';
                }
            });
        }

        function rejectVariantReport() {
            showPrompt({
                title: 'Reject Variant Report',
                message: 'Are you sure you want to reject the Variant Report? Please enter reason:',
                input: true,
                buttons: [{ label: 'OK', primary: true }, { label: 'Cancel', cancel: true }]
            }).then(function (comment) {
                if (!$scope.currentVariantReport) {
                    $log.error('Current Variant Report is not set');
                } else {
                    $scope.currentVariantReport.status = 'RECTED';
                }
            });
        }

        function getFileButtonClass(filePath) {
            return filePath ? vm.enabledFileButtonClass : vm.disabledFileButtonClass;
        }

        function getAllFilesButtonClass(obj) {
            try {
                if (obj) {
                    for (var i = 0; i < arguments.length; i++) {
                        if (arguments[i] in obj && obj[arguments[i]]) {
                            return vm.enabledFileButtonClass;
                        }
                    }
                } else {
                    //$log.debug('getAllFilesButtonClass no obj');
                }
                return vm.disabledFileButtonClass;
            } catch (error) {
                return vm.disabledFileButtonClass;
            }
        }

        function loadVariantReportChart() {
            $window.d3BoxVersion5Mock();
        }

        function loadBloodVariantReportChart() {
            $window.d3BoxVersion5Mock();
        }

        function onSurgicalEventSelected(selected) {
            $log.debug(selected);

            var bySurgicalEvent = function (x) { return x.value.surgical_event_id === selected.value.surgical_event_id };
            var variantReportItem = $scope.variantReportOptions.find(bySurgicalEvent);

            if (variantReportItem) {
                $log.debug(selected);
                $scope.variantReportOption = variantReportItem;
                selectSurgicalEvent(selected);
                selectVariantReport(variantReportItem);
            } else {
                $log.error('Unable to find Variant Report by ' + selected.value.surgical_event_id + ', ' + selected.value.analysis_id);
            }
        }

        function onVariantReportSelected(selected) {
            $log.debug(selected);

            var bySurgicalEvent = function (x) { return x.value.surgical_event_id === selected.value.surgical_event_id };
            var surgicalEventItem = $scope.surgicalEventOptions.find(bySurgicalEvent);

            if (surgicalEventItem) {
                $log.debug(selected);
                $scope.surgicalEventOption = surgicalEventItem;
                selectSurgicalEvent(surgicalEventItem);
                selectVariantReport(selected);
            } else {
                $log.error('Unable to find Surgical Event by ' + selected.value.surgical_event_id);
            }
        }

        function selectSurgicalEvent(option) {
            $scope.currentSurgicalEvent = null;
            $scope.currentAnalisys = null;
            $scope.currentShipment = null;

            for (var i = 0; i < $scope.data.specimen_history.length; i++) {
                var surgicalEvent = $scope.data.specimen_history[i];

                if (surgicalEvent.surgical_event_id === option.value.surgical_event_id) {
                    $scope.currentSurgicalEvent = surgicalEvent;

                    if (surgicalEvent.specimen_shipments && surgicalEvent.specimen_shipments.length) {
                        var shipment = surgicalEvent.specimen_shipments[0];
                        if (shipment.analyses && shipment.analyses.length) {
                            var analysis = shipment.analyses[0];
                            $scope.currentAnalisys = analysis;
                        }
                    }

                    if (surgicalEvent.specimen_shipments && surgicalEvent.specimen_shipments.length) {
                        $scope.currentShipment = surgicalEvent.specimen_shipments[surgicalEvent.specimen_shipments.length - 1];
                    }
                }
            }
        }

        function selectVariantReport(option) {
            for (var i = 0; i < $scope.data.variant_reports.length; i++) {
                var variantReport = $scope.data.variant_reports[i];

                if (variantReport.surgical_event_id === option.value.surgical_event_id) {
                    $scope.currentVariantReport = variantReport;
                    return;
                }
            }
            $log.error('Variant report is not found for ' + option.value.surgical_event_id);
        }

        function onBloodVariantReportSelected(selected) {
            $log.debug(selected);
        }

        function showVariantReportActions(variantReport) {
            return variantReport && variantReport.status && variantReport.status === 'PENDING';
        }
    }

} ());
