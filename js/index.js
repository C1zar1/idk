// ✅ Данные лидеров — фейковые.
// Чтобы добавить нового: { name: "Имя", spent: сумма }
// Список сам отсортируется по убыванию.
let leaders = [
    { name: "Alex",   spent: 15800 },
    { name: "BR0000000",  spent: 12400 },
    { name: "Solvibe",   spent: 1500000000000000000000 },
    { name: "4hyz",   spent: 1}
];

let items = [
    {name: "Apple iPhone 14 Pro Max 128GB Silver", price: 1000, img: "image/Phone.png"},
    {name: "Marshall Major IV Bluetooth Black", price: 150, img: "image/headphones.png"},
    {name: "Philips 5000 blender", price: 110, img: "image/blender.png"},
    {name: "keyboard A4Tech Bloody S98 Naraka BLMS USB Black/White/Red", price: 100, img: "image/KeyBoard.png"},
    {name: "ASUS TUF Gaming A16 (2025) FA608UM-RV015 (90NR0KV1-M00880)", price: 1500, img: "image/Gaming_laptop.png"},
    {name: "Lenovo LOQ 15ARP9 (83JC00K6RA) Luna Gray Gaming Laptop", price: 15000, img: "image/Gaming_laptop2.jpg"},
    {name: "Sonic😰😰😰😰😰😰", price: 1500000000000000000000, img: "image/Sonic.jpg"}
];

let cart = [];

function showLeaderboard() {
    let list = document.getElementById('lb-list');
    if (!list) return; // защита если элемент не найден

    let sorted = [...leaders].sort((a, b) => b.spent - a.spent);
    let medals = ["🥇", "🥈", "🥉"]; // медали для топ-3

    let out = '';
    sorted.forEach((leader, i) => {
        let medal = medals[i] || "▪️";
        out += `<li>
                  <span class="lb-name">${medal} ${leader.name}</span>
                  <span class="lb-amount">${leader.spent.toLocaleString()} €</span>
                </li>`;
    });
    list.innerHTML = out;
}

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
                    <span>${item.price * item.qty} €
                    <button class="remove-btn" onclick="removeFromCart(${i})">Remove</button></span>
                </div>`;
    });
    cartItems.innerHTML = out;
    let total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    document.getElementById('cart-total').innerHTML = "Total: " + total + " €";
}

// ✅ Всё запускается после загрузки DOM — это и было причиной бага
document.addEventListener("DOMContentLoaded", function () {
    showProducts();
    updateCart();
    showLeaderboard();

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
});
