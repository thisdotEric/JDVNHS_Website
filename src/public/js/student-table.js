const API = localStorage.getItem('API');

const currentSubject = document.getElementById('currentSubject').value;

new gridjs.Grid({
  columns: ['LRN', 'First Name', 'Middle Name', 'Last Name'],
  server: {
    url: `${API}subject/${currentSubject}/students`,
    then: students =>
      students.data.map(student => [
        student.user_id,
        student.first_name,
        student.middle_name,
        student.last_name,
      ]),
  },
  sort: true,
  pagination: {
    enabled: true,
    limit: 10,
    summary: true,
  },
  search: true,
}).render(document.getElementById('table'));
