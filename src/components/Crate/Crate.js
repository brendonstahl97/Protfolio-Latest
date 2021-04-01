import React from 'react';

import CrateTop from '../../Assets/img/Crate_Top.png';
import CrateOpen from '../../Assets/img/Crate_Open.png';

export default function Crate(props) {
    return (
        <div className='crateContainter mt-5'>
            <img className='crateTop' alt='Crate Top' src={CrateTop}></img>
            <img className='crateOpen' alt='Crate Open' src={CrateOpen}></img>
        </div>
    );
};
