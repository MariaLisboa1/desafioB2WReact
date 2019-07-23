import React, { Component } from 'react';
import api from '../services/api';

import '../global.css';

class App extends Component {

    state = {
        planet: [],
        films: []
    }

    numFilm = [];
    films = [];

    async componentDidMount() {
        const response = await api.get(`planets/1/`);
        this.setState({ planet: response.data });

        if (this.state.planet.films[0]) {
            this.state.planet.films.forEach(e => {
                const film = e;
                const numFilm = film.charAt(film.length - 2);
                this.numFilm.push({
                    numFilms: numFilm
                });
               
            });
            this.getFilms(this.numFilm);
            
        }

        
    }

    async getFilms(numFilm) {
        
        await numFilm.forEach( async (e) =>  {
            const response = await api.get(`films/${e.numFilms}/`);
            this.films.push({
                films: response.data.title
            });
        });


       
        
        await 

        setTimeout(() => {
            this.setState({films: this.films});
        }, 2000);
        
    }

    async handleReload() {
        this.state.planet = [];
        const response = await api.get(`planets/3/`);
        this.setState({ planet: response.data });
        
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
                    
                    {this.state.films.map(filmsName => (
                        <p key={filmsName.films}>
                           {filmsName.films}
                        </p>
                    ))}
                    
                    </div>
              
                </div>

                <button type="button" onClick={() => this.handleReload()}>NEXT</button>
            </div>

        );
    }
}

export default App;