alert("TEST JAVASCRIPT");
```javascript
/* =========================================================
   MIAOU 🐾 — V1
   Main JavaScript
   ========================================================= */


/* =========================================================
   VARIABLES
   ========================================================= */

const cart = [];

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mainNav = document.getElementById("mainNav");

const cartButton = document.getElementById("cartButton");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose = document.getElementById("cartClose");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const checkoutButton = document.getElementById("checkoutButton");

const productModal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");

const modalProductName = document.getElementById("modalProductName");
const modalProductDescription = document.getElementById("modalProductDescription");
const modalProductPrice = document.getElementById("modalProductPrice");

const modalAddToCart = document.getElementById("modalAddToCart");


let selectedModalProduct = null;


/* =========================================================
   MOBILE MENU
   ========================================================= */

if (mobileMenuButton && mainNav) {

    mobileMenuButton.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("active");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        mobileMenuButton.textContent = isOpen ? "✕" : "☰";

    });


    /* Fermer le menu après avoir cliqué sur un lien */

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileMenuButton.textContent = "☰";

        });

    });

}


/* =========================================================
   PANIER — OUVRIR
   ========================================================= */

if (cartButton && cartOverlay) {

    cartButton.addEventListener("click", () => {

        cartOverlay.classList.add("active");

        cartOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    });

}


/* =========================================================
   PANIER — FERMER
   ========================================================= */

function closeCart() {

    if (!cartOverlay) return;

    cartOverlay.classList.remove("active");

    cartOverlay.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


if (cartClose) {

    cartClose.addEventListener(
        "click",
        closeCart
    );

}


/* Cliquer sur l'arrière-plan ferme le panier */

if (cartOverlay) {

    cartOverlay.addEventListener("click", (event) => {

        if (event.target === cartOverlay) {

            closeCart();

        }

    });

}


/* =========================================================
   FORMATAGE DU PRIX
   ========================================================= */

function formatPrice(price) {

    return price
        .toFixed(2)
        .replace(".", ",") + " €";

}


/* =========================================================
   AJOUTER AU PANIER
   ========================================================= */

function addToCart(name, price) {

    const existingProduct = cart.find(
        item => item.name === name
    );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }


    updateCart();

    openCart();

}


/* =========================================================
   OUVRIR LE PANIER APRÈS AJOUT
   ========================================================= */

function openCart() {

    if (!cartOverlay) return;

    cartOverlay.classList.add("active");

    cartOverlay.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

}


/* =========================================================
   BOUTONS "AJOUTER"
   ========================================================= */

const addToCartButtons =
    document.querySelectorAll(".add-to-cart");


addToCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productName =
            button.dataset.product;

        const productPrice =
            parseFloat(button.dataset.price);


        if (
            !productName ||
            isNaN(productPrice)
        ) {
            return;
        }


        addToCart(
            productName,
            productPrice
        );

    });

});


/* =========================================================
   ACTUALISER LE PANIER
   ========================================================= */

function updateCart() {

    if (!cartItems) return;


    /* Calcul du nombre total d'articles */

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );


    /* Calcul du prix total */

    const totalPrice = cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );


    /* Compteur panier */

    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }


    /* Total */

    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(totalPrice);

    }


    /* Panier vide */

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🐱
                </div>

                <h3>
                    Votre panier est vide
                </h3>

                <p>
                    Ajoutez un petit plaisir pour votre chat.
                </p>

            </div>

        `;

        return;

    }


    /* Panier avec produits */

    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const itemElement =
            document.createElement("div");


        itemElement.style.display = "flex";
        itemElement.style.alignItems = "center";
        itemElement.style.justifyContent = "space-between";
        itemElement.style.gap = "12px";
        itemElement.style.padding = "15px 0";
        itemElement.style.borderBottom =
            "1px solid var(--border)";


        itemElement.innerHTML = `

            <div style="flex:1;">

                <strong
                    style="
                        display:block;
                        font-size:0.88rem;
                        margin-bottom:4px;
                    "
                >
                    ${item.name}
                </strong>

                <span
                    style="
                        color:var(--muted);
                        font-size:0.76rem;
                    "
                >
                    ${formatPrice(item.price)}
                    × ${item.quantity}
                </span>

            </div>


            <div
                style="
                    display:flex;
                    align-items:center;
                    gap:7px;
                "
            >

                <button
                    class="cart-quantity-button"
                    data-index="${index}"
                    data-action="decrease"
                    style="
                        width:28px;
                        height:28px;
                        border:1px solid var(--border);
                        border-radius:50%;
                        background:white;
                        cursor:pointer;
                    "
                >
                    −
                </button>


                <span
                    style="
                        min-width:20px;
                        text-align:center;
                        font-size:0.82rem;
                        font-weight:800;
                    "
                >
                    ${item.quantity}
                </span>


                <button
                    class="cart-quantity-button"
                    data-index="${index}"
                    data-action="increase"
                    style="
                        width:28px;
                        height:28px;
                        border:1px solid var(--border);
                        border-radius:50%;
                        background:white;
                        cursor:pointer;
                    "
                >
                    +
                </button>

            </div>


            <strong
                style="
                    min-width:65px;
                    text-align:right;
                    font-size:0.85rem;
                "
            >
                ${formatPrice(
                    item.price * item.quantity
                )}
            </strong>

        `;


        cartItems.appendChild(itemElement);

    });


    /* Boutons quantité */

    const quantityButtons =
        document.querySelectorAll(
            ".cart-quantity-button"
        );


    quantityButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    parseInt(
                        button.dataset.index
                    );

                const action =
                    button.dataset.action;


                if (
                    isNaN(index) ||
                    !cart[index]
                ) {
                    return;
                }


                if (action === "increase") {

                    cart[index].quantity += 1;

                }


                if (action === "decrease") {

                    cart[index].quantity -= 1;


                    if (
                        cart[index].quantity <= 0
                    ) {

                        cart.splice(index, 1);

                    }

                }


                updateCart();

            }
        );

    });

}


/* =========================================================
   MODAL PRODUIT
   ========================================================= */

function openProductModal(
    name,
    price,
    description
) {

    if (!productModal) return;


    selectedModalProduct = {
        name: name,
        price: price
    };


    if (modalProductName) {

        modalProductName.textContent =
            name;

    }


    if (modalProductPrice) {

        modalProductPrice.textContent =
            formatPrice(price);

    }


    if (modalProductDescription) {

        modalProductDescription.textContent =
            description;

    }


    productModal.classList.add("active");

    productModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

}


/* =========================================================
   FERMER MODAL
   ========================================================= */

function closeProductModal() {

    if (!productModal) return;

    productModal.classList.remove("active");

    productModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProductModal
    );

}


if (productModal) {

    productModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === productModal
            ) {

                closeProductModal();

            }

        }
    );

}


/* =========================================================
   AJOUTER DEPUIS LE MODAL
   ========================================================= */

if (modalAddToCart) {

    modalAddToCart.addEventListener(
        "click",
        () => {

            if (!selectedModalProduct) {
                return;
            }


            addToCart(
                selectedModalProduct.name,
                selectedModalProduct.price
            );


            closeProductModal();

        }
    );

}


/* =========================================================
   FERMER AVEC LA TOUCHE ESC
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {
            return;
        }


        closeCart();

        closeProductModal();

    }
);


/* =========================================================
   BOUTON CHECKOUT
   ========================================================= */

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Votre panier est vide 🐾"
                );

                return;

            }


            alert(
                "Le paiement sera bientôt disponible. Merci pour votre intérêt pour Miaou 🐾"
            );

        }
    );

}


/* =========================================================
   INITIALISATION
   ========================================================= */

updateCart();

console.log("🐾 Miaou V1 — site chargé avec succès.");

```

/* =========================================================
   OUVRIR LE MODAL EN CLIQUANT SUR UN PRODUIT
   ========================================================= */

const productCards = document.querySelectorAll(".product-card");

productCards.forEach(card => {

    card.addEventListener("click", (event) => {

        /* Ne pas ouvrir le modal si on clique sur "Ajouter" */
        if (event.target.closest(".add-to-cart")) {
            return;
        }

        const name = card.dataset.product;
        const price = parseFloat(card.dataset.price);
        const description = card.dataset.description;

        if (
            !name ||
            isNaN(price) ||
            !description
        ) {
            return;
        }

        openProductModal(
            name,
            price,
            description
        );

    });

});
