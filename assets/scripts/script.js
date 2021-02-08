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



buttons.addEventListener('click', function(event) {
    if (event.target.tagName != 'BUTTON') return;
    if (event.target.tagName == 'BUTTON') {
        hide(event.target);
        show(event.target);
        add(event.target);
    }
})

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


function show(elem) {
    if (elem.dataset.action === 'show') {
        buttonShow.classList.remove('active');
        buttonHide.classList.add('active');

        for(item of li) {
            item.classList.remove('clean');
        }
    }
}  

function add(elem) {
    if (elem.dataset.action === 'add') {
        addList.classList.add('open');
        buttonAdd.classList.remove('active');
    }
}


form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (inputText.value != '') {
        createNewTask();
    } else return    
    
})


function createNewTask(){
    let id = list.lastElementChild.firstElementChild.id;
    
    let newTask = document.createElement('li');
    list.append(newTask);

    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', +id + 1);
    newTask.append(input);

    let label = document.createElement('label');
    label.setAttribute('for', +id + 1);
    label.style = 'padding-left:5px';
    label.innerHTML = inputText.value;
    newTask.append(label);
    
    if (buttonShow.className === 'active') {
        newTask.classList.add('clean')
    }

    inputText.value = '';
}

inputReset.addEventListener('click', function(){
    inputText.value = '';
})

inputClose.addEventListener('click', function() {
    addList.classList.remove('open');
    buttonAdd.classList.add('active');
})


list.addEventListener('click', function(event) {
    if (event.target.tagName != 'INPUT') {
        return
    } else if (buttonShow.className === 'active') {
        return
    } else if (event.target.closest('li').firstElementChild.checked != true) {
        event.target.closest('li').classList.toggle('clean');
    }
})


