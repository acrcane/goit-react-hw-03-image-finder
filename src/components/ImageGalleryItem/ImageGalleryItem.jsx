import React from "react";
import PropTypes from "prop-types";
import Modal from "components/Modal/Modal";
// import { ListItem, GalleryImage } from "./ImageGalleryItem.styled";
import { ListItem, GalleryImage} from "./ImageGalleryItem.styled";


export default class ImageGalleryItem extends React.Component{
    state ={
        showModal: false,
    }

    toggleModal = () => {
        this.setState(({showModal})=>({
        showModal: !showModal,
        }))
    }

    render(){
        const { webformatURL, largeImageURL, tags } = this.props
        const {showModal} = this.state;

        return(
        <ListItem className="gallery-item">
            <GalleryImage src={webformatURL} alt={tags} onClick={this.toggleModal}/>
            { showModal && (<Modal onClose = {this.toggleModal}><img src={largeImageURL} alt={tags} /></Modal>)}
        </ListItem>
        )
    }
};

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
};