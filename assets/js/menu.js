const btnAddCountry = document.querySelector('.add')
const addCountry = document.querySelector('.addCountry')
const addClose = document.querySelector('.country-header')
const btnClose = addClose.querySelector('#close')


btnAddCountry.addEventListener('click',event=>{
    addCountry.classList.toggle('open')
})
btnClose.addEventListener('click',event=>{
    addCountry.classList.toggle('open')
})