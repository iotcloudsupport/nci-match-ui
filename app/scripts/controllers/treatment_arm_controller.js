angular.module('treatment-arm.matchbox',[])
    .controller('TreatmentArmController', function( $scope, DTOptionsBuilder, DTColumnDefBuilder, treatmentArmApi) {

        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(25);
        this.dtColumnDefs = [];
        this.dtInstance = {};

        $scope.pieDataset = [
            {
                label: "NOT_ELIGIBLE",
                data: 3,
                color: "#bababa",
                psns: "215re, 203re, 312re"
            },
            {
                label: "PENDING_APPROVAL",
                data: 2,
                color: "#9933FF",
                psns: "201re, 302re"
            },
            {
                label: "ON_TREATMENT_ARM",
                data: 5,
                color: "#00bd07",
                psns: "202re, 211re, 252re, 255re, 304re"
            },
            {
                label: "FORMERLY_ON_TREATMENT_ARM",
                data: 2,
                color: "#f8c706",
                psns: "205re, 206re"
            }
        ];

        $scope.diseasePieDataset = [
            {
                label: "Endocrine cancer, NOS",
                data: 3,
                color: "#1c84c6",
                psns: "215re, 205re, 203re"
            },
            {
                label: "Glioblastoma multiforme",
                data: 6,
                color: "#f8ac59",
                psns: "201re,  206re, 252re, 255re, 302re, 202re"
            },
            {
                label: "Head & neck cancer, NOS",
                data: 4,
                color: "#23c6c8",
                psns: "202re, 211re, 312re, 304re"
            }

        ];

        $scope.pieOptions = {
            series: {
                pie: {
                    show: true
                }
            },
            grid: {
                hoverable: true
            },
            tooltip: true,
            tooltipOpts: {
                content: "%p.0%, %s",
                shifts: {
                    x: 20,
                    y: 0
                },
                defaultTheme: true
            }
        };

    });