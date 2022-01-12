const API = localStorage.getItem('API');
const currentSubject = document.getElementById('currentSubject').value;

function concatNames(firstname, middlename, lastname) {
  return lastname + ', ' + firstname + ' ' + middlename;
}

function createActionColumn(attendanceStatus, actionName) {
  return {
    name: 'Action',
    formatter: (cell, row) => {
      return gridjs.h(
        'button',
        {
          onClick: async () => {
            await updateAttendance(attendanceStatus, row.cells[0].data);
          },
        },
        actionName
      );
    },
  };
}

async function updateAttendance(newStatus, LRN) {
  //   const lecture_id = 1;
  //   await fetch(`${API}subject/${currentSubject}/${lecture_id}/attendance`, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       newStatus,
  //       LRN,
  //     }),
  //   });
  //   location.reload();
}

let UpdateAttendance = {
  columns: [
    'LRN',
    'Full Name',
    'Status',
    createActionColumn('present', 'Present'),
    createActionColumn('absent', 'Absent'),
    createActionColumn('excused', 'Excused'),
  ],
  // server: {
  //   url: `${API}subject/${currentSubject}/1/attendance`,
  //   then: attendance =>
  //     attendance.data.map(card => [
  //       card.LRN,
  //       concatNames(card.first_name, card.middle_name, card.last_name),
  //       card.status,
  //     ]),
  // },
  data: [['12', 'John Eric', 'present']],
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

const grid = new gridjs.Grid(UpdateAttendance).render(
  document.getElementById('attendance-table')
);
