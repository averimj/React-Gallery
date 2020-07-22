import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';

// App Components
import PhotoList from './components/PhotoList';
import NotFound from './components/NotFound';
import Nav from './components/Nav';
import SearchForm from './components/SearchForm';
import apiKey from './config';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      picResponse: [],
      fruitResponse: [],
      snowResponse: [],
      planeResponse: [],
      dolphinResponse: [],
      loading: true
    };
  }

 componentDidMount() {
   this.performSearch();
  }

  performSearch = (query = 'african_american_women') => {
    let pics = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;

    let fruit = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=fruit&per_page=24&format=json&nojsoncallback=1`;

    let snow = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=snow&per_page=24&format=json&nojsoncallback=1`;

    let planes = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=fighter_jets&per_page=24&format=json&nojsoncallback=1`;

    let dolphins= `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dolphines&per_page=24&format=json&nojsoncallback=1`;

    const picRequest = axios.get(pics);
    const fruitRequest = axios.get(fruit);
    const snowRequest = axios.get(snow);
    const planesRequest = axios.get(planes);
    const dolphinsRequest = axios.get(dolphins);

    axios.all([picRequest, fruitRequest, snowRequest, planesRequest, dolphinsRequest])
    .then(axios.spread((...responses) => {
      this.setState({
        picResponse: responses[0].data.photos.photo,
        fruitResponse: responses[1].data.photos.photo,
        snowResponse: responses[2].data.photos.photo,
        planeResponse: responses[3].data.photos.photo,
        dolphinResponse: responses[4].data.photos.photo,
        loading: false
      })
    }))
    .catch(error => {
      console.log('Houston, we have a problem fetching and parsing data', error);
    })

  }

  render() {
    console.log(this.state.picResponse);
    console.log(this.state.fruitResponse);
    console.log(this.state.snowResponse);
    console.log(this.state.planeResponse);
    console.log(this.state.dolphinResponse);
    return(
      <BrowserRouter>
        <div className='container'>
          <SearchForm onSearch={this.performSearch}/>
          <Nav />

          <Switch>
            <Route exact path='/' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.picResponse} />
            }/>


            <Route path='/search/:query' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.picResponse} />
            }/>


            <Route path='/fruit' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.fruitResponse} />
            }/>


            <Route path='/snow' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.snowResponse}/>
            }/>


            <Route path='/fighter_jets' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.planeResponse}/>
            }/>


            <Route path='/dolphines' render= { () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.dolphinResponse}/>
            }/>


            <Route render={ () => <NotFound /> }/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
};
