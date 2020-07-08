import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import './css/index.css';
import './config';

//App components
import Nav from './components/Nav';
import NotFound from './components/NotFound';
import SearchForm from './components/SearchForm';
import PhotoList from './components/PhotoList';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    fetch()
    .then(response => response.json())
    .then(responseData => {
      this.setState({ photos: responseData.photos.photo})
    })
    .catch(error => {
      console.log('Houston, we have a problem!', error)
    });

  }

  render() {
    return(
      console.log(this.state.photos)
      <BrowserRouter>
        <div className="container">
          <Switch>
            <SearchForm />
            <Nav />
              <Route exact path="/" render={ () => <PhotoList/> } />
              <Route path="/cats" render={ () => <PhotoList/> } />
              <Route path="/dogs" render={ () => <PhotoList/> } />
              <Route path="/computers" render={ () => <PhotoList/> } />
              <Route path="/notfound" render={ () => <NotFound/> } />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
