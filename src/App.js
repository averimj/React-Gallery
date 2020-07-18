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
      foodResponse: [],
      catsResponse: [],
      dogsResponse: [],
      computersResponse: [],
      loading: true
    };
  }

 componentDidMount() {
   let pics = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=african_american_women&per_page=24&format=json&nojsoncallback=1`;

   let food = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=food&per_page=24&format=json&nojsoncallback=1`;

   let cats = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`;

   let dogs = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`;

   let computers= `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`;

   const picRequest = axios.get(pics);
   const foodRequest = axios.get(food);
   const catsRequest = axios.get(cats);
   const dogsRequest = axios.get(dogs);
   const computersRequest = axios.get(computers);

   axios.all([picRequest, foodRequest, catsRequest, dogsRequest, computersRequest])
   .then(axios.spread((...responses) => {
     this.setState({
       picResponse: responses[0].data.photos.photo,
       foodResponse: responses[1].data.photos.photo,
       catsResponse: responses[2].data.photos.photo,
       dogsResponse: responses[3].data.photos.photo,
       computersResponse: responses[4].data.photos.photo,
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
    console.log(this.state.catsResponse);
    console.log(this.state.dogsResponse);
    console.log(this.state.computersResponse);
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
              : <PhotoList data={this.state.picResponse} /> }/>


            <Route path='/food' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.foodResponse} /> }/>


            <Route path='/cats' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.catsResponse}/> }/>


            <Route path='/dogs' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.dogsResponse}/> }/>


            <Route path='/computers' render= { () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.computersResponse}/> }/>


            <Route render={ () => <NotFound /> }/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
};
