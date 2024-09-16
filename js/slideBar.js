let slides = [
    'Klassiker',
    'Vorspeisen & Tapas',
    'Frische Salate',
    'Herzhafte Hauptgerichte',
    'Feine Fleischgerichte',
    'Nudelvariationen',
    'Desserts & Süßspeisen',
    'Hausgemachtes Eis'
];

function renderSlidesDishes() {
    let content = document.getElementById('foodSlide');

    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i]

        content.innerHTML += /*html*/ `
    <div class="recomendation-bar">
      <div class="slide-dish"><b>${slide}</b></div> 
    </div>`;
    }
}


function slideOnClick() {
    const buttonRight = document.getElementById('prev-slide');
    const buttonLeft = document.getElementById('next-slide');

    buttonRight.onclick = function() {
        document.getElementById('foodSlide').scrollLeft -= 150;
        console.log('Hello')
    };
    buttonLeft.onclick = function() {
        document.getElementById('foodSlide').scrollLeft += 150;
    };
}