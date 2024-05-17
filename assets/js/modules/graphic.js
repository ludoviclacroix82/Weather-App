import { conversionKelvinCelsius } from "./conversionData.js";

export function graphicTemp(data) {


    const dayItemElem = document.querySelector('.day-item')

    if (document.querySelector('canvas') === null) {
        const canvasElem = document.createElement('canvas')
        dayItemElem.appendChild(canvasElem)
        canvasElem.id = 'myChart'
    }else{
        dayItemElem.innerHTML=''
        const canvasElem = document.createElement('canvas')
        dayItemElem.appendChild(canvasElem)
        canvasElem.id = 'myChart'
    }

    const ctx = document.getElementById('myChart');

    const arraytemp = []

    console.log(data.list);
    for (const dataList of data.list) {
        const tempFormat = conversionKelvinCelsius(dataList.main.temp)
        arraytemp.push(tempFormat)
    }
    console.log(arraytemp);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: arraytemp,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}