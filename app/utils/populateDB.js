var sampleStudents = [
    {
        uuid: 26029391,
        firstname: "Patrick",
        lastname: "Star",
        username: "pasta8",
        password: "coffeeB3anZ",
        units: ["FIT1010", "FIT3080"],
        classes: ["01", "02", "04", "06", "09"]
    },
    {
        uuid: 26029392,
        firstname: "Stuart",
        lastname: "Little",
        username: "stulit4",
        password: "h1rem3",
        units: ["FIT1010", "FIT3080"],
        classes: ["01", "02", "03", "06", "07"]
    }
];

var sampleUnits = [
    {
        uuid: "FIT1010",
        title: "Introduction to Software Engineering",
        code: "FIT1010",
        classes: ["01", "02","03","04","05"],
        required: ["Lecture 1", "Lecture 2", "Lab"]
    },
    {
        uuid: "FIT3080",
        title: "Intelligent Systems",
        code: "FIT3080",
        classes: ["06","07","08","09"],
        required: ["Lecture 1", "Tutorial"]
    }

];

var sampleClasses = [
    {
        uuid: "01",
        day: "Monday",
        time: "11:00 AM",
        duration: "1",
        campus:"Clayton",
        staff:"Chris Ling",
        location: "14All,Room E7",
        type: "Lecture 1",
        unitUuid: "FIT1010",
        capacity: 50,
        noStudents: 30,
        swappable: false,
        fifoQueue: []
    },
    {
        uuid: "02",
        day: "Friday",
        time: "12:00 PM",
        duration: "1",
        campus:"Clayton",
        staff:"Chris Ling",
        location: "14All,Room E7",
        type: "Lecture 2",
        unitUuid: "FIT1010",
        capacity: 50,
        noStudents: 30,
        swappable: false,
        fifoQueue: []
    },
    {
        uuid: "03",
        day: "Tuesday",
        time: "3:00 PM",
        duration: "2",
        campus:"Clayton",
        staff:"Chris Ling",
        location: "23Col,Room G44",
        type: "Laboratory",
        unitUuid: "FIT1010",
        capacity: 20,
        noStudents: 18,
        swappable: true,
        fifoQueue: []
    },
    {
        uuid: "04",
        day: "Wednesday",
        time: "2:00 PM",
        duration: "2",
        campus:"Clayton",
        staff:"Bob Sagget",
        location: "23Col,Room G45",
        type: "Laboratory",
        unitUuid: "FIT1010",
        capacity: 20,
        noStudents: 20,
        swappable: false,
        fifoQueue: []
    },
    {
        uuid: "05",
        day: "Friday",
        time: "6:00 PM",
        duration: "2",
        campus:"Clayton",
        staff:"Tom Ato",
        location: "23Col,Room G46",
        type: "Laboratory",
        unitUuid: "FIT1010",
        capacity: 20,
        noStudents: 10,
        swappable: true,
        fifoQueue: []
    },
    {
        uuid: "06",
        day: "Thursday",
        time: "9:00 AM",
        duration: "2",
        campus:"Clayton",
        staff:"Ingrid Zuckerman",
        location: "46Exh,Room R2",
        type: "Lecture 1",
        unitUuid: "FIT3080",
        capacity: 55,
        noStudents: 45,
        swappable: false,
        fifoQueue: []
    },
    {
        uuid: "07",
        day: "Thursday",
        time: "11:00 AM",
        duration: "2",
        campus:"Clayton",
        staff:"Donald Trump",
        location: "23Col,Room G45",
        type: "Tutorial",
        unitUuid: "FIT3080",
        capacity: 20,
        noStudents: 20,
        swappable: false,
        fifoQueue: []
    },
    {
        uuid: "08",
        day: "Thursday",
        time: "1:00 PM",
        duration: "2",
        campus:"Clayton",
        staff:"Peter Parker",
        location: "14Rnf,Room 143",
        type: "Tutorial",
        unitUuid: "FIT3080",
        capacity: 18,
        noStudents: 20,
        swappable: true,
        fifoQueue: []
    },
    {
        uuid: "09",
        day: "Friday",
        time: "10:00 AM",
        duration: "2",
        campus:"Clayton",
        staff:"Koffy Been",
        location: "14Rnf,Room G11A",
        type: "Tutorial",
        unitUuid: "FIT3080",
        capacity: 15,
        noStudents: 20,
        swappable: true,
        fifoQueue: []
    }
];

exports.sampleStudents = sampleStudents;
exports.sampleUnits = sampleUnits;
exports.sampleClasses = sampleClasses;
