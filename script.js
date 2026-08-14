/* =========================================================
MIAOU 🐾 — V1
Main JavaScript
========================================================= */


/* =========================================================
VARIABLES
========================================================= */

let cart = [];

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mainNav =
    document.getElementById("mainNav");

const cartButton =
    document.getElementById("cartButton");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartClose =
    document.getElementById("cartClose");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const productModal =
    document.getElementById("productModal");

const modalClose =
    document.getElementById("modalClose");

const modalProductName =
    document.getElementById("modalProductName");

const modalProductDescription =
    document.getElementById("modalProductDescription");

const modalProductPrice =
    document.getElementById("modalProductPrice");

const modalAddToCart =
    document.getElementById("modalAddToCart");

let selectedModalProduct = null;


/* =========================================================
CHARGER LE PANIER SAUVEGARDÉ
========================================================= */

try {

    const savedCart =
        localStorage.getItem("miaouCart");

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

        console.log(
            "Impossible de sauvegarder le panier."
        );

    }

}


/* =========================================================
MENU MOBILE
========================================================= */

if (mobileMenuButton && mainNav) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                mainNav.classList.toggle("active");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            mobileMenuButton.textContent =
                isOpen ? "✕" : "☰";

        }
    );


    const navLinks =
        mainNav.querySelectorAll("a");


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mainNav.classList.remove(
                    "active"
                );

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenuButton.textContent =
                    "☰";

            }
        );

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

    document.body.style.overflow =
        "hidden";

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

    document.body.style.overflow =
        "";

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

            if (
                event.target === cartOverlay
            ) {

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
        cart.find(
            item => item.name === name
        );


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
    document.querySelectorAll(
        ".add-to-cart"
    );


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
GALERIE + VARIANTES — PRODUIT 3
========================================================= */

const productGalleryCards =
    document.querySelectorAll(
        ".product-card"
    );


productGalleryCards.forEach(card => {

    const galleryImage =
        card.querySelector(
            ".product-gallery-image"
        );

    const previousButton =
        card.querySelector(
            ".product-image-prev"
        );

    const nextButton =
        card.querySelector(
            ".product-image-next"
        );

    const counter =
        card.querySelector(
            ".product-image-counter"
        );

    const variantButtons =
        card.querySelectorAll(
            ".product-variant"
        );

    const addButton =
        card.querySelector(
            ".add-to-cart"
        );


    /* Si ce n'est pas le produit 3,
       on ne fait rien */

    if (
        !galleryImage ||
        !previousButton ||
        !nextButton ||
        variantButtons.length === 0
    ) {

        return;

    }


    const variants = [

        {
            color: "Violet",
            image: "PV.png",
            alt: "Poulpe violet Miaou"
        },

        {
            color: "Noir",
            image: "PN.png",
            alt: "Poulpe noir Miaou"
        },

        {
            color: "Marron",
            image: "PM.jpg",
            alt: "Poulpe marron Miaou"
        }

    ];


    let currentIndex = 0;


    /* =====================================================
       CHANGER DE VARIANTE
       ===================================================== */

    function setVariant(index) {

        if (
            index < 0 ||
            index >= variants.length
        ) {

            return;

        }


        currentIndex = index;

        const variant =
            variants[currentIndex];


        /* Image */

        galleryImage.src =
            variant.image;

        galleryImage.alt =
            variant.alt;


        /* Compteur */

        if (counter) {

            counter.textContent =
                `${currentIndex + 1} / ${variants.length}`;

        }


        /* Boutons couleur */

        variantButtons.forEach(
            (button, buttonIndex) => {

                button.classList.toggle(
                    "active",
                    buttonIndex === currentIndex
                );

            }
        );


        /* Bouton panier */

        if (addButton) {

            addButton.dataset.product =
                `Poulpe Miaou - ${variant.color}`;

            addButton.dataset.price =
                "8.90";

            addButton.textContent =
                `Ajouter le poulpe ${variant.color.toLowerCase()}`;

        }

    }


    /* =====================================================
       BOUTONS COULEUR
       ===================================================== */

    variantButtons.forEach(
        (button, index) => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    setVariant(index);

                }
            );

        }
    );


    /* =====================================================
       FLÈCHE GAUCHE
       ===================================================== */

    previousButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            currentIndex--;

            if (
                currentIndex < 0
            ) {

                currentIndex =
                    variants.length - 1;

            }

            setVariant(currentIndex);

        }
    );


    /* =====================================================
       FLÈCHE DROITE
       ===================================================== */

    nextButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            currentIndex++;

            if (
                currentIndex >= variants.length
            ) {

                currentIndex = 0;

            }

            setVariant(currentIndex);

        }
    );


    /* État initial */

    setVariant(0);

});


/* =========================================================
ACTUALISER LE PANIER
========================================================= */

function updateCart() {

    if (!cartItems) return;


    /* =====================================================
    NOMBRE TOTAL D'ARTICLES
    ===================================================== */

    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    /* =====================================================
    PRIX TOTAL DES PRODUITS
    ===================================================== */

    let totalPrice =
        cart.reduce(
            (total, item) =>
                total +
                (
                    item.price *
                    item.quantity
                ),
            0
        );


    /* =====================================================
    LIVRAISON PRIORITAIRE
    ===================================================== */

    const priorityShipping =
        localStorage.getItem(
            "miaouPriorityShipping"
        ) === "true";


    if (
        priorityShipping &&
        cart.length > 0
    ) {

        totalPrice += 3;

    }


    /* =====================================================
    COMPTEUR
    ===================================================== */

    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }


    /* =====================================================
    TOTAL
    ===================================================== */

    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(totalPrice);

    }


    /* =====================================================
    PANIER VIDE
    ===================================================== */

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
                    Ajoutez un petit plaisir
                    pour votre chat.
                </p>

            </div>

        `;


        localStorage.removeItem(
            "miaouPriorityShipping"
        );


        return;

    }


    /* =====================================================
    PANIER REMPLI
    ===================================================== */

    cartItems.innerHTML = "";


    /* =====================================================
    AFFICHER LES PRODUITS
    ===================================================== */

    cart.forEach(
        (item, index) => {

            const itemElement =
                document.createElement("div");


            itemElement.style.display =
                "flex";

            itemElement.style.alignItems =
                "center";

            itemElement.style.justifyContent =
                "space-between";

            itemElement.style.gap =
                "12px";

            itemElement.style.padding =
                "15px 0";

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
                        item.price *
                        item.quantity
                    )}
                </strong>

            `;


            cartItems.appendChild(
                itemElement
            );

        }
    );


    /* =====================================================
    BOUTONS + / -
    ===================================================== */

    const quantityButtons =
        cartItems.querySelectorAll(
            ".cart-quantity-button"
        );


    quantityButtons.forEach(
        button => {

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


                    if (
                        action === "increase"
                    ) {

                        cart[index].quantity += 1;

                    }


                    if (
                        action === "decrease"
                    ) {

                        cart[index].quantity -= 1;


                        if (
                            cart[index].quantity <= 0
                        ) {

                            cart.splice(
                                index,
                                1
                            );

                        }

                    }


                    saveCart();

                    updateCart();

                }
            );

        }
    );


    /* =====================================================
    LIVRAISON PRIORITAIRE
    ===================================================== */

    const priorityElement =
        document.createElement("div");


    priorityElement.style.display =
        "flex";

    priorityElement.style.alignItems =
        "center";

    priorityElement.style.justifyContent =
        "space-between";

    priorityElement.style.gap =
        "10px";

    priorityElement.style.padding =
        "14px 0";

    priorityElement.style.borderBottom =
        "1px solid var(--border)";


    priorityElement.innerHTML = `

        <label
            style="
                display:flex;
                align-items:center;
                gap:10px;
                cursor:pointer;
                flex:1;
            "
        >

            <input
                type="checkbox"
                id="priorityShipping"
                style="
                    width:18px;
                    height:18px;
                    cursor:pointer;
                "
            >


            <span
                style="
                    font-size:0.82rem;
                    font-weight:700;
                "
            >
                ⚡ Livraison prioritaire
            </span>

        </label>


        <strong
            style="
                font-size:0.82rem;
            "
        >
            +3,00 €
        </strong>

    `;


    cartItems.appendChild(
        priorityElement
    );


    /* =====================================================
    CHECKBOX LIVRAISON PRIORITAIRE
    ===================================================== */

    const priorityCheckbox =
        document.getElementById(
            "priorityShipping"
        );


    if (priorityCheckbox) {

        priorityCheckbox.checked =
            localStorage.getItem(
                "miaouPriorityShipping"
            ) === "true";


        priorityCheckbox.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    "miaouPriorityShipping",
                    priorityCheckbox.checked
                );


                updateCart();

            }
        );

    }

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


    productModal.classList.add(
        "active"
    );


    productModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
FERMER LE MODAL
========================================================= */

function closeProductModal() {

    if (!productModal) return;


    productModal.classList.remove(
        "active"
    );


    productModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

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

            if (
                !selectedModalProduct
            ) {

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
    document.querySelectorAll(
        ".product-card"
    );


productCards.forEach(card => {

    card.addEventListener(
        "click",
        event => {

            /* Ne pas ouvrir le modal avec
               les boutons de la galerie */

            if (
                event.target.closest(
                    ".add-to-cart"
                ) ||
                event.target.closest(
                    ".product-variant"
                ) ||
                event.target.closest(
                    ".product-image-arrow"
                )
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

        if (
            event.key !== "Escape"
        ) {

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

            if (
                cart.length === 0
            ) {

                alert(
                    "Votre panier est vide 🐾"
                );

                return;

            }


            checkoutButton.disabled =
                true;

            checkoutButton.textContent =
                "Préparation du paiement...";


            try {

                const response =
                    await fetch(
                        "https://miaoustripe.wavesless07.workers.dev/",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                cart: cart.map(
                                    item => ({

                                        name:
                                            item.name,

                                        quantity:
                                            item.quantity

                                    })
                                ),

                                priorityShipping:
                                    localStorage.getItem(
                                        "miaouPriorityShipping"
                                    ) === "true"

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
                        data.details ||
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
                    "Erreur : " +
                    (
                        error.message ||
                        "Erreur inconnue"
                    )
                );


                checkoutButton.disabled =
                    false;

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
