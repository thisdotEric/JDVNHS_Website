new gridjs.Grid({
  columns: ['LRN', 'First Name', 'Middle Name', 'Last Name'],
  server: {
    // url: 'https://jdvnhs-webapi.herokuapp.com/v1/subject/PreCal/students',
    url: 'http://localhost:4000/v1/subject/PreCal/students',
    then: students =>
      students.data.map(student => [
        student.user_id,
        student.first_name,
        student.middle_name,
        student.last_name,
      ]),
  },
  sort: true,
}).render(document.getElementById('table'));
