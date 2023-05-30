        // Function to fetch the list of all Pokémon
        function fetchPokemonList() {
          fetch('index.php?list')
              .then(response => response.json())
              .then(data => {
                  // Iterate over each Pokémon and create a div element with its name and image
                  data.results.forEach(pokemon => {
                      const pokemonDiv = document.createElement('div');
                      pokemonDiv.className = 'pokemon';

                      const nameElement = document.createElement('h3');
                      nameElement.textContent = pokemon.name;
                      pokemonDiv.appendChild(nameElement);

                      const imageElement = document.createElement('img');
                      const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
                      imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
                      pokemonDiv.appendChild(imageElement);

                      document.getElementById('pokemonList').appendChild(pokemonDiv);
                  });
              })
              .catch(error => {
                  console.log('Error:', error);
              });
      }

      // Function to fetch details of a specific Pokémon
      function fetchPokemonDetails(name) {
          fetch(`index.php?name=${name}`)
              .then(response => response.json())
              .then(data => {
                  // Clear the existing Pokémon list
                  document.getElementById('pokemonList').innerHTML = '';

                  // Create a div element with the Pokémon details
                  const pokemonDiv = document.createElement('div');
                  pokemonDiv.className = 'pokemon';

                  const nameElement = document.createElement('h3');
                  nameElement.textContent = data.name;
                  pokemonDiv.appendChild(nameElement);

                  const imageElement = document.createElement('img');
                  imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
                  pokemonDiv.appendChild(imageElement);

                  document.getElementById('pokemonList').appendChild(pokemonDiv);
              })
              .catch(error => {
                  console.log('Error:', error);
              });
      }

      // Function to handle the search button click event
      function searchPokemon() {
          const searchInput = document.getElementById('searchInput');
          const pokemonName = searchInput.value.toLowerCase();

          if (pokemonName.trim() === '') {
              // If the search input is empty, fetch the list of all Pokémon
              fetchPokemonList();
          } else {
              // If a Pokémon name is entered, fetch the details of that Pokémon
              fetchPokemonDetails(pokemonName);
          }
      }

      // Call the fetchPokemonList function when the page loads
      fetchPokemonList();
