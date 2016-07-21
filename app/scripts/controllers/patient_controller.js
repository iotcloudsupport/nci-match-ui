(function () {

    angular.module('patient.matchbox', ['ui.router'])
        .controller('PatientController', PatientController);

    function PatientController($scope,
        DTOptionsBuilder,
        DTColumnDefBuilder,
        matchApiMock,
        $stateParams,
        $log,
        prompt,
        $uibModal,
        $state,
        $window,
        store,
        $filter,
        arrayTools) {

        var vm = this;

        $scope.dtColumnDefs = DTColumnDefBuilder.newColumnDef(0).notSortable();

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('paging', false)
            .withOption('bLengthChange', false)
            .withOption('searching', false);

        $scope.currentUser = null;

        vm.enabledFileButtonClass = 'btn-success';
        vm.disabledFileButtonClass = 'btn-default btn-outline-default disabled';

        $scope.activeTab = 'summary';
        $scope.activeTabIndex = 0;

        $scope.patient_id = '';
        $scope.warningResult = false;

        $scope.confirmTitle = 'Confirmation Change Comments';
        $scope.confirmMessage = 'Please enter a reason:';

        $scope.surgicalEventLabel = 'Latest';
        $scope.surgicalEventOptions = [];
        $scope.surgicalEventOption = null;

        $scope.files = [];

        $scope.currentSurgicalEvent = null;
        $scope.currentAnalisys = null;
        $scope.currentShipment = null;
        $scope.currentTissueVariantReport = null;
        $scope.currentBloodVariantReport = null;
        $scope.currentAssignmentReport = null;

        $scope.currentTreatmentArm = null;

        $scope.variantReports = [];

        $scope.tissueVariantReportOptions = [];
        $scope.tissueVariantReportOption = null;

        $scope.bloodVariantReportOptions = [];
        $scope.bloodVariantReportOption = null;

        $scope.assignmentReportOptions = [];
        $scope.assignmentReportOption = null;
        $scope.selectedTreatmentArm = null;

        $scope.copyNumberVariants = [];
        $scope.geneFusions = [];
        $scope.singleNucleotideVariants = [];

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
        $scope.confirmAssignmentReport = confirmAssignmentReport;
        $scope.rejectAssignmentReport = rejectAssignmentReport;
        $scope.setupScope = setupScope;
        $scope.showPrompt = showPrompt;
        $scope.getFileButtonClass = getFileButtonClass;
        $scope.getAllFilesButtonClass = getAllFilesButtonClass;
        $scope.loadVariantReportChart = loadVariantReportChart;
        $scope.loadBloodVariantReportChart = loadBloodVariantReportChart;
        $scope.onSurgicalEventSelected = onSurgicalEventSelected;
        $scope.onBloodVariantReportSelected = onBloodVariantReportSelected;
        $scope.onTissueVariantReportSelected = onTissueVariantReportSelected;
        $scope.onAssignmentReportSelected = onAssignmentReportSelected;
        $scope.showVariantReportActions = showVariantReportActions;
        $scope.showAssignmentReportActions = showAssignmentReportActions;
        $scope.setActiveTab = setActiveTab;
        $scope.needToDisplayReportStatus = needToDisplayReportStatus;
        $scope.needToDisplayCbnaWarning = needToDisplayCbnaWarning;
        $scope.getNewFileButtonClass = getNewFileButtonClass;
        $scope.loadQcTable = loadQcTable;
        $scope.loadSnvTable = loadSnvTable;
        $scope.loadGeneTable = loadGeneTable;

        //FILTER
        $scope.$watch('confirmed', function (newValue, oldValue) {
            if (newValue === 'ALL') {
                $scope.filterCol = "";
            } else {
                $scope.filterCol = newValue;
            }
        });

        //Large data flow controller
        $scope.totalDisplayed = 100;

        $scope.loadMore = function () {
            $scope.totalDisplayed += 20;
        };

        //COSMIC LINKS
        $scope.openCosmicGene = function (id) {
            $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank");
            $window.focus();
        };

        $scope.openCosmicId = function (id) {
            id = id.substring(4, id.length)
            $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank");
            $window.focus();
        };

        $scope.openCosmicFusionId = function (id) {
            var numericId = id.substring(id.indexOf("_") - 3, (id.length - 2));

            if (numericId !== null) {
                $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + numericId.toLowerCase(), "_blank");
            }
            $window.focus();
        };
        //COSMIC LINKS

        //Sample Mocks
        //CNV
        function loadQcTable() {
            matchApiMock
                .loadQcTable()
                .then(loadQcList);
        }

        function loadQcList(data) {
            $scope.cnvList = data.data.copyNumberVariants;
        }

        //SNV
        function loadSnvTable() {
            matchApiMock
                .loadQcTable()
                .then(loadSnvList);
        }

        function loadSnvList(data) {
            $scope.snvList = data.data.singleNucleotideVariants;
        }

        //GENE
        function loadGeneTable() {
            matchApiMock
                .loadQcTable()
                .then(loadGeneList);
        }

        function loadGeneList(data) {
            $scope.geneList = data.data.geneFusions;
        }
        //Sample Mocks

        function setActiveTab(tab) {
            $scope.activeTab = tab;
        }

        function setVariantReportType(reportType) {
            if ($scope.variantReportType === reportType) {
                return;
            }

            $scope.variantReportType = reportType;
            selectTissueVariantReport($scope.tissueVariantReportOption);
        }

        function setVariantReportMode(reportMode) {
            if ($scope.variantReportMode === reportMode) {
                return;
            }

            $scope.variantReportMode = reportMode;
            selectTissueVariantReport($scope.tissueVariantReportOption);
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
                .then(setupScope, handlePatientLoadError)
                .then(loadPatientActivity);
        }

        function handlePatientLoadError(e) {
            $log.error(e);
            $log.info('Error while retriving data from the service. Transferring back to patient list');
            $state.transitionTo('patients');
            return;
        }

        function loadPatientActivity() {
            matchApiMock
                .loadActivity($stateParams.patient_id)
                .then(setupActivity, handleActivityLoadError);
        }

        function handleActivityLoadError(e) {
            $log.error(e);
            return;
        }

        function setupActivity(data) {
            $scope.activity = [];
            angular.copy(data.data, $scope.activity);

            var now = moment();
            var previousStep = null;

            for (var i = 0; i < $scope.activity.length; i++) {
                var timelineEvent = $scope.activity[i];
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

        function setupScope(data) {
            if (!data || !data.data) {
                $log.error('The web service didn\'t send Patient data. Transferring back to Patient list');
                $state.transitionTo('patients');
            }

            $scope.patient_id = $stateParams.patient_id;
            var scopeData = {};
            angular.copy(data.data, scopeData);
            $scope.data = scopeData;

            setupCurrentTreatmentArm();
            setupSlides();
            setupSurgicalEventOptions();
            setupVariantReportOptions();
            setupVariantReports();
            setupAssignmentReportOptions();
            setupSelectedTreatmentArm();
            setupUserName();
            navigateTo($stateParams);
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

        function setupSlides() {
            var slideShipments = [];

            for (var i = 0; i < $scope.data.specimens.length; i++) {
                var surgicalEvent = $scope.data.specimens[i];
                for (var j = 0; j < surgicalEvent.specimen_shipments.length; j++) {
                    var shipment = surgicalEvent.specimen_shipments[j];
                    if ('slide_barcode' in shipment) {
                        slideShipments.push({ surgicalEvent: surgicalEvent, shipment: shipment });

                        if (surgicalEvent.slides === undefined) {
                            surgicalEvent.slides = [];
                        }
                        surgicalEvent.slides.push(
                            {
                                slide_barcode: shipment.slide_barcode,
                                carrier: shipment.carrier,
                                tracking_id: shipment.tracking_id,
                                shipped_dttm: shipment.shipped_dttm
                            }
                        );
                    }
                }
            }

            if (slideShipments.length > 0) {
                for (var k = 0; k < slideShipments.length; k++) {
                    var slideSpecimenShipment = slideShipments[k];
                    arrayTools.removeElement(slideSpecimenShipment.surgicalEvent.specimen_shipments, slideSpecimenShipment.shipment)
                }
            }
        }

        function setupSurgicalEventOptions() {
            if (!$scope.data.specimens) {
                $log.error('The web service didn\'t send Secimen History');
                return;
            }

            for (var i = 0; i < $scope.data.specimens.length; i++) {
                var surgicalEvent = $scope.data.specimens[i];
                var collectedDate = $filter('utc')(surgicalEvent.collected_date);

                var item = {
                    text: 'Surgical Event ' + surgicalEvent.surgical_event_id + ' | Collected ' + collectedDate,
                    value: {
                        event_index: i,
                        surgical_event_id: surgicalEvent.surgical_event_id,
                        collected_date: surgicalEvent.collected_date
                    }
                };
                $scope.surgicalEventOptions.push(item);
            }

            var lastItem = $scope.surgicalEventOptions[0];

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
            }


            $scope.variantReportType = 'TISSUE';
            $scope.variantReportMode = 'FILTERED';

            selected = findLatestTissueVariantReportOptionForSurgicalEvent();
            if (selected) {
                $scope.tissueVariantReportOption = selected;
                selectTissueVariantReport(selected);
            } else {
                $log.debug('Tissue Variant Report is not found for selected Surgical Event ' + $scope.currentSurgicalEvent.surgical_event_id);
            }
        }

        function findLatestTissueVariantReportOptionForSurgicalEvent() {
            // Assuming latest variant reports are sorted as "latest on top"
            for (var i = 0; i < $scope.tissueVariantReportOptions.length; i++) {
                var option = $scope.tissueVariantReportOptions[i];
                if (option.value.surgical_event_id === $scope.currentSurgicalEvent.surgical_event_id) {
                    return option;
                }
            }
            return null;
        }

        function setupAssignmentReportOptions() {
            $scope.assignmentReportOptions = [];

            if (!$scope.currentTissueVariantReport)
                return;

            var currentAssignment = $scope.data.current_assignment;

            if ($scope.currentTissueVariantReport.molecular_id !== currentAssignment.molecular_id
                || $scope.currentTissueVariantReport.analysis_id !== currentAssignment.analysis_id) {
                $log.debug('Unable to find Assignment Report ' + $scope.currentTissueVariantReport.molecular_id + ',' + $scope.currentTissueVariantReport.analysis_id);
                return;
            }

            var receivedDate = currentAssignment.received_from_cog_date && currentAssignment.received_from_cog_date !== '-' ? $filter('utc')(currentAssignment.received_from_cog_date) : '-';

            $scope.assignmentReportOption = {
                text: $scope.currentTreatmentArm.name +
                ' | Received from COG ' + receivedDate,
                value: {
                    molecular_id: currentAssignment.molecular_id,
                    analysis_id: currentAssignment.analysis_id,
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

        function selectTissueVariantReport(option) {
            var previous = $scope.currentTissueVariantReport;
            $scope.currentTissueVariantReport = null;
            $scope.assignmentReportOption = null;
            $scope.currentAssignmentReport = null;

            for (var i = 0; i < $scope.variantReports.length; i++) {
                var variantReport = $scope.variantReports[i];
                if (variantReport.variant_report_mode === $scope.variantReportMode && variantReport.variant_report_type === $scope.variantReportType) {
                    if (variantReport.surgical_event_id === option.value.surgical_event_id &&
                        variantReport.analysis_id === option.value.analysis_id &&
                        variantReport.molecular_id === option.value.molecular_id) {
                        $scope.currentTissueVariantReport = variantReport;
                        break;
                    }
                }
            }

            setupAssignmentReportOptions();

            if ($scope.currentTissueVariantReport) {
                setupAssignmentReportOptions();
                var assignmentReportOption = findAssignmentReportOption($scope.currentTissueVariantReport.molecular_id, $scope.currentTissueVariantReport.analysis_id);
                if (assignmentReportOption) {
                    selectAssignmentReport(assignmentReportOption);
                } else {
                    $log.debug('Assignment Report is not found for Molecular ID ' + $scope.currentTissueVariantReport.molecular_id + ' and Analysis ID ' + $scope.currentTissueVariantReport.analysis_id);
                }
                return $scope.currentTissueVariantReport;
            }

            $log.error("Unable to find Tissue Variant Report by " + option + '. Setting the Variant Report to previous value ' + previous);
            $scope.currentTissueVariantReport = previous;
        }

        function selectBloodVariantReport(option) {
            var previous = $scope.currentBloodVariantReport;
            $scope.currentBloodVariantReport = null;

            for (var i = 0; i < $scope.variantReports.length; i++) {
                var variantReport = $scope.variantReports[i];
                if (variantReport.variant_report_mode === $scope.variantReportMode && variantReport.variant_report_type === $scope.variantReportType) {
                    if (variantReport.surgical_event_id === option.value.surgical_event_id &&
                        variantReport.analysis_id === option.value.analysis_id &&
                        variantReport.molecular_id === option.value.molecular_id) {
                        $scope.currentBloodVariantReport = variantReport;
                        break;
                    }
                }
            }

            if ($scope.currentBloodVariantReport) {
                return $scope.currentBloodVariantReport;
            }

            $log.error("Unable to find Blood Variant Report by " + option + '. Setting the Variant Report to previous value ' + previous);
            $scope.currentBloodVariantReport = previous;
        }

        function createTissueVariantReportOption(variantReport) {
            return {
                text: 'Surgical Event ' + variantReport.surgical_event_id + ' | Analysis ID ' + variantReport.analysis_id + ' | Molecular ID ' + variantReport.molecular_id + ' | ' + variantReport.status,
                value: {
                    surgical_event_id: variantReport.surgical_event_id,
                    analysis_id: variantReport.analysis_id,
                    molecular_id: variantReport.molecular_id
                }
            };
        }

        function createBloodVariantReportOption(variantReport) {
            return {
                text: 'Analysis ID ' + variantReport.analysis_id + ' | Molecular ID ' + variantReport.molecular_id + ' | ' + variantReport.status,
                value: {
                    analysis_id: variantReport.analysis_id,
                    molecular_id: variantReport.molecular_id
                }
            };
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
                        $scope.tissueVariantReportOptions.push(createTissueVariantReportOption(variantReport));
                    } else {
                        $log.error('Unable to find Surgical Event by ' + variantReport.surgical_event_id);
                    }
                } else if (variantReport.variant_report_type === 'BLOOD') {
                    var bloodVariantReportItem = createBloodVariantReportOption(variantReport);

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

        function editComment(variant, isEnabled) {
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
                        return isEnabled ? $scope.confirmMessage : '';
                    },
                    enabled: function () {
                        return isEnabled;
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

        function confirmAssignmentReport(assignmentReport) {
            showPrompt({
                title: 'Confirm Assignment Report',
                message: 'Are you sure you want to confirm the Assignment Report?',
                buttons: [{ label: 'OK', primary: true }, { label: 'Cancel', cancel: true }]
            }).then(function (comment) {
                if (!assignmentReport) {
                    $log.error('Current Assignment Report is not set');
                } else {
                    assignmentReport.status = 'CONFIRMED';
                    assignmentReport.comment = null;
                    assignmentReport.comment_user = $scope.currentUser;
                    assignmentReport.status_date = moment.utc(new Date()).utc();
                }
            });
        }

        function rejectAssignmentReport(assignmentReport) {
            showPrompt({
                title: 'Reject Assignment Report',
                message: 'Are you sure you want to reject the Assignment Report? Please enter reason:',
                input: true,
                buttons: [{ label: 'OK', primary: true }, { label: 'Cancel', cancel: true }]
            }).then(function (comment) {
                if (!assignmentReport) {
                    $log.error('Current Assignment Report is not set');
                } else {
                    assignmentReport.status = 'REJECTED';
                    assignmentReport.comment = comment;
                    assignmentReport.comment_user = $scope.currentUser;
                    assignmentReport.status_date = moment.utc(new Date()).utc();
                }
            });
        }

        function rejectVariantReport(variantReport) {
            showPrompt({
                title: 'Reject Variant Report',
                message: 'Are you sure you want to reject the Variant Report? Please enter reason:',
                input: true,
                buttons: [{ label: 'OK', primary: true }, { label: 'Cancel', cancel: true }]
            }).then(function (comment) {
                if (!variantReport) {
                    $log.error('Current Variant Report is not set');
                } else {
                    variantReport.status = 'REJECTED';
                    variantReport.comment = comment;
                    variantReport.comment_user = $scope.currentUser;
                    variantReport.status_date = moment.utc(new Date()).utc();

                    if (variantReport.variants.snvs_and_indels)
                        updateVariants(variantReport.variants.snvs_and_indels, false);

                    if (variantReport.variants.copy_number_variants)
                        updateVariants(variantReport.variants.copy_number_variants, false);

                    if (variantReport.variants.gene_fusions)
                        updateVariants(variantReport.variants.gene_fusions, false);

                    if (variantReport.variant_report_type === 'BLOOD') {
                        updateTissueVariantReportOption(variantReport);
                    } else if (variantReport.variant_report_type === 'TISSUE') {
                        updateTissueVariantReportOption(variantReport);
                    }
                }
            });
        }

        function updateVariants(variants, confirmed) {
            if (!variants || !variants.length)
                return;
            for (var i = 0; i < variants.length; i++) {
                if (confirmed) {
                    variants[i].comment = null;
                }
                variants[i].confirmed = confirmed;
            }
        }

        function confirmVariantReport(variantReport) {
            showPrompt({
                title: 'Confirm Variant Report',
                message: 'Are you sure you want to confirm the Variant Report?',
                buttons: [{ label: 'OK', primary: true }, { label: 'Cancel', cancel: true }]
            }).then(function (comment) {
                if (!variantReport) {
                    $log.error('Current Variant Report is not set');
                } else {
                    variantReport.status = 'CONFIRMED';
                    variantReport.comment = null;
                    variantReport.comment_user = $scope.currentUser;
                    variantReport.status_date = moment.utc(new Date()).utc();

                    if (variantReport.variant_report_type === 'BLOOD') {
                        updateTissueVariantReportOption(variantReport);
                    } else if (variantReport.variant_report_type === 'TISSUE') {
                        updateTissueVariantReportOption(variantReport);
                    }
                }
            });
        }

        function updateTissueVariantReportOption(variantReport) {
            variantReportOption = findTissueVariantReportOption(variantReport.molecular_id, variantReport.analysis_id);
            if (variantReportOption) {
                angular.copy(createTissueVariantReportOption(variantReport), variantReportOption);
            }
        }

        function updateBloodVariantReportOption(variantReport) {
            variantReportOption = findBloodVariantReportOption(variantReport.molecular_id, variantReport.analysis_id);
            if (variantReportOption) {
                angular.copy(createBloodVariantReportOption(variantReport), variantReportOption);
            }
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

        function getNewFileButtonClass(shipment, analisys) {
            $log.debug(analisys);

            return (analisys && analisys.status && analisys.status === 'PENDING') ?
                vm.enabledFileButtonClass :
                vm.disabledFileButtonClass;
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
            var variantReportItem = $scope.tissueVariantReportOptions.find(bySurgicalEvent);

            if (variantReportItem) {
                $log.debug(selected);
                $scope.variantReportOption = variantReportItem;
                selectSurgicalEvent(selected);
                selectTissueVariantReport(variantReportItem);
            } else {
                $log.error('Unable to find Variant Report by ' + selected.value.surgical_event_id + ', ' + selected.value.analysis_id);
            }
        }

        function onTissueVariantReportSelected(selected) {
            $log.debug(selected);
            $scope.tissueVariantReportOption = selected;

            var bySurgicalEvent = function (x) { return x.value.surgical_event_id === selected.value.surgical_event_id; };
            var surgicalEventOption = $scope.surgicalEventOptions.find(bySurgicalEvent);

            if (surgicalEventOption) {
                $scope.surgicalEventOption = surgicalEventOption;
                selectSurgicalEvent(surgicalEventOption);
                selectTissueVariantReport(selected);
            } else {
                $log.error('Unable to find Surgical Event by ' + selected.value.surgical_event_id);
            }

            $log.debug($scope.currentTissueVariantReport.surgical_event_id);
            $log.debug($scope.currentTissueVariantReport.analysis_id);
            $log.debug($scope.currentTissueVariantReport.molecular_id);
        }

        function onAssignmentReportSelected(selected) {
            $log.debug(selected);
            $scope.assignmentReportOption = selected;
            selectAssignmentReport(selected);

        }

        function selectAssignmentReport(option) {
            $scope.currentAssignmentReport = null;
            if ($scope.data.current_assignment.molecular_id === option.value.molecular_id && $scope.data.current_assignment.analysis_id === option.value.analysis_id) {
                $scope.currentAssignmentReport = $scope.data.current_assignment;
            }
        }

        function selectSurgicalEvent(option) {
            $scope.currentSurgicalEvent = null;
            $scope.currentAnalisys = null;
            $scope.currentShipment = null;

            for (var i = 0; i < $scope.data.specimens.length; i++) {
                var surgicalEvent = $scope.data.specimens[i];

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
            selectBloodVariantReport(selected);
        }

        function showVariantReportActions(report) {
            return report && report.status && report.status === 'PENDING';
        }

        function showAssignmentReportActions(report) {
            return report && report.status && report.status === 'PENDING';
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
                case 'tissue_variant_report':
                    navigateToTissueVariantReport(navigateTo.molecular_id, navigateTo.analysis_id);
                    break;
                case 'blood_variant_report':
                    navigateToBloodVariantReport(navigateTo.molecular_id, navigateTo.analysis_id);
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

        function findTissueVariantReportOption(molecularId, analysisId) {
            var byMolecularAndAnalysisId = function (x) { return x.value.molecular_id === molecularId && x.value.analysis_id === analysisId; };
            return $scope.tissueVariantReportOptions.find(byMolecularAndAnalysisId);
        }

        function navigateToTissueVariantReport(molecularId, analysisId) {
            $log.debug('navigateToTissueVariantReport', molecularId, analysisId);

            setActiveTab('tissue_report');
            $scope.activeTabIndex = 2;

            var option = findTissueVariantReportOption(molecularId, analysisId);
            if (option) {
                selectTissueVariantReport(option);
            } else {
                $log.error('Unable to find Tissue Variant Report ' + molecularId + ',' + analysisId);
            }
        }

        function findBloodVariantReportOption(molecularId, analysisId) {
            var byMolecularAndAnalysisId = function (x) { return x.value.molecular_id === molecularId && x.value.analysis_id === analysisId; };
            return $scope.bloodVariantReportOptions.find(byMolecularAndAnalysisId);
        }

        function navigateToBloodVariantReport(molecularId, analysisId) {
            $log.debug('navigateToBloodVariantReport', molecularId, analysisId);

            setActiveTab('tissue_report');
            $scope.activeTabIndex = 3;

            var option = findBloodVariantReportOption(molecularId, analysisId);
            if (option) {
                selectBloodVariantReport(option);
            } else {
                $log.error('Unable to find Blood Variant Report ' + molecularId + ',' + analysisId);
            }
        }

        function findAssignmentReportOption(molecularId, analysisId) {
            var byMolecularAndAnalysisId = function (x) { return x.value.molecular_id === molecularId && x.value.analysis_id === analysisId; };
            return $scope.assignmentReportOptions.find(byMolecularAndAnalysisId);
        }

        function navigateToAssignmentReport(molecularId, analysisId) {
            $log.debug('navigateToAssignmentReport', molecularId, analysisId);

            setActiveTab('tissue_report');
            $scope.activeTabIndex = 2;

            var variantReportOption = findTissueVariantReportOption(molecularId, analysisId);
            if (variantReportOption) {
                selectVariantReport(variantReportOption);

                if ($scope.data.current_assignment.molecular_id === variantReportOption.value.molecular_id && $scope.data.current_assignment.analysis_id === variantReportOption.value.analysis_id) {
                    $scope.currentAssignmentReport = $scope.data.current_assignment;
                } else {
                    $scope.currentAssignmentReport = null;
                    $log.error('Unable to find Assignment Report ' + molecularId + ',' + analysisId);
                }
            } else {
                $log.error('Unable to find Variant Report ' + molecularId + ',' + analysisId);
            }
        }

        function needToDisplayReportStatus(report) {
            return report && report.status && report.status !== 'PENDING';
        }

        function needToDisplayCbnaWarning() {
            if (!$scope.currentTissueVariantReport || $scope.variantReportMode !== 'QC')
                return false;

            if (!$scope.currentTissueVariantReport.oncomine_report || !$scope.currentTissueVariantReport.oncomine_report.length)
                return false;

            var total = 0;

            angular.forEach($scope.currentTissueVariantReport.oncomine_report, function (value, index) {
                total += value.sum;
            });

            return total === 0;
        }
    }

} ());
