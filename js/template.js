function closeMenu() {
    document.getElementById('newDisplay').style.visibility = 'hidden';
}


function showOpenBasket() {
    let i = 0;
    let lowContentBasket = document.getElementById('showNewContent');
    lowContentBasket.innerHTML = '';
    lowContentBasket.innerHTML = displayOpenBasket(i);

    for (let i = 0; i < menus.length; i++) {
        let menueContainer = document.getElementById('menueContainer');
        menueContainer.innerHTML += /*html*/`
        <div class="container-new-dish">
                <span><b>${amounts[i]}</b></span>
                <span><b><u>${menus[i]}</u></b></span> 
                <span>${prices[i] * amounts[i]}€</span>
                <div class="coordinate">
                    <div class="minus" onclick="decreaseAmountsResponsive(${i})">
                        <div></div>
                    </div>    
                    <div class="plus" onclick="increaseAmountsResponsive(${i})">
                        <div></div>
                        <div></div>
                    </div>
                 </div>   
        </div>`;
    }
}


function displayOpenBasket(i) {
    return  /*html*/`
    <div class="great-layout" id="newDisplay">
        <div class="mini-basket">
            <div>
                <h2>Deine Auswahl</h2>
            </div>
            <img src="./assets/img/buchstabe-x.png" onclick="closeMenu()">
            <div class="big">
                <div id="menueContainer" class="last-choices"></div>
            </div>
                <div class="button-around" onclick="sendOrder()">
                    <div>
                         <h3>${updateBasket(i)} €</h3>
                    </div>
                    <div class="final-order-button">
                        <button>
                            <h3>Bestellen</h3>
                        </button>   
                    </div>    
                </div>
        </div>
    </div>`;
}

function showEmptyBasket() {
    return `
    <h2>Warenkorb</h2>
        <div id="asideDiv" class="removeClassViaJs" class="d-none">
         <img class="shopping-bag" src="../assets/img/lieferung.png" alt="shopping-bag">
           <h2>Füg etwas in deinen Warenkorb</h2>
            <div>Wähle aus unseren delikaten Gerichten auf der Speisekarte und lass dir dein Essen nach Hause liefern.
            </div>
            <div id="showContent">
            </div>
        </div>`;
}


function renderList(i, dish) {
return /*html*/ `
<div class="container">
<div class="description-dish">
        <div>
            <h3>${dish['title']}</h3>
         
        </div>
    <span>${dish['description']}</span>
    <span class="price"><b>${dish['price'].toFixed(2).replace('.' , ',')} €</b></span>
</div>
<div class="picture-add-section">
   
    <div class="align-cross-container" >
        <div class="cross-container" onclick="addItemToBasket(${i})">
            <div class="horizontal-cross-line"></div>
            <div class= "vertical-cross-line"></div>
        </div>
    </div>
</div>   
</div>`;
}