import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const ImportantePage = () => {
    const {theme} = useContext(ThemeContext);
   
    return (
        <>
        <div>
            <h1>Dados Importantes</h1>
             <span>{ theme }</span>
        </div>
        </>
    );
};

export default ImportantePage;