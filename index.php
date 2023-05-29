<?php
// Backend code for consuming PokeAPI

// Function to make API requests
function makeRequest($url) {
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $response = curl_exec($curl);
  curl_close($curl);
  return json_decode($response, true);
}

// Get a list of Pokémon from the API
function getPokemonList() {
  $url = 'https://pokeapi.co/api/v2/pokemon?limit=20'; // Limiting to 20 for simplicity
  return makeRequest($url);
}

// Get details of a specific Pokémon
function getPokemonDetails($pokemonName) {
  $url = 'https://pokeapi.co/api/v2/pokemon/' . $pokemonName;
  return makeRequest($url);
}

// Example API endpoint for getting a Pokémon list
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['list'])) {
  $pokemonList = getPokemonList();
  echo json_encode($pokemonList);
}

// Example API endpoint for getting Pokémon details
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['name'])) {
  $pokemonName = $_GET['name'];
  $pokemonDetails = getPokemonDetails($pokemonName);
  echo json_encode($pokemonDetails);
}
?>
