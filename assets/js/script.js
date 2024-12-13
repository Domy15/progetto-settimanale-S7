const url = "https://striveschool-api.herokuapp.com/api/product/";
const div = document.querySelector(".row");

document.addEventListener("laod", init());

function init() {
    getData();
}

async function getData() {
    try {
        const response = await fetch(url,
            {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDAxY2QyMjA3MTAwMTVkZTJmNTUiLCJpYXQiOjE3MzQwODI1ODksImV4cCI6MTczNTI5MjE4OX0.O7LIgG48tut19TZkLFvlRfJ4pvxK7FrXuGb5K41KB-g",
                },
            });
        const data = await response.json();
        console.log(data);
        printProduct(data);
    } catch (error) {
        console.log(error);
    };   
}

function printProduct(data) {
    for (let i = 0; i < data.length; i++) {
        div.innerHTML += `<div class="card col-3">
        <img src="${data[i].imageUrl}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${data[i].name}</h5>
            <h6 class="card-subtitle">${data[i].brand}</h6>
            <p class="card-text">${data[i].description}</p>
            <p class="card-text">${data[i].price}€</p>
            <a href="#" class="btn btn-primary btnMod">Modifica</a>
            <a href="#" class="btn btn-primary btnView">Scopri di più</a>
        </div>
    </div>`;
    };
    const btnMod = document.querySelectorAll(".btnMod");
    for (let i = 0; i < data.length; i++) {
        btnMod[i].addEventListener("click", function() {
            sessionStorage.setItem("id", data[i]._id);
            location.href = "backOffice.html";
        });
    };
    const btnView = document.querySelectorAll(".btnView");
    for (let i = 0; i < data.length; i++) {
        btnView[i].addEventListener("click", function() {
            sessionStorage.setItem("id", data[i]._id);
            location.href = "details.html";
        });
    };
}