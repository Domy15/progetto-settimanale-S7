const backOffice = document.getElementById("backOffice");
const home = document.getElementById("home");
const div = document.querySelector(".mainContent");
const url = "https://striveschool-api.herokuapp.com/api/product/";
const id = sessionStorage.getItem("id");
const alertError = document.getElementById('error');

document.addEventListener("load", init());

function init() {
    getData();
}

backOffice.addEventListener("click", function () {
    sessionStorage.clear();
});

home.addEventListener("click", function () {
    sessionStorage.clear();
});

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
            printProduct(result);
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

function printProduct(data) {
    div.innerHTML = `<img src="${data.imageUrl}">
            <div>
                <h4>${data.brand}</h4>
                <h2>${data.name}</h2>
                <h4>${data.price}</h4>
                <p>${data.description}</p>
            </div>`;
}