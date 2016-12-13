var theApp = angular.module("apps", []);

// Filter To Display Attendance For Selected Date
theApp.filter("studentDateFilter", function () {
    return function (items, date) {
        var tempArray = [];
        for (var i = 0; i < items.length; i++) {
            if (items[i].theDate.getTime() == date.getTime()) {
                tempArray.push(items[i])
            }
        }
        return tempArray;
    }
})