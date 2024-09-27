let dishes = [
    {
        'title': 'Caprese Pizza',
        'description': 'Knuspriger Pizzaboden belegt mit frischen Tomaten, Mozzarella und frischem Basilikum',
        'price': 9.00
    },
    {
        'title': 'Pizza Calamarata',
        'description': 'Pizzaboden belegt mit frischem Lachs, Oliven, Kapern und Auberginen',
        'price': 13.50
    },
    {
        'title': 'Pizza Panna Cotta',
        'description': 'Süße Panna Cotta auf einem Pizzaboden, verfeinert mit Südtiroler Aromen',
        'price': 6.50
    },
];


let menus = [];
let prices = [];
let amounts = [];


function offers() {
    for (let i = 0; i < dishes.length; i++) {
        const dish = dishes[i];
        document.getElementById('choiceMenu').innerHTML += renderList(i, dish);
    }
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


function renderEmptyBasket() { // Das rendert den Basket wenn er noch leer ist. 
    document.getElementById('wholeAsideDiv').innerHTML = showEmptyBasket(); 
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


function addItemToBasket(i) { //ab hier ist der Basket illustriert: 
    let dish = dishes[i];
    let menu = dish['title'];
    let price = dish['price'];
    renderIncompleteBasket();
    onAddMenu(menu, price);
    updateBasket();
}


function deleteAllItems(i) {
    document.getElementById(`display-layout-order${i}`);
    menus.splice(i, 1);
    prices.splice(i, 1);
    amounts.splice(i, 1);

    displayNewBasket();
    updateBasket(); 

    if (menus && prices == 0) {
        renderEmptyBasket();
    }
}


function displayNewBasket() {
    let basket = document.getElementById('newDish');
    basket.innerHTML = ``;

    for (let i = 0; i < menus.length; i++) {
        document.getElementById('newDish').innerHTML += showNewBasket(i)
    }
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


function updateBasket() {
    let sum = 0;
    for (let i = 0; i < prices.length; i++) {
            const price = prices[i] * amounts[i];  // Änderung von Junus: Man soll multiplizieren mit der Menge
            sum += price;
    }
    let finalSum = (sum + 4.50).toFixed(2); 
    document.getElementById('total').innerHTML = sum.toFixed(2);
    document.getElementById('final').innerHTML = finalSum; 
    changeColor(finalSum); 
    
    return finalSum; 
}



function changeColor(finalSum) {
    if (finalSum >= 17.00) {
        document.getElementById('orderClick').style.background = "orange";
        document.getElementById('pay').style.color = "white";
        document.querySelector('.conditions').style.display = "none";
        document.querySelector('.statement').style.display = "none";
    } else {
        document.getElementById('orderClick').style.background = "none";
        document.getElementById('pay').style.color = "none";
        document.querySelector('.conditions').style.display = "flex";
        document.querySelector('.statement').style.display = "flex";
    }
}


function getMenuIndex(menu) {
    return menus.indexOf(menu);
}


function onAddMenu(x, y) {
    let newMenu = x;
    let newPrice = y;
    let i = getMenuIndex(newMenu);
    if (i == -1) {
        menus.push(newMenu);
        prices.push(newPrice);
        amounts.push(1);
    } else {
        amounts[i]++;  
    }
    displayNewBasket();
}


function increaseAmounts(i){ 
    amounts[i]++;  
    updateBasket();
    displayNewBasket(); 
}


function decreaseAmounts(i){ 
    amounts[i]--; 
    if (amounts[i] <= 0) {
        menus.splice(i, 1); 
        prices.splice(i, 1); 
        amounts.splice(i, 1);
    } 
    updateBasket(); 
    displayNewBasket();
    if (amounts && menus == 0) {
        deleteAllItems(); 
    }  
}

function sendOrder(){
  document.getElementById('sendOrder').innerHTML = showOrderContainer();
  startTimer();
  closeMenu(); 
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
                <span>Guten Apettit/span>
            </div>
        </div>
    </div>`; 
}


function startTimer(){
    setTimeout(() => {
        document.getElementById('sendOrder').innerHTML = ``; 
    }, 5000); 
    displayNewBasket(); 
    deleteAllItems(); 
    renderEmptyBasket();    
}