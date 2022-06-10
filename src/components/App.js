import React, { Component } from "react";
import s from './App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import Modal from './Modal';

export class App extends Component {

  state = {
    searchValue: '',
    page: 1,
    modalUrl: null,
  }

  HandleSubmitForm = searchValue => {
    this.setState({ searchValue, page: 1, modalUrl: null });
  }
  
  HandleButtonLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  ModalUrl = url => {
    this.setState({ modalUrl: url });
  }

  ModalClose = () => {
    this.setState({ modalUrl: null });
  }

  render() {

    const { page, searchValue, modalUrl } = this.state;

    return (
      <div className={s.app}>

        <Searchbar onSubmit={this.HandleSubmitForm} />

        {modalUrl && <Modal url={modalUrl} onClick={this.ModalClose} />}

        <ImageGallery picture={searchValue} page={page} clickedPictureUrl={this.ModalUrl} />
        
        {searchValue && <Button onClick={this.HandleButtonLoadMore} />}
        
      </div>
    );
  }
};