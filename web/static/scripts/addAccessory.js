import { post } from './api.js';

document
  .getElementById('formNewConsole')
  .addEventListener('submit', newAccessory);

//Method that gets the attribute values and makes the HTTP POST
async function newAccessory(e) {
  e.preventDefault();
  const name = document.getElementById('newName').value;
  const description = document.getElementById('newDesc').value;
  const year = document.getElementById('newYear').value;
  const price = document.getElementById('newPrice').value;
  const brand = document.getElementById('newBrand').value;
  const console = document.getElementById('newConsole').value;
  const image = await getBase64(document.getElementById('newImg').files[0]);
  const stock = document.getElementById('newStock').value;

  const resp = await post('/accessories/', {
    name,
    description,
    image,
    console,
    year,
    price,
    brand,
    stock,
  });
  if (resp.status === 201) {
    alert('Accesorio ' + name + ' agregado correctamente.');
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
