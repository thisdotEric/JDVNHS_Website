const API = localStorage.getItem('API');
const currentSubject = document.getElementById('currentSubject').value;

async function removeStudentFromClass(LRN) {
  const res = await fetch(
    `http://localhost:4000/v1/subject/${currentSubject}/students/${LRN}`,
    {
      method: 'DELETE',
    }
  );
  const jsonData = await res.json();

  location.reload();
}

const grid = new gridjs.Grid({
  columns: [
    'LRN',
    'First Name',
    'Middle Name',
    'Last Name',
    {
      name: 'Action',
      formatter: (cell, row) => {
        return gridjs.h(
          'button',
          {
            className:
              'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
            onClick: async () => {
              curr = `${row.cells[0].data}`;
              await removeStudentFromClass(`${row.cells[0].data}`);
            },
          },
          'Remove from class'
        );
      },
    },
  ],
  data: async () => {
    const res = await fetch(`${API}subject/${currentSubject}/students`);
    const data = await res.json();

    return data.data.map(student => [
      student.user_id,
      student.first_name,
      student.middle_name,
      student.last_name,
    ]);
  },
  sort: true,
  pagination: {
    enabled: true,
    limit: 10,
    summary: true,
  },
  search: true,
}).render(document.getElementById('table'));
