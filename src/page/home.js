import React, { Component } from 'react';
import api from '../services/api';

import '../global.css';

class App extends Component {

    state = {
        planet: [],
        films: [],
        notFilm: ''
    }

    numFilm = [];
    films = [];
    btn
    span
    response = [];

    async componentDidMount() {
        this.getPlanet();
    }

    async getPlanet() {
        await this.setState({ planet: [] });
        this.getBtn = document.getElementById('btn');
        this.span = document.getElementById('span');

        try {

            const response = await api.get(`planets/${this.numRandom()}/`);
            await this.setState({ planet: response.data });

            if (this.state.planet.films[0]) {
                this.numFilm = [];
                await this.setState({ notFilm: "" });

                this.state.planet.films.forEach(e => {
                    const film = e;
                    const numFilm = film.charAt(film.length - 2);
                    this.numFilm.push({
                        numFilms: numFilm
                    });
                });
                
                this.getFilms(this.numFilm);
            } else {
                this.setState({ notFilm: " No film." });
                this.getBtn.classList.add("btn");
                this.getBtn.classList.remove("is-loading");
                await this.setState({ films: [] });
            }

        } catch (error) {
            this.handleError(error);
        }

    }

    async getFilms(numFilm) {

        try {
            
            this.response = [];
            await numFilm.forEach(async (e) => {
            
                let response = await api.get(`films/${e.numFilms}/`);
                
                await this.response.push({
                    title: response.data.title,
                    created: response.data.created
                })                

            });

            setTimeout(() => {
                this.setState({
                    films: this.response
                 });
            }, 2000);
             
            this.getBtn.classList.add("btn");
            this.getBtn.classList.remove("is-loading");
        } catch (error) {
            this.handleError(error);
        }
    }

    async handleReload() {
        this.getBtn = document.getElementById('btn');
        this.getBtn.classList.add("is-loading");

        this.getPlanet();
    }

    numRandom() {

        let drawn = [];
        const maxValue = 61;

        if (drawn.length === maxValue) {
            alert('No more planets :(');
        }
        let suggestion = Math.ceil(Math.random() * maxValue);
        while (drawn.indexOf(suggestion) >= 0) {
            suggestion = Math.ceil(Math.random() * maxValue);
        }
        drawn.push(suggestion);
        return suggestion;
    }

    handleError(error) {
        this.getBtn.classList.add("is-fail");
        this.span.innerHTML = "ERROR";
        alert("An error has occurred. Please try again later");
        console.log(`ERROR => ${error}`);
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <h1>{this.state.planet.name}</h1>

                    <div className="content">
                        <p>POPULATION: </p>
                        <p>{this.state.planet.population}</p>
                        <p>CLIMATE: </p>
                        <p>{this.state.planet.climate}</p>
                        <p>TERRAIN: </p>
                        <p>{this.state.planet.terrain}</p>
                    </div>

                    <div className="nfilms">
                        FEATURED IN:
                        {this.state.notFilm}
                        {this.state.films.map(filmsName => (
                            <p key={filmsName.created}>
                                {filmsName.title}
                            </p>
                        ))}
                    </div>

                </div>
                <button type="button" className="btn" id="btn" onClick={() => this.handleReload()}>
                    <span id="span">NEXT</span>
                </button>
            </div>

        );
    }
}

export default App;