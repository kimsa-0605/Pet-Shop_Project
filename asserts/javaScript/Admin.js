let home_page = 'food';
let foodProducts = JSON.parse(localStorage.getItem('initialProducts')) || [];
let fashionProducts = JSON.parse(localStorage.getItem('fashionProducts')) || [];
let updateProductIndex;

function setCategory(category) {
    home_page = category;
    loadProducts(category);
    document.getElementById('categoryTitle').innerText = `Manage ${setName(category)} Products`;
}
function setName(home_page) {
    return home_page.charAt(0).toUpperCase() + home_page.slice(1);
}
// Tạo ID sản phẩm ngẫu nhiên
function generateRandomID() {
    return Math.floor(Math.random() * 100000);
}

function createTable() {
    document.getElementById('createButton').style.display = 'none';
    document.querySelector('table').style.display = 'none';
    document.getElementById('food1').style.display = 'none';
    document.getElementById('fashion1').style.display = 'none';
    // document.querySelector('.side_bar').style.marginTop = '-10px';


}
function menu() {
    document.getElementById('createButton').style.display = 'none';
    document.getElementById('food1').style.display = 'block';
    document.querySelector('.side_bar').style.marginBottom = '70px';
    document.getElementById('fashion1').style.display = 'block';

    const table = document.querySelector('table');
    table.style.display = 'table';
    table.style.width = '100%';
}
function createTable1() {
    document.getElementById('createButton').style.display = 'block';
    document.querySelector('table').style.display = 'block';
    document.getElementById('food1').style.display = 'block';
    const table = document.querySelector('table');
    table.style.display = 'table';
    table.style.width = '100%';
}
fashion1.addEventListener("click", () => {
    fashion1.classList.add('manager_food');
    food1.classList.remove('manager_food');
    loadProducts('fashion');
});
food1.addEventListener("click", () => {
    food1.classList.add('manager_food');
    fashion1.classList.remove('manager_food');
    loadProducts('food');
});

function setActive(element) {
    const elements = [products_manager1, manager_user1, manager_order1, setting];
    elements.forEach(e => {
        if (e === element) {
            e.classList.add('products_manager');
        } else {
            e.classList.remove('products_manager');
        }
    });
}
// Thêm sự kiện cho các phần tử
products_manager1.addEventListener("click", () => setActive(products_manager1));
manager_user1.addEventListener("click", () => setActive(manager_user1));
manager_order1.addEventListener("click", () => setActive(manager_order1));
setting.addEventListener("click", () => setActive(setting));
// Thêm sản phẩm
const sideBars = document.querySelectorAll('.side_bar:first-child');
sideBars.forEach(sideBar => {
    sideBar.style.marginBottom = '70px'; // Thay đổi margin-bottom cho mỗi side_bar
});
function addProduct() {
    const name = document.getElementById('PName').value;
    const image = document.getElementById('PImage').files[0];
    const price = document.getElementById('pPrice').value;

    if (!name || !image || !price) {
        alert('Please fill all fields!');
        return;
    }

    const reader = new FileReader();
    reader.onloadend = function () {
        const product = {
            id: generateRandomID(),
            name,
            image: reader.result,
            price
        };

        if (home_page === 'food') {
            foodProducts.push(product);
            localStorage.setItem('initialProducts', JSON.stringify(foodProducts));
        } else {
            fashionProducts.push(product);
            localStorage.setItem('fashionProducts', JSON.stringify(fashionProducts));
        }

        loadProducts(home_page);
        closeAddProductForm();
        // document.querySelector('.side_bar').style.marginBottom = '70px';

    };

    reader.readAsDataURL(image);
}

// Hiển thị form thêm sản phẩm
function showAddProductForm() {
    document.querySelector('.addProducts').style.display = 'block';
}

// Đóng form thêm sản phẩm
function closeAddProductForm() {
    document.querySelector('.addProducts').style.display = 'none';
    document.getElementById('PName').value = '';
    document.getElementById('PImage').value = '';
    document.getElementById('pPrice').value = '';
}

// Hiển thị form cập nhật sản phẩm
function showUpdateProductForm(index) {
    const product = home_page === 'food' ? foodProducts[index] : fashionProducts[index];
    document.getElementById('name').value = product.name;
    document.getElementById('updateImage').value = '';
    document.getElementById('price').value = product.price;
    updateProductIndex = index;
    document.querySelector('.upload-products').style.display = 'block';
}

// Đóng form cập nhật sản phẩm
function closeUpdateProductForm() {
    document.querySelector('.upload-products').style.display = 'none';
}

function updateProduct() {
    const name = document.getElementById('name').value;
    const image = document.getElementById('updateImage').files[0];
    const price = document.getElementById('price').value;

    if (!name || !image || !price) {
        alert('Please fill all fields!');
        return;
    }

    const reader = new FileReader();
    reader.onloadend = function () {
        const oldProduct = home_page === 'food' ? foodProducts[updateProductIndex] : fashionProducts[updateProductIndex];

        const product = {
            id: oldProduct.id, // Giữ nguyên ID cũ
            name,
            image: reader.result,
            price
        };

        if (home_page === 'food') {
            foodProducts[updateProductIndex] = product;
            localStorage.setItem('initialProducts', JSON.stringify(foodProducts)); // Cập nhật đúng tên key
        } else {
            fashionProducts[updateProductIndex] = product;
            localStorage.setItem('fashionProducts', JSON.stringify(fashionProducts));
        }

        loadProducts(home_page);
        closeUpdateProductForm();
    };

    reader.readAsDataURL(image);
}

// Xóa sản phẩm
function deleteProduct(index) {
    const products = confirm('Are you sure you want to delete this product?');
    if (products) {
        if (home_page === 'food') {
            foodProducts.splice(index, 1);
            localStorage.setItem('foodProducts', JSON.stringify(foodProducts));
        } else {
            fashionProducts.splice(index, 1);
            localStorage.setItem('fashionProducts', JSON.stringify(fashionProducts));
        }
        loadProducts(home_page);
    }
}

// Tải sản phẩm từ localStorage
function loadProducts(category) {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = ''; // Xóa nội dung cũ

    const products = category === 'food' ? foodProducts : fashionProducts;

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;"></td>
            <td>${product.price}</td>
            <td>
                
                 <button class="update" onclick="showUpdateProductForm(${index})"><i class="fa-solid fa-wrench"></i></button>
                <button class="delete"onclick="deleteProduct(${index})"><i class="fa-solid fa-trash"></i></button>
        `;
        tbody.appendChild(row);
    });
}
