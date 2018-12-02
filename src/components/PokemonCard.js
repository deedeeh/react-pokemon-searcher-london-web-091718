import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state = {
    clicked: false
  }

  handleCardClick = () => {
    this.setState({clicked: !this.state.clicked})
  }

  render() {
    const { pokemon } = this.props
    const foundState = pokemon.stats ? pokemon.stats.find(stat => stat.name === 'hp') : undefined
    return (
      <Card onClick={this.handleCardClick}>
        <div>
          <div className="image">
        {!this.state.clicked 
          ? <img src={pokemon.sprites ? pokemon.sprites.front : pokemon.frontUrl} alt={pokemon.name} />
          : <img src={pokemon.sprites ? pokemon.sprites.back : pokemon.backUrl} alt={pokemon.name} />
        }
          </div>
          <div className="content">
            <div className="header">{pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {foundState ? foundState.value : pokemon.hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
