import { Component } from "react";
import ImageGalleryItem from "components/ImageGalleryItem";

export default class ImageGallery extends Component {

    state = {
        searchPicture: null,
    }

    componentDidUpdate(PrevProps, PrevState) {
        const KEY = '26656666-c9df0a89ed3cb80a5684720fa';
        const prevSearch = PrevProps.picture;
        const newSearch = this.props.picture;

        if (prevSearch !== newSearch) {
            fetch(`https://pixabay.com/api/?q=${newSearch}&page=${this.props.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=4`)
                .then(response => response.json())
                .then(resp => {
                    console.log(resp.hits)
                    this.setState({ searchPicture: resp.hits })
                });
        }
    }

    render() {
        return (
        <ul className="gallery">
                {this.state.searchPicture &&
                    this.state.searchPicture.map((picture) => (  
                        <ImageGalleryItem picture={picture} key={picture.id}/>
                ))}
        </ul>
    )}
}


    // this.props.picture
    // this.props.page
