
/*

Pagina web Pokedex: Gonzalo Arechavala

Puedes ver el proyecto online en: 
https://www.arechavala.es/upgrade-hup/pokedex/

*/




// Variable donde cargamos el elemento del HTML para cargar despues los datos.
// La usaremos para cargar despues el codigo HTML generado por JS y la API.
const pokedex = document.getElementById('pokedex');

// Variables para los botones HTML.
const btnAnterior = document.querySelector(".btn-anterior");
const btnSiguiente = document.querySelector(".btn-siguiente");



// Iniciamos los valores de la paginación, de 24 en 24, y ocultanto el primer boton anterior.
let cardInicial = 1;
let cardFinal = 24;
btnAnterior.style.display = 'none';

btnSiguiente.addEventListener("click", () => {
    // console.log("diste click siguiente");
    if (cardInicial > 0){
        cardInicial += 24;
        cardFinal += 24;
        btnAnterior.style.display = 'block';
    }
    if(cardFinal > 864){
        btnSiguiente.style.display = 'none';
        btnAnterior.style.display = 'block';
    }
    pokedexApi();
});

btnAnterior.addEventListener("click", () => {
    //console.log("diste click anterior");
    if (cardInicial > 24){
        cardInicial -= 24;
        cardFinal -= 24;
        btnSiguiente.style.display = 'block';
    }
    if (cardInicial < 24){
        btnSiguiente.style.display = 'block';
        btnAnterior.style.display = 'none';
    }
    pokedexApi();
});





// Switch para cambiar el tipo de pokemon a castellano
const cambioTipo = (type) => {
    //console.log('tipo de pokemon ' + type)
    switch (type) {
        case 'grass':
            return 'Planta';
            break;
        case 'poison':
            return 'Veneno';
            break;
        case 'fire':
            return 'Fuego';
            break;
        case 'water':
            return 'Agua';
            break;
        case 'bug':
            return 'Bicho';
            break;
        case 'flying':
            return 'Volador';
            break;
        case 'normal':
            return 'Normal';
            break;
        case 'electric':
            return 'Electrico';
            break;
        case 'ground':
            return 'Tierra';
            break;
        case 'fairy':
            return 'Hada';
            break;
        case 'fighting':
            return 'Lucha';
            break;
        case 'psychic':
            return 'Psíquico';
            break;
        case 'rock':
            return 'Roca';
            break;
        case 'ice':
            return 'Hielo';
            break;
        case 'ghost':
            return 'Fantasma';
            break;
        case 'steel':
            return 'Acero';
            break;
        case 'dragon':
            return 'Dragon';
            break;
        case 'dark':
            return 'Siniestro';
            break;

        default:
            return ('XXX ' + type + ' XXX');
            break;
    }
}





// Conexión a la API.
const pokedexApi = () => {

    console.log("Inicio función pokedexApi");
    // Si las promesas de cumplen...
    // Variable array para guardar los datos de los Pokemon.
    const promesas = [];

    // Hacemos un for con el total de Pokemons que queremos cargar (por defecto 150).
    for (let index = cardInicial; index <= cardFinal; index++) {

        // Llamamos a la función con la url y el valor de cada pasada por el for.
        getPokemon(`https://pokeapi.co/api/v2/pokemon/${index}`);
    }

    // Función para conextar con la api/url y cargar por promesa los resultados.
    // Se usa un fetch con dos respuesta then (promesa y resolución).
    function getPokemon(url) {
        //console.log("Dentro de función getPokemon");
        promesas.push(
            fetch(url)
                .then((response) => response.json()));
        //console.log("Carga de la url/api");
    }

    // El segundo then se ejecuta cuando la promesa del primero, la conexión, se ha cumplido.
    Promise.all(promesas).then((results) => {
        console.log("Carga de lineas de Pokemon");

        // Cargamos los datos de los pokemon en el objeto.
        const pokemon = results.map((result) => ({
            nombre: result.name,
            imagen: result.sprites['front_default'],
            tipo: result.types.map((type) => cambioTipo(type.type.name)).join(', '),
            id: result.id
        }));
        pintamosPokemon(pokemon);
    });

    console.log("Final función pokedexApi");
};


// Dividimos el dato tipo en uno o dos palabras, para poner un span con su clase correspondiente.
const divideTipoPokemon = (tipo) => {
    let words = tipo.split(' ');
    if (words[1]) {
        //    console.log('Tenemos 2 palabras : ' + tipo);
        return (`<span class="${words[0].replace(/^[,\s]+|[,\s]+$/g, '').replace(/,[,\s]*,/g, ',').toLowerCase()}">${words[0].replace(/^[,\s]+|[,\s]+$/g, '').replace(/,[,\s]*,/g, ',')}</span>   <span class="${words[1].toLowerCase()}">${words[1]}</span>`)
    }
    return (`<span class="${words[0].toLowerCase()}">${words[0]}</span>`);
}


const pintamosPokemon = (pokemon) => {
    console.log("Inicio función pintamosPokemon");
    console.log(pokemon);

    const codigoHtml = pokemon.map((pokemonSuelto) =>
        //
        `<li class="card">
            <img class="card-image" src="${pokemonSuelto.imagen}"/>
            <h2 class="card-title">${pokemonSuelto.id} - ${pokemonSuelto.nombre}</h2>
            <p class="card-subtitle">Tipo: ${divideTipoPokemon(pokemonSuelto.tipo)}</p>
        </li>`).join('');
    pokedex.innerHTML = codigoHtml;
    console.log("Final función pintamosPokemon");
};

pokedexApi();


