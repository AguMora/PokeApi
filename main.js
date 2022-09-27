const pokeCard = document.querySelector("[data-poke-card]");
const pokeName = document.querySelector("[data-poke-name]");
const pokeImg = document.querySelector("[data-poke-img]");
const pokeImgContainer = document.querySelector("[data-poke-img-container]");
const pokeId = document.querySelector("[data-poke-id]");
const pokeTypes = document.querySelector("[data-poke-types]");
const pokeStats = document.querySelector("[data-poke-stats]");


const searchPokemon = event => {
    event.preventDefault();
    const {value} = event.target.pokemon;
    if (!value) {
        mostrarError();
        return;
    }
      fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
          .then(data => data.json())
          .then(response => renderPokemonData(response))
          .catch(err=> renderNotFound())          
}

const mostrarError = () => {
    pokeName.textContent = "Ingrese un valor";
     pokeImg.setAttribute("src", "./assets/pokebola.png");
     pokeImg.style.background = "#fff";
     pokeTypes.innerHTML= "";
     pokeStats.innerHTML= "";
     pokeId.textContent= "";
  };


const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const {stats, types} = data;

     pokeName.textContent = data.name;
     pokeImg.setAttribute("src", sprite);
     pokeId.textContent = `N° ${data.id}`
     setCardColor(types);
     renderPokemonTypes(types);
     renderPokemonStats(stats);
          
}


const setCardColor = types => {
    pokeImg.style.background = "#fafafa";
}


const renderPokemonTypes = types => {
    pokeTypes.innerHTML = "";
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = "#000000";
        typeTextElement.textContent = type.type.name; 
        pokeTypes.appendChild(typeTextElement);
    });
}


const renderPokemonStats = stats => {
    pokeStats.innerHTML = "";
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat; 
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    })
}


 const renderNotFound = () => {
     pokeName.textContent = "No encontrado";
     pokeImg.setAttribute("src", "./assets/pokebola.png");
     pokeImg.style.background = "#fff";
     pokeTypes.innerHTML= "";
     pokeStats.innerHTML= "";
     pokeId.textContent= "";
 }

