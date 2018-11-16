import { get } from '/static/scripts/api.js';

//HTTP Get to obtain the accessories from endpoint accessories
const response = get('/accessories').then(response => {
  if (response.status === 200) {
    //Success
    response.json().then(data => {
      document.getElementById('list').appendChild(listAccessories(data));
    });
  } else {
    //Error
    alert('Error to load the accessories');
  }
});

//Method to alter DOM creating a list of accessory items
function listAccessories(array) {
  // Create the accessories list:
  const list = document.createElement('ul');
  list.setAttribute('class', 'listAccessories');

  for (let i = 0; i < array.length; i++) {
    const accessory = array[i];

    // Create the accessories:
    const item = document.createElement('li');
    item.setAttribute('class', 'accessories');

    // Create the image for accessory:
    const img = document.createElement('img');
    img.setAttribute('src', accessory.image);

    // FUnction to show all details when you click a image
    img.setAttribute('onclick', `showMe(${JSON.stringify(accessory)})`);
    img.addEventListener('click', () => showMe(accessory));
    // Add image to the accessories
    item.appendChild(img);

    // Add accessory to the list:
    list.appendChild(item);
  }

  // Finally, return the constructed list:
  return list;
}

// Function to show the accessory details page
const showMe = accessory => {
  location.href = `/detailsAccessory?id=${accessory._id}`;
};
