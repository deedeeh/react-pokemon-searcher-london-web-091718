import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const API = 'http://localhost:3000/pokemon'

class PokemonPage extends React.Component {
  state = {
    pokemons: [],
    searchTerm: ''
  }

  componentDidMount() {
    this.getPokemons()
  }

  getPokemons = () => {
    fetch(API)
      .then(resp => resp.json())
      .then(data => 
        this.setState({
          pokemons: [...data]
        })
      )
  }

  handleSearchChange = event => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  filterPokemons = () => {
    return this.state.pokemons.filter(pokemon => pokemon.name.includes(this.state.searchTerm))
  }

    addNewPokemon = (newp) => {
      // add the new pokemone to the array of all pokemon
      this.setState({
        pokemons: [...this.state.pokemons, newp]
      })
      fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newp)
      }).then(resp => resp.json())
  }

  render() {
    const filterPokemons = this.filterPokemons()
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={this.handleSearchChange} showNoResults={false} />
        <br />
        <PokemonCollection pokemons={ filterPokemons }/>
        <br />
        <PokemonForm addNewPokemon={this.addNewPokemon} />
      </div>
    )
  }
}

export default PokemonPage
