let items = [
    {name: "Apple iPhone 14 Pro Max 128GB Silver", price: 1000, img: "image/Phone.png"},
    {name: "Marshall Major IV Bluetooth Black", price: 150, img: "image/headphones.png"},
    {name: "Philips 5000 blender", price: 110, img: "image/blender.png"},
    {name: "keyboard A4Tech Bloody S98 Naraka BLMSы USB Black/White/Red", price: 100, img: "image/KeyBoard.png"},
    {name: "ASUS TUF Gaming A16 (2025) FA608UM-RV015 (90NR0KV1-M00880)", price: 1500, img: "image/Gaming_laptop.png"}
];
let cart = [];
function showProducts() {
    let out = '';
    items.forEach((item, i) => {
        out += `<div class="product">
                    <img src="${item.img}">
                    <h3>${item.name}</h3>
                    <div class="price">${item.price} €</div>
                    <button onclick="addToCart(${i})">Add to cart</button>
                </div>`;
    });
    document.getElementById('products').innerHTML = out;
}
function addToCart(i) {
    let exist = cart.find(x => x.name === items[i].name);
    if (exist) {
        exist.qty += 1;
    } else {
        cart.push({...items[i], qty: 1});
    }
    updateCart();
}
function removeFromCart(i) {
    cart.splice(i, 1);
    updateCart();
}
function updateCart() {
    let cartItems = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItems.innerHTML = "Cart is empty.";
        document.getElementById('cart-total').innerHTML = '';
        return;
    }
    let out = '';
    cart.forEach((item, i) => {
        out += `<div class="cart-item">
                    <span>${item.name} x${item.qty}</span>
                    <span>${item.price * item.qty} € <button class="remove-btn" onclick="removeFromCart(${i})">Remove</button></span>
                </div>`;
    });
    cartItems.innerHTML = out;
    let total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    document.getElementById('cart-total').innerHTML = "Total: " + total + " €";
}
showProducts();
updateCart();
document.getElementById("catalog-btn").onclick = function(e) {
    e.preventDefault();
    document.getElementById("catalog").scrollIntoView({behavior: "smooth"});
};
document.getElementById("cart-btn").onclick = function(e) {
    e.preventDefault();
    document.getElementById("cart-section").scrollIntoView({behavior: "smooth"});
};
document.getElementById("home-btn").onclick = function(e) {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: "smooth"});
};
document.getElementById("contacts-btn").onclick = function(e) {
    e.preventDefault();
    alert("Contacts: +371 XX XXX XXX");
};
