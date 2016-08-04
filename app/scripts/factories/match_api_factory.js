(function () {

    angular.module('matchbox.http')
        .factory('matchApi', function ($http, matchConfig, $q, $log) {
            return {
                loadPatient: loadPatient,
                loadPatientList: loadPatientList,
                loadActivity: loadActivity,
                loadDashboardStatistics: loadDashboardStatistics,
                loadTreatmentArmAccrual: loadTreatmentArmAccrual,
                loadChartjsDonutChart: loadChartjsDonutChart,
                loadTissueVariantReportsList: loadTissueVariantReportsList,
                loadBloodVariantReportsList: loadBloodVariantReportsList,
                loadPatientPendingAssignmentReportsList: loadPatientPendingAssignmentReportsList,
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
                openMDACCPositives: openMDACCPositives
            };


            // Patient API - START
            function loadPatient(id) {
                $log.info('Loading patient ' + id);
                return $http.get(matchConfig.patientApiBaseUrl + '/patients/' + id);
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

            function loadSpecimenTrackingList() {
                return $http.get(matchConfig.patientApiBaseUrl + '/specimenTracking');
            }

            function loadTissueVariantReportsList() {
                return $http.get(matchConfig.patientApiBaseUrl + '/dashboard/pendingVariantReports/tissue');
            }

            function loadBloodVariantReportsList() {
                return $http.get(matchConfig.patientApiBaseUrl + '/dashboard/pendingVariantReports/blood');
            }

            function loadPatientPendingAssignmentReportsList() {
                return $http.get(matchConfig.patientApiBaseUrl + '/dashboard/pendingAssignmentReports');
            }

            function loadChartjsDonutChart() {
                return $http.get(matchConfig.patientApiBaseUrl + '/dashboard/sequencedAndConfirmedPatients');
            }

            function loadDashboardStatistics() {
                return $http.get(matchConfig.patientApiBaseUrl + '/dashboard/patientStatistics');
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
                return $http.get(matchConfig.treatmentArmApiBaseUrl + '/patientsOnTreatmentArm/' + name + '/' + stratum);
            }
            // Treatment Arm API - END

            function loadTreatmentArmAccrual() {
                return $http.get('data/dashboard_treatment_arm_accrual.json');
            }

            function loadQc_Table() {
                return $http.get('data/sample_qc.json');
            }

            function loadSnv_Table() {
                return $http.get('data/sample_qc.json');
            }

            function loadMocha_List() {
                return $http.get('data/sample_mocha_list.json');
            }

            function loadMochaNtc_Table() {
                return $http.get('data/sample_mocha_ntc_list.json');
            }

            function loadMDACC_Table() {
                return $http.get('data/sample_mdacc_list.json');
            }

            function loadMDACCNtc_Table() {
                return $http.get('data/sample_mdacc_ntc_list.json');
            }

            function openPositives(index) {
                return $http.get('data/sample_positive_control_' + index);
            }

            function openMDACCPositives(index) {
                return $http.get('data/sample_mda_positive_control_' + index);
            }

            function loadSampleHRFiles() {
                var hr_files = [];
                hr_files.push({
                    'report': 'data/sample_hr_data_report.json',
                    'data': 'data/sample_hr_data_file.txt',
                    'log': 'data/sample_hr_log_file.txt'
                });
                return hr_files;
            }
        });
} ());