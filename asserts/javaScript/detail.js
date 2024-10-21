let products = [];
// Hàm lấy tham số từ URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// ---------------------------HIỂN THỊ SẢN PHẨM CHI TIẾT-----------------------------------
function displayProductDetail() {
    const code = getQueryParam('code');
    console.log(code);
    const feturedProducts = JSON.parse(localStorage.getItem('fetured_products')) || [];
    console.log(feturedProducts);
    const bestSelling = JSON.parse(localStorage.getItem('best_selling')) || [];
    console.log(bestSelling);

    console.log(Array.isArray(feturedProducts)); // Kiểm tra xem có phải là mảng không
    console.log(Array.isArray(bestSelling));

    products = feturedProducts.concat(bestSelling);
    console.log(products);

    const product = products.find(p => p.id === parseInt(code));
    console.log(product);

    if (product) {
        const productDetail = document.getElementById('detail-product');
        productDetail.innerHTML = `
        <div id="detail-product">
            <p class="title-detail-product">Product details</p>
            <div class="detail-p">
                <img src="${product.image}" id="image" alt="Products_img">
                <div class="detailt">
                    <p class="title-p">${product.name}</p>
                    <p class="quantity">Quantity: ${product.quantity}</p>
                    <p class="price">${product.price} VNĐ</p>

                    <div class="quantity-container">
                        <button onclick="minusQuantityDetail()" class="decrease-btn">-</button>
                        <span id="quantity-display" class="mx-2">${currentQuantity}</span>
                        <button onclick="plusQuantityDetail()" class="increase-btn">+</button>
                    </div>
                    
                    <div class="button-detail">
                        <button class="cart" onclick="addToCart(${product.id})"> Add to cart</button>
                        <button id="buyNow" class="buy" onclick="buyNow(${product.id})">Buy now</button>
                    </div>
                    <div class="share"> 
                        <p> Share: </p>
                        <i class="fa-brands fa-square-facebook"></i>
                        <i class="fa-brands fa-square-google-plus"></i>
                    </div>
                </div>
            </div>
            <div class="produc-infor">
                <p class="title-infor">Product information</p>
                <hr>
                <p class="p-infor">
                    ${product.description}
                </p>
            </div>
        </div>
        `;
    } else {
        console.error('Sản phẩm không tồn tại');
    }
}

//------------------------------Tăng giảm sl sản phẩm------------------
// Tăng giảm số lượng sản phẩm mua
let currentQuantity = 1;

function plusQuantityDetail() {
    currentQuantity++;
    document.getElementById("quantity-display").innerText = currentQuantity;
}

function minusQuantityDetail() {
    if (currentQuantity > 1) {
        currentQuantity--;
    } else {
        alert("Quantity min is 1");
    }
    document.getElementById("quantity-display").innerText = currentQuantity;
}

// ---------------------------THÊM VÀO GIỎ HÀNG-----------------------

const userID = localStorage.getItem("userID");
let getDataInCart = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}
let userDataInCart = getDataInCart("productInCart")
console.log(userDataInCart);
console.log(Array.isArray(userDataInCart));
if (userDataInCart) {
    console.log('Success: true')
} else {
    console.log('Error')
}

function addToCart(id) {
    console.log(id);
    let checkProduct = userDataInCart.some(value => value.id === id);
    console.log(checkProduct);
    if (!checkProduct) {
        let pInProduct = products.find(value => value.id === id);
        console.log(pInProduct);
        userDataInCart.unshift({
            ...pInProduct,
            quantityBuy: currentQuantity,
            userID: userID
        })
        localStorage.setItem("productInCart", JSON.stringify(userDataInCart));
    } else {
        let getIndex = userDataInCart.findIndex(value => value.id === id);
        let pInProduct = userDataInCart.find(value => value.id === id)
        userDataInCart[getIndex] = {
            ...pInProduct,
            quantityBuy: ++pInProduct.quantityBuy,
            userID: userID
        }
        localStorage.setItem("productInCart", JSON.stringify(userDataInCart));
    }
    alert("Product added to cart.");
}



// Hàm lấy sản phẩm từ local Storage
function getProductFromLocalStorage() {
    const products = JSON.parse(localStorage.getItem('products'));
    console.log(products);
    return products ? products : [];
}

// Hiển thị chi tiết sản phẩm khi trang được tải
document.addEventListener('DOMContentLoaded', displayProductDetail);



// --------------------------BUY NOW------------------------------------------
function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const orderDetails = {
            ...product,
            userID: userID
        };
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
        window.location.href = "/pages/cartt.html";
    } else {
        console.error('The product does not exist.');
    }
}