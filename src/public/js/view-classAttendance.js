const API = localStorage.getItem('API');
const currentSubject = document.getElementById('currentSubject').value;

function concatNames(firstname, middlename, lastname) {
  return lastname + ', ' + firstname + ' ' + middlename;
}

let ViewAttendance = {
  columns: ['LRN', 'Last Name', 'First Name', 'Middle Name', 'Status'],
  server: {
    url: `${API}subject/${currentSubject}/1/attendance`,
    then: attendance =>
      attendance.data.map(card => [
        card.LRN,
        card.last_name,
        card.first_name,
        card.middle_name,
        card.status,
      ]),
  },
  pagination: {
    enabled: true,
    limit: 9,
    summary: true,
  },
  search: true,
  sort: true,
  style: {
    table: {
      'font-size': '14px',
    },
  },
};

const grid = new gridjs.Grid(ViewAttendance).render(
  document.getElementById('attendance-table')
);
