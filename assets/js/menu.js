const btnAddCountry = document.querySelector('.add')
const addCountry = document.querySelector('.addCountry')

btnAddCountry.addEventListener('click',event=>{
    addCountry.classList.toggle('open')
})