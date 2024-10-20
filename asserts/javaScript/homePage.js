var fetured_products = [
    {
        id: 1,
        name: "Dried meat",
        quantity: 4,
        price: "200.000",
        image: "/asserts/image/feturedHomepage1.webp",
        description: "Roasted and smoked beef liver for dogs. Nutritional composition: Crude protein ≥18%, Crude fat ≥5%, Crude fiber ≤9%, Crude ash ≤1%, Minerals ≥1.5%, Calcium ≥1.2%, Phosphorus ≥0.5%, Salt ≤0.09%, Moisture ≤10%. Suitable for all breeds.",
        
    },
    {
        id: 2,
        name: "Chicken jerky",
        quantity: 10,
        price: "150.000",
        image: "/asserts/image/feturedHomepage2.webp",
        description: "Chicken jerky strips, high in protein. Nutritional composition: Crude protein ≥22%, Crude fat ≤3%, Moisture ≤12%. Perfect for dogs with sensitive stomachs.",
    },
    {
        id: 3,
        name: "Beef bites",
        quantity: 8,
        price: "180.000",
        image: "/asserts/image/feturedHomepage3.webp",
        description: "Small beef bites, easy to chew. Nutritional composition: Crude protein ≥20%, Crude fat ≤5%, Moisture ≤11%. Ideal for training.",
    }
]

var best_selling = [
        {
            id: 4,
            name: "Chicken nugget",
            quantity: 10,
            price: "150.000",
            image: "/asserts/image/feturedHomepage1.webp",
            description: "Crunchy chicken nuggets. Nutritional composition: Crude protein ≥25%, Crude fat ≤7%, Moisture ≤12%. Perfect for snacks."
        },
        {
            id: 5,
            name: "Salmon strips",
            quantity: 12,
            price: "200.000",
            image: "/asserts/image/feturedHomepage1.webp",
            description: "Soft salmon strips, rich in omega-3. Nutritional composition: Crude protein ≥22%, Crude fat ≤8%, Moisture ≤10%. Great for promoting healthy skin."
        },
        {
            id: 6,
            name: "Lamb cubes",
            quantity: 6,
            price: "210.000",
            image: "/asserts/image/feturedHomepage1.webp",
            description: "Tender lamb cubes. Nutritional composition: Crude protein ≥24%, Crude fat ≤6%, Moisture ≤9%. Good for muscle growth."
        },
        {
            id: 7,
            name: "Duck bites",
            quantity: 15,
            price: "190.000",
            image: "/asserts/image/feturedHomepage1.webp",
            description: "Tasty duck bites, easy to digest. Nutritional composition: Crude protein ≥21%, Crude fat ≤5%, Moisture ≤10%. Ideal for sensitive stomachs."
        },
        {
            id: 8,
            name: "Turkey slices",
            quantity: 9,
            price: "170.000",
            image: "/asserts/image/feturedHomepage1.webp",
            description: "Lean turkey slices, high in protein. Nutritional composition: Crude protein ≥23%, Crude fat ≤4%, Moisture ≤11%. Excellent for active pets."
        },
        {
            id: 9,
            name: "Pork twists",
            quantity: 8,
            price: "160.000",
            image: "/asserts/image/feturedHomepage1.webp",
            description: "Twisted pork sticks, chewy texture. Nutritional composition: Crude protein ≥20%, Crude fat ≤5%, Moisture ≤10%. Great for teeth cleaning."
        },
        {
            id: 10,
            name: "Venison jerky",
            quantity: 7,
            price: "220.000",
            image: "/asserts/image/feturedHomepage1.webp",
            description: "Savory venison jerky, rich in iron. Nutritional composition: Crude protein ≥26%, Crude fat ≤6%, Moisture ≤9%. Ideal for muscle repair."
        },
        {
            id: 11,
            name: "Tuna chips",
            quantity: 14,
            price: "140.000",
            image: "/asserts/image/feturedHomepage1.webp",
            description: "Crispy tuna chips, light and crunchy. Nutritional composition: Crude protein ≥22%, Crude fat ≤4%, Moisture ≤10%. Perfect for light snacking."
        }
]
// lưu sản phẩm vào local
localStorage.setItem('fetured_products', JSON.stringify(fetured_products));
localStorage.setItem('best_selling', JSON.stringify(best_selling));

function createCard(fetured_products, i) {
    let demo = '<div class="box_item" data-aos="fade-up" data-aos-duration="1000">';
        demo += '<img src="'+ fetured_products[i].image +'" alt="Products_img">';
        demo += `<a href="detail.html?code=${fetured_products[i].id}" class="text">`;
        demo += '<div class="icon_food">';
        demo += '<p><b>' + fetured_products[i].name + '</b></p>';
        demo += '<i class="fa-regular fa-heart" style="color: orange;"></i>';
        demo += '</div>';
        demo += '<p class="price"><b>' + fetured_products[i].price + ' VNĐ</b></p>';
        demo += `</a>`;
        demo += `<button id="myBtn-fetured" onclick="addToCartHomePage(${fetured_products[i].id})" class="cart-hover"><span class="fa-solid fa-cart-shopping"></span></button>`;
        demo += '</div>';
    return demo;
}

function createCard_Best(best_selling, i) {
    let demo = '<div class="products">';
        demo += '<div class="img">';
        demo += '<img src="'+ best_selling[i].image +'" alt="Products_img">';
        demo += '</div>';
        demo += `<a href="detail.html?code=${best_selling[i].id}" class="details">`;
        demo += '<div class="details-products">';
        demo += '<p class="title-product" ><b>' + best_selling[i].name + '</b></p>';
        demo += '<p class="price-product">' + best_selling[i].price + ' VNĐ</p>'; 
        demo += '</div>';
        demo += '<div class="icon-products">';
        demo += '<i class="fa-regular fa-heart"></i>';
        demo += '</div>';
        demo += `</a>`;
        demo += `<button id="myBtn-best" onclick="addToCartHomePage(${best_selling[i].id})" class="cart-hover"><span class="fa-solid fa-cart-shopping"></span></button>`;
        demo += '</div>';
    return demo;
}

// ---------------------------------HIỂN THỊ SẢN PHẨM------------------------------------

function listProducts() {
    for (let i = 0; i < fetured_products.length; i++) {
        let card = createCard(fetured_products, i);
        document.getElementById("fetured_products").innerHTML += card;
    }

    for (let i = 0; i < best_selling.length; i++) {
        let card = createCard_Best(best_selling, i);
        document.getElementById("best-product-content").innerHTML += card;
    }

    // Đảm bảo phần tử HTML myBtn đã tồn tại
    var btn = document.getElementById("myBtn");
    btn.onclick = function() {
        modal.style.display = "block";
    };
}

// -------------------------------------ĐIỀU HƯỚNG-------------------------------
function dieu_huong(page) {
    if (page === 'AboutUs') {
        location.assign("/pages/About.html");
    } else if (page === 'Fashion') {
        location.assign("detailt.html");
    } else if (page === 'Food') {
        location.assign("/FoodPage/boloc.html");
    } else if (page === 'Home') {
        location.assign("/pages/homePage.html");
    }else if (page === 'Cart') {
        location.assign("/Cart/gio.html");
    } else if (page === 'User') {
        location.assign("/pages/profile.html");
    }
    else {
        alert("Trang không tồn tại!");
    }
}

window.onload = function() {
    listProducts();
};


// --------------------------------------MODAL------------------------

var modal = document.getElementById("myModal");
console.log(modal)

var btnBest = document.getElementById("myBtn-best");
console.log(btnBest)

var btnFetured = document.getElementById("myBtn-fetured");
console.log(btnBest)


var span = document.getElementsByClassName("close")[0];

// Khi nhấn nút giỏ hàng thì mở modal ra
document.getElementById("best-product-content").addEventListener("click", function(event) {
    if (event.target && event.target.id === "myBtn-best") {
        modal.style.display = "block";
    }
});
document.getElementById("fetured_products").addEventListener("click", function(event) {
    if (event.target && event.target.id === "myBtn-fetured") {
        modal.style.display = "block";
    }
});

// Tắt modal khi bấm nút x
span.onclick = function() {
  modal.style.display = "none";
}

// Tắt modal khi bấm bất cứ 
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// ----------------------------------------------------GIỎ HÀNG-------------------------------------------------
// Hiển thị ở giỏ hàng

let getData = (key) => {
    const data  = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}
let userData = getData("productInCart")
console.log(userData);
console.log(Array.isArray(userData));
if(userData){
    console.log('Success: true')
}else{
    console.log('Error')
}

function renderProductsToTable(userData, i) {
    const { image, name, quantity, price, quantityBuy } = userData[i]; 
    return `
        <tr class="produc_In_Cart">
            <td class="moldal-detail">
                <img class="moldal-detail-img" src="${image}" alt="">
                <div class="moldal-detail-infor">
                    <p class="modal-product-name">${name}</p>
                    <p class="modal-product-quantity"> Quantity: ${quantity}</p>
                    <p id="remove-product"  data-index="${i}" class="modal-product-remove"><span class="icon-m-content fa-solid fa-xmark"></span> Remove product from cart</p>
                </div>
            </td>
            <td class="price-text">${price}</td>
            <td>
                <button onclick="minusQuantity(${i}, ${quantityBuy})" class="minus-quantity">-</button>
                <span class="mx-2">${quantityBuy}</span>
                <button onclick="plusQuantity(${i})" class="plus-quantity">+</button>
            </td>
            <td class="total-price">${((quantityBuy) * (price.replace(/\./g, ''))).toLocaleString()}</td>
        </tr>
    `;
}

// Hiển thị sản phẩm trong giỏ hàng
function listCart() {
    document.getElementById("product-cart").innerHTML = '';
    
    for (let i = 0; i < userData.length; i++) {
        let card = renderProductsToTable(userData, i);
        document.getElementById("product-cart").innerHTML += card;
    }
}
listCart();

// Tính tổng số lượng sản phẩm có trong giỏ hàng
function totalProduct() {
    document.getElementById("total").innerHTML = userData.length;
}
totalProduct();

// Tổng số tiền cho tất cả sản phẩm
function totalMoney() {
    if (userData.length > 0) {
        let total = 0;
        for (let i = 0; i < userData.length; i++) {
            total += userData[i].quantityBuy * (userData[i].price.replace(/\./g, '')).toLocaleString()
        }

        document.getElementById("total-money").innerHTML = total.toLocaleString();
    }
}
totalMoney();

// Nút + tăng số lượng mua
function plusQuantity(index) {
    userData[index].quantityBuy++;
    localStorage.setItem("productInCart", JSON.stringify(userData));
    listCart();
    totalProduct();
    totalMoney();  
}

// Nút - giảm số lượng mua
function minusQuantity(index, quantityBuy) {
    if (quantityBuy > 1) {
        userData[index].quantityBuy--;
        localStorage.setItem("productInCart", JSON.stringify(userData));
    }
    else {
        alert("Quantity min is 1")
    }
    listCart();
    totalProduct();
    totalMoney(); 
}



// Thêm vào giỏ hàng 
const feturedProducts = JSON.parse(localStorage.getItem('fetured_products')) || [];
const bestSelling = JSON.parse(localStorage.getItem('best_selling')) || [];
products = feturedProducts.concat(bestSelling);

// Thêm sản phẩm vào giỏ hàng 
function addToCartHomePage(id) {
    console.log(id);
    let checkProductInCart = userData.some(value => value.id === id);
    console.log(checkProductInCart);
    if(!checkProductInCart) {
        let pInProduct = products.find(value => value.id ===  id);
        console.log(pInProduct);
        userData.unshift ({
            ...pInProduct,
            quantityBuy: 1
        })
        localStorage.setItem("productInCart", JSON.stringify(userData));
    }else {
        let getIndex = userData.findIndex(value => value.id === id);
        let pInProduct = userData.find(value => value.id === id)
        userData[getIndex] = {
            ...pInProduct,
            quantityBuy: ++pInProduct.quantityBuy
        }
        localStorage.setItem("productInCart", JSON.stringify(userData));
    }
    listCart();
    totalProduct();
    totalMoney();
}

// Xoá sản phẩm khỏi giỏ hàng
function removeProduct(event) {
    // Lấy index từ thuộc tính data-index của phần tử đã nhấn
    const index = event.target.closest('#remove-product').getAttribute('data-index');

    if (userData.length > 0) {
        userData.splice(index, 1);
        localStorage.setItem("productInCart", JSON.stringify(userData));
        if (userData.length == 0) {
            modal.style.display = "none";
        } 
    } else {
        alert("Giỏ hàng của bạn trống!");
    }

    listCart();
    totalProduct();
    totalMoney();
}
document.getElementById("product-cart").addEventListener('click', function(event) {
    if (event.target && event.target.closest('#remove-product')) {
        removeProduct(event);
    }
});

// Lưu vào local storage sản phẩm muốn mua và chuyển sang trang order khi nhấn nút order
function Order() {
    if (userData.length > 0) {
        localStorage.setItem('order', JSON.stringify(userData));
        window.location.href = "/Cart/gio.html";
    } else {
        alert("Giỏ hàng của bạn trống!");
    }
}

