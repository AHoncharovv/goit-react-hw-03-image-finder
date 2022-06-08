import React, { Component } from "react";
import s from './App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from "./ImageGallery";



export class App extends Component {

  state = {
    searchValue: '',
    page: 1,
  }

  HandleSubmitForm = searchValue => {
    this.setState({ searchValue });
  }

  render() {
    return (
    <div className={s.app}>
        <Searchbar onSubmit={this.HandleSubmitForm} />

        <ImageGallery picture={this.state.searchValue} page={this.state.page}/>
        


    </div>
  );
  }
};

// style={{
//         height: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}


