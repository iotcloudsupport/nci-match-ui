(function () {

    angular.module('matchbox.http', [])
        .factory('matchApi', function ($http, matchConfig, $q, $log) {
            return {
                loadPatient: loadPatient,
                loadPatientActionItems: loadPatientActionItems,
                loadPatientList: loadPatientList,
                loadActivity: loadActivity,
                loadDashboardStatistics: loadDashboardStatistics,
                loadTreatmentArmAccrual: loadTreatmentArmAccrual,
                loadSequencedAndConfirmedChartData: loadSequencedAndConfirmedChartData,
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

            function loadPatientPendingAssignmentReportsList() {
                return $http.get(matchConfig.patientApiBaseUrl + '/dashboard/pendingAssignmentReports');
            }

            function loadSequencedAndConfirmedChartData() {
                return $http.get(matchConfig.patientApiBaseUrl + '/dashboard/sequencedAndConfirmedPatients');
            }

            function loadDashboardStatistics() {
                return $http.get(matchConfig.patientApiBaseUrl + '/dashboard/patientStatistics');
            }

            function loadTreatmentArmAccrual() {
                return $http.get(matchConfig.patientApiBaseUrl + '/dashboard/treatmentArmAccrual');
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

            // function cnvChartData() {
            //     return $http.get('data/cnvChart.json');
            // }

            function cnvChartData(id) {

                // return $http.get('data/cnvChart.json');


                // if(id===""){
                //     +                    return $http.get('https://s3.amazonaws.com/mattietest/cnvChart.json');
                //     +                }
                // +                else if(id==='3355'){
                //     +                    return $http.get('https://s3.amazonaws.com/pedmatch-demo/3355/3355-bsn-msn-2/job1/test1.vr_chart.json');
                //     +                }
                // +                else {
                //     +                    return $http.get('https://s3.amazonaws.com/bdd-test-data/demo/'+ id +'/' + id + '-00012/ANI_' + id + '-00012/' + id + '.vr_chart.json');
                //     +                }

                if (id === "") {
                    // return $http.get('https://s3.amazonaws.com/pedmatch-demo/3355/3355-bsn-msn-2/job1/test1.vr_chart.json');
                    // return $http.get('https://s3.amazonaws.com/mattietest/cnvChart.json');
                    // return $http.get('https://s3.amazonaws.com/pedmatch-demo/3344/3344-bsn-msn-2/job1/cnvChart.json');
                    return $http.get('data/cnvChart.json');
                }
                else if (id === '3355') {
                    return $http.get('data/cnvChart.json');
                    // return $http.get('https://s3.amazonaws.com/pedmatch-demo/3355/3355-bsn-msn-2/job1/test1.vr_chart.json');
                }
                else {
                    return $http.get('data/' + id + '.vr_chart.json');
                    // return $http.get('https://s3.amazonaws.com/bdd-test-data/demo/'+ id +'/' + id + '-00012/ANI_' + id + '-00012/' + id + '.vr_chart.json');
                }


                // return $http.get('https://s3.amazonaws.com/pedmatch-demo/3355/3355-bsn-msn-2/job1/test1.vr_chart.json');
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
