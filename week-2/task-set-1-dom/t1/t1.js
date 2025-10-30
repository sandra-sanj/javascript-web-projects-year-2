// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

const ul = document.querySelector('ul');

// loop through all elements to add, and add them to document
todoList.forEach((e) => {
  console.log(e);

  // create list element
  const liElement = `<li><input type="checkbox" id="todo-${e.id}" ${e.completed ? "checked" : ""}><label for="todo-${e.id}">${e.task}</label></li>`;

  // add element to document
  ul.insertAdjacentHTML('beforeend', liElement);
});
