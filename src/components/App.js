import React, { Component } from "react";
import s from './App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from "./ImageGallery";
import Button from "./Button";

export class App extends Component {

  state = {
    searchValue: '',
    page: 1,
  }

  HandleSubmitForm = searchValue => {
    this.setState({ searchValue, page: 1 });
  }
  
  HandleButtonLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { page, searchValue } = this.state;
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.HandleSubmitForm} />

        <ImageGallery picture={searchValue} page={page} />
        
        {searchValue && <Button onClick={this.HandleButtonLoadMore}/>}
        
      
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


