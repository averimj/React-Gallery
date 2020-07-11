import React from 'react';
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


const App = () => (
  <BrowserRouter>
    <div className='container'>
      <SearchForm />
      <Nav />
      <Switch>
        <Route exact path='/' render={ () => <Redirect to='/cats' /> }/>
        <Route path='/cats' render={ () => <PhotoList /> }/>
        <Route path='/dogs' render={ () => <PhotoList /> }/>
        <Route path='/computers' render= { () => <PhotoList /> }/>
        <Route render={ () => <NotFound /> }/>
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
