import React from 'react';

import HaderMenuAside from './Menu/Aside/Aside';

const Header = (props) => (
    <header>
        <HaderMenuAside username={props.username} />
    </header>
);

export default Header;