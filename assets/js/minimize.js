const header = document.querySelector('header')
const allCity = document.querySelector('#allCity')
const footer = document.querySelector('footer')
const daysList = footer.querySelector('.days-list')

const btnDays = document.querySelector('.days')
const btn = btnDays.querySelector('button')
const btnimg = btn.querySelector('img')

/**
 * permet de changer le css en fucntion de l'affiche du graphique
 */
btn.addEventListener('click',event =>{

    header.classList.toggle('minimize-header')
    allCity.classList.toggle('minimize-today-wrap')
    footer.classList.toggle('minimize-footer')
    daysList.classList.toggle('minimize')

    btnimg.classList.toggle('minimize')

})