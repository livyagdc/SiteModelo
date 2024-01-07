var className = document.body.classList

const switcher = document.querySelector('.btn-tema');

switcher.addEventListener('click', function() {

    document.body.classList.toggle('dark-theme')

    console.log('current class name: '+ className)

});