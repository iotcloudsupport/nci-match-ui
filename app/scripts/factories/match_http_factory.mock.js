(function () {

    angular.module('matchbox.http')
        .factory('matchApiMock', function ($http, matchConfig, $q, $log) {
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
                loadMocha_Month_List: loadMocha_Month_List,
                loadMDACC_Month_List: loadMDACC_Month_List,
                loadMDACC_Table: loadMDACC_Table,
                loadMDACCNtc_Table: loadMDACCNtc_Table,
                openPositives: openPositives,
                openMDACCPositives: openMDACCPositives
            };

            function loadPatient(id) {
                $log.info('Loading patient ' + id);
                return $http.get('data/demo/patient_' + id + '.json');
            }

            function loadActivity(id) {
                if (id) {
                    $log.info('Loading patient activity ' + id);
                    return $http.get('data/demo/activity_patient_' + id + '.json');
                } else {
                    $log.info('Loading dashboard activity');
                    return $http.get('data/demo/dashboard_activity.json');
                }
            }

            function loadPatientList() {
                return $http.get('data/demo/patient_list.json');
            }

            function loadTreatmentArmDetails(name, stratum) {
                return $http.get('data/demo/treatment_arm_' + name + '_' + stratum + '.json');
            }

            function loadPatientsForTa(name, stratum) {
                return $http.get('data/demo/treatment_arm_' + name + '_' + stratum +  '_patients.json');
            }

            function loadSpecimenTrackingList() {
                return $http.get('data/demo/specimen_tracking_list.json');
            }

            function loadDashboardStatistics() {
                return $http.get('data/demo/dashboard_statistics.json');
            }

            function loadTreatmentArmAccrual() {
                return $http.get('data/demo/dashboard_treatment_arm_accrual.json');
            }
            function loadChartjsDonutChart(){
                return $http.get('data/demo/dashboard_donut_chart.json');
            }

            function loadTissueVariantReportsList(){
                return $http.get('data/demo/dashboard_tissue_variant_reports.json');
            }

            function loadBloodVariantReportsList() {
                return $http.get('data/demo/dashboard_blood_variant_reports.json');
            }

            function loadPatientPendingAssignmentReportsList() {
                return $http.get('data/demo/dashboard_patient_assignment_reports.json');
            }

            function loadTreatmentArmList() {
                return $http.get('data/demo/treatment_arms_list.json');
            }

            function loadQc_Table(){
                return $http.get('data/demo/sample_qc.json');
            }

            function loadSnv_Table(){
                return $http.get('data/demo/sample_qc.json');
            }

            function loadMocha_List(){
                return $http.get('data/demo/sample_mocha_list.json');
            }

            function loadMocha_Month_List(){
                return $http.get('data/demo/sample_mocha_list_month.json');
            }

            function loadMDACC_Month_List(){
                return $http.get('data/demo/sample_mdacc_list_month.json');
            }

            function loadMochaNtc_Table(){
                return $http.get('data/demo/sample_mocha_ntc_list.json');
            }

            function loadMDACC_Table(){
                return $http.get('data/demo/sample_mdacc_list.json');
            }

            function loadMDACCNtc_Table(){
                return $http.get('data/demo/sample_mdacc_ntc_list.json');
            }

            function openPositives(index){
                return $http.get('data/demo/sample_positive_mocha_data.json');
            }

            function openMDACCPositives(index){
                return $http.get('data/demo/sample_positive_mdacc_data.json');
            }

            function loadSampleHRFiles(){
                var hr_files = [];
                hr_files.push({
                    'report':'data/demo/sample_hr_data_report.json',
                    'data':'data/demo/sample_hr_data_file.txt',
                    'log':'data/demo/sample_hr_log_file.txt'
                });
                return hr_files;
            }
        });
} ());
