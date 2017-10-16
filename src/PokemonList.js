import React, { Component } from 'react';
import Pokemon from './Pokemon';
import fetch from 'isomorphic-fetch';

//The PokemonList component shows nothing when it mounts for the first time.
//But right before it mounts on to the DOM, it makes an
//API call to fetch the first 151 Pokemon from the API and
//then displays them using the Pokemon Component
class PokemonList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			species : [],
			fetched : false,
			loading : false,
		};
	}

	componentWillMount() {
		this.setState({
			loading : true
		});
		fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
			.then(res => {
				return res.json();
			})
			.then(res => {
				this.setState({
					species : res.results,
					loading : true,
					fetched : true
				});
			});
	}

	renderPokemonList(species) {
		const pkmnList = species.map((pokemon, index) => <Pokemon key={ pokemon.name } id={ index + 1 } pokemon={ pokemon }/>);

		return (
			<div className="pokemon--species--list">
				{ pkmnList }
			</div>
		);
	}

	render() {
		const { fetched, loading, species } = this.state;
		const content = fetched ?
			this.renderPokemonList(species) :
			loading ?
				<p> Loading ...</p> :
				null;

		return	content;
	}
}

export default PokemonList;
