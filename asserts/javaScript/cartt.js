function showCartItem() {
    const userId = localStorage.getItem('userID'); // Lấy ID của người dùng hiện tại
    let productInCart = localStorage.getItem('productInCart') ? JSON.parse(localStorage.getItem('productInCart')) : [];
    
    // Lọc sản phẩm theo userID
    productInCart = productInCart.filter(value => value.userId === userId);

    let HTML = '';
    let totalPrice = 0;
    let totalQuantity = 0;

    if (productInCart .length === 0) {
        // Hiển thị thông điệp khi giỏ hàng trống
        HTML = `
            <tr>
                <td colspan="5" style="text-align: center; font-size: 18px; padding: 20px;">
                    No products available. <a href=".homePage.html">Return to store</a> to continue shopping.
                </td>
            </tr>`;
    } else {
        // Tạo HTML cho các mặt hàng trong giỏ hàng.
        productInCart.forEach(value => {
            let itemTotal = parseFloat(value.price.replace(/,/g, '')) * value.quantity; // Loại bỏ dấu phẩy và chuyển thành số

            HTML += `
                <tr>
                    <td class="product-name">
                        <img src="${value.image}" alt="${value.name}" />
                        <span>${value.name}</span>
                    </td>
                    <td>${value.price.toLocaleString()}VNĐ</td>
                    <td>
                        <button onclick="decreaseQuantity(${value.id})">-</button>
                        ${value.quantityBuy}
                        <button onclick="increaseQuantity(${value.id})">+</button>
                    </td>
                    <td>${itemTotal.toLocaleString()}VNĐ</td>
                    <td>
                        <i class="far fa-trash-alt btn-remove" onclick="removeProduct(${value.id})"></i>
                    </td>
                </tr>`;
            totalPrice += itemTotal;
            totalQuantity += value.quantityBuy; // Sửa từ item.quantity thành value.quantity

        });
    }

    document.getElementById('cart-items').innerHTML = HTML;
    document.getElementById('total-price').textContent = totalPrice.toLocaleString() + 'VNĐ';
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
    showCartItem(); // Cập nhật lại giỏ hàng hiển thị
    
}

function decreaseQuantity(id) {
    let productInCart = JSON.parse(localStorage.getItem('productInCart')) || [];

    productInCart =productInCart.map(value => {
        if (value.id === id && value.quantityBuy > 1) { // Đảm bảo số lượng không giảm dưới 1
            value.quantityBuy -= 1;
        }
        return value;
        
    });
    localStorage.setItem('productInCart', JSON.stringify(productInCart));
    showCartItem(); // Cập nhật lại giỏ hàng hiển thị
}

// Delete cart
function removeProduct(id) {
    let productInCart = JSON.parse(localStorage.getItem('productInCart')) || [];

    productInCart = productInCart.filter(value => value.id !== id); // Loại bỏ sản phẩm khỏi giỏ hàng
    localStorage.setItem('productInCart', JSON.stringify(productInCart)); // Cập nhật lại localStorage
    showCartItem(); // Cập nhật lại giỏ hàng hiển thị
}

function saveOrder() {
    const userId = localStorage.getItem('userID');
    let productInCart = JSON.parse(localStorage.getItem('productInCart')) || [];

    const userCart = productInCart.filter(value => value.userId === userId);

    if (userCart.length === 0) {
        alert('Cart is empty! Please add products before checking out.');
        return;
    }


    localStorage.setItem('orderDetails', JSON.stringify(userCart));

    // Xóa sản phẩm của người dùng khỏi giỏ hàng sau khi đặt hàng thành công
    productInCart = productInCart.filter(value => value.userId !== userId);
    localStorage.setItem('productInCart', JSON.stringify(productInCart));

    window.location.href = './homepage.html';
}

showCartItem();  // Gọi hàm để hiển thị giỏ hàng khi trang được tải
