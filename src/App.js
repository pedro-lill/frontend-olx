import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Template } from './components/MainComponents';

import Rotas from './Rotas';

import Header from './components/partials/Header';
import Footer from './components/partials/Footer';

import "./App.css";

//o header e o footer sao componentes parciais
const Page = (props) => {
  return (
    <BrowserRouter>
      <Template>
        <Header />

        <Rotas />

        <Footer />
      </Template>

    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
