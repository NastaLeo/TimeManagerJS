let buttonShow = document.querySelector('button[data-action=show]');
let buttonHide = document.querySelector('button[data-action=hide]');
let list = document.querySelector('.list-container');
let li = document.querySelectorAll('li');


document.addEventListener('click', function(event) {
    if (event.target.tagName != 'BUTTON') return;
    if (event.target.tagName == 'BUTTON') {
        hide(event.target);
        show(event.target);
    }
})

function hide(elem){
    if (elem.dataset.action === 'hide') {
        elem.classList.add('active');
        buttonShow.classList.remove('active');
        
        for(item of li) {
            if (item.firstElementChild.checked != true) {
            item.classList.add('clean');
            }
        }     
    }
}

function show(elem){
    if (elem.dataset.action === 'show') {
        elem.classList.add('active');
        buttonHide.classList.remove('active');

        for(item of li) {
            item.classList.remove('clean');
        }
    }
}  
