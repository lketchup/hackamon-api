var students = [
    {
        uuid: "26029391",
        firstname: "Yuan-Fang",
        lastname: "Li",
        username: "dlei7@student.monash.edu",
        password: "formalist0fSpekz",
        units: ["FIT3013", "FIT3080", "FIT2043", "FIT2070"],
        classes: [
            "3013-Lec-01", "3013-Tute-01",
            "3080-Lec-01", "3080-Lab-01",
            "2043-Lec-01","2043-Lab-01",
            "2070-Lec-01", "2070-Lec-02", "2070-Lab-01"
        ]
    },
    {
        uuid: "20029392",
        firstname: "JoJo",
        lastname: "Wong",
        username: "david.anthony.lei@gmail.com",
        password: "yep",
        units: ["FIT2043", "FIT3080", "FIT3088", "FIT3013"],
        classes: [
            "2043-Lec-01","2043-Lab-02",
            "3080-Lec-01", "3080-Lab-02",
            "3088-Lec-01", "3088-Lab-02",
            "3013-Lec-01", "3013-Tute-02"
        ]
    },
    {
        uuid: "23079392",
        firstname: "Ingrid",
        lastname: "Zuckerman",
        username: "bvdarvid@gmail.com",
        password: "soso",
        units: ["FIT3088", "FIT3080", "FIT2043"],
        classes: [
            "3088-Lec-01", "3088-Lab-01",
            "3080-Lec-01", "3080-Lab-03",
            "2043-Lec-01","2043-Lab-02",
        ]
    },
    {
        uuid: "13074492",
        firstname: "Robyn",
        lastname: "Mac",
        username: "patrick.leong.shaw@gmail.com",
        password: "MacNCheez",
        units: ["FIT2043", "FIT3080", "FIT3088", "FIT3013"],
        classes: [
            "2043-Lec-01","2043-Lab-03",
            "3080-Lec-01", "3080-Lab-02",
            "3088-Lec-01", "3088-Lab-01",
            "3013-Lec-01", "3013-Tute-02"
        ]
    }
];

var units = [
    {
        uuid: "FIT3013",
        title: "Formal Specification",
        code: "FIT3013",
        classes: ["3013-Lec-01", "3013-Tute-01", "3013-Tute-02"],
        required: ["Lecture P1", "Tutorial P1"]
    },
    {
        uuid: "FIT2070",
        title: "Operating Systems",
        code: "FIT2070",
        classes: ["2070-Lec-01", "2070-Lec-02","2070-Lab-01","2070-Lab-02","2070-Lab-03"],
        required: ["Lecture P1", "Lecture P2", "Laboratory P1"]
    },
    {
        uuid: "FIT2043",
        title: "Technical Documentation",
        code: "FIT2043",
        classes: ["2043-Lec-01", "2043-Lab-01","2070-Lab-01","2043-Lab-02","2043-Lab-03"],
        required: ["Lecture P1", "Laboratory P1"]
    },
    {
        uuid: "FIT3088",
        title: "Computer Graphics",
        code: "FIT3088",
        classes: ["3088-Lec-01", "3088-Lab-01", "3088-Lab-02"],
        required: ["Lecture P1", "Laboratory P1"]
    },
    {
        uuid: "FIT3080",
        title: "Intelligent Systems",
        code: "FIT3080",
        classes: ["3080-Lec-01", "3080-Lab-01", "3080-Lab-02", "3080-Lab-03"],
        required: ["Lecture P1", "Laboratory P1"]
    }

];

var classes = [
    // FIT3013 Lecture
    {
        uuid: "3013-Lec-01",
        day: "Monday",
        time: "11:00 AM",
        duration: "2",
        campus:"Clayton",
        staff:"Patrick Shaw",
        location: "CL_16Rnf/S9",
        type: "Lecture P1",
        unitUuid: "FIT3013",
        capacity: 60,
        noStudents: 30,
        swappable: false,
        fifoQueue: [],
        students: ["?", "26029391", "13074492", "20029392"]
    },
    // FIT3013 Tute
    {
        uuid: "3013-Tute-01",
        day: "Monday",
        time: "3:00 PM",
        duration: "2",
        campus:"Clayton",
        staff:"Lito Cruz",
        location: "CL_14Rnf/G11B",
        type: "Tutorial P1",
        unitUuid: "FIT3013",
        capacity: 20,
        noStudents: 10,
        swappable: false,
        fifoQueue: [],
        students: ["?", "26029391"]

    },
    {
        uuid: "3013-Tute-02",
        day: "Friday",
        time: "9:00 AM",
        duration: "2",
        campus:"Clayton",
        staff:"Lito Cruz",
        location: "CL_14Rnf/G11B",
        type: "Tutorial P1",
        unitUuid: "FIT3013",
        capacity: 20,
        noStudents: 10,
        swappable: true,
        fifoQueue: [],
        students: ["?", "13074492", "20029392"]
    },
    // FIT2070 Lecture
    {
        uuid: "2070-Lec-01",
        day: "Tuesday",
        time: "2:00 PM",
        duration: "1",
        campus:"Clayton",
        staff:"Callistus Tan",
        location: "CL_16Rnf/S9",
        type: "Lecture P1",
        unitUuid: "FIT2070",
        capacity: 45,
        noStudents: 25,
        swappable: false,
        fifoQueue: [],
        students: ["?", "26029391"]
    },
    {
        uuid: "2070-Lec-02",
        day: "Thursday",
        time: "2:00 PM",
        duration: "1",
        campus:"Clayton",
        staff:"Callistus Tan",
        location: "CL_46Exh/R7",
        type: "Lecture P2",
        unitUuid: "FIT2070",
        capacity: 45,
        noStudents: 25,
        swappable: false,
        fifoQueue: [],
        students: ["?", "26029391"]
    },
    // FIT2070 Labs
    {
        uuid: "2070-Lab-01",
        day: "Wednesday",
        time: "9:00 AM",
        duration: "3",
        campus:"Clayton",
        staff:"Daniel Kos",
        location: "CL_23Col/G46",
        type: "Laboratory P1",
        unitUuid: "FIT2070",
        capacity: 20,
        noStudents: 20,
        swappable: true,
        fifoQueue: [],
        students: ["?", "26029391"]
    },
    {
        uuid: "2070-Lab-02",
        day: "Wednesday",
        time: "5:00 PM",
        duration: "3",
        campus:"Clayton",
        staff:"Daniel Kos",
        location: "CL_23Col/G46",
        type: "Laboratory P1",
        unitUuid: "FIT2070",
        capacity: 20,
        noStudents: 20,
        swappable: true,
        fifoQueue: [],
        students: ["?"]
    },
    {
        uuid: "2070-Lab-03",
        day: "Friday",
        time: "1:00 PM",
        duration: "3",
        campus:"Clayton",
        staff:"Thalerngsak Kijthaweesinpoon",
        location: "CL_23Col/G45",
        type: "Laboratory P1",
        unitUuid: "FIT2070",
        capacity: 20,
        noStudents: 20,
        swappable: true,
        fifoQueue: [],
        students: ["?"]
    },
    // FIT2043 Lectures
    {
        uuid: "2043-Lec-01",
        day: "Monday",
        time: "9:00 AM",
        duration: "1",
        campus:"Clayton",
        staff:"Ramzi Hossari",
        location: "CL_16Rnf/S10",
        type: "Lecture P1",
        unitUuid: "FIT2043",
        capacity: 45,
        noStudents: 35,
        swappable: false,
        fifoQueue: [],
        students: ["?", "26029391", "20029392", "23079392", "13074492"]
    },
    // FIT2043 Labs
    {
        uuid: "2043-Lab-01",
        day: "Monday",
        time: "11:00 AM",
        duration: "1",
        campus:"Clayton",
        staff:"Ian Albon",
        location: "CL_23Col/G45",
        type: "Laboratory P1",
        unitUuid: "FIT2043",
        capacity: 15,
        noStudents: 10,
        swappable: true,
        fifoQueue: [],
        students: ["?", "26029391"]
    },
    {
        uuid: "2043-Lab-02",
        day: "Monday",
        time: "5:00 PM",
        duration: "1",
        campus:"Clayton",
        staff:"Deborah Pickett",
        location: "CL_16Rnf/S10",
        type: "Laboratory P1",
        unitUuid: "FIT2043",
        capacity: 15,
        noStudents: 15,
        swappable: true,
        fifoQueue: [],
        students: ["?", "20029392", "23079392"]
    },
    {
        uuid: "2043-Lab-03",
        day: "Monday",
        time: "6:00 PM",
        duration: "1",
        campus:"Clayton",
        staff:"Ian Albon",
        location: "CL_16Rnf/S09",
        type: "Laboratory P1",
        unitUuid: "FIT2043",
        capacity: 15,
        noStudents: 10,
        swappable: true,
        fifoQueue: [],
        students: ["?", "13074492"]
    },
    // FIT3080 Lectures
    {
        uuid: "3080-Lec-01",
        day: "Tuesday",
        time: "8:00 AM",
        duration: "2",
        campus:"Clayton",
        staff:"Pedro Pais",
        location: "CL_14All/E7",
        type: "Lecture P1",
        unitUuid: "FIT3080",
        capacity: 45,
        noStudents: 40,
        swappable: false,
        fifoQueue: [],
        students: ["?", "26029391", "20029392", "23079392", "13074492"]
    },
    // FIT3080 Labs
    {
        uuid: "3080-Lab-01",
        day: "Tuesday",
        time: "11:00 AM",
        duration: "1",
        campus:"Clayton",
        staff:"David Lei",
        location: "CL_14Rnf/G11A",
        type: "Laboratory P1",
        unitUuid: "FIT3080",
        capacity: 15,
        noStudents: 15,
        swappable: true,
        fifoQueue: [],
        students: ["?", "26029391"]
    },
    {
        uuid: "3080-Lab-02",
        day: "Tuesday",
        time: "4:00 PM",
        duration: "1",
        campus:"Clayton",
        staff:"David Lei",
        location: "CL_14Rnf/G11B",
        type: "Laboratory P1",
        unitUuid: "FIT3080",
        capacity: 20,
        noStudents: 20,
        swappable: true,
        fifoQueue: [],
        students: ["?", "20029392", "13074492"]
    },
    {
        uuid: "3080-Lab-03",
        day: "Wednesday",
        time: "6:00 PM",
        duration: "1",
        campus:"Clayton",
        staff:"Robert Robertson",
        location: "CL_14Rnf/G12",
        type: "Laboratory P1",
        unitUuid: "FIT3080",
        capacity: 15,
        noStudents: 15,
        swappable: true,
        fifoQueue: [],
        students: ["?", "23079392"]
    },
    // FIT3088 Lecture
    {
        uuid: "3088-Lec-01",
        day: "Thursday",
        time: "12:00 PM",
        duration: "2",
        campus:"Clayton",
        staff:"Liam Ketchup",
        location: "CL_16Rnf/S4",
        type: "Lecture P1",
        unitUuid: "FIT3088",
        capacity: 55,
        noStudents: 50,
        swappable: false,
        fifoQueue: [],
        students: ["?", "20029392", "23079392", "13074492"]
    },
    // FIT3088 Labs
    {
        uuid: "3088-Lab-01",
        day: "Thursday",
        time: "4:00 PM",
        duration: "2",
        campus:"Clayton",
        staff:"Eric Cartman",
        location: "CL_16Rnf/S9",
        type: "Laboratory P1",
        unitUuid: "FIT3088",
        capacity: 25,
        noStudents: 20,
        swappable: true,
        fifoQueue: [],
        students: ["?", "23079392", "13074492"]
    },
    {
        uuid: "3088-Lab-02",
        day: "Friday",
        time: "3:00 PM",
        duration: "2",
        campus:"Clayton",
        staff:"Liam Ketchup",
        location: "CL_16Rnf/S9",
        type: "Laboratory P1",
        unitUuid: "FIT3088",
        capacity: 25,
        noStudents: 20,
        swappable: true,
        fifoQueue: [],
        students: ["?", "20029392"]
    }
];

var swapRequests = [
    {
        uuid: "sr-data1",       
        timestamp: 2,          
        studUuid: "26029391",     // Yuan-Fang should be swapped from tute 01 to tute 02 [x]
        unitUuid: "FIT3013",
        currentClassUuid: "3013-Tute-01",
        requestedClasses: ["3013-Tute-02"],
        date: "Wed 16 Nov 2016",
        serviced: false
    },
    {
        uuid: "sr-data2",
        timestamp: 1,
        studUuid: "23079392",     // Ingrid, can either be swapped w/ Jojo or Robyn when lab 2 and 3 are full [?]
        unitUuid: "FIT3080",
        currentClassUuid: "3080-Lab-03",
        requestedClasses: ["3080-Lab-02"],
        date: "Wed 16 Nov 2016",
        serviced: false
    },
    {
        uuid: "sr-data3",
        timestamp: 3,
        studUuid: "13074492",     // Robyn, has a chance to be swapped w/ Ingrid when lab 2 and 3 are full [?]
        unitUuid: "FIT3080",
        currentClassUuid: "3080-Lab-02",
        requestedClasses: ["3080-Lab-03"],
        date: "Wed 16 Nov 2016",
        serviced: false
    },
    {
        uuid: "sr-data4",
        timestamp: 4,
        studUuid: "26029391",     // Yuan-Fang, should not be swapped as lab 2 is full [x]
        unitUuid: "FIT2043",
        currentClassUuid: "2043-Lab-01",
        requestedClasses: ["2043-Lab-02"],
        date: "Wed 16 Nov 2016",
        serviced: false
    },
    {
        uuid: "sr-data5",
        timestamp: 5,
        studUuid: "20029392",     // Jojo, has a chance to be swapped w/ Ingrid when lab 2 and 3 are full [?]
        unitUuid: "FIT3080",
        currentClassUuid: "3080-Lab-02",
        requestedClasses: ["3080-Lab-03"],
        date: "Wed 16 Nov 2016",
        serviced: false
    }
    /* create this
    {
        uuid: "sr-data6",
        timestamp: 0,
        studUuid: "20029392",     // Jojo, should be swapped first due to timestamp [x]
        unitUuid: "FIT3088",
        currentClassUuid: "3088-Lab-02",
        requestedClasses: ["3088-Lab-01"],
        date: "Wed 16 Nov 2016",
        serviced: false
    }
    */
    
    
    
];


exports.students = students;
exports.units = units;
exports.classes = classes;
exports.swapRequests = swapRequests;
