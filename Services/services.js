angular
    .module("apps")
    .service("attendanceService", function ($http) {
        var _students = [];

        this.getStudents = function (callBack) {
            if (_students.length == 0) {
                $http.get('students.json')
                    .then(function (item) {
                        callBack(item.data.students);
                        _students = item.data.students;
                    })
            }
            else {
                callBack(_students);
            }

        }
    })
