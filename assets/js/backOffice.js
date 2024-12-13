const h1 = document.getElementById("h1");
const form = document.getElementById("form");
const productName = document.getElementById("name");
const productBrand = document.getElementById("brand");
const imgUrl = document.getElementById("img");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const url = "https://striveschool-api.herokuapp.com/api/product/";
const id = sessionStorage.getItem("id");
const btnClear = document.querySelector(".clear");

document.addEventListener("load", init());

function init() {
    if (id) {
        getData();
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!id) {
        postData();
    } else {
        putData();

    } 
    sessionStorage.clear();
    location.href = "index.html";
});

btnClear.addEventListener("click", function () {
    sessionStorage.clear();
});

async function postData() {
    try {
        const requestBody = {
            name: productName.value,
            brand: productBrand.value,
            imageUrl: imgUrl.value,
            price: parseInt(productPrice.value),
            description: productDescription.value,
        };
        console.log("Dati inviati:", requestBody);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDAxY2QyMjA3MTAwMTVkZTJmNTUiLCJpYXQiOjE3MzQwODI1ODksImV4cCI6MTczNTI5MjE4OX0.O7LIgG48tut19TZkLFvlRfJ4pvxK7FrXuGb5K41KB-g",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        if (!response.ok) {
            console.error("Errore nel server:", result);
        } else {
            h1.innerText = "Aggiungi";
            console.log("Prodotto aggiunto con successo:", result);
        }
    } catch (error) {
        console.error("Errore nella richiesta:", error);
    }
}

async function getData() {
    try {
        const response = await fetch(url + id, {
            method: "GET",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDAxY2QyMjA3MTAwMTVkZTJmNTUiLCJpYXQiOjE3MzQwODI1ODksImV4cCI6MTczNTI5MjE4OX0.O7LIgG48tut19TZkLFvlRfJ4pvxK7FrXuGb5K41KB-g",
            },
        });
        const result = await response.json();
        if (response.ok) {
            productName.value = result.name;
            productBrand.value = result.brand;
            imgUrl.value = result.imageUrl;
            productPrice.value = result.price;
            productDescription.value = result.description;
            h1.innerHTML = `Modifica prodotto: ${result.name}`;
        } else {
            console.error("Errore nel recupero del prodotto:", result);
        }
    } catch (error) {
        console.error("Errore nella richiesta GET:", error);
    }
}

async function putData() {
    try {
        const requestBody = {
            name: productName.value,
            brand: productBrand.value,
            imageUrl: imgUrl.value,
            price: parseInt(productPrice.value),
            description: productDescription.value,
        };
        console.log("Dati inviati:", requestBody);
        const response = await fetch(url + id, {
            method: "PUT",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDAxY2QyMjA3MTAwMTVkZTJmNTUiLCJpYXQiOjE3MzQwODI1ODksImV4cCI6MTczNTI5MjE4OX0.O7LIgG48tut19TZkLFvlRfJ4pvxK7FrXuGb5K41KB-g",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        if (!response.ok) {
            console.error("Errore nel server:", result);
        } else {
            console.log("Prodotto aggiornato con successo:", result);
        }
    } catch (error) {
        console.error("Errore nella richiesta:", error);
    }
}