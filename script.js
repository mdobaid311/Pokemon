const poke_container = document.getElementById("cards");
const poke_search = document.getElementById("poke-search");
const pokemon_count = 150;
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

let pokemons = [];
let filtered;
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  pokemons.push(data);
  // console.log(pokemons);
  createPokemonCard(data);

  poke_search.addEventListener("search", (e) => {
    e.preventDefault();
    console.log(e.target.value);
    filtered = pokemons.filter((poke) => {
      return poke.name === e.target.value;
    });
    console.log(filtered);
    console.log(filtered);
    if (filtered.length === 0) {
      window.location.reload();
    } else if (filtered.length === 1) {
      poke_container.innerHTML = "";
      createPokemonCard(filtered[0]);
    }
  });
};

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon-card");
  const id = pokemon.id.toString().padStart(3, "0");
  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];
  pokemonEl.style.backgroundColor = color;

  const pokemonInnerHTML = ` <div class="img-container">
    <img
      src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"
      alt=""
    />
  </div>
  <div class="info">
    <span class="number">#${id}</span>
    <h3 class="name">${
      pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    }</h3>
    <small class="type">Type: <span>${type}</span></small> 
  </div>`;
  pokemonEl.innerHTML = pokemonInnerHTML;
  poke_container.appendChild(pokemonEl);
};

fetchPokemons();
