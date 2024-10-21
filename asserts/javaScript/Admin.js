let IDProduct = 1;
let home_page = 'food'; // đạt giá trị mặc định cho trang chulà food 
let foodProducts = JSON.parse(localStorage.getItem('foodProducts')) || [];
let fashionProducts = JSON.parse(localStorage.getItem('fashionProducts')) || [];
let Update_new_products;
let foodID = 1;
let fashionID = 1;

window.onload = function () {
    loadProducts(home_page);
}
// Để phân biệt người dùng đang bấm vào đâu trong manager products
function setCategory(category) {
    home_page = category;
    loadProducts(category);
    document.getElementById('categoryTitle').innerText = `Manage ${SetName(category)} Products`;
}

function loadProducts(category) {
    const products = category === 'food' ? foodProducts : fashionProducts;
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';

    // lọc ra từng phần tử 
    products.forEach((product, index) => {
        const row = document.createElement('tr'); // tạo một tr mới 
        row.innerHTML = `
        <td>${product.id}</td>
            <td>${product.name}</td>
            <td><img src="${product.image}" alt="${product.name}" width="50"></td>
            <td>${product.price}</td>
            <td>
                <button class="update" onclick="showUpdateProductForm(${index})"><i class="fa-solid fa-wrench"></i></button>
                <button class="delete"onclick="deleteProduct(${index})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function showAddProductForm() {
    document.querySelector('.addProducts').style.display = 'block';
}

function closeAddProductForm() {
    document.querySelector('.addProducts').style.display = 'none';
    document.getElementById('PName').value = '';
    document.getElementById('PImage').value = '';
    document.getElementById('pPrice').value = '';
}

function addProduct() {
    const name = document.getElementById('PName').value;
    const price = document.getElementById('pPrice').value;
    const image = document.getElementById('PImage').files[0];

    // kiểm tra xem đã ddienf đủ thông tin chưa
    if (name && price && image) {
        const reader = new FileReader(); // tạo một dối tượng mới đẻ người đọc lấy ảnh từ file trong máy 
        reader.onload = function (element ) {
            const newProduct = {
                id: home_page === 'food' ? foodID++: fashionID++,
                name: name,
                image: element.target.result,
                price: price,
            };

            if (home_page === 'food') {
                foodProducts.push(newProduct);
                localStorage.setItem('foodPc roducts', JSON.stringify(foodProducts));
            } else {
                fashionProducts.push(newProduct);
                localStorage.setItem('fashionProducts', JSON.stringify(fashionProducts));
            }
            loadProducts(home_page);
            closeAddProductForm();
        };
        reader.readAsDataURL(image);
    } else {
        alert('Please fill all fields.');
    }
}

// hiển thị form cập nhật sản phẩm 
function showUpdateProductForm(index) {
    const products = home_page === 'food' ? foodProducts : fashionProducts;
    const product = products[index];

    Update_new_products = index;
    document.getElementById('name').value = product.name;
    document.getElementById('price').value = product.price;

    document.querySelector('.upload-products').style.display = 'block';
}
// đíng form của sản phẩm
function closeUpdateProductForm() {
    document.querySelector('.upload-products').style.display = 'none';
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
}

function updateProduct() {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('updateImage').files[0];

    const products = home_page === 'food' ? foodProducts : fashionProducts;

    if (image) {
        const reader = new FileReader();
        reader.onload = function (e) {
            products[Update_new_products] = {
                id: products[Update_new_products].id,
                name: name || products[Update_new_products].name,
                image: e.target.result || products[Update_new_products].image,
                price: price || products[Update_new_products].price,
            };

            localStorage.setItem(home_page === 'food' ? 'foodProducts' : 'fashionProducts', JSON.stringify(products));
            loadProducts(home_page);
            closeUpdateProductForm();
        };
        reader.readAsDataURL(image);
    } else {
        products[Update_new_products].name = name || products[Update_new_products].name;
        products[Update_new_products].price = price || products[Update_new_products].price;

        localStorage.setItem(home_page === 'food' ? 'foodProducts' : 'fashionProducts', JSON.stringify(products));
        loadProducts(home_page);
        closeUpdateProductForm();
    }
}

// xóa sản phẩm ra khỏi local thực hiện xoa tren form icon
function deleteProduct(index) {
    const products = home_page === 'food' ? foodProducts : fashionProducts;
    products.splice(index, 1);
    localStorage.setItem(home_page === 'food' ? 'foodProducts' : 'fashionProducts', JSON.stringify(products));
    loadProducts(home_page);
}

function SetName(string) {
    // lấy ksi tự đầu tiên và viết hoa sau đó cộng kí tự bắt đầu là 1 food hoạc fashion
    return string.charAt(0).toUpperCase() + string.slice(1);
}


//Quản lý người dùng

const manageUser = document.querySelector('.users');

manageUser.addEventListener('click', ()=> {
    
})


// Hanh Part
// Hàm để hiển thị nội dung tương ứng
function showContent(sectionId) {
    // Ẩn tất cả các khối nội dung
    document.querySelectorAll('.content > div').forEach(div => {
        div.classList.add('hidden');
    });
    
    // Hiển thị nội dung được chọn
    document.getElementById(sectionId).classList.remove('hidden');
    
    // Nếu là quản lý người dùng, thì tải danh sách người dùng
    if (sectionId === 'user-management') {
        loadUsers();
    }else if (sectionId === 'order-management'){
        loadOrders();
    }
}
    
// Hàm để tải danh sách người dùng từ localStorage

// USERS
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('user')) || [];
    console.log(users)
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = ''; // Xóa dữ liệu cũ

    users.forEach(user => {
        const row = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role || 'User'}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}
    
// Hiển thị mặc định phần quản lý người dùng khi load trang
showContent('user-management');

function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const tableBody = document.getElementById('orderTableBody');
    tableBody.innerHTML = ''; // Xóa dữ liệu cũ

    // Nhóm sản phẩm theo userID và cộng dồn số lượng nếu trùng sản phẩm
    const groupedOrders = {};

    orders.forEach(order => {
        order.products.forEach(product => {
            const userID = product.userID;

            // Khởi tạo thông tin nếu chưa có sản phẩm của userID
            if (!groupedOrders[userID]) {
                groupedOrders[userID] = {
                    buyer: order.buyer,
                    products: {},
                };
            }

            // Kiểm tra nếu sản phẩm đã tồn tại trong danh sách
            const productKey = `${product.name}-${product.price}`; // Khóa duy nhất cho sản phẩm
            if (groupedOrders[userID].products[productKey]) {
                // Nếu đã tồn tại, cộng thêm số lượng
                groupedOrders[userID].products[productKey].quantity += product.quantity;
            } else {
                // Nếu chưa tồn tại, thêm sản phẩm mới
                groupedOrders[userID].products[productKey] = {
                    ...product,
                    orderID: order.id,
                    orderDate: order.orderDate,
                };
            }
        });
    });

    // Hiển thị các đơn hàng sau khi nhóm và cộng dồn
    Object.values(groupedOrders).forEach(group => {
        // Tạo hàng cho thông tin người mua
        const buyerRow = `
            <tr>
                <td colspan="6"><strong>Buyer: ${group.buyer.name}</strong></td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', buyerRow);

        // Hiển thị từng sản phẩm sau khi cộng dồn
        Object.values(group.products).forEach(product => {
            const totalPrice = (product.quantity * product.price).toFixed(3); // Giữ 3 số sau dấu thập phân
            const productRow = `
                <tr>
                    <td>${product.orderID || 'N/A'}</td>
                    <td>${product.orderDate || 'N/A'}</td>
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                    <td>${totalPrice}</td>
                    <td>${group.buyer.address}</td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', productRow);
        });
    });
}
