/* =========================================================
   MIAOU 🐾 — V1
   Main JavaScript
   ========================================================= */


/* =========================================================
   VARIABLES
   ========================================================= */

let cart = [];

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
   CHARGER LE PANIER SAUVEGARDÉ
   ========================================================= */

try {

    const savedCart = localStorage.getItem("miaouCart");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

} catch (error) {

    cart = [];

}


/* =========================================================
   SAUVEGARDER LE PANIER
   ========================================================= */

function saveCart() {

    try {

        localStorage.setItem(
            "miaouCart",
            JSON.stringify(cart)
        );

    } catch (error) {

        console.log("Impossible de sauvegarder le panier.");

    }

}


/* =========================================================
   MENU MOBILE
   ========================================================= */

if (mobileMenuButton && mainNav) {

    mobileMenuButton.addEventListener("click", () => {

        const isOpen =
            mainNav.classList.toggle("active");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        mobileMenuButton.textContent =
            isOpen ? "✕" : "☰";

    });


    const navLinks =
        mainNav.querySelectorAll("a");

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
   FORMATAGE DU PRIX
   ========================================================= */

function formatPrice(price) {

    return Number(price)
        .toFixed(2)
        .replace(".", ",") + " €";

}


/* =========================================================
   OUVRIR LE PANIER
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
   FERMER LE PANIER
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


if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCart
    );

}


if (cartClose) {

    cartClose.addEventListener(
        "click",
        closeCart
    );

}


/* Cliquer en dehors du panier */

if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        event => {

            if (event.target === cartOverlay) {
                closeCart();
            }

        }
    );

}


/* =========================================================
   ANIMATION DU COMPTEUR
   ========================================================= */

function animateCartButton() {

    if (!cartButton) return;

    cartButton.animate(
        [
            {
                transform: "scale(1)"
            },
            {
                transform: "scale(1.15)"
            },
            {
                transform: "scale(1)"
            }
        ],
        {
            duration: 300,
            easing: "ease-out"
        }
    );

}


/* =========================================================
   AJOUTER AU PANIER
   ========================================================= */

function addToCart(name, price) {

    if (!name || isNaN(price)) {
        return;
    }


    const existingProduct =
        cart.find(item => item.name === name);


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            name: name,

            price: Number(price),

            quantity: 1

        });

    }


    saveCart();

    updateCart();

    animateCartButton();

    openCart();

}


/* =========================================================
   BOUTONS "AJOUTER"
   ========================================================= */

const addToCartButtons =
    document.querySelectorAll(".add-to-cart");


addToCartButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            const productName =
                button.dataset.product;

            const productPrice =
                parseFloat(
                    button.dataset.price
                );


            addToCart(
                productName,
                productPrice
            );

        }
    );

});


/* =========================================================
   ACTUALISER LE PANIER
   ========================================================= */

function updateCart() {

    if (!cartItems) return;


    /* Nombre total d'articles */

    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    /* Prix total */

    const totalPrice =
        cart.reduce(
            (total, item) =>
                total +
                (item.price * item.quantity),
            0
        );


    /* Compteur */

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


    /* Panier rempli */

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


    /* Boutons + / − */

    const quantityButtons =
        cartItems.querySelectorAll(
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


                saveCart();

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

        price: Number(price)

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
   FERMER LE MODAL
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
        event => {

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
   OUVRIR LE MODAL EN CLIQUANT SUR UN PRODUIT
   ========================================================= */

const productCards =
    document.querySelectorAll(".product-card");


productCards.forEach(card => {

    card.addEventListener(
        "click",
        event => {

            /* Ne pas ouvrir le modal avec Ajouter */

            if (
                event.target.closest(".add-to-cart")
            ) {
                return;
            }


            const name =
                card.dataset.product;

            const price =
                parseFloat(
                    card.dataset.price
                );

            const description =
                card.dataset.description;


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

        }
    );

});


/* =========================================================
   TOUCHE ESC
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        closeCart();

        closeProductModal();

    }
);

/* =========================================================
CHECKOUT STRIPE
========================================================= */

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        async () => {

            if (cart.length === 0) {

                alert(
                    "Votre panier est vide 🐾"
                );

                return;

            }

            checkoutButton.disabled = true;
            checkoutButton.textContent =
                "Préparation du paiement...";

            try {

                const response = await fetch(
                    "https://miaoustripe.wavesless07.workers.dev/",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            cart: cart.map(item => ({
                                name: item.name,
                                quantity: item.quantity
                            }))
                        })
                    }
                );


                const data =
                    await response.json();


                if (
                    !response.ok ||
                    !data.url
                ) {

                    throw new Error(
                        data.error ||
                        "Impossible de créer le paiement."
                    );

                }


                /* Redirection vers Stripe */

                window.location.href =
                    data.url;


            } catch (error) {

                console.error(
                    "Erreur checkout :",
                    error
                );


                alert(
                    "Une erreur est survenue lors de la préparation du paiement. Réessayez dans quelques instants 🐾"
                );


                checkoutButton.disabled = false;

                checkoutButton.textContent =
                    "Passer commande";

            }

        }
    );

}

/* =========================================================
INITIALISATION
========================================================= */

updateCart();

