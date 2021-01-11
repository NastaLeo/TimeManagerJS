let buttonShow = document.querySelector('button[data-action=show]');
let buttonHide = document.querySelector('button[data-action=hide]');
let list = document.querySelector('.list-container');
 
document.addEventListener('click', function(event) {
    if (event.target.tagName != 'BUTTON') return;
    
    if (event.target.tagName == 'BUTTON') {
        if (event.target.dataset.action === 'show') {
        buttonShow.classList.add('active');
        buttonHide.classList.remove('active');
        list.classList.add('show');
        list.classList.remove('hide');
        } else {
        buttonShow.classList.remove('active');
        buttonHide.classList.add('active');
        list.classList.add('hide');
        list.classList.remove('show');
        } 
    }
})


