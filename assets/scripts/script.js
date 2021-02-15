let buttons = document.querySelector('.buttons-container');
let buttonShow = document.querySelector('button[data-action=show]');
let buttonHide = document.querySelector('button[data-action=hide]');
let buttonAdd = document.querySelector('button[data-action=add]');

let addList = document.querySelector('.add-list');
let form = document.querySelector('form');
let inputText = document.querySelector('input[type=text]');
let inputSubmit = document.querySelector('input[type=submit]');
let inputReset = document.querySelector('input[type=reset]');
let inputClose = document.querySelector('input[type=button]');

let list = document.querySelector('.list-container ul');
let li = document.getElementsByTagName('li');



// Обратчик на кнопки
buttons.addEventListener('click', function(event) {
    if (event.target.tagName != 'BUTTON') return;
    if (event.target.tagName == 'BUTTON') {
        hide(event.target);
        show(event.target);
        add(event.target);
    }
})


// Спрятать список задач
function hide(elem) {
    if (elem.dataset.action === 'hide') {
        buttonHide.classList.remove('active');
        buttonShow.classList.add('active');

        
        for(item of li) {
            if (item.firstElementChild.checked != true) {
                console.log(1)
            item.classList.add('clean');
            }
        }
    } 
}


// Показать список задач
function show(elem) {
    if (elem.dataset.action === 'show') {
        buttonShow.classList.remove('active');
        buttonHide.classList.add('active');

        for(item of li) {
            item.classList.remove('clean');
        }
    }
}  


// Добавить новые задачи в список задач
function add(elem) {
    if (elem.dataset.action === 'add') {
        addList.classList.remove('close');
        addList.classList.add('open');
        buttonAdd.classList.remove('active');
    }
}


//Создать новую задачу
function createNewTask(){
    let newTask = document.createElement('li');
    list.append(newTask);

    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    let label = document.createElement('label');

    if (!newTask.previousElementSibling) {
        input.setAttribute('id',  0);
        label.setAttribute('for',  0);
    } else {
        input.setAttribute('id', +newTask.previousElementSibling.firstElementChild.getAttribute('id') + 1);
        label.setAttribute('for', +input.getAttribute('id'));
    }
    label.style.paddingLeft = '5px';
    label.innerHTML = inputText.value;
    newTask.append(input);
    newTask.append(label);

    let buttonDelete = document.createElement('img');
    buttonDelete.className = 'delete';
    buttonDelete.style.marginLeft ='10px';
    buttonDelete.style.verticalAlign = 'middle';
    buttonDelete.style.width = '15px';
    buttonDelete.style.height ='15px';
    buttonDelete.setAttribute('src','./assets/images/rubbish.png');
    buttonDelete.style.opacity = '.6';
    newTask.append(buttonDelete);

    localStorage.setItem(label.getAttribute('for'), label.innerHTML);

    if (buttonShow.className === 'active') {
        newTask.classList.add('clean')
    }
}


form.addEventListener('submit', function(event) {
    event.preventDefault();
  
    if (inputText.value != '') {
        createNewTask();
        inputText.value = '';
    } else {
        return    
    }
})

//Закрыть окно создания задач
inputClose.addEventListener('click', function() {
    addList.classList.remove('open');
    addList.classList.add('close');
    buttonAdd.classList.add('active');
})


//Удаление задач
function deleteTask(event) {
    if (event.target.className != 'delete'){
        return
    } else {
        event.target.closest('li').remove();
        localStorage.removeItem(event.target.closest('li').firstElementChild.getAttribute('id'));
    }
}

list.addEventListener('click', deleteTask);

//Увеличение яркости кнопки удаления
function highlight(event) {
    if (event.target.tagName != 'IMG') {
        return
    } else {
        event.target.style.opacity = '1';
        event.target.style.cursor = 'pointer'
    }
}

list.addEventListener('mouseover', highlight);


//Уменьшение яркости кнопки удаления
function removeHighlight(event) {
    if (event.target.tagName != 'IMG') {
        return
    } else {
        event.target.style.opacity = '.6';
    }
}

list.addEventListener('mouseout', removeHighlight);

//Перенос задачи после снятия отметки в скрытый список
function hideTask(event) {
    if (event.target.tagName != 'INPUT') {
        return
    } else if (buttonHide.className === 'active') {
        return
    } else if (event.target.closest('li').firstElementChild.checked != true) {
        event.target.closest('li').classList.toggle('clean');
    }
}

list.addEventListener('click', hideTask);


//Отобразить localStorage при загрузке страницы
function showTasks() {
    let existStorage = localStorage.length;
    if (existStorage > 0) {
        for(let i = 0; i < existStorage; i++){
            let key = localStorage.key(i);
            console.log(key)

            newTask = document.createElement('li');
            list.append(newTask);

            input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', key);
            newTask.append(input);
            
            label = document.createElement('label');
            label.setAttribute('for', i);
            label.style.paddingLeft ='5px';
            newTask.append(label);
            label.innerHTML = localStorage.getItem(key);

            buttonDelete = document.createElement('img');
            buttonDelete.className = 'delete';
            buttonDelete.style.marginLeft ='10px';
            buttonDelete.style.verticalAlign = 'middle';
            buttonDelete.style.width = '15px';
            buttonDelete.style.height ='15px';
            buttonDelete.setAttribute('src','./assets/images/rubbish.png')
            buttonDelete.style.opacity = '.6';
            newTask.append(buttonDelete);

            console.log(localStorage.getItem(key))
        }
    } else {
        return
    }
}

window.addEventListener('load', showTasks);

