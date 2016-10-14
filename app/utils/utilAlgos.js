// check student is enrolled in that unit
// check class is in that unit
// check is class available to swap into


exports.isEnrolled = function isEnrolled(studentUuid, unitUuid) {
    /**
     * checks if student is enrolled in unit, returns true if so, else false
     */
    var student = Student.getStudentByUuid(studentUuid, function(err, obj) {
        if ((err) || (obj) === null) {
            console.log("ERROR at .isEnrolled, error: " + err + ", obj: " + obj);
            return false;
        } else {
            console.log("PASS .isEnrolled, error: " + err + ", obj: " + obj);
        }
    });

    /*
     var unit = Unit.findUnit(unitUuid, function(err, obj) {
     if ((err) || (obj) == null) {
     console.log("ERROR at .isEnrolled, error: " + err + ", obj: " + obj);
     return false;
     } else {
     console.log("PASS .isEnrolled, error: " + err + ", obj: " + obj);
     }
     });
     */

    student.units.forEach(function(unit) {
        if (unit.uuid === unitUuid) {
            return true;
        }
    });
    return false;
};

exports.classInUnit = function classInUnit(classUuid, unitUuid) {
    /**
     * checks if class is in unit, returns true if so, else false
     */
    var unit = Unit.findUnit(unitUuid, function(err, obj) {
        if ((err) || (obj) === null) {
            console.log("ERROR at .classInUnit, error: " + err + ", obj: " + obj);
            return false;
        } else {
            console.log("PASS .classInUnit, error: " + err + ", obj: " + obj);
        }
    });

    unit.classes.forEach(function(unitClass) {
        if (unitClass.uuid === classUuid) {
            return true;
        }
    });
    return false;
};

exports.classCanSwapInto = function classCanSwapInto(classUuid) {
    /**
     * check if can directly swap into a class
     */
    var unitClass = Class.getClassByUuid(classUuid, function(err, obj){
        if ((err) || (obj) === null){
            console.log("ERROR at .classCanSwapInto, error: " + err + ", obj: " + obj);
            return false;
        } else {
            console.log("PASS .classCanSwapInto, error: " + err + ", obj: " + obj);
        }
    });
    // check if there is room left in class
    return (unitClass.noStudents - unitClass.capacity) < 0
};


exports.classEnQueue = function classEnQueue(classUuid, studentUuid) {
    /**
     * add a student to the queue of a class
     */
    var unitClass = Class.getClassByUuid(classUuid, function(err, obj){
        if ((err) || (obj) === null){
            console.log("ERROR at .classCanSwapInto, error: " + err + ", obj: " + obj);
            return false;
        } else {
            console.log("PASS .classCanSwapInto, error: " + err + ", obj: " + obj);
        }
    });

    Class.appendClassQueue(unitClass, studentUuid);

};

exports.changeClassEnrollment = function changeClassEnrollment(oldClass, newClass, student) {
    /**
     * @precondition: can service queue, oldClass, newClass and student all valid
     * Changes the uuid of a class in the student.classes array from the old class to the new class
     */
    for (var i=0; i < student.classes.length; i ++) {
        if (student.classes[i] === oldClass.uuid) {
            student.classes[i] = newClass.uuid;
            break;
        }
    }
};

exports.getClassForUnitForStudent = function getClassForUnitForStudent(student, classFormat) {
    /**
     * Only called if can swap into classFormat, classFormat is the new class for the student
     * @type {Array|unitSchema.classes|{type, required}|studentSchema.classes}
     */
    var studentClasses = student.classes;
    var unitUuid = classFormat.unitUuid;
    var classType = classFormat.type;

    studentClasses.forEach(function(aClass) {
        if ( (aClass.unitUuid === unitUuid ) && (aClass.type === classType) ) {
            return aClass;
        }
        console.log("gawd damn error");
        return false;
    })


};


// check if can service every 30 seconds
exports.checkServiceOnTimer = function checkServiceOnTimer() {
    /**
     * Checks if can service a queue and perform a swap, does so if possible
     */
    var classes = Class.getAllClasses();
    classes.forEach( function(unitClass){
        if ((unitClass.fifoQueue.length > 0 ) && (unitclass.noStudents - unitClass.capacity > 0))  {
            var swapMe = Class.serveClassQueue();
            var stuUuid = swapMe.studentUuid;
            var student = Student.getStudentByUuid(stuUuid);

            var newClass = unitClass;
            var oldClass = getClassForUnitForStudent(student, newClass);

            changeClassEnrollment(oldClass, newClass, student);
        }
    });
};





