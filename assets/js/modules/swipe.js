/**
 * Swipe : gère le défilement horizontal 
 * Les variables initialX, moveX et plannerOffset sont déclarées pour stocker les positions initiales et de déplacement lors de l'interaction tactile.
 * écouteur d'événements  touchstart touchmove
 * @param {*} reverse détermine la direction du défilement. -- boolean true : drag&drop ; false swipe noraml 
 */
export function swipe(reverse) {
    let initialX,currentX
    const todayHeader = document.querySelector('.today-header')
    const todayHeaderScrollLeft = todayHeader.scrollLeft    
    const todayHeaderOffesWidth = todayHeader.offsetWidth

  

    todayHeader.addEventListener('touchstart', event => {
        initialX = event.touches[0].pageX;
        console.log('initialX : '+initialX);

    });

    todayHeader.addEventListener("touchmove", event => {
        let currentX = event.touches[0].pageX;
        console.log('currentX : ' + currentX);

        console.log(todayHeaderScrollLeft);

        if(currentX < initialX){
            
            todayHeader.scrollLeft += todayHeaderOffesWidth -30
        }else
        {
            todayHeader.scrollLeft -= todayHeaderOffesWidth
        }


    });
}