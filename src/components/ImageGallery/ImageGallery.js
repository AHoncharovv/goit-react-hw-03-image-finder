import { Component } from "react";
import PropTypes from 'prop-types';
import { Grid } from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ImageGalleryItem from "components/ImageGalleryItem";
import { fetchPicture } from "components/Api/fetchPicture";
import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {

    state = {
        searchPicture: null,
        error: null,
        show: false,
    }

    componentDidUpdate(PrevProps, PrevState) {
        const prevSearch = PrevProps.picture;
        const newSearch = this.props.picture;
        const prevPage = PrevProps.page;
        const newPage = this.props.page;

        if (prevSearch !== newSearch) {
            this.setState({ show: true });
            fetchPicture(newSearch,newPage)
            .then(resp => this.setState({ searchPicture: resp.hits }))
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ show: false }));
        }

        if (prevPage !== newPage && newPage !== 1) {
            this.setState({ show: true });
            fetchPicture(newSearch,newPage)
            .then(resp => {
                this.setState(prev => ({ searchPicture: [...prev.searchPicture, ...resp.hits] }))})
            .finally(() => this.setState({ show: false }));
        }
    }

    HandleClick = ClickedPicture => {
        const clickedUrl = this.state.searchPicture.find(picture => picture.webformatURL === ClickedPicture);
        this.props.clickedPictureUrl(clickedUrl.largeImageURL);
    }

    render() {
        const { searchPicture, show } = this.state;
        return (
            <>
                { show &&
                    <div className={s.loader}>
                        <Grid
                            height="50"
                            width="50"
                            color='tomato'
                            ariaLabel='loading'
                        />
                    </div>
                }
                    
                <ul className={s.imageGallery}>
                    {searchPicture &&
                        searchPicture.map((picture) => (  
                            <ImageGalleryItem
                                picture={picture}
                                key={picture.id}
                                clickedUrl={this.HandleClick}
                            />
                    ))}
                </ul>
            </>  
        )
    }
}

ImageGallery.propTypes = {
    picture: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    clickedPictureUrl: PropTypes.func.isRequired,
}
