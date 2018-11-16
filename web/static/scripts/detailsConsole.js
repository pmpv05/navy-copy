import { get, patch, delet } from '/static/scripts/api.js';

var id = new URLSearchParams(window.location.search).get('id');

//Method that goes to the DB and brings back the information of the Console. It gets the data and shows its attributes in different elements.
const resp = get(`/consoles/${id}`).then(response => {
  if (response.status == 200) {
    response.json().then(data => {
      document.getElementById('nameConsole').innerHTML = data.name;
      const img = document.createElement('img');
      img.setAttribute('id', 'imgConsole');
      img.setAttribute('src', data.image);
      img.style.width = "10em";
      img.style.height = "10em";
      document.getElementById('name').value = data.name;
      document.getElementById('imageConsole').appendChild(img);
      document.getElementById('brand').value = data.brand;
      document.getElementById('year').value = data.year;
      document.getElementById('desc').value = data.description;
      document.getElementById('price').value = data.price;
      document.getElementById('stock').value = data.stock;
    })
  } else {
    document.getElementById('dataConsole').style.display = "none";
    document.getElementById('closebtn').style.display = "none";
    document.getElementById('refreshbtn').style.display = "block";
    document.getElementsByClassName("alertMsg")[0].style.display = "block";
    document.getElementById('errorMsg').innerHTML = "no se cargo la consola correctamente";
  }
});

//Method called when the user wants to edit, it enables the field that were disabled.
const updateConsole = event => {
  event.preventDefault();
  var elements = document.getElementsByClassName("details");
  var nameConsole = document.getElementById('name');
  nameConsole.removeAttribute('disabled');
  nameConsole.style.display = "block";
  document.getElementsByClassName("editBtn")[0].style.display = "none";
  document.getElementsByClassName("saveBtn")[0].style.display = "block";
  for (var element of elements) {
    element.removeAttribute('disabled');
  }
}

//Method that gets each Console attribute value and makes the HTTP Patch
const saveConsole = async event => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const brand = document.getElementById('brand').value;
  const year = document.getElementById('year').value;
  const description = document.getElementById('desc').value;
  const price = document.getElementById('price').value;
  const stock = document.getElementById('stock').value;
  const image = (document.getElementById("image").files.length > 0) ? await getBase64(document.getElementById('image').files[0]) : document.getElementById('imgConsole').src;
  const response = patch(`/consoles/${id}`, {
    name,
    brand,
    year,
    description,
    price,
    stock,
    image

  }).then(data => {
    if (data.status == 200) {
      var elements = document.getElementsByClassName("details");
      for (var element of elements) {
        element.setAttribute('disabled', 'disabled');
      }
      var nameConsole = document.getElementById('name');
      nameConsole.setAttribute('disabled', 'disabled');
      nameConsole.style.display = "none";
      document.getElementById('nameConsole').innerHTML = nameConsole.value;
      document.getElementById('imgConsole').setAttribute('src', image);
      document.getElementsByClassName("editBtn")[0].style.display = "inline";
      document.getElementsByClassName("saveBtn")[0].style.display = "none";
    } else {
      document.getElementById('refreshbtn').style.display = "none";
      document.getElementById('closebtn').style.display = "block";
      document.getElementsByClassName("alertMsg")[0].style.display = "block";
      document.getElementById('errorMsg').innerHTML = "no se pudo editar la consola.";
    }
  });
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

//Method that makes the HTTP Delete. It shows a confirmation message.
async function deleteConsole() {
  var r = confirm("¿Confirma la eliminación?");
  if (r == true) {
    const resp = await delet(`/consoles/${id}`).then(response => {
      if (response.status == 200) {
        alert("Consola eliminada");
        location.href = "/consoles";
      }
    });
  } else {
  }
}

document.getElementsByClassName('editBtn')[0].addEventListener('click', updateConsole);
document.getElementsByClassName('saveBtn')[0].addEventListener('click', saveConsole);
document.getElementById('deleteBtn').addEventListener('click', deleteConsole);