const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addButton = document.getElementById('addButton');
const deleteAllButton = document.getElementById('deleteAllButton');
const taskList = document.getElementById('taskList');
const filterDate = document.getElementById('filterDate');
const filterButton = document.getElementById('filterButton');
const clearFilter = document.getElementById('clearFilter');

let tasks = [];

function renderTasks(filtered = null) {
  taskList.innerHTML = '';

  const displayTasks = filtered || tasks;

  if (displayTasks.length === 0) {
    taskList.innerHTML = `<p class="text-gray-300">Belum ada tugas</p>`;
    return;
  }

  displayTasks.forEach((task, index) => {
    const item = document.createElement('div');
    item.className = 'grid grid-cols-4 items-center bg-gray-600 p-2 rounded';

    item.innerHTML = `
      <span>${task.name}</span>
      <span>${task.date}</span>
      <span class="text-yellow-300">${task.status}</span>
      <button data-index="${index}" class="bg-red-500 text-white px-2 py-1 rounded delete-btn">Delete</button>
    `;
    taskList.appendChild(item);
  });
}

addButton.addEventListener('click', () => {
  const name = taskInput.value.trim();
  const date = dateInput.value;

  if (!name || !date) return;

  tasks.push({ name, date, status: 'Pending' });
  renderTasks();

  taskInput.value = '';
  dateInput.value = '';
});

taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.getAttribute('data-index');
    tasks.splice(index, 1);
    renderTasks();
  }
});

deleteAllButton.addEventListener('click', () => {
  tasks = [];
  renderTasks();
});

filterButton.addEventListener('click', () => {
  const selectedDate = filterDate.value;
  if (!selectedDate) return;
  const filtered = tasks.filter(task => task.date === selectedDate);
  renderTasks(filtered);
});

clearFilter.addEventListener('click', () => {
  filterDate.value = '';
  renderTasks();
});