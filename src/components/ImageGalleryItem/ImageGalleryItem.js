export default function ImageGalleryItem({ picture }) {
    return (
        <li className="gallery-item">
            <img src={picture.webformatURL} alt="" />
        </li>
    )
}