import { get } from '/static/scripts/api.js';

//HTTP Get to obtain the consoles from endpoint consoles
const response = get('/consoles').then(response => {
  if (response.status === 200) {
    //Success
    response.json().then(data => {
      document.getElementById('list').appendChild(listConsoles(data));
    });
  } else {
    //Error
    alert('Error to load the consoles');
  }
});

//Method to alter DOM creating a list of console items
function listConsoles(array) {
  // Create the list console:
  const list = document.createElement('ul');
  list.setAttribute('class', 'listConsoles');

  for (let i = 0; i < array.length; i++) {
    const consoleDevice = array[i];

    // Create the console:
    const item = document.createElement('li');
    item.setAttribute('class', 'consoles');

    // Create the image for console:
    const img = document.createElement('img');
    img.setAttribute('src', consoleDevice.image);

    // FUnction to show all details when you click a image
    img.setAttribute('onclick', `showMe(${JSON.stringify(consoleDevice)})`);
    img.addEventListener('click', () => showMe(consoleDevice));
    // Add image to the game
    item.appendChild(img);


    // Add game to the list:
    list.appendChild(item);
  }

  // Finally, return the constructed list:
  return list;
}

// Function to show the consoles details
const showMe = consoleDevice => {
  location.href = `/detailsConsole?id=${consoleDevice._id}`;
};
