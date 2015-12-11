/**
 * Created by hendrikssonm on 11/12/15.
 */
/**
 * ReportCtrl - controller
 */
var reportTable ="";

function makeReportTable(report) {
    var json2d = [];
    var dateint =  report.createdDate;
    var link = report.name;
    var status = report.status;
    var message = report.message;
    var reportdate = moment.unix(dateint/1000).utc().format('LLL') + ' GMT';
    var generatedLinkJson = "http://localhost:4567/downloadReportFile?name=" + link + "&createdDate=" + dateint + "&type=json" + message;
    var generatedLinkCsv = "http://localhost:4567/downloadReportFile?name=" + link + "&createdDate=" + dateint + "&type=csv" + message;
    var generatedLinkExcel = "http://localhost:4567/downloadReportFile?name=" + link + "&createdDate=" + dateint + "&type=excel" + message;

    var r = $.now();
    var generatedUrl = '<div id="r-' + r + '">' +
        '<a href="' + generatedLinkJson + '"> <b>JSON</b> ' +
        '<i class="fa fa-file-code-o fa-lg"> </i> ' +
            link +
        '</a></div>';

    var LinkJson = "http://localhost:4567/downloadReportFile?name=" + link + "&createdDate=" + dateint + "&type=json" + message;
    var LinkCsv = "http://localhost:4567/downloadReportFile?name=" + link + "&createdDate=" + dateint + "&type=csv" + message;
    var LinkExcel = "http://localhost:4567/downloadReportFile?name=" + link + "&createdDate=" + dateint + "&type=excel" + message;

    var generatedLinkJson = '<a class="btn btn-success" type="button" href="' + LinkJson +  '">' +
        '<b>JSON</b> <i class="fa fa-file-code-o fa-lg"></i> ' + link + '</a>';
    var generatedLinkCsv = '<a class="btn btn-warning" type="button" href="' + LinkCsv +  '">' +
        '<b>CSV</b> <i class="fa fa-file-text-o fa-lg"></i> ' + link + '</a>';
    var generatedLinkExcel = '<a class="btn btn-primary" type="button" href="' + LinkExcel +  '">' +
        '<b>EXCEL</b> <i class="fa fa-file-excel-o fa-lg"></i> ' + link + '</a>'

    var LinkArray = generatedLinkJson + " " + generatedLinkCsv + " " + generatedLinkExcel;

    $('#json-' + r).attr('checked','checked');

    json2d.push([reportdate, LinkArray]);

    //Build Datatable and add new rows
    if(reportTable.length == 0) {
        reportTable = $('#reports').dataTable({
            'data': json2d,
            'bAutoWidth': false,
            'bFilter': true,
            'bSearchable': true,
            'bInfo': false,
            'bPaginate': true,
            'bDestroy': true,
            'aaSorting': [],
            'iDisplayLength': 100,
            'order': [[0, "asc"]],
            'language': {'zeroRecords': 'There are no report links.'},
            'createdRow': function (row, data, index) {
                //$('td', row).eq(1).addClass(determinePatientStatusColor(data[1]));
            }
        });
    }
    else{
        reportTable.dataTable().fnAddData(json2d);
    }
}

//Modules
var reportCtrl = angular.module('reportCtrl',[]);
var loadCtrl = angular.module('loadCtrl',[]);
var myService = angular.module('myService',[]);
var serviceParam = angular.module('serviceParam',[]);
var ExampleCtrl = angular.module('myApp',[]);

$('#parameterslist').multiselect();

function serviceReport() {
    var array = [];

    var myService = {
        mySharedObject:{
            myText:'abc'
        },
        updateObject: function() {
            myService.mySharedObject.myText = 'def';
        }
    };
    return myService;
}

function injectParam(param) {
    var array = [];
    var serviceParam = {
        mySharedObject:{
            myText:param
        },
        updateObject: function() {
            serviceParam.mySharedObject.myText = param;
        }
    };

    //serviceParam.mySharedObject.myText = param;
    return serviceParam;
}

function paramInject($scope) {
    $scope.injectParameter = function () {

        //alert("pop")
        $scope.example2model = [];
        $scope.example2data = [
            {id: 1, label: "David"},
            {id: 2, label: "Jhon"},
            {id: 3, label: "Danny"}];
        $scope.example2settings = {displayProp: 'id'};

    }

}


/*

 var app_directives = angular.module('app.directives', []);


 function paramInject($scope) {

 $scope.injectParameter = function () {

 $scope.roles = [
 {"id": 1, "name": "Manager", "assignable": true},
 {"id": 2, "name": "Developer", "assignable": true},
 {"id": 3, "name": "Reporter", "assignable": true}
 ];

 $scope.member = {roles: []};
 $scope.selected_items = [];


 alert(JSON.stringify($scope.roles))



 app_directives.directive('dropdownMultiselect', function(){

 alert("dang")
 return {
 restrict: 'E',
 scope:{
 model: '=',
 options: '=',
 pre_selected: '=preSelected'
 },
 template: "<div class='btn-group' data-ng-class='{open: open}'>"+
 "<button class='btn btn-small'>Select</button>"+
 "<button class='btn btn-small dropdown-toggle' data-ng-click='open=!open;openDropdown()'><span class='caret'></span></button>"+
 "<ul class='dropdown-menu' aria-labelledby='dropdownMenu'>" +
 "<li><a data-ng-click='selectAll()'><i class='icon-ok-sign'></i>  Check All</a></li>" +
 "<li><a data-ng-click='deselectAll();'><i class='icon-remove-sign'></i>  Uncheck All</a></li>" +
 "<li class='divider'></li>" +
 "<li data-ng-repeat='option in options'> <a data-ng-click='setSelectedItem()'>{{option.name}}<span data-ng-class='isChecked(option.id)'></span></a></li>" +
 "</ul>" +
 "</div>" ,
 controller: function($scope){

 $scope.openDropdown = function(){
 $scope.selected_items = [];
 for(var i=0; i<$scope.pre_selected.length; i++){                        $scope.selected_items.push($scope.pre_selected[i].id);
 }
 };

 $scope.selectAll = function () {
 $scope.model = _.pluck($scope.options, 'id');
 console.log($scope.model);
 };
 $scope.deselectAll = function() {
 $scope.model=[];
 console.log($scope.model);
 };
 $scope.setSelectedItem = function(){
 var id = this.option.id;
 if (_.contains($scope.model, id)) {
 $scope.model = _.without($scope.model, id);
 } else {
 $scope.model.push(id);
 }
 console.log($scope.model);
 return false;
 };
 $scope.isChecked = function (id) {
 if (_.contains($scope.model, id)) {
 return 'icon-ok pull-right';
 }
 return false;
 };
 }
 }
 });

 //
 //
 //
 //
 //$scope.example2model = [];
 //    $scope.example2data = [
 //        {id: 1, label: "David"},
 //        {id: 2, label: "Jhon"},
 //        {id: 3, label: "Danny"}];
 //    $scope.example2settings = {displayProp: 'id'};
 //
 //    alert(JSON.stringify($scope.example2data))
 //
 }

 }


 */


// #load the generatble reports
function loadGeneratorData($scope, $http) {
    var array = [];
    var URL = "http://localhost:4567/reportList";

    $scope.generateReportLinks = function () {

        $http
            .get(URL)
            .success(function (data, status, headers, config) {

                $.each(data, function (key, value) {
                    var dataname = "-";
                    var displayname = "-";
                    var description = "-";

                    if(value != null){
                        description = value.description;

                        if(typeof value.params !== 'undefined'){
                            dataname = value.params[0].name;
                            displayname = value.params[0].displayName;
                        }
                    }

                    //injectParam(value);
                    array.push({
                        name: key,
                        id: value,
                        description: description,
                        dataname: dataname,
                        displayname: displayname
                    });
                });

                $scope.templates = array;
                $scope.template = $scope.templates[0];
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<br />status: " + status +
                    "<br />headers: " + JSON.stringify(header) +
                    "<br />config: " + JSON.stringify(config)
                ;
            });
    };

    $scope.reportSelect = function (param) {
        var pdata = [];
        var pdisplayName = "-";
        var pdataName = "-";
        var selectedarray = [];
        var namesarray = [];
        var URL = "";
            $('#parameterValidationErrorMessage').hide();

        if(param.selectedReport == "geneSummaryReport" ||
            param.selectedReport == "patientsByGeneName") {
            URL = "http://localhost:4567/geneList";
        }
        else if(param.selectedReport == "treatmentArmSummaryReport" ||
            param.selectedReport == "diseaseCoverageByTreatmentArm") {
            URL = "http://localhost:4567/treatmentArmIdList";
        }
        else if(param.selectedReport == "variantSummaryReport" ||
            param.selectedReport == "qualifyingVariantSummaryReport") {
            URL = "http://localhost:4567/variantList";
        }
        else if(param.selectedReport == "patientEligibleArmsNoTiebreaker") {
            URL = "http://localhost:4567/patientList";
        }
        else{
            namesarray.push({
                name: '-',
                id: '-'
            });
            $scope.namelist = namesarray;
            return;
        }

        $http
            .get(URL)
            .success(function (data, status, headers, config) {
                $.each(data, function (key, value) {
                    var inx = value ;
                    namesarray.push({
                        name: key,
                        id: inx
                    });
                });
                $scope.namelist = namesarray;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<br />status: " + status +
                    "<br />headers: " + JSON.stringify(header) +
                    "<br />config: " + JSON.stringify(config)
                ;
            });

        selected = param.selectedReport;

        pname = selected.name;
        p$$hashKey = selected.$$hashKey;
        if(selected.id != null){
            pdata = selected.id;
            pdataName = pdata[0].name;
            pdisplayName = pdata[0].displayName;
        }

        selectedarray.push({
            pname: pname,
            p$$hashKey: p$$hashKey,
            pdataName: pdataName,
            pdisplayName: pdisplayName
        });

        $scope.selectedreport = selectedarray;
        $scope.selected = $scope.selectedreport[0];



    };

    //Select parameter
    $scope.selectedNamesList = function (param) {
        var selectedparameter = param.selectedParameter;
        var parametername = [];

        return;
    };

    //Select parameter
    $scope.generateReport = function (param) {
        var reportname = "-";
        var reportparams = "-";
        var inputparameters,URL;

        if(param.length !== undefined){
            parameters = param.reportParameters;
            reportname = parameters.pname;
            reportparams = parameters.pdataName;

             inputparameters = $scope.rootFolders;
             URL = "http://localhost:4567/generateReport?name=" + reportname
                + "&" + reportparams
                + "=" + inputparameters;

        }
        else{
            URL = "http://localhost:4567/generateReport?name=" + param.reportParameters
        }

        //var inputparameters = $scope.rootFolders;
        //var URL = "http://localhost:4567/generateReport?name=" + reportname
        //    + "&" + reportparams
        //    + "=" + inputparameters;




        $http.get(URL)
            .success(function (data, status, headers, config) {
                makeReportTable(data);
            })
            .error(function (data, status, header, config) {
                $('#parameterValidationErrorMessage').show();
                document.getElementById("parameterLostErrorMessage").textContent=data.message;
                $scope.ResponseDetails = "Data: " + data +
                    "<br />status: " + status +
                    "<br />headers: " + JSON.stringify(header) +
                    "<br />config: " + JSON.stringify(config);
            });
        };
    }

angular
    .module('inspinia')
    .controller('loadCtrl', loadGeneratorData)
    //Factory
    .factory('myService', serviceReport)
    .factory('serviceParam', injectParam)
    .controller('ExampleCtrl', paramInject)

    .controller('MyCtrl', ['$scope', 'myService', function($scope, myService) {
        $scope.myText = myService.mySharedObject.myText;
        $scope.updateObject = myService.updateObject;
        $scope.myService = myService;
        $scope.mySharedObject =  myService.mySharedObject;

    }])

//*******************//

//.controller('ExampleCtrl', ['$scope', function($scope) {
//    $scope.example2model = [];
//    $scope.example2data = [
//        {id: 1, label: "David"},
//        {id: 2, label: "Jhon"},
//        {id: 3, label: "Danny"}];
//    $scope.example2settings = {displayProp: 'id'};
//}])



//*******************//
