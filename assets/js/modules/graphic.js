import { conversionKelvinCelsius, date } from "./conversionData.js";


/**
 * affiche les données du graphique avec chartjs
 * @param {*} city nom de la ville
 * @param {Array} dataGraphTemp données des temperatures prochaines
 * @param {Array} dataGraphHour données des heures des temperatures prochaines
 */
export function graphicTemp(city, dataGraphTemp, dataGraphHour) {

    const dayItemElem = document.querySelector('.day-item')
    /**
     * permet d'affiche le 1er graphique en fonction de la 1ere ville affichée
     */
    if (document.querySelector('canvas') == null) {
        const canvasElem = document.createElement('canvas')
        dayItemElem.appendChild(canvasElem)
        canvasElem.id = 'myChart-' + city
        canvasElem.classList.add('open-canvas')
    } else {
        const canvasElem = document.createElement('canvas')
        dayItemElem.appendChild(canvasElem)
        canvasElem.id = 'myChart-' + city
    }

    const ctx = document.getElementById('myChart-' + city);

    /**
     * @array arraytemp récupére les tempaerature pour chartjs
     * @array arrayHour récupère les hours de chaque temperatures pour chatrjs
     */
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

    /**
     * parametre chartjs pour le graphique
     */
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: arrayHour,
            datasets: [{
                label: 'temperatures',
                data: arraytemp,
                borderWidth: 1,
                borderColor: '#fff',
                pointStyle: false,
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