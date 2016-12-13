angular.module("apps").controller("theController", function ($scope, attendanceService) {

    attendanceService.getStudents(function (students) {
        $scope.students = students
    })



    // Global Variables

    $scope.attendanceRecordId = 0
    // which student is selected for sole display
    $scope.currentStudent = null;

    //all attendance ever taken 
    $scope.globalAttendanceRecord = [];

    // which student you are adding new attendance items for
    $scope.currentStudentNewAttendance = null;

    //id of student selected for display
    $scope.studentId = "";

    // id of student from creating new attendance object
    $scope.studentNewId = "";

    // the date selected for display of attendance by date
    $scope.dateSelection = null;

    // which student you can delete
    $scope.selectedStudentEditable = null;

    // id of student you can delete
    $scope.studentEditableId = null;

    // which attendance item you can delete
    $scope.selectedAttendanceEditable = null;

    // id of attendance item you can delete
    $scope.attendanceEditableId = null;

    // Creates The New Attendance Item
    $scope.newAttendanceItem = function (theDate, theStudent, thePresence, theDetail, id) {
        this.theDate = theDate;
        this.theStudent = theStudent;
        this.thePresence = thePresence;
        this.theDetail = theDetail;
        this.id = id
    }

    // Adds The New Attendance Items
    $scope.addNewAttendance = function () {
        var recordExists = null;
        var id = $scope.attendanceRecordId;
        for (var g = 0; g < $scope.currentStudentNewAttendance.personalAttendance.length; g++) {
            if ($scope.currentStudentNewAttendance.personalAttendance[g].theDate.getTime() == $scope.newAttendanceByDate.getTime()) {
                recordExists = true
            }
            else {
                recordExists = false
            }
        }
        if (recordExists == true) {

            alert("An Entry For That Date Already Exists");
        }
        else if ($scope.newAttendanceByDate == null || $scope.currentStudentNewAttendance == null || $scope.hereOrNot == null || $scope.excusedOrNot == null || $scope.lateOrNot == null) {
            alert("Please Fill Out Every Field");
        }
        else if ($scope.hereOrNot == "Present" && $scope.excusedOrNot == "null" && $scope.lateOrNot == "Late") {
            $scope.currentStudentNewAttendance.timesLate++
            $scope.currentStudentNewAttendance.totalPresent++
            $scope.currentStudentNewAttendance.personalAttendance.unshift(new $scope.newAttendanceItem($scope.newAttendanceByDate, $scope.currentStudentNewAttendance, $scope.hereOrNot, $scope.lateOrNot, id))
            $scope.globalAttendanceRecord.unshift(new $scope.newAttendanceItem($scope.newAttendanceByDate, $scope.currentStudentNewAttendance, $scope.hereOrNot, $scope.lateOrNot, id))
            $scope.attendanceRecordId++
        }
        else if ($scope.hereOrNot == "Present" && $scope.excusedOrNot == "null" && $scope.lateOrNot == "On Time") {
            $scope.currentStudentNewAttendance.timesOnTime++
            $scope.currentStudentNewAttendance.totalPresent++
            $scope.currentStudentNewAttendance.personalAttendance.unshift(new $scope.newAttendanceItem($scope.newAttendanceByDate, $scope.currentStudentNewAttendance, $scope.hereOrNot, $scope.lateOrNot, id))
            $scope.globalAttendanceRecord.unshift(new $scope.newAttendanceItem($scope.newAttendanceByDate, $scope.currentStudentNewAttendance, $scope.hereOrNot, $scope.lateOrNot, id))
            $scope.attendanceRecordId++
        }
        else if ($scope.hereOrNot == "Absent" && $scope.lateOrNot == "null" && $scope.excusedOrNot == "Excused") {
            $scope.currentStudentNewAttendance.totalExcusedAbsences++
            $scope.currentStudentNewAttendance.totalAbsences++
            $scope.currentStudentNewAttendance.personalAttendance.unshift(new $scope.newAttendanceItem($scope.newAttendanceByDate, $scope.currentStudentNewAttendance, $scope.hereOrNot, $scope.excusedOrNot, id))
            $scope.globalAttendanceRecord.unshift(new $scope.newAttendanceItem($scope.newAttendanceByDate, $scope.currentStudentNewAttendance, $scope.hereOrNot, $scope.excusedOrNot, id))
            $scope.attendanceRecordId++
        }
        else if ($scope.hereOrNot == "Absent" && $scope.lateOrNot == "null" && $scope.excusedOrNot == "Unexcused") {
            $scope.currentStudentNewAttendance.totalUnexcusedAbsences++
            $scope.currentStudentNewAttendance.totalAbsences++
            $scope.currentStudentNewAttendance.personalAttendance.unshift(new $scope.newAttendanceItem($scope.newAttendanceByDate, $scope.currentStudentNewAttendance, $scope.hereOrNot, $scope.excusedOrNot, id))
            $scope.globalAttendanceRecord.unshift(new $scope.newAttendanceItem($scope.newAttendanceByDate, $scope.currentStudentNewAttendance, $scope.hereOrNot, $scope.excusedOrNot, id))
            $scope.attendanceRecordId++
        }
        else {
            alert("Invalid Choice. Please Format Selection")
        }

    }
    // Deletes The Selected Attendance Item
    $scope.deleteSelectedAttendance = function (item) {
        
    var index = $scope.currentStudent.personalAttendance.indexOf(item)
        if (item.thePresence == "Present" && item.theDetail == "Late") {
            $scope.currentStudent.timesLate--;
            $scope.currentStudent.totalPresent--;
            $scope.currentStudent.personalAttendance.splice(index, 1);
    $scope.attendanceRecordId--    
    }
        else if (item.thePresence == "Present" && item.theDetail == "On Time") {
            $scope.currentStudent.timesOnTime--;
            $scope.currentStudent.totalPresent--;
            $scope.currentStudent.personalAttendance.splice(index, 1);
    $scope.attendanceRecordId--    
    }
        else if (item.thePresence == "Absent" && item.theDetail == "Excused") {

            $scope.currentStudent.totalExcusedAbsences--;
            $scope.currentStudent.totalAbsences--;
            $scope.currentStudent.personalAttendance.splice(index, 1);
    $scope.attendanceRecordId--    
    }
        else {
            $scope.currentStudent.totalUnexcusedAbsences--;
            $scope.currentStudent.totalAbsences--;
            $scope.currentStudent.personalAttendance.splice(index, 1);
            $scope.attendanceRecordId--
        }
    }

    // Current Student Selection Function
    $scope.selectedCurrentStudent = function () {
        for (i = 0; i < $scope.students.length; i++) {
            if ($scope.students[i].id == $scope.studentId) {
                $scope.currentStudent = $scope.students[i];
            }
        }
    }

    // Current Date Selection Function
    $scope.getSelectedDate = function () {
        $scope.dateSelection = $scope.attendanceByDate
    }

    // Student For New Attendance Function
    $scope.selectedNewCurrentStudent = function () {
        for (i = 0; i < $scope.students.length; i++) {
            if ($scope.students[i].id == $scope.studentNewId) {
                $scope.currentStudentNewAttendance = $scope.students[i];
            }
        }
    }
})
