const wrapper = document.querySelector('.wrapper');
const btnPopup = document.querySelector('.btnLogin-popup');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const iconCross = document.querySelector('.icon-close');
// Khi nhấn vào nút Login, hiển thị form bằng cách thêm class 'active'
btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

// Khi nhấn vào link đăng ký, cũng hiển thị form đăng ký bằng cách thêm class 'active'
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

// Khi nhấn vào link đăng nhập, trở lại form đăng nhập bằng cách thêm class 'active'
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

iconCross.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});


// Part of Login and Register

// Register form
const registerForm = document.querySelector('#register-form')

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Lấy danh sách người dùng từ localStorage
    const userLocal = JSON.parse(localStorage.getItem('user')) || [];

    // name
    const nameValue = document.querySelector('#name-register').value;

    // email
    const emailValue = document.querySelector('#email-register').value;

    // Check if the user already exists
    const exits = userLocal.find(user => user.email === emailValue);
    if (exits) {
        alert('User already has an account! Please Log in.');
        return;
    }

    // password
    const passwordValue = document.querySelector('#password-register').value;
    if (passwordValue.length < 8) {
        alert('Please enter a strong password (at least 8 characters)');
        return;
    }

    // Create userID
    const userId = `user-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    const user = {
        id: userId,
        name: nameValue,
        email: emailValue,
        password: passwordValue,
    };

    // Add new user to the list
    let users = JSON.parse(localStorage.getItem('user')) || [];
    users.push(user);
    localStorage.setItem('user', JSON.stringify(users));

    console.log('Saved Users:', JSON.parse(localStorage.getItem('user'))); // Log stored users

    alert('Registration successful!');

    // Xóa dữ liệu form đăng ký
    document.querySelector('#name-register').value = '';
    document.querySelector('#email-register').value = '';
    document.querySelector('#password-register').value = '';

    // Chuyển sang form đăng nhập
    loginLink.click(); // Giả lập nhấp vào link đăng nhập
});


//Create account for Admin
const Admin = {
    email: 'hanhkx12@gmail.com',
    password: 'hanhkx12#'
}

// Login form   
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('user')) || [];

    // Lấy email và password từ form đăng nhập
    const email = document.querySelector('#email-login').value;
    const password = document.querySelector('#password-login').value;

    // Kiểm tra người dùng có phải admin không
    if (email === Admin.email && password === Admin.password) {
        window.location.href = '../../pages/homePage.html';
        return;
    }

    // Tìm kiếm người dùng trong danh sách
    const foundUser = users.find(user => user.email === email);
    //Lưu Id của người đang tương tác
    localStorage.setItem('userID', foundUser.id)

    if (!foundUser) {
        alert('User not found');
        return;
    }

    if (foundUser.password !== password) {
        alert('Incorrect Password');
        return;
    }

    document.querySelector('#email-register').value = '';
    document.querySelector('#password-register').value = '';

    // Đăng nhập thành công
    alert('Login successfully!');
    window.location.href ='/pages/homePage.html';
});

//Password convinience

const eyeOff = document.querySelector('#eye-off');
const passwordInput = document.querySelector('#password-login');
eyeOff.addEventListener('click', () => {
    const icon = eyeOff.querySelector('ion-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.setAttribute('name', 'eye'); 
    } else {
        passwordInput.type = 'password';
        icon.setAttribute('name', 'eye-off');
    }
});

const eyeOffRegister = document.querySelector('#eye-register');
const passwrodRegister = document.querySelector('#password-register')
eyeOffRegister.addEventListener('click', () => {
    const icon = eyeOffRegister.querySelector('ion-icon');
    
    if (passwrodRegister.type === 'password') {
        passwrodRegister.type = 'text';
        icon.setAttribute('name', 'eye'); 
    } else {
        passwrodRegister.type = 'password';
        icon.setAttribute('name', 'eye-off');
    }
    
});