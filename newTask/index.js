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

    //name
    const nameValue = document.querySelector('#name-register').value;
    //email
    const emailValue = document.querySelector('#email-register').value;
    //password
    const passwordValue = document.querySelector('#password-register').value;

    const user = {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
    };

    // Save user in localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Retrieve the saved user and log it
    const savedUser = JSON.parse(localStorage.getItem('user'));
    console.log(savedUser); // Kiểm tra dữ liệu được lưu trữ
    alert('Registration successfully!');

    // Remove data after register
    document.querySelector('#name-register').value = '';
    document.querySelector('#email-register').value = '';
    document.querySelector('#password-register').value = '';
});

// Login form
const loginForm = document.querySelector('#login-form')

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = localStorage.getItem('user')
    //email
    const email = document.querySelector('#email-login').value
    //password
    const password = document.querySelector('#password-login').value

    //Check condition
    if(user){
        const parsedUser = JSON.parse(user)
        if(parsedUser.email != email){
            alert('Email is wrong')
            return;
        }
        if(parsedUser.password != password){
            alert('Incorrect Password')
            return;
        }
        window.location.href = '../Header/Header.html';
    }else{
        alert('User not found')
    }
} )

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



