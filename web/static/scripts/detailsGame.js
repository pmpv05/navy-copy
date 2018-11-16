import {get, patch, delet } from '/static/scripts/api.js';
import { getToken } from './token.js';

let tokenEncoded = getToken();

if (tokenEncoded) {


    var splitToken = tokenEncoded.split(".");
    var token = JSON.parse(atob(splitToken[1]));

    if ('administrator' !== token.role) {
        document.getElementById('editBtn').style.display = "none";
        document.getElementById('saveBtn').style.display = "none";
        document.getElementById('deleteBtn').style.display = "none";
    } else {
        document.getElementById('editBtn').style.display = "inline";
        document.getElementById('saveBtn').style.display = "none";
        document.getElementById('deleteBtn').style.display = "block";
    }

}

var id = new URLSearchParams(window.location.search).get('id');

var numConsoles = 0;
//Method to show the stock of the game. It iterates through the JSON and foreach element it creates an input with the name value and an input with the amount value. It also adds a line break at the end. JSON format: stock : [{"name": "ps4", "amount": 5}, {"name": "ps3", "amount": 11}]
function handleStock(stock) {
    var i;
    for (i = 0; i < stock.length; i++) {
        const name = document.createElement('input');
        name.setAttribute('type', 'text');
        name.setAttribute('disabled', 'disabled');
        name.setAttribute('class', 'details');
        name.setAttribute('id', 'stockName' + i);
        name.value = stock[i].name;
        const amount = document.createElement('input');
        amount.setAttribute('type', 'number');
        amount.setAttribute('disabled', 'disabled');
        amount.setAttribute('class', 'details');
        amount.setAttribute('id', 'stockAmount' + i);
        amount.value = stock[i].amount
        const salto = document.createElement('br');
        document.getElementById('container').appendChild(name);
        document.getElementById('container').appendChild(amount);
        document.getElementById('container').appendChild(salto);
    }
}

//Method called when the user wants to add a console stock to the game, it creates an empty input for the name and an empty input for the amount. It also adds a line break at the end. Similar to handleStock()
function addConsole() {
    numConsoles += 1;
    if (numConsoles >= 10) {
        alert("Máximo 10 consolas alcanzado.");
    } else {
        const name = document.createElement('input');
        name.setAttribute('type', 'text');
        name.setAttribute('class', 'details');
        name.setAttribute('id', 'stockName' + numConsoles);
        const amount = document.createElement('input');
        amount.setAttribute('type', 'number');
        amount.setAttribute('class', 'details');
        amount.setAttribute('id', 'stockAmount' + numConsoles);
        const salto = document.createElement('br');
        document.getElementById('container').appendChild(name);
        document.getElementById('container').appendChild(amount);
        document.getElementById('container').appendChild(salto);
    }
}

//Method that goes to the DB and brings back the information of the Game. It gets the data and shows its attributes in different elements.
const resp = get(`/games/${id}`).then(response => {
    if (response.status == 200) {
        response.json().then(data => {
            document.getElementById('nameGame').innerHTML = data.name;
            const img = document.createElement('img');
            img.setAttribute('id', 'imgGame');
            img.setAttribute('src', data.image);
            img.style.width = "10em";
            img.style.height = "10em";
            document.getElementById('name').value = data.name;
            document.getElementById('imageGame').appendChild(img);
            document.getElementById('brand').value = data.brand;
            document.getElementById('year').value = data.year;
            document.getElementById('desc').value = data.description;
            document.getElementById('price').value = data.price;
            numConsoles = data.stock.length - 1;
            handleStock(data.stock);
        })
    } else {
        document.getElementById('dataGame').style.display = "none";
        document.getElementById('closebtn').style.display = "none";
        document.getElementById('refreshbtn').style.display = "block";
        document.getElementsByClassName("alertMsg")[0].style.display = "block";
        document.getElementById('errorMsg').innerHTML = "no se cargo el juego correctamente";
    }
});

//Method used to generate the JSON of the stock. JSON format: stock : [{"name": "ps4", "amount": 5}, {"name": "ps3", "amount": 11}]
function manageStock() {
    const stock = [];
    var i;
    for (i = 0; i <= numConsoles; i++) {
        stock[i] = { "name": document.getElementById('stockName' + i).value, "amount": document.getElementById('stockAmount' + i).value };
    }
    return stock;
}

//Method called when the user wants to edit, it enables the field that were disabled.
const updateGame = event => {
    event.preventDefault();
    var elements = document.getElementsByClassName("details");
    var nameGame = document.getElementById('name');
    nameGame.removeAttribute('disabled');
    nameGame.style.display = "block";
    document.getElementsByClassName("editBtn")[0].style.display = "none";
    document.getElementsByClassName("saveBtn")[0].style.display = "block";
    for (var element of elements) {
        element.removeAttribute('disabled');
    }

}

//Method that gets each Game attribute value and makes the HTTP Patch
const saveGame = async event => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const brand = document.getElementById('brand').value;
    const year = document.getElementById('year').value;
    const description = document.getElementById('desc').value;
    const price = document.getElementById('price').value;
    const stock = manageStock();
    const image = (document.getElementById("image").files.length > 0) ? await getBase64(document.getElementById('image').files[0]) : document.getElementById('imgGame').src;

    const response = patch(`/games/${id}`, {
        name,
        brand,
        year,
        description,
        price,
        stock,
        image

    }).then(data => {
        if (data.status == 200) {
            //Success
            var elements = document.getElementsByClassName("details");
            for (var element of elements) {
                element.setAttribute('disabled', 'disabled');
            }
            var nameGame = document.getElementById('name');
            nameGame.setAttribute('disabled', 'disabled');
            nameGame.style.display = "none";
            document.getElementById('nameGame').innerHTML = nameGame.value;
            document.getElementById('imgGame').setAttribute('src', image);
            document.getElementsByClassName("editBtn")[0].style.display = "inline";
            document.getElementsByClassName("saveBtn")[0].style.display = "none";
        } else {
            //Error
            document.getElementById('refreshbtn').style.display = "none";
            document.getElementById('closebtn').style.display = "block";
            document.getElementsByClassName("alertMsg")[0].style.display = "block";
            document.getElementById('errorMsg').innerHTML = "no se pudo editar el juego.";
        }
    });

}

//Image to base 64 string encoder
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            return resolve(reader.result);
        };
        //reader.onerror
    });
}

//Method that makes the HTTP Delete. It shows a confirmation message.
async function deleteGame() {
    var r = confirm("¿Confirma la eliminación?");
    if (r == true) {
        const resp = await delet(`/games/${id}`).then(response => {
            if (response.status == 200) {
                alert("Juego eliminado");
                location.href = "/games";
            }
        });
    } else {

    }
}

document.getElementById('addStock').addEventListener('click', addConsole);
document.getElementsByClassName('saveBtn')[0].addEventListener('click', saveGame);
document.getElementById('deleteBtn').addEventListener('click', deleteGame);
document.getElementsByClassName('editBtn')[0].addEventListener('click', updateGame);