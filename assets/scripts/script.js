let buttons = document.querySelector('.buttons-container');
let buttonShow = document.querySelector('button[data-action=show]');
let buttonHide = document.querySelector('button[data-action=hide]');
let buttonAdd = document.querySelector('button[data-action=add]');

let addList = document.querySelector('.add-list');
let form = document.querySelector('form');
let inputText = document.querySelector('input[type=text]');
let inputReset = document.querySelector('input[type=reset]');
let inputClose = document.querySelector('input[type=button]');

let list = document.querySelector('.list-container ul');
let ul = document.querySelector("ul");
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
        if (document.querySelector('footer').getBoundingClientRect().top > document.documentElement.clientHeight) {
        document.querySelector('footer').scrollIntoView({
            block: "start", 
            inline: "nearest",
            behavior: 'smooth'
        });    
        } 

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
    input.checked === false;
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
    buttonDelete.setAttribute('src','./assets/images/rubbish.png');
    newTask.append(buttonDelete);

    if (buttonShow.className === 'active') {
        newTask.classList.add('clean')
    }
}


form.addEventListener('submit', function(event) {
    event.preventDefault();
  
    if (inputText.value != '') {
        createNewTask();
        inputText.value = '';

        if (document.querySelector('footer').getBoundingClientRect().top> document.documentElement.clientHeight) {
            document.querySelector('footer').scrollIntoView({
                block: "end", 
                inline: "nearest",
                behavior: 'smooth'
            });    
        }
    } else {
        return    
    }
})


//Закрыть окно создания задач
inputClose.addEventListener('click', function() {
    addList.classList.remove('open');
    addList.classList.add('close');
    buttonAdd.classList.add('active');
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
})


//Сохранение состояния чекбокса
ul.addEventListener('click', function (event) {
    if (event.target.tagName != 'INPUT') {
        return
    } else {
        if (event.target.checked) {
            event.target.setAttribute('checked', true);
        } else {
            event.target.removeAttribute('checked')
        }
    }
})

//Перенос задачи после снятия отметки в скрытый список
function hideTask(event) {
    if (event.target.tagName != 'INPUT') {
         return
    } else if (buttonHide.className === 'active') {
         return
    } else if (!event.target.checked) {
        event.target.removeAttribute('checked');
        event.target.closest('li').classList.add('clean');
    } 
}

list.addEventListener('click', hideTask);


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


// Сохранение данных в localStorage
const config = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
};

const callback = function (mutationsList, observer) {
    
    for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
            localStorage.setItem("tasks", ul.innerHTML);
        } else if (mutation.type === "attributes") {
            localStorage.setItem("tasks", ul.innerHTML);
        } else if (mutation.type === "subtree") {
            localStorage.setItem("tasks", ul.innerHTML);
        } else if (mutation.type === "characterData") {
            localStorage.setItem("tasks", ul.innerHTML);
        } 
    }
};

const observer = new MutationObserver(callback);
observer.observe(list, config);


// Загрузка и отображение данных из localStorage
window.addEventListener("load", function (event) {
    if (localStorage.length > 0) {
        ul.innerHTML = localStorage.getItem("tasks");   
    }
});




