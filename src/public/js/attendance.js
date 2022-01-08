const API = localStorage.getItem('API');

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
  const lecture_id = 1;

  await fetch(`${API}subject/PreCal/${lecture_id}/attendance`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newStatus,
      LRN,
    }),
  });
  location.reload();
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
  server: {
    url: `${API}subject/PreCal/1/attendance`,
    then: attendance =>
      attendance.data.map(card => [
        card.LRN,
        concatNames(card.first_name, card.middle_name, card.last_name),
        card.status,
      ]),
  },
  pagination: {
    enabled: true,
    limit: 10,
    summary: true,
  },
  search: true,
  sort: true,
};

let AddNewAttendance = {
  columns: ['LRN', 'Full Name', 'Status'],
  data: [
    { LRN: 'John', name: 'john@example.com', status: true },
    { LRN: 'Mark', name: 'mark@gmail.com', status: true },
  ],
  pagination: {
    enabled: true,
    limit: 10,
    summary: true,
  },
  search: true,
};

const grid = new gridjs.Grid(UpdateAttendance).render(
  document.getElementById('attendance-table')
);
