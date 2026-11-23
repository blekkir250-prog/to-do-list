const taskInput = document.getElementById('taskInput');
const btn = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// Загружаем задачи или создаем пустой массив, если в памяти пусто
const savedTasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// Функция создания элемента задачи с кнопкой удаления
function createTaskElement(text) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '❌';
    removeBtn.className = 'remove-btn';

    // Привязываем удаление к конкретной строке
    removeBtn.addEventListener('click', function() {
        li.remove(); // Удаляем строчку из DOM
        saveTask();  // Обновляем localStorage
    });

    li.appendChild(span);
    li.appendChild(removeBtn);
    taskList.appendChild(li);
}

// Добавление новой задачи
btn.addEventListener('click', function() { 
    if (taskInput.value.trim() === '') {
        alert('Пожалуйста, введите задачу');
        return;
    }

    createTaskElement(taskInput.value.trim());
    taskInput.value = ''; // Очистка поле ввода
    saveTask();
});

// Сохранение только текста задач 
function saveTask() {
    const tasks = [];
    const spans = taskList.querySelectorAll('li span');

    spans.forEach(function(span) {
        tasks.push(span.textContent); 
    });

    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

savedTasks.forEach(function(taskText) {
    createTaskElement(taskText);
});
