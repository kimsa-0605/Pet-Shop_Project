function showCartItem() {
    const userId = localStorage.getItem('userID'); // Lấy ID của người dùng hiện tại
    let productInCart = localStorage.getItem('productInCart') ? JSON.parse(localStorage.getItem('productInCart')) : [];

    // Lọc sản phẩm theo userID
    productInCart = productInCart.filter(value => value.userID === userId);

    let HTML = '';
    let totalPrice = 0;
    let totalQuantity = 0;

    if (productInCart.length === 0) {
        HTML = `
            <tr>
                <td colspan="5" style="text-align: center; font-size: 18px; padding: 20px;">
                    No products available. <a href="./homePage.html">Return to store</a> to continue shopping.
                </td>
            </tr>`;
    } else {
        productInCart.forEach(value => {
            let itemTotal = parseFloat(value.price.replace(/,/g, '')) * value.quantityBuy; // Loại bỏ dấu phẩy và chuyển thành số
            
            HTML += `
                <tr>
                    <td class="product-name">
                        <img src="${value.image}" alt="${value.name}" />
                        <span>${value.name}</span>
                    </td>
                    <td>${formatPrice(value.price)} VNĐ</td>
                    <td>
                        <button onclick="decreaseQuantity(${value.id})">-</button>
                        ${value.quantityBuy}
                        <button onclick="increaseQuantity(${value.id})">+</button>
                    </td>
                    <td id="item-total-${value.id}">${formatPrice(itemTotal)} VNĐ</td>
                    <td>
                        <i class="far fa-trash-alt btn-remove" onclick="removeProduct(${value.id})"></i>
                    </td>
                </tr>`;
            
            totalPrice += itemTotal;
            totalQuantity += value.quantityBuy;
        });
    }

    document.getElementById('cart-items').innerHTML = HTML;
    document.getElementById('total-price').textContent = formatPrice(totalPrice) + ' VNĐ';
    document.getElementById('total-quantity').textContent = totalQuantity;
}


// Tăng giảm số lượng sẽ thay đổi tổng

function increaseQuantity(id) {
    let productInCart = JSON.parse(localStorage.getItem('productInCart')) || [];

    productInCart = productInCart.map(value => {
        if (value.id === id) {
            value.quantityBuy += 1;
        }
        return value;
    });

    localStorage.setItem('productInCart', JSON.stringify(productInCart));
    showCartItem(); // Cập nhật lại giao diện
}

function decreaseQuantity(id) {
    let productInCart = JSON.parse(localStorage.getItem('productInCart')) || [];

    productInCart = productInCart.map(value => {
        if (value.id === id) {
            if (value.quantityBuy > 1) {
                value.quantityBuy -= 1;
            } else {
                alert('No further reduction possible. Minimum quantity is 1.');
            }
        }
        return value;
    });

    localStorage.setItem('productInCart', JSON.stringify(productInCart));
    showCartItem(); // Cập nhật lại giao diện
}

// Delete cart
function removeProduct(id) {
    let productInCart = JSON.parse(localStorage.getItem('productInCart')) || [];

    productInCart = productInCart.filter(value => value.id !== id); // Loại bỏ sản phẩm khỏi giỏ hàng
    localStorage.setItem('productInCart', JSON.stringify(productInCart)); // Cập nhật lại localStorage
    showCartItem(); // Cập nhật lại giỏ hàng hiển thị
}

// Hàm định dạng giá
function formatPrice(price) {
    return (parseFloat(price) * 1000).toLocaleString('de-DE'); // Nhân giá với 1000 và định dạng dấu "." cho hàng nghìn
}


function saveOrder() {
    const userId = localStorage.getItem('userID');
    let productInCart = JSON.parse(localStorage.getItem('productInCart')) || [];

    const userCart = productInCart.filter(value => value.userID === userId);

    if (userCart.length === 0) {
        alert('Cart is empty! Please add more products.');
        return;
    }

    // Lưu giỏ hàng tạm thời cho quá trình thanh toán
    localStorage.setItem('orderDetails', JSON.stringify(userCart));

    // Chuyển đến trang thanh toán
    window.location.href = './order.html';
}


showCartItem();  // Gọi hàm để hiển thị giỏ hàng khi trang được tải
