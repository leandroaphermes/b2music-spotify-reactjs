import React from 'react';

import { ReactComponent as IconUser } from '../../../../assets/img/icons/person-outline.svg';
import { ReactComponent as IconHome } from '../../../../assets/img/icons/home-outline.svg';
import { ReactComponent as IconSearch } from '../../../../assets/img/icons/search-outline.svg';
import { ReactComponent as IconMusicalNotes } from '../../../../assets/img/icons/musical-notes-outline.svg';
import { ReactComponent as IconStar } from '../../../../assets/img/icons/star-outline.svg';
import photoMusic from '../../../../assets/img/music/Five-Hours-by-Deorro.jpg';

const menuList = [
    {
        nameTitle : "Inicio",
        icon : <IconHome width="20px" height="20px" />,
        url : "/",
        active : true,
    },
    {
        nameTitle : "Buscar",
        icon : <IconSearch width="20px" height="20px" />,
        url : "/search",
        active : false,
    },
    {
        nameTitle : "Minha Blibioteca",
        icon : <IconMusicalNotes width="20px" height="20px" />,
        url : "/my-library",
        active : false,
    },
    {
        nameTitle : "Favoritos",
        icon : <IconStar width="20px" height="20px" />,
        url : "/favorite",
        active : false,
    },
]


const Aside = (props) => (
    <div class="menu-aside p-3">
        <a href="/profile">
            <div class="header-user">
                <div class="icon-user">
                    <IconUser width="32px" height="32px" />
                </div>
                <span class="header-user-name ml-1">{props.username}</span>
            </div>
        </a>

        <div class="menu-list">
            <ul>
                {
                menuList.map( (item, index) =>(
                    <li class={`menu-item ${ (item.active) ? `active` : `` } `}>
                        <a key={index} href={item.url}>
                            {item.icon}
                            <span class="menu-item-title ml-1">{item.nameTitle}</span>
                        </a>
                    </li>
                    )
                )
                }
            </ul>
        </div>
        <div class="photo-song">
            <img src={photoMusic} alt="Five Hours by Deorro" />
        </div>
    </div>
); 

export default Aside;