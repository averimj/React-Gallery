import React from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import './css/index.css';
import './config';

//App components
import Photo from './components/Photo';
import NotFound from './components/NotFound';
import SearchForm from './components/SearchForm';
import PhotoList from './components/PhotoList';

const App = () => (
  <BrowserRouter>
    <div className="container">
      <Route exact path="/" render={ () => <Photo/> } />
      <Route  path="/notfound" render={ () => <NotFound/> } />
      <Route  path="/searchform" render={ () => <SearchForm /> } />
      <Route  path="/photolist" render={ () => <PhotoList /> } />
    </div>
  </BrowserRouter>
);

export default App;
