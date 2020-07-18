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
      searchResponse: [],
      foodResponse: [],
      catResponse: [],
      dogResponse: [],
      computerResponse: [],
      loading: true
    };
  }

 componentDidMount() {
   this.performSearch();
  }

  performSearch = (query) => {
    let pics = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=african_american_women&per_page=24&format=json&nojsoncallback=1`;

    let searches = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;

    let food = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=food&per_page=24&format=json&nojsoncallback=1`;

    let cats = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`;

    let dogs = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`;

    let computers= `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`;

    const picRequest = axios.get(pics);
    const searchRequest = axios.get(searches);
    const foodRequest = axios.get(food);
    const catsRequest = axios.get(cats);
    const dogsRequest = axios.get(dogs);
    const computersRequest = axios.get(computers);

    axios.all([picRequest, searchRequest, foodRequest, catsRequest, dogsRequest, computersRequest])
    .then(axios.spread((...responses) => {
      this.setState({
        picResponse: responses[0].data.photos.photo,
        searchResponse: responses[1].data.photos.photo,
        foodResponse: responses[2].data.photos.photo,
        catResponse: responses[3].data.photos.photo,
        dogResponse: responses[4].data.photos.photo,
        computerResponse: responses[5].data.photos.photo,
        loading: false
      })
    }))
    .catch(error => {
      console.log('Houston, we have a problem fetching and parsing data', error);
    })

  }

  render() {
    console.log(this.state.picResponse);
    console.log(this.state.foodResponse);
    console.log(this.state.catResponse);
    console.log(this.state.dogResponse);
    console.log(this.state.computerResponse);
    return(
      <BrowserRouter>
        <div className='container'>
          <SearchForm onSearch={this.performSearch}/>
          <Nav />

          <Switch>
            <Route exact path='/' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.picResponse} /> }/>


            <Route path='/search/:query' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.searchResponse} /> }/>


            <Route path='/food' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.foodResponse} /> }/>


            <Route path='/cats' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.catResponse}/> }/>


            <Route path='/dogs' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.dogResponse}/> }/>


            <Route path='/computers' render= { () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.computerResponse}/> }/>


            <Route render={ () => <NotFound /> }/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
};
