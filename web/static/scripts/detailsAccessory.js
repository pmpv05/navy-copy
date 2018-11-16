import { get, patch, delet } from '/static/scripts/api.js';

var id = new URLSearchParams(window.location.search).get('id');

//Method that goes to the DB and brings back the information of the Accessory. It gets the data and shows its attributes in different elements.
const resp = get(`/accessories/${id}`).then(response => {
  if (response.status == 200) {
    response.json().then(data => {
      document.getElementById('nameAccessory').innerHTML = data.name;
      const img = document.createElement('img');
      img.setAttribute('id', 'imgAccessory');
      img.setAttribute('src', data.image);
      img.style.width = "10em";
      img.style.height = "10em";
      document.getElementById('name').value = data.name;
      document.getElementById('imageAccessory').appendChild(img);
      document.getElementById('brand').value = data.brand;
      document.getElementById('year').value = data.year;
      document.getElementById('desc').value = data.description;
      document.getElementById('price').value = data.price;
      document.getElementById('stock').value = data.stock;
    })
  } else {
    document.getElementById('dataAccessory').style.display = "none";
    document.getElementById('closebtn').style.display = "none";
    document.getElementById('refreshbtn').style.display = "block";
    document.getElementsByClassName("alertMsg")[0].style.display = "block";
    document.getElementById('errorMsg').innerHTML = "no se cargo el accesorio correctamente";
  }
});

//Method called when the user wants to edit, it enables the field that were disabled.
const updateAccessory = event => {
  event.preventDefault();
  var elements = document.getElementsByClassName("details");
  var nameAccessory = document.getElementById('name');
  nameAccessory.removeAttribute('disabled');
  nameAccessory.style.display = "block";
  document.getElementsByClassName("editBtn")[0].style.display = "none";
  document.getElementsByClassName("saveBtn")[0].style.display = "block";
  for (var element of elements) {
    element.removeAttribute('disabled');
  }

}

//Method that gets each Accessory attribute value and makes the HTTP Patch
const saveAccessory = async event => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const brand = document.getElementById('brand').value;
  const year = document.getElementById('year').value;
  const description = document.getElementById('desc').value;
  const price = document.getElementById('price').value;
  const stock = document.getElementById('stock').value;
  const image = (document.getElementById("image").files.length > 0) ? await getBase64(document.getElementById('image').files[0]) : document.getElementById('imgAccessory').src;
  const response = patch(`/accessories/${id}`, {
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
      var nameAccessory = document.getElementById('name');
      nameAccessory.setAttribute('disabled', 'disabled');
      nameAccessory.style.display = "none";
      document.getElementById('nameAccessory').innerHTML = nameAccessory.value;
      document.getElementById('imgAccessory').setAttribute('src', image);
      document.getElementsByClassName("editBtn")[0].style.display = "inline";
      document.getElementsByClassName("saveBtn")[0].style.display = "none";
    } else {
      document.getElementById('refreshbtn').style.display = "none";
      document.getElementById('closebtn').style.display = "block";
      document.getElementsByClassName("alertMsg")[0].style.display = "block";
      document.getElementById('errorMsg').innerHTML = "no se pudo editar el accesorio.";
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
async function deleteAccessory() {
  var r = confirm("¿Confirma la eliminación?");
  if (r == true) {
    const resp = await delet(`/accessories/${id}`).then(response => {
      if (response.status == 200) {
        alert("Accesorio eliminado");
        location.href = "/accessories";
      }
    });
  } else {

  }
}

document.getElementsByClassName('editBtn')[0].addEventListener('click', updateAccessory);
document.getElementsByClassName('saveBtn')[0].addEventListener('click', saveAccessory);
document.getElementById('deleteBtn').addEventListener('click', deleteAccessory);