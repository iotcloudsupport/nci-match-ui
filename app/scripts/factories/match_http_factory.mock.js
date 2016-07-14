(function () {

    angular.module('http.matchbox')
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
                loadActivityList: loadActivityList,
                loadSpecimenTrackingList: loadSpecimenTrackingList,
                displayTreatmentArmList: displayTreatmentArmList,
                loadPatientsForTa: loadPatientsForTa,
                loadTreatmentArmDetails: loadTreatmentArmDetails
            }

            function loadPatient(id) {
                $log.info('Loading patient ' + id);
                return $http.get('data/patient_' + id + '.json');
            }

            function loadActivity(id) {
                if (id) {
                    $log.info('Loading patient activity ' + id);
                    return $http.get('data/activity_patient_' + id + '.json');
                } else {
                    $log.info('Loading dashboard activity');
                    return $http.get('data/activity_dashboard.json');
                }
            }

            function loadPatientList() {
                return $http.get('data/patient_list.json');
            }

            function loadTreatmentArmDetails(name, stratum) {
                return $http.get('data/treatment_arm_' + name + '_' + stratum + '.json');
            }

            function loadPatientsForTa(name, stratum) {
                return $http.get('data/treatment_arm_' + name + '_' + stratum +  '_patients.json');
            }

            function loadSpecimenTrackingList() {
                return $http.get('data/specimen_tracking_list.json');
            }

            function loadDashboardStatistics() {
                return $http.get('data/dashboard_statistics.json');
            }

            function loadTreatmentArmAccrual() {
                return $http.get('data/dashboard_treatment_arm_accrual.json');
            }
            function loadChartjsDonutChart(){
                return $http.get('data/dashboard_donut_chart.json');
            }

            function loadActivityList() {
                return $http.get('data/dashboard_activity_feed.json');
            }

            function loadTissueVariantReportsList(){
                return $http.get('data/dashboard_tissue_variant_reports.json');
            }

            function loadBloodVariantReportsList() {
                return $http.get('data/dashboard_blood_variant_reports.json');
            }

            function loadPatientPendingAssignmentReportsList() {
                return $http.get('data/dashboard_patient_assignment_reports.json');
            }
            
            function displayTreatmentArmList() {
                return $http.get('data/treatment_arms_list.json');
            }

        });
} ());
