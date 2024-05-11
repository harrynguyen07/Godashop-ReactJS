import React from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function ProductSlide({ product }) {
    const images = [
        {
            original: product.featured_image,
            thumbnail: product.featured_image,
        }
    ];

    // Dấu ({}) để phân biệt object với thân hàm
    const moreImage = product.thumbnailItems.map((thumbnailItems) => ({
        original: thumbnailItems.name,
        thumbnail: thumbnailItems.name,
    })
    );

    const AllImages = [...images, ...moreImage];
    return <ImageGallery items={AllImages} showNav={false} showPlayButton={false} />;
}
