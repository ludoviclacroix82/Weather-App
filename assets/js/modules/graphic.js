import { conversionKelvinCelsius, date } from "./conversionData.js";


/**
 * affiche les données du graphique avec chartjs
 * @param {*} city nom de la ville
 * @param {Array} dataGraphTemp données des temperatures prochaines
 * @param {Array} dataGraphHour données des heures des temperatures prochaines
 */
export function graphicTemp(city,arrayChart) {

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
     * @array arrayTemp récupére les tempaerature pour chartjs
     * @array arrayHour récupère les hours de chaque temperatures pour chatrjs
     */
    const arrayTemp = arrayChart.map(item => item.temp);
    const arrayHour = arrayChart.map(item => item.hour);

    /**
     * parametre chartjs pour le graphique
     */
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: arrayHour,
            datasets: [{
                label: 'temperatures',
                data: arrayTemp,
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
                        color: '#fff',
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
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}