let offset = 0;
const limit = 20;
let pokemonListData = []; // Store the Pokémon list data

// Function to fetch the list of all Pokémon
function fetchPokemonList(offset, limit) {
  fetch(`index.php?list&offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(data => {
      pokemonListData = data.results; // Store the Pokémon list data

      // Sort the Pokémon list by ID in ascending order
      pokemonListData.sort((a, b) => {
        const idA = getPokemonIdFromUrl(a.url);
        const idB = getPokemonIdFromUrl(b.url);
        return idA - idB;
      });

      // Iterate over each Pokémon and create a div element with its details
      pokemonListData.forEach(pokemon => {
        fetchPokemonDetails(pokemon.name)
          .then(details => {
            const pokemonDiv = createPokemonElement(details, pokemon.name);
            document.getElementById('pokemonList').appendChild(pokemonDiv);
          })
          .catch(error => {
            console.log('Error:', error);
          });
      });

      // Check if there are more Pokémon to load
      if (data.next !== null) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Helper function to extract Pokémon ID from URL
function getPokemonIdFromUrl(url) {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2]);
}

// Function to fetch details of a specific Pokémon
function fetchPokemonDetails(name) {
  return fetch(`index.php?name=${name}`)
    .then(response => response.json());
}

// Function to create a Pokémon div element with details
function createPokemonElement(details, name) {
  const pokemonDiv = document.createElement('div');
  pokemonDiv.className = 'pokemon';

  const nameElement = document.createElement('h3');
  const pokemonId = details.id;
  nameElement.textContent = `#${pokemonId} - ${name}`;
  pokemonDiv.appendChild(nameElement);

  const imageElement = document.createElement('img');
  imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  pokemonDiv.appendChild(imageElement);

  const detailsElement = document.createElement('div');
  detailsElement.className = 'details';

  // Type
  const typeElement = document.createElement('p');
  typeElement.textContent = `Type: ${details.types.map(type => type.type.name).join(', ')}`;
  detailsElement.appendChild(typeElement);

  // Abilities
  const abilitiesElement = document.createElement('p');
  abilitiesElement.textContent = `Abilities: ${details.abilities.map(ability => ability.ability.name).join(', ')}`;
  detailsElement.appendChild(abilitiesElement);

  pokemonDiv.appendChild(detailsElement);

  // Add click event listener to the container
  pokemonDiv.addEventListener('click', () => {
    const pokemonDetails = JSON.stringify(details);
    localStorage.setItem('pokemonDetails', pokemonDetails);
    window.location.href = 'pokemon-details.html';
  });

  return pokemonDiv;
}

// Function to handle the "Load More" button click event
function loadMorePokemon() {
  offset += limit;
  fetchPokemonList(offset, limit);
}

// Function to show the "Load More" button
function showLoadMoreButton() {
  const loadMoreButton = document.getElementById('loadMoreButton');
  loadMoreButton.style.display = 'block';
}

// Function to hide the "Load More" button
function hideLoadMoreButton() {
  const loadMoreButton = document.getElementById('loadMoreButton');
  loadMoreButton.style.display = 'none';
}

// Call the fetchPokemonList function with an initial offset of 0 to load the first batch of Pokémon
fetchPokemonList(offset, limit);

// Add event listener to the "Load More" button
document.getElementById('loadMoreButton').addEventListener('click', loadMorePokemon);
