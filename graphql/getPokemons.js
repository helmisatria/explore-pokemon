export const getPokemonsQuery = `query getPokemons($limit: Int, $offset: Int, $name: String = "") {
  species: pokemon_v2_pokemonspecies(order_by: {id: asc}, limit: $limit, offset: $offset, where: {name: {_ilike: $name}}) {
    id
    name
    pokemons: pokemon_v2_pokemons(order_by: {id: asc}) {
      id
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          id
          name
        }
      }
    }
  }
  types: pokemon_v2_type {
    id
    name
  }
  species_aggregate: pokemon_v2_pokemonspecies_aggregate(where:{ name: {_ilike: $name}}) {
    aggregate {
      count
    }
  }
}
`

export const getPokemonsAdvancedQuery = `query getAdvancedPokemons($limit: Int, $offset: Int, $name: String = "%", $typeIds: [Int!] = []) {
  species: pokemon_v2_pokemonspecies(order_by: {id: asc}, limit: $limit, offset: $offset, where: {_and: {name: {_ilike: $name}, pokemon_v2_pokemons: {pokemon_v2_pokemontypes: {type_id: {_in: $typeIds}}}}}) {
    id
    name
    pokemons: pokemon_v2_pokemons(order_by: {id: asc}) {
      id
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          id
          name
        }
      }
    }
  }
  types: pokemon_v2_type {
    id
    name
  }
  species_aggregate: pokemon_v2_pokemonspecies_aggregate(where: {_and: {name: {_ilike: $name}, pokemon_v2_pokemons: {pokemon_v2_pokemontypes: {type_id: {_in: $typeIds}}}}}) {
    aggregate {
      count
    }
  }
}

`
