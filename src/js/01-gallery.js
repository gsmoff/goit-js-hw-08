// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import "simplelightbox/dist/simple-lightbox.esm";

console.log(galleryItems);
const galleryContainer = document.querySelector('.gallery');
const cardsMarkup = createGalleryCardsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

function createGalleryCardsMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
        <a class="gallery__item" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
        `;
    })
        .join('');
}

const lightbox = new SimpleLightbox(".gallery a",{
    captionsData: "alt",
    captionDelay: 250,
    captionType: "alt",
    
});
