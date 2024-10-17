const teamMembers = [
    {
        name: "Hồ Thị Kim Thanh",
        role: "Member",
        date: "18-01-2005",
        description: "Enjoys watching movies and reading books. She often seeks out good films and interesting books to relax after long hours of studying and working.",
        image: "/asserts/image/AnhThanh1_About_Us.jpg",
    },
    {
        name: "Hồ Thị Duyên Hà",
        role: "Member",
        date: "15-08-2005",
        description: "Loves exploring new design trends and enjoys sketching her ideas. In her free time, she also likes to travel and discover new cultures, which inspires her creative work.",
        image: "/asserts/image/AnhHa2.jpg"
    },
    {
        name: "Hồ Thị Diệu",
        role: "Member",
        date: "10-06-2005",
        description: "She enjoys understanding consumer behavior and creating impactful digital marketing campaigns. In her free time, she likes reading marketing books to enhance her skills.",
        image: "/asserts/image/AnhDieu1.jpg"
    },
    {
        name: "Hồ Ly Kim Sa",
        role: "Leader",
        date: "06-05-2005",
        description: "She has the ability to develop effective marketing strategies and drive her team towards common goals. She is also passionate about sharing knowledge and supporting team members in developing their skills.",
        image: "/asserts/image/AnhSa1.jpg"
    },
    {
        name: "Hồ Văn Hanh",
        role: "Member",
        date: "20-12-2005",
        description: "He is skilled at building relationships with clients and understanding their needs. His dedication to providing excellent service makes him a valuable asset to the team. Hanh is always eager to learn and adapt to new challenges, contributing positively to the group's success.",
        image: "/asserts/image/AnhHanh1.jpg"
    },
    {
        name: "Bhờ Nướch Thị Hoài Tiên",
        role: "Member",
        date: "27-03-2005",
        description: "Enjoys reading books and participating in volunteer activities. She often spends her free time exploring new marketing strategies and connecting with customers through community events.",
        image: "/asserts/image/AnhTien1_ABout_Us.jpg"
    }
];

// Hàm để render thành viên
function renderTeamMembers() {
    const container = document.getElementById('teamMemberContainer');
    teamMembers.forEach((member, index) => {
        const infoMember = document.createElement('div'); // Tạo div mới
        infoMember.classList.add('info-member');
        infoMember.innerHTML = `
        <div class= "container-member">
                <div class="image-container">
                    <img src="${member.image}" alt="${member.name}">
                    <i class="fa-solid fa-eye eye-icon"  onclick="showInfo(${index})"></i>
                </div>
                <p>${member.name}</p>
            </div>
            
`;
        // infoMember.onclick = () => showInfo(index); // Thêm sự kiện click để hiển thị thông tin
        container.appendChild(infoMember);
    });
}

// Hàm hiển thị thông tin thành viên và overlay
function showInfo(index) {
    const member = teamMembers[index];
    document.getElementById('img-member').src = member.image;
document.getElementById('member-name').innerHTML = `<span class="red">Name:</span> ${member.name}`;
document.getElementById('member-role').innerHTML = `<span class="red">Role:</span> ${member.role}`;
document.getElementById('date-member').innerHTML = `<span class="red">Date:</span> ${member.date}`; 
document.getElementById('member-description').innerHTML = `<span class="red">Description:</span> ${member.description}`;

    // Hiển thị modal và overlay
    document.getElementById('member-info').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
    // document.getElementById('img').style.transition: transform 0.3s;
}

// Hàm đóng modal và overlay
function closeInfo() {
    document.getElementById('member-info').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
}

// Render thành viên khi tải trang
window.onload = renderTeamMembers;


/************************************************* */
const DetailMember = [
    {
        text: ' In my free time, I enjoy reading books about technology, participating in online courses, and experimenting with new ideas in programming. Additionally, I am also a sports enthusiast and regularly engage in physical activities such as running and yoga to stay healthy.',
        name: 'Hồ Thị Kim Thanh',
        role: 'Member',
        image: '/asserts/image/AnhThanh2_About_Us.jpg' 
    },
    {
        text: 'As someone passionate about learning and exploring new things in life, I constantly strive to develop myself through participating in group projects and extracurricular activities. Besides studying, I enjoy reading and traveling, which helps broaden my perspective and understanding of the world around me.',
        name: 'Hồ Thị Duyên Hà',
        role: 'Member',
        image: '/asserts/image/AnhHa1.jpg' 
    },
    {
        text: 'I am passionate about communication and connecting with people, and I believe that listening and understanding are key to building strong relationships. Outside of work, I enjoy participating in volunteer and community activities. I believe that everyone can make a difference, no matter how small.',
        name: 'Hồ Thị Diệu',
        role: 'Member',
        image: '/asserts/image/AnhDieu2.jpg' 
    },
    {
        text: 'Currently serving as a leader in a creative team, with passion and enthusiasm for my work, I always strive to inspire and support my team members. Outside of work, I enjoy participating in sports and volunteering, which helps me maintain balance in life. ',
        name: 'Hồ Ly Kim Sa',
        role: 'Leader',
        image: '/asserts/image/AnhSa2.jpg' 
    },
    {
        text: 'I always strive to bring satisfaction to every customer I meet. I believe that good service is not only about providing quality products but also about creating great experiences for customers. Outside of work, I enjoy participating in community activities and exploring new things in life.',
        name: 'Hồ Văn Hanh',
        role: 'Member',
        image: '/asserts/image/AnhHanh2.jpg' 
    },
    {
        text: 'With a high level of enthusiasm, I am always seeking opportunities to learn and develop myself. In my work, I focus on accuracy and efficiency, striving to work and support my colleagues to achieve common goals. Outside of work, I enjoy exploring nature and discovering new things in life.',
        name: 'Bhờ Nướch Thị Hoài Tiên',
        role: 'Member',        
        image: '/asserts/image/AnhTien2_About_Us.jpg' // Đường dẫn hình ảnh
    }
];

let memberIndex = 0;

function detailsMember() {
    const member = DetailMember[memberIndex];
    document.getElementById('text').textContent = member.text;
    document.getElementById('name').textContent = member.name;
    document.getElementById('role').textContent = member.role;
    document.getElementById('img').src = member.image;

    // Thêm lớp zoom vào 
    img.classList.add('zoom');
    setTimeout(()=>{
        img.classList.remove('zoom');
    }, 100);
}

function left() {
    memberIndex--;
    if (memberIndex < 0) {
        memberIndex = DetailMember.length - 1; // Về cuối danh sách nếu lùi quá
        document.getElementById('img').style.transition = 'transform 0.3s';

    }
    detailsMember(); // gọi để in ra
}

function right() {
    memberIndex++;
    if (memberIndex >= DetailMember.length) {
        memberIndex = 0; // quay lại lúc ban đầu 
        document.getElementById('img').style.transition = 'transform 0.3s';

    }
    detailsMember(); // gọi để in ra
}

// Đăng ký sự kiện click cho nút trái và phải
document.getElementById('left').addEventListener('click', left);
document.getElementById('right').addEventListener('click', right);

// Bắt đầu với thành viên đầu tiên
detailsMember();