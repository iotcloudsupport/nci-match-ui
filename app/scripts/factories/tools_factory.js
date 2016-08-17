(function () {
    "use strict";

    angular.module('matchbox.tools', [])
        .factory('arrayTools', arrayTools)
        .factory('dateTools', dateTools);

    function arrayTools() {
        return {
            removeElement: removeElement,
            forEach: forEach,
            itemHasValue: itemHasValue
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

        function itemHasValue(item, value, searchableProps) {
            if (!value && value !== 0)
                return true;

            var props = searchableProps || Object.keys(item);
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                if ((item[prop] || item[prop] === 0) && (item[prop] + '').toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                    return true;
                }                                
            }

            return false;
        }
    }

    function dateTools() {
        return {
            calculateDaysPending: calculateDaysPending,
            calculateHoursPending: calculateHoursPending
        }

        function calculateDaysPending(element, dateAttr) {
            return moment.duration(calculateDateDiff(element, dateAttr)).days();
        }

        function calculateHoursPending(element, dateAttr) {
            return moment.duration(calculateDateDiff(element, dateAttr)).hours();
        }

        function calculateDateDiff(element, dateAttr) {
            if (!(dateAttr in element))
                return null

            var dateValue = element[dateAttr];
            if (!dateValue)
                return null

            var nowMoment = moment();
            var dateValueMoment = moment(dateValue);
            return nowMoment.diff(dateValueMoment, "DD/MM/YYYY HH:mm:ss");
        }
    }
} ());




