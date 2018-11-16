import { post } from './api.js';

document.getElementById('formNewConsole').addEventListener('submit', newGame);
document.getElementById('addStock').addEventListener('click', addConsole);

var numConsoles = 0;
//Method called when the user wants to add a console stock to the game, it creates an empty input for the name and an empty input for the amount. It also adds a line break at the end.
function addConsole() {
  numConsoles += 1;
  if (numConsoles >= 10) {
    alert("Máximo 10 consolas alcanzado.");
  }
  else {
    const name = document.createElement('input');
    name.setAttribute('type', 'text');
    name.setAttribute('class', 'form-control');
    name.setAttribute('placeholder', 'Consola');
    name.setAttribute('id', 'stockName' + numConsoles);
    name.required = true;
    const amount = document.createElement('input');
    amount.setAttribute('type', 'number');
    amount.setAttribute('placeholder', 'Cantidad');
    amount.setAttribute('class', 'form-control');
    amount.setAttribute('id', 'stockAmount' + numConsoles);
    amount.required = true;
    const salto = document.createElement('br');
    document.getElementById('container').appendChild(name);
    document.getElementById('container').appendChild(amount);
    document.getElementById('container').appendChild(salto);
  }
}

//Method used to generate the JSON of the stock. JSON format: stock : [{"name": "ps4", "amount": 5}, {"name": "ps3", "amount": 11}]
function manageStock() {
  const stock = [];
  var i;
  for (i = 0; i <= numConsoles; i++) {
    stock[i] = { "name": document.getElementById('stockName' + i).value, "amount": document.getElementById('stockAmount' + i).value };
  }
  return stock;
}

//Method that gets the attribute values and makes the HTTP POST
async function newGame(e) {
  e.preventDefault();
  const name = document.getElementById('newName').value;
  const description = document.getElementById('newDesc').value;
  const year = document.getElementById('newYear').value;
  const price = document.getElementById('newPrice').value;
  const brand = document.getElementById('newBrand').value;
  const image = await getBase64(document.getElementById('newImg').files[0]);
  const stock = manageStock();

  const resp = await post('/games/', {
    name,
    description,
    image,
    year,
    price,
    brand,
    stock,
  });
  if (resp.status === 201) {
    alert('Juego ' + name + ' agregado correctamente.');
  } else {
    alert('Ocurrió un error. Pruebe más tarde.');
  }
}

//Image to base 64 string encoder
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      return resolve(reader.result);
    };
    //reader.onerror
  });
}

