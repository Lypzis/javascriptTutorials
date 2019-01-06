import { elements } from './base';
import { limitRecipeTitle } from './searchView';

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';

    // selects the 'use' child element of 'recipe__love' just like in CSS and then
    // changes its 'href' attribute.
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
}

export const  toggleLikeMenu = numLikes => {
    // can be done in css
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
} 

export const renderLike = like => {
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>`;

    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
    // select the parent node of 'likes__link', the 'li', and removes it from the list
    const el = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;

    if(el) el.parentElement.removeChild(el);
}