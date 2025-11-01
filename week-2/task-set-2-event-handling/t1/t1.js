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

function displayListInDocument() {
  ul.innerHTML = '';

  todoList.forEach((item) => {
    console.log(item);

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = `todo-${item.id}`;
    input.checked = item.completed;

    const label = document.createElement('label');
    label.htmlFor = `todo-${item.id}`;
    label.innerText = item.task;

    const del = document.createElement('Button');
    del.id = `todo-${item.id}`;
    del.innerText = 'Delete';

    const li = document.createElement('li');
    li.appendChild(input);
    li.appendChild(label);
    li.append(del);

    ul.appendChild(li);

    // click event
    input.addEventListener('click', () => {
      item.completed = input.checked;
      console.log(todoList);
    });

    // delete event
    del.addEventListener('click', () => {
      todoList.splice(todoList.indexOf(item), 1);
      console.log(todoList);
      displayListInDocument();
    });
  });
}

function addTaskToList(id, task, completed) {
  const newItem = {
    id: id,
    task: task,
    completed: completed,
  };
  console.log(newItem);
  todoList.push(newItem); // save item to list
}

const emptyItemError = document.getElementById('emptyItemError');

function openAddModal(event) {
  // open modal
  const modal = document.getElementById('addItemModal');
  modal.style.display = 'block';

  const span = document.getElementsByClassName('close')[0];
  span.addEventListener('click', () => {
    emptyItemError.innerText = ''; // clear empy item error label
    modal.style.display = 'none'; // close modal event
  });
}

// save item to array and display in ui event
const saveItemButton = document.querySelector('.save-new-item-btn');
saveItemButton.addEventListener('click', () => {
  emptyItemError.innerText = ''; // empty item error label

  const task = document.getElementById('newItemInput');
  // prevent adding empty items
  if (task.value == '') {
    emptyItemError.innerText = 'Cannot add empty item!';
    return;
  }

  // get last item id from list, if list is not empty
  const lastId = todoList.length > 0 ? todoList[todoList.length - 1].id : 0;

  // new item
  addTaskToList(lastId + 1, task.value, false);
  console.log(todoList);

  task.value = ''; // clear input field after saving
  displayListInDocument();
});

displayListInDocument();

// add button
const addButton = document.querySelector('.add-btn');
addButton.addEventListener('click', openAddModal);
