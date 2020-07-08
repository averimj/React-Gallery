import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';
import './css/index.css';
import './config';

//App components
import Nav from './components/Nav';
import NotFound from './components/NotFound';
import SearchForm from './components/SearchForm';
import PhotoList from './components/PhotoList';


class App extends Component{
  constructor() {
    super();
    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    /*end point*/
      /*'https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg'*/

      /* one of these needs a &q for query for searching
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`
      or something similar that includes a SEARCH, PER PAGE and APIKEY `https://www.flickr.com/search/?q=${query}`*/
  }

  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1df2f028fffc01a25570343da2f4ec96&tags=cats&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        photos: response.data.photos
      })
    })
    .catch(error => {
      console.log('Houston, we have a problem!', error)
    });
  }

 render() {
   console.log(this.state.photos.photo);
   return(
     <BrowserRouter>
      <div className="container">
        <SearchForm onSearch={this.performSearch} />
        <Nav />
        <PhotoList data={this.state.photos} />
        <Switch>
            <Route exact path="/" render={ () => <PhotoList /> } />
            <Route path="/cats" render={ () => <PhotoList /> } />
            <Route path="/dogs" render={ () => <PhotoList /> } />
            <Route path="/computers" render={ () => <PhotoList /> } />
            <Route render={ () => <NotFound /> } />
        </Switch>
      </div>
     </BrowserRouter>
   )
 }

}

export default App;
