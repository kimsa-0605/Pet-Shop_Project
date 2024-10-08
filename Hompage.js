var fetured_products = [
    {
        id: 1,
        name: "Dried meat",
        quantity: 4,
        price: "200.000",
        image: "./Hình ảnh/Anh4.webp",
        description: "Roasted and smoked beef liver for dogs. Nutritional composition: Crude protein ≥18%, Crude fat ≥5%, Crude fiber ≤9%, Crude ash ≤1%, Minerals ≥1.5%, Calcium ≥1.2%, Phosphorus ≥0.5%, Salt ≤0.09%, Moisture ≤10%. Suitable for all breeds.",
        
    },
    {
        id: 2,
        name: "Chicken jerky",
        quantity: 10,
        price: "150.000",
        image: "./Hình ảnh/Anh3.webp",
        description: "Chicken jerky strips, high in protein. Nutritional composition: Crude protein ≥22%, Crude fat ≤3%, Moisture ≤12%. Perfect for dogs with sensitive stomachs.",
    },
    {
        id: 3,
        name: "Beef bites",
        quantity: 8,
        price: "180.000",
        image: "./Hình ảnh/Anh2.webp",
        description: "Small beef bites, easy to chew. Nutritional composition: Crude protein ≥20%, Crude fat ≤5%, Moisture ≤11%. Ideal for training.",
    }
]


localStorage.setItem('fetured_products', JSON.stringify(fetured_products));

function createCard(fetured_products, i) {
    let demo = `<a href="detailt.html?code=${fetured_products[i].id}" class="box_item" data-aos="fade-up" data-aos-duration="1000">`;
        demo += '<img src="'+ fetured_products[i].image +'" alt="Products_img">';
        demo += '<div class="text">';
        demo += '<div class="icon_food">';
        demo += '<p><b>' + fetured_products[i].name + '</b></p>';
        demo += '<i class="fa-regular fa-heart" style="color: orange;"></i>';
        demo += '</div>';
        demo += '<p class="price"><b>' + fetured_products[i].price + ' VNĐ</b></p>';
        demo += '</div>';
        demo += `</a>`;
    return demo;
}

function listProducts() {
    for (let i = 0; i < fetured_products.length; i++) {
        let card = createCard(fetured_products, i);
        document.getElementById("fetured_products").innerHTML += card;
    }
}
