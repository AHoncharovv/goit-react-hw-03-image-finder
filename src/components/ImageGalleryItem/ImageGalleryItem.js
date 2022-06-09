import { Component } from "react";
import s from './ImageGalleryItem.module.css'

export default class ImageGalleryItem extends Component {

    onClick = event => {
        this.props.onclick(event.currentTarget.src)
    }
    
    render() {
        return (
        <li className={s.imageGalleryItem}>
                <img src={this.props.picture.webformatURL} alt="galleryItemImage" className={s.imageGalleryItemImage} onClick={this.onClick}/>
        </li>
    )
    }
    
}