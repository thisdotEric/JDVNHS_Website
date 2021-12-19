new gridjs.Grid({
    columns: ['LRN'],
    data: [['123456789123']],
}).render(document.getElementById('table'));

fetch('http://localhost:3000/v1/student/123456789145')
    .then(res => res.json())
    .then(data => {
        console.log(data.data);
        console.log(data.data.user_id);
    });
