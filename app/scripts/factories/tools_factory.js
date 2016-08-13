(function () {
    "use strict";

    angular.module('matchbox.tools', [])
        .factory('arrayTools', arrayTools)
        .factory('dateTools', dateTools);

    function arrayTools() {
        return {
            removeElement: removeElement,
            forEach: forEach
        }

        function removeElement(arr, element) {
            if (!arr || !element)
                return -1;

            var index = arr.indexOf(element);
            if (index >= 0) {
                arr.splice(index, 1);
                return index;
            }

            return -1;
        }

        function forEach(arr, f) {
            if (!arr || !Array.isArray(arr))
                return;

            for (var i = 0; i < arr.length; i++) {
                var element = arr[i];
                f(element);
            }
        }
    }

    function dateTools() {
        return {
            calculateDaysPending: calculateDaysPending,
            calculateHoursPending: calculateHoursPending
        }

        function calculateDaysPending(element, dateAttr) {
            if (!(dateAttr in element))
                return null

            var dateValue = element[dateAttr];
            if (!dateValue) 
                return null
            
            var nowMoment = moment();
            var dateValueMoment = moment(dateValue);
            var diff = nowMoment.diff(dateValueMoment, "DD/MM/YYYY HH:mm:ss");

            return moment.duration(diff).days();
        }

        function calculateHoursPending(element, dateAttr) {
            if (!(dateAttr in element))
                return null

            var dateValue = element[dateAttr];
            if (!dateValue) 
                return null
            
            var nowMoment = moment();
            var dateValueMoment = moment(dateValue);
            var diff = nowMoment.diff(dateValueMoment, "DD/MM/YYYY HH:mm:ss");

            return moment.duration(diff).hours();
        }
    }
} ());




