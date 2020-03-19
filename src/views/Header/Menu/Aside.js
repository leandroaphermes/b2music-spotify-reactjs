import React from 'react';

import iconUser from '../../../assets/img/icons/person-outline.svg';

const Aside = (props) => (
    <div class="menu-aside p-3">
        <a href="/profile">
            <div class="header-user">
                <div class="icon-user">
                    <img src={iconUser} alt=""/>
                </div>
                <span class="header-user-name ml-1">{props.username}</span>
            </div>
        </a>

        <div class="menu-list">
            <ul>

                <li class="menu-item active">
                    <a href="index.html">
                        <ion-icon name="home-outline"></ion-icon>
                        <span class="menu-item-title ml-1">Inicio</span>
                    </a>
                </li>

                <li class="menu-item">
                    <a href="search.html">
                        <ion-icon name="search-outline"></ion-icon>
                        <span class="menu-item-title ml-1">Buscar</span>
                    </a>
                </li>

                <li class="menu-item">
                    <a href="my-library.html">
                        <ion-icon name="musical-notes-outline"></ion-icon>
                        <span class="menu-item-title ml-1">Minha Biblioteca</span>
                    </a>
                </li>

                <li class="menu-item">
                    <a href="favorite.html">
                        <ion-icon name="star-outline"></ion-icon>
                        <span class="menu-item-title ml-1">Favoritos</span>
                    </a>
                </li>

            </ul>
        </div>
{/*         <div class="photo-song">
            <img src="assets/img/Five-Hours-by-Deorro.jpg" alt="Five Hours by Deorro">
        </div> */}
    </div>
); 

export default Aside;