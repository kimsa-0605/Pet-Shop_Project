


let userDataUser = localStorage.getItem('userID');
console.log(userDataUser);


const user = JSON.parse(localStorage.getItem('user')) || [];
console.log(user);

const getDataUser = user.find(u => u.id === userDataUser);
console.log(getDataUser);

// Start Hiển thị profile
const avatarInfor = document.getElementById("avatar-infor");
const profileContainer = document.getElementById("content-profile");
const viewProfileItem = document.getElementById("viewProfileItem");
const updateProfileItem = document.getElementById("updateProfileItem");
if (getDataUser) {
    function displayViewProfile() {
        profileContainer.innerHTML = `
            <div class="infor-profile">
                <div class="infor-p-content-container">
                    <p class="infor-p-content">User name:</p>
                    <p class="infor-p-content-result" style="${getDataUser.name ? '' : 'color: gray; font-style: italic;'}">
                        ${getDataUser.name || "Information not updated yet"}
                    </p>
                </div>
                <div class="infor-p-content-container">
                    <p class="infor-p-content">Name:</p>
                    <p class="infor-p-content-result" style="${getDataUser.fullName ? '' : 'color: gray; font-style: italic;'}">
                        ${getDataUser.fullName || "Information not updated yet"}
                    </p>
                </div>
                <div class="infor-p-content-container">
                    <p class="infor-p-content">Email:</p>
                    <p class="infor-p-content-result" style="${getDataUser.email ? '' : 'color: gray; font-style: italic;'}">
                        ${getDataUser.email || "Information not updated yet"}
                    </p>
                </div>
                <div class="infor-p-content-container">
                    <p class="infor-p-content">Phone number:</p>
                    <p class="infor-p-content-result" style="${getDataUser.phoneNumber ? '' : 'color: gray; font-style: italic;'}">
                        ${getDataUser.phoneNumber || "Information not updated yet"}
                    </p>
                </div>
                <div class="infor-p-content-container">
                    <p class="infor-p-content">Gender:</p>
                    <p class="infor-p-content-result" style="${getDataUser.gender ? '' : 'color: gray; font-style: italic;'}">
                        ${getDataUser.gender || "Information not updated yet"}
                    </p>
                </div>
                <div class="infor-p-content-container">
                    <p class="infor-p-content">Birth:</p>
                    <p class="infor-p-content-result" style="${getDataUser.birth ? '' : 'color: gray; font-style: italic;'}">
                        ${getDataUser.birth || "Information not updated yet"}
                    </p>
                </div>
            </div>
            <div class="avatar-image">
                <div class="a-image-content">
                    <img src="${getDataUser.image || '/asserts/image/avatar.jpg'}" alt="User Avatar">
                </div>
                <p class="name-User-profile"><b>${getDataUser.fullName}</b></p>
            </div>
        `;
    }    



    function displayUpdateProfile() {
        profileContainer.innerHTML = `
            <div class="infor-profile">
                <div class="infor-p-content-container">
                    <p class="infor-p-content">User name:</p>
                    <p class="infor-p-content-result"><input type="text" id="username" value="${getDataUser.name || ""}" class="input-form"></p>
                </div>
                <div class="infor-p-content-container">
                    <p class="infor-p-content">Name:</p>
                    <p class="infor-p-content-result"><input type="text" id="name" value="${getDataUser.fullName || ""}" class="input-form"></p>
                </div>
                <div class="infor-p-content-container">
                    <p class="infor-p-content">Email:</p>
                    <p class="infor-p-content-result"><input type="text" id="email" value="${getDataUser.email || ""}" class="input-form"></p>
                </div>
                <div class="infor-p-content-container">
                    <p class="infor-p-content">Phone number:</p>
                    <p class="infor-p-content-result"><input type="text" id="phoneNumber" value="${getDataUser.phoneNumber || ""}" class="input-form"></p>
                </div>
                <div class="infor-p-content-container">
                    <p class="infor-p-content">Gender:</p>
                    <p id="choose" class="infor-p-content-result">
                        <input type="radio" id="male" name="gender" value="Male" ${getDataUser.gender === 'Male' ? 'checked' : ''}>
                        <label for="male">Male</label><br>
                        <input type="radio" id="female" name="gender" value="Female" ${getDataUser.gender === 'Female' ? 'checked' : ''}>
                        <label for="female">Female</label><br>
                        <input type="radio" id="other" name="gender" value="Other" ${getDataUser.gender === 'Other' ? 'checked' : ''}>
                        <label for="other">Other</label>
                    </p>
                </div>
                <div class="infor-p-content-container">
                    <label class="infor-p-content" for="birthdate">Birth Date:</label>
                    <p class="infor-p-content"><input  type="date" id="birthdate" name="birthdate" value="${getDataUser.birth || ''}" class="input-form"> </p>                              
                </div>
            </div>
            <div class="avatar-image">
                <div class="a-image-content">
                    <img src="${getDataUser.image || '/asserts/image/avatar.jpg'}" alt="User Avatar">
                </div>
                <input type="file" id="imageInput" style="display: none;">
                <button type="button" class="change-image" onclick="document.getElementById('imageInput').click();">
                    <i class="fa-solid fa-camera"></i>
                </button>
            </div>
            <button onclick="Save()" class="save">Save</button>
        `;
        function Save(event) {
            event.preventDefault();
        
            // Lấy giá trị từ các input
            const updatedUser = {
                id: userDataUser, 
                name: document.getElementById('username').value || "",
                fullName: document.getElementById('name').value || "",
                email: document.getElementById('email').value || "",
                phoneNumber: document.getElementById('phoneNumber').value || "", 
                gender: document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : "", 
                birth: document.getElementById('birthdate').value || "",
                image: getDataUser.image || '' 
            };
        
            // Cập nhật thông tin người dùng trong mảng user
            const updatedUserList = user.map(u => 
                u.id === userDataUser ? { ...u, ...updatedUser } : u
            );
            localStorage.setItem('user', JSON.stringify(updatedUserList));
        
            // Cập nhật thông tin trong giao diện View Profile ngay lập tức
            getDataUser.name = updatedUser.name;
            getDataUser.fullName = updatedUser.fullName;
            getDataUser.email = updatedUser.email;
            getDataUser.phoneNumber = updatedUser.phoneNumber;
            getDataUser.gender = updatedUser.gender;
            getDataUser.birth = updatedUser.birth;
            getDataUser.image = updatedUser.image;
            
            displayAvatarInfor();
            displayViewProfile();
            alert('Profile information updated successfully.');
        }
        
        // Thêm sự kiện cho nút Save
        document.querySelector('.save').onclick = function(event) {
            Save(event);
        };
        
        // Sự kiện thay đổi ảnh
        document.querySelector('.change-image').addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định
            document.getElementById('imageInput').click();
        });
        document.getElementById('imageInput').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const base64Image = e.target.result;  
                    document.querySelector('.a-image-content img').src = base64Image;  
                    getDataUser.image = base64Image; 
                };
                reader.readAsDataURL(file);  
            }
        });
        
        
        
    }
    function displayAvatarInfor() {
        avatarInfor.innerHTML = `
            <div class="image-avatar">
                <img src="${getDataUser.image || '/asserts/image/avatar.jpg'}" alt="User Avatar">
            </div>
            <div class="a-infor">
                <p class="p-username">${getDataUser.name || 'Information not updated yet'}</p>
                <p id="updateInfor"><span class="fa-solid fa-pencil"></span> Update profile</p>
            </div>
        `;
    }
    displayAvatarInfor();
}



viewProfileItem.addEventListener("click", () => {
    viewProfileItem.classList.add("p-view");
    updateProfileItem.classList.remove("p-view");
    displayViewProfile();
});

// Hàm hiển thị ra bảng cập nhật
function renderUpdate(){
    updateProfileItem.classList.add("p-view");
    viewProfileItem.classList.remove("p-view");
    displayUpdateProfile();
    console.log("update was clicked!");
}

updateProfileItem.addEventListener("click", renderUpdate);
let update = document.getElementById('updateInfor');
console.log("This is update", update);
update.addEventListener("click", renderUpdate);
window.onload = function() {
    viewProfileItem.classList.add("p-view");
    updateProfileItem.classList.remove("p-view");
    displayViewProfile();
    displayAvatarInfor();
};
// End hiển thị profile


// Satrt Modal logout
var modal = document.getElementById("logout-modal");
var btn = document.getElementById("logout");
var closeLogout = document.getElementsByClassName("close-logout")[0];

btn.onclick = function() {
  modal.style.display = "block";
}
closeLogout.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// End Modal logout

//Nav
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

function logOut() {
    localStorage.removeItem('userID');
    window.location.href = "/pages/login.html";
}