import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './app/Stylesheets/MainPageStyle.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from './app/React-Components/header';
import { Provider } from 'react-redux';
import MainPage from './app/React-Components/MainPage';
import AllBooksDetails from './app/React-Components/AllBooksDetails.js';
import configureStore from './app/store/configureStore.js';

const store = configureStore();

class App extends Component {
  render() {
    const err = () => {
      return (
        <div>
          <h1> Error!!</h1>
          <p> Page does not exist</p>
        </div>
      )
    }
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/"
                component={() => <MainPage />} exact />
              <Route path="/Home"
                component={() => <MainPage />} exact />
              <Route path="/AllBooksDetails" component={AllBooksDetails} exact />
              <Route component={err} />
            </Switch>
          </div>

        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
