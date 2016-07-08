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
        $window,
        store) {

        var vm = this;

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(100);

        $scope.currentUser = null;

        vm.enabledFileButtonClass = 'btn-success';
        vm.disabledFileButtonClass = 'btn-default btn-outline-default disabled';

        $scope.activeTab = 'summary';
        $scope.activeTabIndex = 0;

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
        $scope.currentAssignmentReport = null;

        $scope.currentTreatmentArm = null;

        $scope.variantReports = [];

        $scope.variantReportOptions = [];
        $scope.variantReportOption = null;

        $scope.bloodVariantReportOptions = [];
        $scope.bloodVariantReportOption = null;

        $scope.assignmentReportOptions = [];
        $scope.assignmentReportOption = null;
        $scope.selectedTreatmentArm = null;

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
        $scope.onAssignmentReportSelected = onAssignmentReportSelected;
        $scope.showVariantReportActions = showVariantReportActions;
        $scope.showAssignmentReportActions = showAssignmentReportActions;
        $scope.setActiveTab = setActiveTab;

        function setActiveTab(tab) {
            $scope.activeTab = tab;
        }

        function setVariantReportType(reportType) {
            if ($scope.variantReportType === reportType) {
                return;
            }

            $scope.variantReportType = reportType;
            selectVariantReport($scope.variantReportOption);
        }

        function setVariantReportMode(reportMode) {
            if ($scope.variantReportMode === reportMode) {
                return;
            }

            $scope.variantReportMode = reportMode;
            selectVariantReport($scope.variantReportOption);
        }

        function getVariantReportTypeClass(reportType) {
            return $scope.variantReportType === reportType ? 'active' : '';
        }

        function getVariantReportModeClass(reportMode) {
            return $scope.variantReportMode === reportMode ? 'active' : '';
        }

        function loadPatientData() {
            matchApiMock
                .loadPatient($stateParams.patient_id)
                .then(setupScope, handleError).then(navigateTo($stateParams));
        }

        function handleError(e) {
            $log.error(e);
            $log.info('Error while retriving data from the service. Transferring back to patient list');
            $state.transitionTo('patients');
            return;
        }

        function setupScope(data) {
            if (!data || !data.data) {
                $log.error('The web service didn\'t send patient data. Transferring back to patient list');
                $state.transitionTo('patients');
            }

            $scope.patient_id = $stateParams.patient_id;
            var scopeData = {};
            angular.copy(data.data, scopeData);
            $scope.data = scopeData;

            setupCurrentTreatmentArm();
            setupTimeline();
            setupSurgicalEventOptions();
            setupVariantReportOptions();
            setupVariantReports();
            setupVariantReportOptions();
            setupAssignmentReportOptions();
            setupSelectedTreatmentArm();
            setupUserName();
        }

        function setupTimeline() {
            var now = moment();
            var previousStep = null;

            for (var i = 0; i < $scope.data.timeline.length; i++) {
                var timelineEvent = $scope.data.timeline[i];
                var eventDateMoment = moment(timelineEvent.event_date);
                var diff = eventDateMoment.diff(now, "DD/MM/YYYY HH:mm:ss");
                timelineEvent.from_now = moment.duration(diff).humanize(true);

                if (previousStep && previousStep !== timelineEvent.step) {
                    timelineEvent.isStepChanging = true;
                    previousStep = timelineEvent.step;
                }

                if (!previousStep) {
                    previousStep = timelineEvent.step;
                }
            }
        }

        function setupUserName() {
            var name;
            var profile = store.get('profile');
            if (profile.user_metadata && profile.user_metadata.firstName) {
                name = profile.user_metadata.firstName;
            } else if (profile.email) {
                name = profile.email;
            } else {
                name = 'MATCHBox User';
            }
            $scope.currentUser = name;
        }

        function setupSurgicalEventOptions() {
            if (!$scope.data.specimen_history) {
                $log.error('The web service didn\'t send Secimen History');
                return;
            }

            for (var i = 0; i < $scope.data.specimen_history.length; i++) {
                var surgicalEvent = $scope.data.specimen_history[i];

                var item = {
                    text: 'Surgical Event ID ' + surgicalEvent.surgical_event_id,
                    value: {
                        event_index: i,
                        surgical_event_id: surgicalEvent.surgical_event_id
                    }
                };
                $scope.surgicalEventOptions.push(item);
            }

            var lastItem = $scope.surgicalEventOptions[$scope.surgicalEventOptions.length - 1];

            $scope.surgicalEventOption = lastItem;
            selectSurgicalEvent(lastItem);
        }

        function setupVariantReports() {
            $scope.variantReports = [];

            if (!$scope.data.variant_reports || !$scope.data.variant_reports.length) {
                $log.error('The web service didn\'t send Variant Reports');
                return;
            }

            var selected = null;

            for (var i = 0; i < $scope.data.variant_reports.length; i++) {
                var variantReport = angular.copy($scope.data.variant_reports[i]);

                variantReport.variant_report_mode = 'FILTERED';
                $scope.variantReports.push(variantReport);

                //TODO:RZ this is for demo only, remove after QC reports are implemented
                var qcReport = {};
                angular.copy(variantReport, qcReport);
                qcReport.variant_report_mode = 'QC';

                $scope.variantReports.push(qcReport);

                if (!selected) {
                    var byVariantReportKeys = function (x) {
                        return x.value.analysis_id === variantReport.analysis_id &&
                            x.value.surgical_event_id === variantReport.surgical_event_id &&
                            x.value.molecular_id === variantReport.molecular_id;
                    };
                    selected = $scope.variantReportOptions.find(byVariantReportKeys);
                }
            }

            $scope.variantReportType = 'TISSUE';
            $scope.variantReportMode = 'FILTERED';
            $scope.variantReportOption = selected;

            selectVariantReport(selected);
        }

        function setupAssignmentReportOptions() {
            $scope.assignmentReportOptions = [];

            var currentAssignment = $scope.data.current_assignment;

            $scope.assignmentReportOption = {
                text: $scope.currentTreatmentArm.name +
                ' | ' + currentAssignment.molecular_id +
                ' | ' + currentAssignment.molecular_id +
                ' | ' + currentAssignment.received_from_cog_date,
                value: {
                    molecular_id: currentAssignment.molecular_id,
                    assignmemnt_reason: $scope.currentTreatmentArm.reason
                }
            };

            $scope.assignmentReportOptions.push($scope.assignmentReportOption);
        }

        function setupSelectedTreatmentArm() {
            if (!($scope.data &&
                $scope.data.assignment_report &&
                $scope.data.assignment_report.treatment_arms &&
                $scope.data.assignment_report.treatment_arms.selected)) {
                return;
            }

            $scope.selectedTreatmentArm = $scope.data.assignment_report.treatment_arms.selected[0];
        }

        function selectVariantReport(option) {
            var previous = $scope.currentVariantReport;
            $scope.currentVariantReport = null;

            for (var i = 0; i < $scope.variantReports.length; i++) {
                var variantReport = $scope.variantReports[i];
                if (variantReport.variant_report_mode === $scope.variantReportMode && variantReport.variant_report_type === $scope.variantReportType) {
                    if (variantReport.surgical_event_id === option.value.surgical_event_id &&
                        variantReport.analysis_id === option.value.analysis_id &&
                        variantReport.molecular_id === option.value.molecular_id) {
                        $scope.currentVariantReport = variantReport;
                        break;
                    }
                }
            }

            if ($scope.currentVariantReport) {
                return $scope.currentVariantReport;
            }

            $log.error("Unable to find Variant Report by " + option + '. Setting the Variant Report to previous value ' + previous);
            $scope.currentVariantReport = previous;
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
                            text: 'Surgical Event ' + variantReport.surgical_event_id + ' | Analysis ID ' + variantReport.analysis_id + ' | Molecular ID ' + variantReport.molecular_id + ' | ' + variantReport.status,
                            value: {
                                surgical_event_id: variantReport.surgical_event_id,
                                analysis_id: variantReport.analysis_id,
                                molecular_id: variantReport.molecular_id
                            }
                        };
                        $scope.variantReportOptions.push(variantReportItem);
                    } else {
                        $log.error('Unable to find Surgical Event by ' + variantReport.surgical_event_id);
                    }
                } else if (variantReport.variant_report_type === 'BLOOD') {
                    var bloodVariantReportItem = {
                        text: 'Analysis ID ' + variantReport.analysis_id + ' | Molecular ID ' + variantReport.molecular_id + ' | ' + variantReport.status,
                        value: {
                            analysis_id: variantReport.analysis_id,
                            molecular_id: variantReport.molecular_id
                        }
                    };

                    if (!$scope.bloodVariantReportOption) {
                        $scope.bloodVariantReportOption = bloodVariantReportItem;
                    }

                    if (!$scope.currentBloodVariantReport) {
                        $scope.currentBloodVariantReport = variantReport;
                    }

                    $scope.bloodVariantReportOptions.push(bloodVariantReportItem);
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
            var selected = $scope.data &&
                $scope.data.current_assignment &&
                $scope.data.current_assignment.treatment_arms &&
                $scope.data.current_assignment.treatment_arms.selected &&
                $scope.data.current_assignment.treatment_arms.selected.length ? $scope.data.current_assignment.treatment_arms.selected[0] : null;

            if (selected) {
                $scope.currentTreatmentArm = {
                    name: selected.treatment_arm,
                    version: selected.treatment_arm_version,
                    stratum: selected.treatment_arm_stratum,
                    reason: selected.reason
                }
            }
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
                    $scope.currentVariantReport.comment = null;
                    $scope.currentVariantReport.comment_user = null;
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
                    $scope.currentVariantReport.comment = comment;
                    $scope.currentVariantReport.comment_user = $scope.currentUser;
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
            $scope.surgicalEventOption = selected;

            var bySurgicalEvent = function (x) { return x.value.surgical_event_id === selected.value.surgical_event_id; };
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
            $scope.variantReportOption = selected;

            var bySurgicalEvent = function (x) { return x.value.surgical_event_id === selected.value.surgical_event_id; };
            var surgicalEventItem = $scope.surgicalEventOptions.find(bySurgicalEvent);

            if (surgicalEventItem) {
                $scope.surgicalEventOption = surgicalEventItem;
                selectSurgicalEvent(surgicalEventItem);
                selectVariantReport(selected);
            } else {
                $log.error('Unable to find Surgical Event by ' + selected.value.surgical_event_id);
            }

            $log.debug($scope.currentVariantReport.surgical_event_id);
            $log.debug($scope.currentVariantReport.analysis_id);
            $log.debug($scope.currentVariantReport.molecular_id);
        }

        function onAssignmentReportSelected(selected) {
            $log.debug(selected);
            $scope.assignmentReportOption = selected;
            var option = $scope.assignmentReportOptions.find(by);
            $scope.currentAssignmentReport = null;            
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

        function onBloodVariantReportSelected(selected) {
            $log.debug(selected);
            $scope.bloodVariantReportOption = selected;
        }

        function showVariantReportActions(report) {
            return report && report.status && report.status === 'PENDING';
        }

        function showAssignmentReportActions(report) {
            return true; // TODO:RZ add loginc back: report && report.status && report.status === 'PENDING';
        }

        function navigateTo(navigateTo) {
            if (!navigateTo || !navigateTo.section) {
                $log.debug('No internal Patient section provided. Params: ' + navigateTo);
                return;
            }

            switch (navigateTo.section) {
                case 'surgical_event':
                    navigateToSurgicalEvent(navigateTo.surgical_event_id);
                    break;
                case 'variant_report':
                    navigateToVariantReport(navigateTo.molecular_id, navigateTo.analysis_id);
                    break;
                case 'assignment_report':
                    navigateToAssignmentReport(navigateTo.molecular_id, navigateTo.analysis_id);
                    break;
                default:
                    $log.error('Unrecongnized Patient navingation section: ' + navigateTo.section);
            }
        }

        function strStartsWith(str, prefix) {
            return str.indexOf(prefix) === 0;
        }

        function navigateToSurgicalEvent(surgicalEventId) {
            $log.debug('navigateToSurgicalEvent', surgicalEventId);

            setActiveTab('surgical_event');
            $scope.activeTabIndex = 1;

            var option = findSurgicalEventOption(surgicalEventId);
            if (option) {
                selectSurgicalEvent(option);
            } else {
                $log.error('Unable to find Surgical Event ' + surgicalEventId);
            }
        }

        function findVariantReportOption(molecularId, analysisId) {
            var byMolecularAndAnalysisId = function (x) { return x.value.molecular_id === molecularId && x.value.analysis_id === analysisId; };
            return $scope.variantReportOptions.find(byMolecularAndAnalysisId);
        }

        function navigateToVariantReport(molecularId, analysisId) {
            $log.debug('navigateToVariantReport', molecularId, analysisId);
            
            setActiveTab('tissue_report');
            $scope.activeTabIndex = 2;

            var option = findVariantReportOption(molecularId, analysisId);
            if (option) {
                selectVariantReport(option);
            } else {
                $log.error('Unable to find Variant Report ' + molecularId + ',' + analysisId);
            }
        }

        function navigateToAssignmentReport(molecularId, analysisId) {
            $log.debug('navigateToAssignmentReport', molecularId, analysisId);
            
            setActiveTab('tissue_report');
            $scope.activeTabIndex = 2;

            var variantReportOption = findVariantReportOption(molecularId, analysisId);
            if (variantReportOption) {
                selectVariantReport(variantReportOption);

                var assignmentReportOption = findAssignmentReportOption(molecularId, analysisId);
                if (assignmentReportOption) {
                    selectVariantReport(assignmentReportOption);
                } else {
                    $log.error('Unable to find Variant Report ' + molecularId + ',' + analysisId);
                }
                
            } else {
                $log.error('Unable to find Variant Report ' + molecularId + ',' + analysisId);
            }
        }
    }

} ());
