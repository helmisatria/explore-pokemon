const DB_NAME = 'pokedex'
const DB_VERSION = 1

let db

if (process.client) {
  const request = indexedDB.open(DB_NAME, DB_VERSION)

  request.onsuccess = (event) => {
    db = event.target.result
  }

  request.onerror = (event) => {
    // Handle errors.
  }

  request.onupgradeneeded = (event) => {
    const db = event.target.result

    const pokemonsObjectStore = db.createObjectStore('pokemons', { keyPath: 'name' })
    const pokemonDetailObjectStore = db.createObjectStore('pokemon_detail', { keyPath: 'name' })

    pokemonsObjectStore.createIndex('name', 'name', { unique: true })
    pokemonDetailObjectStore.createIndex('name', 'name', { unique: true })
  }
}

const createStore = (name) => {
  const transaction = db?.transaction([name], 'readwrite')

  return transaction?.objectStore(name)
}

export const insertPokemons = (listPokemon) => {
  const store = createStore('pokemons')

  listPokemon.forEach((pokemon) => {
    store?.put(pokemon)
  })
}

export const insertPokemonDetail = (pokemon) => {
  const store = createStore('pokemon_detail')

  store?.put(pokemon)
}
