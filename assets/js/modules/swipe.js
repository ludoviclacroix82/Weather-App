/**
 * Swipe : gère le défilement horizontal 
 * Les variables initialX, moveX et plannerOffset sont déclarées pour stocker les positions initiales et de déplacement lors de l'interaction tactile.
 * écouteur d'événements  touchstart touchmove
 * @param {*} reverse détermine la direction du défilement. -- boolean true : drag&drop ; false swipe noraml 
 */
export function swipe(data) {
    const todayHeader = document.querySelector('.today-header')
    const todayHeaderOffesWidth = todayHeader.offsetWidth
    let nbrCitySlected = 0

    const dateCurrent = new Date();
    todayHeader.addEventListener('touchend', event => {

        const citySelect = document.querySelectorAll('.country-select')
        const dayTempList = document.querySelector('.day-temp')

        const dayItem = document.querySelector('.day-item')


        if (nbrCitySlected < citySelect.length - 1) {

            todayHeader.scrollLeft += todayHeaderOffesWidth - 20
            nbrCitySlected += 1
            const citySlectOpen = dayTempList.querySelector('#temp' + citySelect[nbrCitySlected].id)
            citySlectOpen.classList.add('open')

            const canvasSlect = dayItem.querySelector('#myChart-' + citySelect[nbrCitySlected].id)
            canvasSlect.classList.add('open-canvas')

            for (const cityNoSelect of citySelect) {
                if (cityNoSelect.id != citySelect[nbrCitySlected].id) {
                    const citySlectNoOpen = dayTempList.querySelector('#temp' + cityNoSelect.id)
                    citySlectNoOpen.classList.remove('open')

                    const canvasNoSlect = dayItem.querySelector('#myChart-' + cityNoSelect.id)

                    canvasNoSlect.classList.remove('open-canvas')
                }
            }

        } else {
            todayHeader.scrollLeft = 0
            nbrCitySlected = 0

            const citySlectOpen = dayTempList.querySelector('#temp' + citySelect[nbrCitySlected].id)
            citySlectOpen.classList.add('open')

            const canvasSlect = dayItem.querySelector('#myChart-' + citySelect[nbrCitySlected].id)
            canvasSlect.classList.add('open-canvas')

            for (const cityNoSelect of citySelect) {
                if (cityNoSelect.id != citySelect[nbrCitySlected].id) {
                    const citySlectNoOpen = dayTempList.querySelector('#temp' + cityNoSelect.id)
                    citySlectNoOpen.classList.remove('open')

                    const canvasNoSlect = dayItem.querySelector('#myChart-' + cityNoSelect.id)
                    canvasNoSlect.classList.remove('open-canvas')
                }
            }

        }

    })
}