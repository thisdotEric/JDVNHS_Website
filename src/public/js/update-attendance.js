const API = localStorage.getItem('API');
const attendance_date = localStorage.getItem('attendance_date');
const currentSubject = document.getElementById('currentSubject').value;

function concatNames(firstname, middlename, lastname) {
  return lastname + ', ' + firstname + ' ' + middlename;
}

const tableOpts = {
  columns: [
    'LRN',
    'Full Name',
    'Status',
    createActionColumn('present', 'Present'),
    createActionColumn('absent', 'Absent'),
    createActionColumn('excused', 'Excused'),
  ],
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

const serverOptions = {
  server: {
    url: `${API}subject/${currentSubject}/attendance?date=${attendance_date}`,
    then: response =>
      response.data.attendance.map(card => [
        card.LRN,
        concatNames(card.first_name, card.middle_name, card.last_name),
        card.status,
      ]),
  },
};

/**
 * Variable to hold the table
 */
let grid = new gridjs.Grid({
  ...serverOptions,
  ...tableOpts,
}).render(document.getElementById('attendance-table'));

function createActionColumn(attendanceStatus, actionName) {
  return {
    name: 'Action',
    formatter: (cell, row) => {
      return gridjs.h(
        'button',
        {
          onClick: async () => {
            await updateAttendance(attendanceStatus, row.cells[0].data);

            /**
             * Re-render the table with new data
             */
            grid
              .updateConfig({
                ...serverOptions,
                ...tableOpts,
              })
              .forceRender();
          },
        },
        actionName
      );
    },
  };
}

async function updateAttendance(newStatus, LRN) {
  await fetch(
    `${API}subject/${currentSubject}/attendance?date=${attendance_date}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newStatus,
        LRN,
      }),
    }
  );
}
