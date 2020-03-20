import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './Aside.css';


import { ReactComponent as IconUser } from '../../../../../assets/img/icons/person-outline.svg';
import { ReactComponent as IconHome } from '../../../../../assets/img/icons/home-outline.svg';
import { ReactComponent as IconSearch } from '../../../../../assets/img/icons/search-outline.svg';
import { ReactComponent as IconMusicalNotes } from '../../../../../assets/img/icons/musical-notes-outline.svg';
import { ReactComponent as IconStar } from '../../../../../assets/img/icons/star-outline.svg';
import photoMusic from '../../../../../assets/img/music/Five-Hours-by-Deorro.jpg';



export default function Aside(props) {

    const menuList = [
        {
            nameTitle : props.username,
            icon : <IconUser width="32px" height="32px" />,
            url : "/profile",
        },
        {
            nameTitle : "Inicio",
            icon : <IconHome width="20px" height="20px" />,
            url : "/",
        },
        {
            nameTitle : "Buscar",
            icon : <IconSearch width="20px" height="20px" />,
            url : "/search",
        },
        {
            nameTitle : "Minha Blibioteca",
            icon : <IconMusicalNotes width="20px" height="20px" />,
            url : "/my-library"
        },
        {
            nameTitle : "Favoritos",
            icon : <IconStar width="20px" height="20px" />,
            url : "/favorite",
        },
    ];



    return (
        <div className="menu-aside">
            <div className="menu-list">
                <ul>
                    {
                    menuList.map( (item) =>(
                        <li>
                            <NavLink exact to={item.url} className="menu-item" >
                                {item.icon}
                                <span className="menu-item-title ml-1">{item.nameTitle}</span>
                            </NavLink>
                        </li>
                        )
                    )
                    }
                </ul>
            </div>
            <div className="photo-song">
                <img src={photoMusic} alt="Five Hours by Deorro" />
            </div>
        </div>
    );
}