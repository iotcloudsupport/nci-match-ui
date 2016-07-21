(function () {
    "use strict";

    angular.module('matchbox.tools', [])
        .factory('arrayTools', arrayTools);

    function arrayTools() {
        return {
            removeElement: removeElement
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
    }
} ());
