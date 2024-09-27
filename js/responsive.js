function closeMenu(){
    document.getElementById('newDisplay').style.visibility = 'hidden'; 
}


function showOpenBasket(){ 
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
                <span>${(prices[i] * amounts[i]).toFixed(2)} €</span>
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


function displayOpenBasket(i){
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
                            <h3>Bezahlen</h3>
                        </button>   
                    </div>    
                </div>
        </div>
    </div>`;
}

function showOrderContainer(){
    return `
    <div class="great-layout">
        <div class="feedback-button">
            <div class="written-content">
                <h2>Vielen Dank</h2>
                <span>Deine Bestellung ist unterwegs</span>
            </div>
            <div class="picture-content">
                <span>Guten Apettit</span>
            </div>
        </div>
    </div>`; 
}


function showNewBasket(i){
    return /*html*/ `
    <div id="display-order-layout">
        <div class="layout-dishes">
            <span><b>${amounts[i]}</b></span>
            <span><b><u>${menus[i]}</u></b></span> 
            <span>${(prices[i] * amounts[i]).toFixed(2)} €</span>
        </div>
        <div class="add-comment-number">
            <p><u>Anmerkung <br> hinzufügen</u></p>
            <div class="position-plus-minus">
            <div class="minus" onclick="decreaseAmounts(${i})">
                <div></div>
            </div>
            <img src="./assets/img/trash.svg" alt="" onclick="deleteAllItems(${i})">
            <div class="plus" onclick="increaseAmounts(${i})">
                <div></div>
                <div></div>
            </div>
            </div>
        </div>
    <div class="division-line"></div>`;
}


function showEmptyBasket(){
    return `
     <h2>Warenkorb</h2>
        <div id="asideDiv" class="removeClassViaJs" class="d-none">
         <img class="shopping-bag" src="./assets/img/lieferung.png" alt="shopping-bag">
           <h2>Füg etwas in deinen Warenkorb</h2>
            <div>Wähle aus unseren delikaten Gerichten auf der Speisekarte und lass dir dein Essen nach Hause liefern.
            </div>
            <div id="showContent">
            </div>
        </div>`;
}


function renderIncompleteBasket() {  
    document.getElementById('asideDiv').innerHTML = /*html*/ `
    <div class="content-basket">
        <div class="margin-div">
        <div class="variable-order" id="newDish"> 
    </div>
    <div class="conditions">
        <p>Benötigter Betrag, 17,00 Euro um den Mindestbestellwert zu erreichen</p>
    </div>
    <div class="statement">
        <p>Du kannst noch nicht bestellen. Bella Italia liefert erst ab einem Mindestbestellwert von 17,00 € (exkl. Lieferkosten).</p>
    </div>
    <div class="total-order">
            <b><span>Zwischenbetrag</span></b>
            <b><span id="total"></span>€</b>
    </div>
    <div class="shipping-charge">
        <span>Lieferkosten</span>
        <span>4.50€</span>
    </div>
    <div class="total-sum">
        <span><b>Gesamt</b></span>
        <b><span id="final"></span>€</b>
    </div>
    <div class="confirm-order-size" onclick="sendOrder()">  
        <div id="orderClick" class="confirm-order">
            <h3 id="pay">Bestellen</h3>
        </div>
    </div>
    
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
            <div class="cross-container" onclick="addItemToBasket(${i})">
               <div class="horizontal-cross-line"></div>
                <div class= "vertical-cross-line"></div>
            </div>
        </div>
    </div>   
    </div>`;
    }

function increaseAmountsResponsive(i){
    amounts[i]++;  
    updateBasket();
    showOpenBasket(); 
}


function decreaseAmountsResponsive(i){ 
    amounts[i]--; 
    if (amounts[i] <= 0) {
        menus.splice(i, 1); 
        prices.splice(i, 1); 
        amounts.splice(i, 1);
    } 
    updateBasket(); 
    showOpenBasket();
    if (amounts && menus == 0) {
        deleteAllItems(); 
        closeMenu(); 
        return
    }  
}


