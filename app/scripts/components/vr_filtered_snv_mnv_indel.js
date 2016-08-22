(function () {
    "use strict";

    function VrFilteredSnvMnvIndel($scope, $element, $attrs, $log, $window) {
        var ctrl = this;

        ctrl.confirmTitle = '';
        ctrl.confirmMessage = '';

        ctrl.gridOptions = {};

        ctrl.$onInit = function() {
            ctrl.gridOptions = {
                data: ctrl.items
            };
        };

        ctrl.onItemConfirmed = function (item) {
            ctrl.onItemConfirmed(item);
        };

        //COSMIC LINKS
        ctrl.openCosmicGene = function (id) {
            $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank");
            $window.focus();
        };

        ctrl.openCosmicId = function (id) {
            id = id.substring(4, id.length)
            $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + id.toLowerCase(), "_blank");
            $window.focus();
        };

        ctrl.openCosmicFusionId = function (id) {
            var numericId = id.substring(id.indexOf("_") - 3, (id.length - 2));

            if (numericId !== null) {
                $window.open("http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=" + numericId.toLowerCase(), "_blank");
            }
            $window.focus();
        };
        //COSMIC LINKS        
    }

    angular.module('matchbox').component('vrFilteredSnvMnvIndel', {
        templateUrl: 'views/templates/variant_report/vr_filtered_snv_mnv_indel.html',
        controller: VrFilteredSnvMnvIndel,
        bindings: {
            gridId: '<',
            items: '<',
            isEditable: '<',
            onItemConfirmed: '&'
        }
    });

}());
