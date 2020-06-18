import React from 'react';
import { NavLink } from 'react-router-dom';

import './Aside.css';


import { ReactComponent as IconUser } from '../../../../../assets/img/icons/person-outline.svg';
import { ReactComponent as IconHome } from '../../../../../assets/img/icons/home-outline.svg';
import { ReactComponent as IconSearch } from '../../../../../assets/img/icons/search-outline.svg';
import { ReactComponent as IconMusicalNotes } from '../../../../../assets/img/icons/musical-notes-outline.svg';
import { ReactComponent as IconHeart } from '../../../../../assets/img/icons/heart-outline.svg';
import { ReactComponent as IconLogOut } from '../../../../../assets/img/icons/log-out-outline.svg';


export default function Aside(props) {

    const menuList = [
        {
            nameTitle : props.username,
            icon : <IconUser width="32px" height="32px" />,
            url : "/profile",
            exactEnable: true
        },
        {
            nameTitle : "Inicio",
            icon : <IconHome width="20px" height="20px" />,
            url : "/",
            exactEnable: true
        },
        {
            nameTitle : "Buscar",
            icon : <IconSearch width="20px" height="20px" />,
            url : "/search",
            exactEnable: true,
        },
        {
            nameTitle : "Minha Blibioteca",
            icon : <IconMusicalNotes width="20px" height="20px" />,
            url : "/my-library/playlists",
            exactEnable: false
        },
        {
            nameTitle : "Favoritos",
            icon : <IconHeart width="20px" height="20px" />,
            url : "/favorite",
            exactEnable: true
        },
        {
            nameTitle : "Sair",
            icon : <IconLogOut width="20px" height="20px" />,
            url : "/logout",
            exactEnable: true
        },
    ];



    return (
        <aside className="menu-aside">
            <nav className="menu-list">
                <ul>
                    {
                    menuList.map( (item) =>(
                        <li key={item.url} >
                            <NavLink exact={item.exactEnable} to={item.url} className="menu-item" activeClassName="active" >
                                {item.icon}
                                <span className="menu-item-title ml-1">{item.nameTitle}</span>
                            </NavLink>
                        </li>
                        )
                    )
                    }
                </ul>
            </nav>
        </aside>
    );
}