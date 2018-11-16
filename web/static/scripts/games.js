import { get } from '/static/scripts/api.js';

//HTTP Get to obtain the games from endpoint games
const response = get('/games').then(response => {
  if (response.status === 200) {
    //Success
    response.json().then(data => {
      document.getElementById('list').appendChild(listGames(data));
    });
  } else {
    //Error
    alert('Error to load the games');
  }
});

//Method to alter DOM creating a list of game items
function listGames(array) {
  // Create the list games:
  const list = document.createElement('ul');
  list.setAttribute('class', 'listGames');

  for (let i = 0; i < array.length; i++) {
    const game = array[i];

    // Create the game:
    const item = document.createElement('li');
    item.setAttribute('class', 'games');

    // Create the image for game:
    const img = document.createElement('img');
    img.setAttribute('src', game.image);

    // FUnction to show all details when you click a image
    img.setAttribute('onclick', `showMe(${JSON.stringify(game)})`);
    img.addEventListener('click', () => showMe(game));
    // Add image to the game
    item.appendChild(img);


    // Add game to the list:
    list.appendChild(item);
  }

  // Finally, return the constructed list:
  return list;
}

// Function to show the games details page
const showMe = game => {
  location.href = `/detailsGame?id=${game._id}`;
};
