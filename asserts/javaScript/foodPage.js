const initialProducts = [{
    id: 1,
    name: 'Premium Cat Food',
    price: 10.99,
    image: "/meo1.webp",
    description: "A high-quality cat food formulated with premium ingredients for your feline's health.",
    nature: {
        type: 'Cat Food'
    }
}, {
    id: 2,
    name: 'Dog Food',
    price: 20.99,
    image: "/cho1.webp",
    description: "Nutritious dog food made with real meat and wholesome grains for optimal growth.",
    nature: {
        type: 'Dog Food'
    }
}, {
    id: 3,
    name: 'Premium Dog Food',
    price: 25.99,
    image: "/cho2.webp",
    description: "Premium dog food designed to meet the specific needs of active dogs.",
    nature: {
        type: 'Dog Food'
    }
}, {
    id: 4,
    name: 'Cat Treats',
    price: 15.99,
    image: "/meo2.jpg",
    description: "Delicious cat treats that are perfect for rewarding your feline friend.",
    nature: {
        type: 'Cat Food'
    }
}, {
    id: 5,
    name: 'Mix Pate',
    price: 30,
    image: "/meo5.jpg",
    description: "A savory mix of pate that offers a delightful taste for your pets.",
    nature: {
        type: 'Cat Food'
    }
}, {
    id: 6,
    name: 'Fish',
    price: 25,
    image: "/meo4.jpg",
    description: "High-quality fish-based food that promotes healthy skin and shiny fur.",
    nature: {
        type: 'Cat Food'
    }
}, {
    id: 7,
    name: 'Vegetable',
    price: 20,
    image: "/cho3.webp",
    description: "A blend of fresh vegetables that provide essential vitamins and minerals.",
    nature: {
        type: 'Dog Food'
    }
}, {
    id: 8,
    name: 'Beef',
    price: 25.99,
    image: "/cho4.webp",
    description: "Wholesome beef meal that dogs love, packed with protein for energy.",
    nature: {
        type: 'Dog Food'
    }
}, {
    id: 9,
    name: 'Chicken',
    price: 29.99,
    image: "/cho5.jpg",
    description: "Tender chicken meal that provides essential nutrients for a healthy lifestyle.",
    nature: {
        type: 'Dog Food'
    }
}, /* Other products... */ ];

const featuredProductsF = [{
    id: 4,
    name: 'Cat Treats',
    price: 15.99,
    image: "/meo2.jpg",
    description: "Delicious cat treats that are perfect for rewarding your feline friend.",
    nature: {
        type: 'Cat Food'
    }
}, {
    id: 5,
    name: 'Mix Pate',
    price: 30,
    image: "/meo5.jpg",
    description: "A savory mix of pate that offers a delightful taste for your pets.",
    nature: {
        type: 'Cat Food'
    }
}, {
    id: 6,
    name: 'Fish',
    price: 25,
    image: "/meo4.jpg",
    description: "High-quality fish-based food that promotes healthy skin and shiny fur.",
    nature: {
        type: 'Cat Food'
    }
}, /* Other featured products... */ ];

function getProductsF() {
    return JSON.parse(localStorage.getItem('initialProducts')) || [];
}

function getFeaturedProductsF() {
    return JSON.parse(localStorage.getItem('featuredProductsF')) || [];
}

function showFeaturedProductsF(featuredProductsF) {
    const featuredProductsFBox = document.getElementById('featuredProductsFBox');
    const products = getFeaturedProductsF();
    featuredProductsFBox.innerHTML = ''; // Clear current content
    resultCount.innerText = `Showing ${featuredProductsF.length} results`;

    featuredProductsF.forEach(item => {
        const newItem = document.createElement('div');
        newItem.classList.add('box_itemF');
        newItem.innerHTML = `
    <div class="imgH"><img src="${item.image}" alt="Product"></div>
    <div class="detailH">
        <a href="detailtFood.html?code=${item.id}" class="text no-underline"">
            <p class="titleH"><b>${item.name}</p>
            <p class="priceH"><b>${item.price.toFixed(2)}</p>
        </a>
         <div class="icon-products">
             <i class="fa-regular fa-heart" style="color: orange;"></i>
         </div>
        <button class="cart-hover" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}"><span class="fa-solid fa-cart-shopping"></span></button>
    </div>
`;
        featuredProductsFBox.appendChild(newItem);
    });
}

function showProductF(initialProducts) {
    const listF = document.getElementById('listF');
    const resultCount = document.getElementById('resultCount');
    listF.innerHTML = '';
    resultCount.innerText = `Showing ${initialProducts.length} results`;

    initialProducts.forEach(item => {
        const newItem = document.createElement('div');
        newItem.classList.add('product-itemF');
        newItem.innerHTML = `
    <div class="imgH"><img src="${item.image}" alt="Products_img"></div>
    <div class="detailH">
        <a href="detailtFood.html?code=${item.id}" class="text no-underline"">
            <p class="titleH"><b>${item.name}</b></p>
            <p class="price"><b>$${item.price.toFixed(2)}</b></p>
        </a>
         <div class="icon-products">
             <i class="fa-regular fa-heart" style="color: orange;"></i>
         </div>
        <button class="cart-hover" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}"><span class="fa-solid fa-cart-shopping"></span></button>
    </div>
`;
        listF.appendChild(newItem);
    });
}

// Modal functionality
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

// Add event listeners to cart buttons
document.addEventListener('click', function(event) {
    if (event.target.matches('.cart-hover')) {
        const button = event.target;
        const productId = button.getAttribute('data-id');
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));

        addToCartFood({
            id: productId,
            name: productName,
            price: productPrice
        });
        modal.style.display = "block";
        updateModalCartFood();
    }
});

// Close modal
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Cart logic
let cart = [];

function addToCartFood(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('productInCart', JSON.stringify(cart));
}

function updateModalCartFood() {
    const productCart = document.getElementById("product-cart");
    productCart.innerHTML = '';

    let totalAmountFood = 0;
    cart.forEach(item => {
        const totalPrice = (item.price * item.quantity).toFixed(2);
        totalAmountFood += item.price * item.quantity;
        productCart.innerHTML += `
    <tr class="produc_In_Cart">
        <td class="moldal-detail">
            <p class="modal-product-name">${item.name}</p>
            <p class="modal-product-quantity">Quantity: ${item.quantity}</p>
        </td>
        <td style="color: #F87537;">$${item.price.toFixed(2)}</td>
        <td>${item.quantity}</td>
        <td style="color: #F87537;">$${totalPrice}</td>
    </tr>
`;
    });

    document.querySelector('.tt-total span').textContent = `$${totalAmountFood.toFixed(2)}`;
}

// LỌC SẢN PHẨM
document.getElementById('applyFilter').addEventListener('click', function() {
    const categoryFilters = Array.from(document.querySelectorAll('.filters input[type="checkbox"]:checked')).map(cb => cb.value);
    const minPrice = parseFloat(document.querySelector('input[name="minPrice"]').value) || 0;
    const maxPrice = parseFloat(document.querySelector('input[name="maxPrice"]').value) || Infinity;
    const searchTerm = document.querySelector('input[name="search"]').value.toLowerCase();


    const filteredProductsFood = initialProducts.filter(item => {
        const isInCategory = categoryFilters.length ? categoryFilters.includes(item.nature.type) : true;
        const isInPriceRange = item.price >= minPrice && item.price <= maxPrice;
        const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm);
        return isInCategory && isInPriceRange && matchesSearchTerm;
    });
    //hiển thị sản phẩm đã lọc
    showProductF(filteredProductsFood);
    console.log(filteredProductsFood)
});

// Hiện sản phẩm ban đầu
showFeaturedProductsF(featuredProductsF);
showProductF(initialProducts);