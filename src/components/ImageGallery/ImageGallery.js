import { Component } from "react";
import ImageGalleryItem from "components/ImageGalleryItem";
import s from './ImageGallery.module.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Grid } from 'react-loader-spinner';
export default class ImageGallery extends Component {

    state = {
        searchPicture: null,
        error: null,
        show: false,
    }

    componentDidUpdate(PrevProps, PrevState) {
        const KEY = '26656666-c9df0a89ed3cb80a5684720fa';
        const prevSearch = PrevProps.picture;
        const newSearch = this.props.picture;
        const prevPage = PrevProps.page;
        const newPage = this.props.page;

        if (prevSearch !== newSearch) {
            this.setState({ show: true });
            fetch(`https://pixabay.com/api/?q=${newSearch}&page=${newPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=6`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    return Promise.reject(new Error("Не найдено"))})
                .then(resp => this.setState({ searchPicture: resp.hits }))
                .catch(error => this.setState({ error }))
                .finally(() => this.setState({ show: false }));
        }

        if (prevPage !== newPage && newPage !== 1) {
            this.setState({ show: true });
            fetch(`https://pixabay.com/api/?q=${newSearch}&page=${newPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=6`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    return Promise.reject(new Error("Не найдено"))})
                .then(resp => {
                    this.setState(prev => ({ searchPicture: [...prev.searchPicture, ...resp.hits] }))})
                .finally(() => this.setState({ show: false }));
        }
    }

    HandleClick = ClickedUrl => {
        
        const ppp = this.state.searchPicture.find(picture => picture.webformatURL === ClickedUrl);
        console.log(ClickedUrl);
        console.log(ppp.largeImageURL);
    }

    render() {
        const { searchPicture, show } = this.state;
        return (
        <>
            {show &&
                <div className={s.loader}>
                    <Grid
                        height="50"
                        width="50"
                        color='tomato'
                        ariaLabel='loading' />
                </div>
            }
                
            <ul className={s.imageGallery}>
                {searchPicture &&
                    searchPicture.map((picture) => (  
                        <ImageGalleryItem picture={picture} key={picture.id} onclick={this.HandleClick}/>
                ))}
            </ul>
        </>  
    )}
}


    // this.props.picture
    // this.props.page
