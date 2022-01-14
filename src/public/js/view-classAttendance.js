const API = localStorage.getItem('API');
const currentSubject = document.getElementById('currentSubject').value;

window.onload = async function () {
  getDate();
};

function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  today = yyyy + '-' + mm + '-' + dd;
  document.getElementById('lecture_date').value = today;
}

const tableOptions = {
  columns: ['LRN', 'Last Name', 'First Name', 'Middle Name', 'Status'],
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

function serverOptions(date) {
  return {
    server: {
      url: `${API}subject/${currentSubject}/attendance?date=${date}`,
      then: response =>
        response.data.attendance.map(card => [
          card.LRN,
          card.last_name,
          card.first_name,
          card.middle_name,
          card.status,
        ]),
    },
  };
}

/**
 * Load the latest attendance for a given subject
 */
const grid = new gridjs.Grid({
  ...serverOptions('latest'),
  ...tableOptions,
}).render(document.getElementById('attendance-table'));

/**
 * Update table values based on date
 */
document.getElementById('lecture_date').addEventListener('change', function () {
  const date = document.getElementById('lecture_date').value;

  /**
   * Make the date available to update page
   */
  localStorage.setItem('attendance_date', date);

  grid
    .updateConfig({
      ...serverOptions(date),
      ...tableOptions,
    })
    .forceRender();
});
