var appDataEntry = angular.module("DataEntry", ["ngResource", "ngTouch", "ngSanitize"]);

appDataEntry.controller("DataEntryCtrl", function ($rootScope, $scope, $timeout) {
    //--Compose incoming data from whatever source, appDataEntry.Factory-webapi, https resource...
    $scope.data = {
        employeeSelect: null,
        employees:[{id: 1, firstName: "Tu", lastName: "Phan"}, {id: 2, firstName: "Jesse", lastName: "Massey"}]
    };

    //--******--OO Data Structure--******--
    //--*--Properties
    //var selectedEmployee = null;

    var Employee = function () {  //--this is root/ancestor object/class
        this.employeeId = 0;  //--default data or just nothing: this.employeeId;
        this.employeeLoginId = 0;
        this.firstName = "";
        this.lastName = "";
        this.currentHomeLocationId = 0;
        this.currentHomeLocationName = "";
    };

    var SelectedEmployee = function (selectedEmployee) {
        if (selectedEmployee) {
            this.employeeId = selectedEmployee["id"];  //--col name/id return from webapi or database
            //this.employeeLoginId = selectedEmployee["employeeLoginId"];
            this.firstName = selectedEmployee["firstName"];
            this.lastName = selectedEmployee["lastName"];
            //this.currentHomeLocationId = selectedEmployee["locationId"];
            //this.currentHomeLocationName = selectedEmployee["locationName"];
        }
    };

    SelectedEmployee.prototype = new Employee();  //--set Employee as ancestor/root object

    //var employee = new SelectedEmployee(selectedEmployee);

    $scope.selectedEmployee = new SelectedEmployee(); //-mapping selected employee to $scope

    //--*--Methods
    $scope.editEmployee = function (selEmployee) {
        if (selEmployee) {
            var thisEmployee = new SelectedEmployee(selEmployee);  //--thisEmployee instanceof Employee/SelectedEmployee
            $scope.selectedEmployee = thisEmployee;
            console.log($scope.selectedEmployee.firstName + ' -- ' + thisEmployee.employeeId);
        }
    }

    $scope.deleteEmployee = function (selEmployee) {
        if (selEmployee) {
            var thisEmployee = new SelectedEmployee(selEmployee);
            console.log(thisEmployee.employeeId);
        }
    }

    $scope.getEmployeeCount = function () {
        var retVal = 0;

        for (var item in $scope.data.employees) {
            if ($scope.data.employees[item].id)
                retVal++;
        }

        return retVal;
    }

});
