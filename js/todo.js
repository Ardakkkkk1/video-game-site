// Simple To-Do list functionality
// Add / remove / toggle complete, with simple input validation

document.addEventListener('DOMContentLoaded', function () {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  const live = document.createElement('div');

  if (!todoForm || !todoInput || !todoList) return;

  live.className = 'visually-hidden';
  live.setAttribute('aria-live', 'polite');
  live.id = 'todo-announcer';
  todoList.parentNode && todoList.parentNode.appendChild(live);

  function createItem(text) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const span = document.createElement('span');
    span.textContent = text;

    const controls = document.createElement('div');

    const doneBtn = document.createElement('button');
    doneBtn.className = 'btn btn-sm btn-success me-2';
    doneBtn.type = 'button';
    doneBtn.textContent = 'Done';
    doneBtn.addEventListener('click', function () {
      span.classList.toggle('text-decoration-line-through');
      span.classList.toggle('done');
      save();
    });

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-sm btn-danger';
    delBtn.type = 'button';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', function () {
      li.remove();
      live.textContent = 'Task removed.';
      save();
    });

    controls.appendChild(doneBtn);
    controls.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(controls);

    return li;
  }

  todoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const val = todoInput.value.trim();
    if (!val) {
      // simple ui feedback
      todoInput.classList.add('is-invalid');
      setTimeout(() => todoInput.classList.remove('is-invalid'), 1200);
      return;
    }
    const item = createItem(val);
    todoList.prepend(item);
    todoInput.value = '';
    live.textContent = 'Added: ' + val;
    save();
  });

  // persistence
  function save(){
    const items = Array.from(todoList.querySelectorAll('li')).map(li=>({text: li.querySelector('span').textContent, done: li.querySelector('span').classList.contains('done')}));
    const key = 'gamehub_todos_' + (location.pathname.replace(/\W/g,'_') || 'root');
    localStorage.setItem(key, JSON.stringify(items));
  }

  function load(){
    const key = 'gamehub_todos_' + (location.pathname.replace(/\W/g,'_') || 'root');
    const raw = localStorage.getItem(key);
    if (!raw) return;
    try{
      const items = JSON.parse(raw);
      items.reverse().forEach(it=>{
        const li = createItem(it.text);
        if (it.done) li.querySelector('span').classList.add('done');
        todoList.prepend(li);
      });
    } catch(e){ console.warn('Could not load todos', e); }
  }

  load();
});