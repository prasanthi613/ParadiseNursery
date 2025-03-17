document.addEventListener("DOMContentLoaded", () => {
    const landingPage = document.getElementById("landing-page");
    const productsPage = document.getElementById("products-page");
    const cartPage = document.getElementById("cart-page");

    const getStartedBtn = document.getElementById("get-started");
    const viewCartBtn = document.getElementById("view-cart");
    const backToShopBtn = document.getElementById("back-to-shop");

    const cartIcon = document.getElementById("cart-icon");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    const cartItemsContainer = document.getElementById("cart-items");

    let cart = [];

    const products = [{
            id: 1,
            name: "Aloe Vera",
            price: 10,
            img: "https://www.cactusoutlet.com/cdn/shop/products/AloeBarbadensis_1024x1024.jpg?v=1636411206"
        },
        {
            id: 2,
            name: "Snake Plant",
            price: 15,
            img: "https://www.justsuccit.com/cdn/shop/files/D97EEA6A-8BFE-4646-8678-754618A7015D.jpg?v=1697152158"
        },
        {
            id: 3,
            name: "Cactus",
            price: 8,
            img: "https://cdn11.bigcommerce.com/s-74757430ww/images/stencil/1280x1280/products/2278/7886/Cactus_Flower-2__90502.1706413569.png?c=1"
        },
        {
            id: 4,
            name: "Bamboo",
            price: 12,
            img: "https://cdn.britannica.com/28/75928-050-66951F06/species-bamboo-islands-Asia-oceans-Pacific-Indian.jpg"
        },
        {
            id: 5,
            name: "Fern",
            price: 18,
            img: "https://costafarms.com/cdn/shop/files/L-BOS-P-WMC-01-CF--white_411c64f6-cb73-419c-8204-eb2154c19b62.jpg?v=1707335297"
        },
        {
            id: 6,
            name: "Money Plant",
            price: 20,
            img: "https://www.betweentwothorns.com/cdn/shop/products/IMG_2883.jpg?v=1735924603&width=1500"
        },
    ];

    function renderProducts() {
        const productsContainer = document.getElementById("products");
        productsContainer.innerHTML = "";
        products.forEach((p) => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>$${p.price}</p>
                <button onclick="addToCart(${p.id})">Add to Cart</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    window.addToCart = (id) => {
        const item = products.find(p => p.id === id);
        const existingItem = cart.find(p => p.id === id);
        if (existingItem) {
            existingItem.qty++;
        } else {
            cart.push({
                ...item,
                qty: 1
            });
        }
        updateCart();
    };

    function updateCart() {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
        cartTotal.textContent = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        renderCartItems();
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = "";
        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <img src="${item.img}" width="50">
                <span>${item.name} x ${item.qty} - $${item.price * item.qty}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(div);
        });
    }

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCart();
    };

    getStartedBtn.addEventListener("click", () => {
        // Hide the landing page and show the product page
        landingPage.classList.add("hidden");
        productsPage.classList.remove("hidden");
        renderProducts();
    });

    viewCartBtn.addEventListener("click", () => {
        // Hide the product page and show the cart page
        productsPage.classList.add("hidden");
        cartPage.classList.remove("hidden");
    });

    backToShopBtn.addEventListener("click", () => {
        // Hide the cart page and show the product page again
        cartPage.classList.add("hidden");
        productsPage.classList.remove("hidden");
    });
});
