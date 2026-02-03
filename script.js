const products = [
    { name: "Shoes", price: 50, img: "shoes.jpg", category: "clothes" },
    { name: "Sport Shoes", price: 55, img: "sportshoes.jpg", category: "clothes" },
    { name: "T-Shirt", price: 20, img: "tshirt.jpg", category: "clothes" },
    { name: "Jeans", price: 40, img: "jeans.jpg", category: "clothes" },
    { name: "Jacket", price: 65, img: "jacket.jpg", category: "clothes" },
    { name: "Cap", price: 15, img: "cap.jpg", category: "accessories" },
    { name: "Bag", price: 60, img: "bag.jpg", category: "accessories" },
    { name: "Watch", price: 70, img: "watch.jpg", category: "accessories" },
    { name: "Ring", price: 90, img: "ring.jpg", category: "accessories" },
    { name: "Sunglasses", price: 35, img: "sunglasses.jpg", category: "accessories" },
    { name: "Pizza", price: 12, img: "pizza.jpg", category: "foods" },
    { name: "Burger", price: 10, img: "burger.jpg", category: "foods" },
    { name: "Pasta", price: 18, img: "pasta.jpg", category: "foods" },
    { name: "Ice Cream", price: 8, img: "icecream.jpg", category: "foods" },
    { name: "Sandwich", price: 14, img: "sandwich.jpg", category: "foods" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts(list) {
    const productSection = document.getElementById("products");
    if (!productSection) return;
    productSection.innerHTML = "";
    list.forEach((p, index) => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${index})">Add to Cart</button>
      `;
        productSection.appendChild(div);
    });
}

function addToCart(index) {
    cart.push(products[index]);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const badge = document.getElementById("nav-cart-count");
    if (!badge) return;
    badge.textContent = cart.length;
    badge.style.display = cart.length > 0 ? "inline-block" : "none";
}

function filterCategory(cat) {
    const filtered = products.filter(p => p.category === cat);
    displayProducts(filtered);
    document.getElementById("filter-label").textContent = `Filtered by: ${cat}`;
}

function filterPrice(limit) {
    const filtered = products.filter(p => p.price <= limit);
    displayProducts(filtered);
    document.getElementById("filter-label").textContent = `Price under $${limit}`;
}

function sortProducts(order) {
    const sorted = [...products].sort((a, b) =>
        order === "low" ? a.price - b.price : b.price - a.price
    );
    displayProducts(sorted);
    document.getElementById("filter-label").textContent = `Sorted by price (${order})`;
}

document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
        searchBar.addEventListener("input", e => {
            const term = e.target.value.toLowerCase();
            const filtered = products.filter(p => p.name.toLowerCase().includes(term));
            displayProducts(filtered);
        });
    }

    displayProducts(products);
    updateCartBadge();

    const cartList = document.getElementById("cart-list");
    if (cartList) {
        cartList.innerHTML = "";
        cart.forEach((item, i) => {
            const li = document.createElement("li");
            li.innerHTML = `
          <img src="${item.img}" alt="${item.name}">
          <span>${item.name} - $${item.price}</span>
          <button onclick="removeFromCart(${i})">Remove</button>
        `;
            cartList.appendChild(li);
        });
        document.getElementById("cart-total").textContent = cart.reduce((sum, p) => sum + p.price, 0);
    }

    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            alert("Checkout successful!");
            cart = [];
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartBadge();
            location.reload();
        });
    }
});

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    location.reload();
}
