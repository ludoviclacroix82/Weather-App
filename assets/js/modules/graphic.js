import { conversionKelvinCelsius, date } from "./conversionData.js";

export function graphicTemp(dataGraphTemp, dataGraphHour) {

    const dayItemElem = document.querySelector('.day-item')

    if (document.querySelector('canvas') === null) {
        const canvasElem = document.createElement('canvas')
        dayItemElem.appendChild(canvasElem)
        canvasElem.id = 'myChart'
    } else {
        dayItemElem.innerHTML = ''
        const canvasElem = document.createElement('canvas')
        dayItemElem.appendChild(canvasElem)
        canvasElem.id = 'myChart'
    }

    const ctx = document.getElementById('myChart');

    const arraytemp = []
    const arrayHour = []

    for (const dataTemp of dataGraphTemp) {
        const tempFormat = conversionKelvinCelsius(dataTemp)
        arraytemp.push(tempFormat)
    }

    for (const dataHour of dataGraphHour) {
        const [dayTitle, month, day, hour, min] = date(new Date(dataHour))
        let hourFormat = hour + ":" + min
        arrayHour.push(hourFormat)
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: arrayHour,
            datasets: [{
                label: 'temperatures',
                data: arraytemp,
                borderWidth: 1,
                borderColor: '#fff',
                pointStyle : false,                
            }],          
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#fff'
                    }
                    
                },
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: '#fff'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    });
}