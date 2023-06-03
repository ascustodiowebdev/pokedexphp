// Function to fetch Pokémon details by name
function fetchPokemonDetails(name) {
  return fetch(`index.php?name=${name}`)
    .then(response => response.json());
}

// Function to populate Pokémon details on the page
function populatePokemonDetails() {
  const pokemonNameElement = document.getElementById('pokemonName');
  const pokemonImageElement = document.getElementById('pokemonImage');
  const pokemonDetailsElement = document.getElementById('pokemonDetails');

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const pokemonName = urlParams.get('name');

  fetchPokemonDetails(pokemonName)
    .then(details => {
      pokemonNameElement.textContent = details.name;

      const pokemonImage = document.createElement('img');
      pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png`;
      pokemonImageElement.appendChild(pokemonImage);

      const typeElement = document.createElement('p');
      typeElement.textContent = `Type: ${details.types ? details.types.map(type => type.type.name).join(', ') : ''}`;
      pokemonDetailsElement.appendChild(typeElement);

      const abilitiesElement = document.createElement('p');
      abilitiesElement.textContent = `Abilities: ${details.abilities.map(ability => ability.ability.name).join(', ')}`;
      pokemonDetailsElement.appendChild(abilitiesElement);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Call the populatePokemonDetails function to populate the details on page load
populatePokemonDetails();
