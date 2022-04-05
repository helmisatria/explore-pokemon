const DB_NAME = 'pokedex'
const DB_VERSION = 1

let idxDB

export const openDB = () => {
  return indexedDB.open(DB_NAME, DB_VERSION)
}

if (process.client) {
  const request = openDB()

  request.onsuccess = (event) => {
    idxDB = event.target.result
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

const createStore = (db = idxDB, name) => {
  const transaction = db?.transaction([name], 'readwrite')

  return transaction?.objectStore(name)
}

export const insertPokemons = (listPokemon, db = idxDB) => {
  const store = createStore(db, 'pokemons')

  listPokemon.forEach((pokemon) => {
    store?.put(pokemon)
  })
}

export const insertPokemonDetail = (pokemon, db = idxDB) => {
  const store = createStore(db, 'pokemon_detail')

  store?.put(pokemon)
}
