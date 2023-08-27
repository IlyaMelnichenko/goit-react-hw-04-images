import { ImageGalleryItem } from "../imageGalleryItem/ImageGalleryItem"
import { StyledGalleryList } from "./StyledImageGallery"

export const ImageGallery=({images})=>{
    return(
        <StyledGalleryList>
            {images.map(image=>{
                return <li key={image.id}>
                    <ImageGalleryItem image={image}/>
                </li>
            })}
        </StyledGalleryList>
    )
}