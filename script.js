const products = [
    { id: 1, name: "Bananas", category: "Fruits", price: 49, unit: "1 dozen", emoji: "🍌" },
    { id: 2, name: "Fresh Apples", category: "Fruits", price: 120, unit: "1 kg", emoji: "🍎" },
    { id: 3, name: "Mangoes", category: "Fruits", price: 90, unit: "500 g", emoji: "🥭" },

    { id: 4, name: "Tomatoes", category: "Vegetables", price: 30, unit: "500 g", emoji: "🍅" },
    { id: 5, name: "Broccoli", category: "Vegetables", price: 45, unit: "1 piece", emoji: "🥦" },
    { id: 6, name: "Potatoes", category: "Vegetables", price: 35, unit: "1 kg", emoji: "🥔" },

    { id: 7, name: "Amul Milk", category: "Dairy", price: 62, unit: "1 litre", emoji: "🥛" },
    { id: 8, name: "Butter", category: "Dairy", price: 58, unit: "100 g", emoji: "🧈" },
    { id: 9, name: "Cheese", category: "Dairy", price: 110, unit: "200 g", emoji: "🧀" },

    { id: 10, name: "Maggi Noodles", category: "Snacks", price: 56, unit: "Pack of 4", emoji: "🍜" },
    { id: 11, name: "Potato Chips", category: "Snacks", price: 30, unit: "Regular pack", emoji: "🍟" },
    { id: 12, name: "Biscuits", category: "Snacks", price: 25, unit: "1 pack", emoji: "🍪" },

    { id: 13, name: "Orange Juice", category: "Drinks", price: 85, unit: "1 litre", emoji: "🧃" },
    { id: 14, name: "Cold Drink", category: "Drinks", price: 40, unit: "750 ml", emoji: "🥤" },

    { id: 15, name: "Shampoo", category: "Personal Care", price: 99, unit: "180 ml", emoji: "🧴" },
    { id: 16, name: "Toothpaste", category: "Personal Care", price: 79, unit: "200 g", emoji: "🪥" }
];

let cart = [];
let currentCategory = "All";
let currentSearch = "";

function displayProducts(list) {
    const container = document.getElementById("product-list");

    if (list.length === 0) {
        container.innerHTML = "<p>No products found. Try another search.</p>";
        return;
    }

    container.innerHTML = list.map(product => `
        <div class="product">
            <div class="product-image"
                onclick="showDetails(${product.id})">
                ${product.emoji}
            </div>
            <h3 onclick="showDetails(${product.id})">
                ${product.name}
            </h3>
            <p>${product.unit}</p>
            <h4>₹${product.price}</h4>
            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join("");
}

function showHome() {
    document.getElementById("home-page").hidden = false;
    document.getElementById("login-page").hidden = true;
    document.getElementById("details-page").hidden = true;
    document.getElementById("cart-page").hidden = true;
    document.getElementById("checkout-page").hidden = true;

    currentCategory = "All";
    currentSearch = "";

    document.getElementById("search").value = "";
    document.getElementById("section-title").textContent = "Best Deals";

    displayProducts(products);
}

function showCategory(category) {
    document.getElementById("home-page").hidden = false;
    document.getElementById("details-page").hidden = true;
    document.getElementById("cart-page").hidden = true;
    document.getElementById("checkout-page").hidden = true;
    document.getElementById("login-page").hidden = true;

    currentCategory = category;
    currentSearch = "";
    document.getElementById("search").value = "";
    document.getElementById("section-title").textContent = category;

    const filtered = products.filter(product =>
        product.category === category
    );

    displayProducts(filtered);
    document.getElementById("products").scrollIntoView();
}

function searchProducts() {
    currentSearch = document.getElementById("search").value
        .trim().toLowerCase();

    document.getElementById("home-page").hidden = false;
    document.getElementById("details-page").hidden = true;
    document.getElementById("cart-page").hidden = true;
    document.getElementById("checkout-page").hidden = true;

    const filtered = products.filter(product => {
        const matchesName = product.name.toLowerCase()
            .includes(currentSearch);
        const matchesCategory = currentCategory === "All" ||
            product.category === currentCategory;

        return matchesName && matchesCategory;
    });

    document.getElementById("section-title").textContent =
        currentSearch ? "Search Results" :
        currentCategory === "All" ? "Best Deals" : currentCategory;

    displayProducts(filtered);
}

function showDetails(id) {
    const product = products.find(item => item.id === id);

    document.getElementById("home-page").hidden = true;
    document.getElementById("details-page").hidden = false;
    document.getElementById("cart-page").hidden = true;
    document.getElementById("checkout-page").hidden = true;

    document.getElementById("product-details").innerHTML = `
        <div class="details-layout">
            <div class="details-image">${product.emoji}</div>
            <div class="details-info">
                <h1>${product.name}</h1>
                <p>Category: ${product.category}</p>
                <p>Quantity: ${product.unit}</p>
                <h2>₹${product.price}</h2>
                <p>Fresh products for your everyday needs.</p>
                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

function addToCart(id) {
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id: id, quantity: 1 });
    }

    updateCartCount();
    alert("Product added to cart!");
}

function updateCartCount() {
    const count = cart.reduce((total, item) =>
        total + item.quantity, 0);

    document.getElementById("cart-count").textContent = count;
}

function showCart() {
    document.getElementById("home-page").hidden = true;
    document.getElementById("details-page").hidden = true;
    document.getElementById("cart-page").hidden = false;
    document.getElementById("checkout-page").hidden = true;

    renderCart();
    window.scrollTo(0, 0);
}

function renderCart() {
    const container = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty. Start shopping!</p>";
        totalContainer.innerHTML = "";
        return;
    }

    container.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);

        return `
            <div class="cart-item">
                <div>
                    <b>${product.emoji} ${product.name}</b>
                    <p>₹${product.price} × ${item.quantity}</p>
                </div>
                <div>
                    <button onclick="changeQuantity(${item.id}, -1)">−</button>
                    <b>${item.quantity}</b>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn"
                        onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    }).join("");

    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + product.price * item.quantity;
    }, 0);

    totalContainer.innerHTML = `
        <p>Total: ₹${total}</p>
        <button class="checkout-btn" onclick="showCheckout()">
            Proceed to Checkout
        </button>
    `;
}

function changeQuantity(id, amount) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity += amount;

        if (item.quantity <= 0) {
            cart = cart.filter(product => product.id !== id);
        }
    }

    updateCartCount();
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    renderCart();
}

function showCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    document.getElementById("home-page").hidden = true;
    document.getElementById("details-page").hidden = true;
    document.getElementById("cart-page").hidden = true;
    document.getElementById("checkout-page").hidden = false;

    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + product.price * item.quantity;
    }, 0);

    document.getElementById("checkout-total").textContent =
        "Order Total: ₹" + total;

    window.scrollTo(0, 0);
}

document.getElementById("checkout-form").addEventListener("submit",
    function(event) {
        event.preventDefault();

        alert("Demo order placed successfully!");

        cart = [];
        updateCartCount();
        this.reset();

        document.getElementById("home-page").hidden = false;
        document.getElementById("checkout-page").hidden = true;
        document.getElementById("section-title").textContent = "Best Deals";

        displayProducts(products);
        window.scrollTo(0, 0);
    }
);

displayProducts(products);
let currentForm = "login";
let demoUser = null;

function showLogin() {
    document.getElementById("home-page").hidden = true;
    document.getElementById("login-page").hidden = false;
    document.getElementById("details-page").hidden = true;
    document.getElementById("cart-page").hidden = true;
    document.getElementById("checkout-page").hidden = true;

    switchForm("login");
    document.getElementById("auth-message").textContent = "";

    window.scrollTo(0, 0);
}

function switchForm(formType) {
    currentForm = formType;

    const signup = formType === "signup";

    document.getElementById("form-title").textContent =
        signup ? "Create Your Account" : "Welcome Back!";

    document.getElementById("form-subtitle").textContent =
        signup ? "Sign up to start shopping" :
        "Login to continue shopping";

    document.getElementById("auth-submit").textContent =
        signup ? "Create Account" : "Login";

    document.getElementById("name-field").hidden = !signup;

    document.getElementById("user-name").required = signup;

    document.getElementById("login-tab").classList.toggle(
        "active-tab", !signup
    );

    document.getElementById("signup-tab").classList.toggle(
        "active-tab", signup
    );

    document.getElementById("auth-message").textContent = "";
}

document.getElementById("auth-form").addEventListener(
    "submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("user-email").value.trim();
        const password = document.getElementById("user-password").value;
        const name = document.getElementById("user-name").value.trim();
        const message = document.getElementById("auth-message");

        if (currentForm === "signup") {
            demoUser = {
                name: name,
                email: email,
                password: password
            };

            message.textContent =
                "Account created for this demo! Welcome, " + name + "!";

        } else {
            if (!demoUser) {
                message.textContent =
                    "Please sign up first to try this demo login.";
                return;
            }

            if (email !== demoUser.email ||
                password !== demoUser.password) {
                message.textContent =
                    "Email or password does not match this demo account.";
                return;
            }

            message.textContent =
                "Welcome back, " + demoUser.name + "!";
        }

        document.getElementById("user-password").value = "";
    }
);