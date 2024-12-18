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
let remove = document.getElementById("remove");
const alertError = document.getElementById('error');

document.addEventListener("load", init());

function init() {
    if (id) {
        getData();
        createButtonRemove();
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!id) {
        postData();
    } else {
        putData();
    }
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
            alertError.innerHTML = `<div class="alert alert-warning alert-dismissible fade show w-50" role="alert">
        <strong>ERRORE!</strong> Si è verificato un problema.`;
        } else {
            console.log("Prodotto aggiunto con successo:", result);
            sessionStorage.clear();
            setTimeout(() => { location.href = "index.html"; }, 1000);
        }
    } catch (error) {
        console.error("Errore nella richiesta:", error);
        alertError.innerHTML = `<div class="alert alert-warning alert-dismissible fade show w-50" role="alert">
        <strong>ERRORE!</strong> Si è verificato un problema.`;
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
            alertError.innerHTML = `<div class="alert alert-warning alert-dismissible fade show w-50" role="alert">
        <strong>ERRORE!</strong> Si è verificato un problema.`;
        }
    } catch (error) {
        console.error("Errore nella richiesta GET:", error);
        alertError.innerHTML = `<div class="alert alert-warning alert-dismissible fade show w-50" role="alert">
        <strong>ERRORE!</strong> Si è verificato un problema.`;
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
            alertError.innerHTML = `<div class="alert alert-warning alert-dismissible fade show w-50" role="alert">
        <strong>ERRORE!</strong> Si è verificato un problema.`;
        } else {
            console.log("Prodotto aggiornato con successo:", result);
            sessionStorage.clear();
            setTimeout(() => { location.href = "index.html"; }, 1000);
        }
    } catch (error) {
        console.error("Errore nella richiesta:", error);
        alertError.innerHTML = `<div class="alert alert-warning alert-dismissible fade show w-50" role="alert">
        <strong>ERRORE!</strong> Si è verificato un problema.`;
    }
}

async function deleteData() {
    try {
        const response = await fetch(url + id, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDAxY2QyMjA3MTAwMTVkZTJmNTUiLCJpYXQiOjE3MzQwODI1ODksImV4cCI6MTczNTI5MjE4OX0.O7LIgG48tut19TZkLFvlRfJ4pvxK7FrXuGb5K41KB-g",
            },
        });
        const result = await response.json();
        if (response.ok) {
            console.log("Prodotto eliminato con successo:", result);
            sessionStorage.clear();
            location.href = "index.html";
        } else {
            console.error("Errore nella cancellazione del prodotto:", result);
            alertError.innerHTML = `<div class="alert alert-warning alert-dismissible fade show w-50" role="alert">
        <strong>ERRORE!</strong> Si è verificato un problema.`;
        }
    } catch (error) {
        console.error("Errore nella richiesta DELETE:", error);
        alertError.innerHTML = `<div class="alert alert-warning alert-dismissible fade show w-50" role="alert">
        <strong>ERRORE!</strong> Si è verificato un problema.`;
    }
}

function createButtonRemove() {
    let btnRemove = document.createElement("button");
    btnRemove.innerText = "DELETE";
    btnRemove.setAttribute("type", "button");
    btnRemove.setAttribute("data-bs-toggle", "modal");
    btnRemove.setAttribute("data-bs-target", "#deleteModal");
    btnRemove.classList.add("btn", "btn-primary");
    form.appendChild(btnRemove);
    remove.addEventListener("click", function (e) {
        e.preventDefault();
        deleteData();
    });
}