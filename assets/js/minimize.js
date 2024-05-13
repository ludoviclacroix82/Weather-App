const header = document.querySelector('header')
const todayWrap = document.querySelector('.today-warp')
const footer = document.querySelector('footer')
const daysList = footer.querySelector('.days-list')

const btnDays = document.querySelector('.days')
const btn = btnDays.querySelector('button')
const btnimg = btn.querySelector('img')

btn.addEventListener('click',event =>{

    header.classList.toggle('minimize-header')
    todayWrap.classList.toggle('minimize-today-wrap')
    footer.classList.toggle('minimize-footer')
    daysList.classList.toggle('minimize')

    btnimg.classList.toggle('minimize')

})