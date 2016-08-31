(function () {

    angular.module('matchbox.http', [])
        .factory('matchApi', function ($http, matchConfig, $q, $log) {
            return {
                loadPatient: loadPatient,
                loadPatientActionItems: loadPatientActionItems,
                loadPatientList: loadPatientList,
                loadActivity: loadActivity,
                loadDashboardStatistics: loadDashboardStatistics,
                loadSequencedAndConfirmedChartData: loadSequencedAndConfirmedChartData,
                loadTissueVariantReportsList: loadTissueVariantReportsList,
                loadBloodVariantReportsList: loadBloodVariantReportsList,
                loadPendingAssignmentReportsList: loadPendingAssignmentReportsList,
                loadSpecimenTrackingList: loadSpecimenTrackingList,
                loadTreatmentArmList: loadTreatmentArmList,
                loadPatientsForTa: loadPatientsForTa,
                loadTreatmentArmDetails: loadTreatmentArmDetails,
                loadQc_Table: loadQc_Table,
                loadSnv_Table: loadSnv_Table,
                loadSampleHRFiles: loadSampleHRFiles,
                loadMocha_List: loadMocha_List,
                loadMochaNtc_Table: loadMochaNtc_Table,
                loadMDACC_Table: loadMDACC_Table,
                loadMDACCNtc_Table: loadMDACCNtc_Table,
                openPositives: openPositives,
                openNegatives: openNegatives,
                openMDACCPositives: openMDACCPositives,
                cnvChartData: cnvChartData,
                updateVariantStatus: updateVariantStatus,
                updateVariantReportStatus: updateVariantReportStatus,
                updateAssignmentReportStatus: updateAssignmentReportStatus,
                loadCnvChartData: loadCnvChartData
            };

            // Patient API - START
            function loadPatient(id) {
                $log.info('Loading patient ' + id);
                return $http.get(matchConfig.patientApiBaseUrl + '/patients/' + id);
            }

            function loadPatientActionItems(id) {
                $log.info('Loading action items for patient ' + id);
                return $http.get(matchConfig.patientApiBaseUrl + '/patients/' + id + '/pendingItems');
            }

            function loadActivity(id) {
                if (id) {
                    $log.info('Loading patient activity ' + id);
                    return $http.get(matchConfig.patientApiBaseUrl + '/patients/' + id + '/timeline');
                } else {
                    $log.info('Loading dashboard activity');
                    return $http.get(matchConfig.patientApiBaseUrl + '/timeline');
                }
            }

            function loadPatientList() {
                return $http.get(matchConfig.patientApiBaseUrl + '/patients');
            }

            function updateVariantStatus(confirmationResult) {
                return $http.put(matchConfig.patientApiBaseUrl + '/patients/' + confirmationResult.patient_id + '/variantStatus', confirmationResult);
            }

            function updateVariantReportStatus(confirmationResult) {
                return $http({
                    url: matchConfig.patientApiBaseUrl + '/patients/' + confirmationResult.patient_id + '/variantReportStatus',
                    method: "PUT",
                    data: confirmationResult,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });
            }

            function updateAssignmentReportStatus(confirmationResult) {
                return $http({
                    url: matchConfig.patientApiBaseUrl + '/patients/' + confirmationResult.patient_id + '/assignmentConfirmation',
                    method: "POST",
                    data: confirmationResult,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });
            }

            function loadSpecimenTrackingList() {
                return $http.get(matchConfig.patientApiBaseUrl + '/specimenTracking/shipments');
            }

            function loadTissueVariantReportsList() {
                return $http.get(matchConfig.patientApiBaseUrl + '/dashboard/pendingVariantReports/tissue');
            }

            function loadBloodVariantReportsList() {
                return $http.get(matchConfig.patientApiBaseUrl + '/dashboard/pendingVariantReports/blood');
            }

            function loadPendingAssignmentReportsList() {
                return $http.get(matchConfig.patientApiBaseUrl + '/dashboard/pendingAssignmentReports');
            }

            function loadSequencedAndConfirmedChartData() {
                return $http.get(matchConfig.patientApiBaseUrl + '/dashboard/sequencedAndConfirmedPatients');
            }

            function loadDashboardStatistics() {
                return $http.get(matchConfig.patientApiBaseUrl + '/patients/statistics');
            }
            // Patient API - END


            // Treatment Arm API - START
            function loadTreatmentArmList() {
                return $http.get(matchConfig.treatmentArmApiBaseUrl + '/basicTreatmentArms');
            }

            function loadTreatmentArmDetails(name, stratum) {
                return $http.get(matchConfig.treatmentArmApiBaseUrl + '/treatmentArms/' + name + '/' + stratum);
            }

            function loadPatientsForTa(name, stratum) {
                return $http.get(matchConfig.treatmentArmApiBaseUrl + '/patientsOnTreatmentArm/' + name); // + '/' + stratum);
            }
            // Treatment Arm API - END

            function loadQc_Table(url) {
                if (url)
                    return $http.get(url);
                else
                    return $http.get('data/demo/sample_qc.json');
            }

            function loadSnv_Table() {
                return $http.get('data/demo/sample_qc.json');
            }

            function loadMocha_List() {
                return $http.get('data/demo/sample_mocha_list.json');
            }

            function loadMochaNtc_Table() {
                return $http.get('data/demo/sample_mocha_ntc_list.json');
            }

            function loadMDACC_Table() {
                return $http.get('data/demo/sample_mdacc_list.json');
            }

            function loadMDACCNtc_Table() {
                return $http.get('data/demo/sample_mdacc_ntc_list.json');
            }

            function openPositives(index) {
                return $http.get('data/demo/sample_positive_control_' + index);
            }
            function openNegatives(index) {
                return $http.get('data/demo/sample_ntc_mocha_control_1.json');
            }

            function openMDACCPositives(index) {
                return $http.get('data/demo/sample_mda_positive_control_' + index);
            }

            function loadCnvChartData(url) {
                return $http(
                    {
                        method: 'GET',
                        url: url,
                        data: '',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': ' '
                        }
                    });
            }

            function cnvChartData(id) {
                if (id === '') {
                    return $http.get('data/demo/cnvChart.json');
                }
                else if (id === '3355') {
                    return $http.get('data/demo/cnvChart.json');
                }
                else {
                    return $http.get('data/demo/' + id + '.vr_chart.json');
                }
            }

            function loadSampleHRFiles() {
                var hr_files = [];
                hr_files.push({
                    'report': 'data/demo/sample_hr_data_report.json',
                    'data': 'data/demo/sample_hr_data_file.txt',
                    'log': 'data/demo/sample_hr_log_file.txt'
                });
                return hr_files;
            }
        });
} ());
