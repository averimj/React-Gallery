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
      pics: [],
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'african american women') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          pics: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Houston, we have a problem fetching and parsing data', error);
      }
    );
  }

  render() {
    console.log(this.state.pics);
    return(
      <BrowserRouter>
        <div className='container'>
          <SearchForm onSearch={this.performSearch}/>
          <Nav />

          <Switch>
            <Route exact path='/' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.pics} /> }/>


            <Route path='/search/:query' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.pics} /> }/>


            <Route path='/food' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.pics} /> }/>


            <Route path='/cats' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.pics}/> }/>


            <Route path='/dogs' render={ () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.pics}/> }/>


            <Route path='/computers' render= { () =>
              (this.state.loading)
              ? <h2>Loading</h2>
              : <PhotoList data={this.state.pics}/> }/>


            <Route render={ () => <NotFound /> }/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
};
