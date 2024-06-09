/**
 * Swipe : gère le défilement horizontal 
 * change les données des temparature en fonction du swip et de la ville visible
 * change les données du graphique des temperature en fonction du swipe
 * écouteur d'événements touchend et click
 * @param {*} data donnée de l'api openweathermap
 */
export function swipe(data) {
    const todayHeader = document.querySelector('.today-header');
    const todayHeaderOffesWidth = todayHeader.offsetWidth;
    let nbrCitySlected = 0;
    let touchEndFlag = false;  // Flag to indicate a touch event

    const dateCurrent = new Date();

    const handleSwipe = () => {
        const citySelect = document.querySelectorAll('.country-select');
        const dayTempList = document.querySelector('.day-temp');
        const dayItem = document.querySelector('.day-item');

        /**
         * permet de changer le scrollLeft de l'elment pour affiché les autre ville en swipant 
         * recupere l'ordre de chauqe element de temperature des ville
         * @variable  nbrCitySlected est incrémenté qui permettra de swip la prochien ville
         * & permet d'afficher les données pour les temperatures prochaine & pour les graphique 
         *  */ 
        if (nbrCitySlected < citySelect.length - 1) {
            todayHeader.scrollLeft += todayHeaderOffesWidth - 20;
            nbrCitySlected += 1;
            const citySlectOpen = dayTempList.querySelector('#temp' + citySelect[nbrCitySlected].id);
            citySlectOpen.classList.add('open');

            const canvasSlect = dayItem.querySelector('#myChart-' + citySelect[nbrCitySlected].id);
            canvasSlect.classList.add('open-canvas');

            // boucle qui permet de retirer la class open et open-canvas des elements non séléctionnés
            for (const cityNoSelect of citySelect) {
                if (cityNoSelect.id != citySelect[nbrCitySlected].id) {
                    const citySlectNoOpen = dayTempList.querySelector('#temp' + cityNoSelect.id);
                    citySlectNoOpen.classList.remove('open');

                    const canvasNoSlect = dayItem.querySelector('#myChart-' + cityNoSelect.id);
                    canvasNoSlect.classList.remove('open-canvas');
                }
            }
        /**
         * Une fois que le swip arrive a la derière ville , celui-ci revient au 1er
         */
        } else {
            todayHeader.scrollLeft = 0;
            nbrCitySlected = 0;

            const citySlectOpen = dayTempList.querySelector('#temp' + citySelect[nbrCitySlected].id);
            citySlectOpen.classList.add('open');

            const canvasSlect = dayItem.querySelector('#myChart-' + citySelect[nbrCitySlected].id);
            canvasSlect.classList.add('open-canvas');
            
            // boucle qui permet de retirer la class open et open-canvas des elements non séléctionnés
            for (const cityNoSelect of citySelect) {
                if (cityNoSelect.id != citySelect[nbrCitySlected].id) {
                    const citySlectNoOpen = dayTempList.querySelector('#temp' + cityNoSelect.id);
                    citySlectNoOpen.classList.remove('open');

                    const canvasNoSlect = dayItem.querySelector('#myChart-' + cityNoSelect.id);
                    canvasNoSlect.classList.remove('open-canvas');
                }
            }
        }
    };

    todayHeader.addEventListener('touchend', event => {
        touchEndFlag = true;  // Set the flag on touchend
        handleSwipe();
    });

    todayHeader.addEventListener('click', event => {
        if (touchEndFlag) {
            touchEndFlag = false;  // Reset the flag
        } else {
            handleSwipe();
        }
    });
}
