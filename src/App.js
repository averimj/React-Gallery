import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

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
      food: []
    };
  }

  componentDidMount() {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=food&per_page=24&format=json&nojsoncallback=1`)
      .then( response => response.json() )
      .then(responseData => {
        this.setState( { food: responseData.photos.photo });
      })
      .catch(error => {
        console.log('Houston, we have a problem fetching data', error);
      })

  }
  render() {
    return(
      <BrowserRouter>
        <div className='container'>
          <SearchForm />
          <Nav />
          <Switch>
            <Route exact path='/' render={ () => <Redirect to='/food' /> }/>
            <Route path='/food' render={ () => <PhotoList data={this.state.food}/> }/>
            <Route path='/cats' render={ () => <PhotoList /> }/>
            <Route path='/dogs' render={ () => <PhotoList /> }/>
            <Route path='/computers' render= { () => <PhotoList /> }/>
            <Route render={ () => <NotFound /> }/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
};
