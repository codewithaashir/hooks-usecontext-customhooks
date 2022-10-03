import React, { useContext } from 'react';
import ThemeContext from '../context/themeContext';
import useColors from '../hooks/useColors';

function Home(props) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const colors = useColors();

    return (
        <div className="home-container" style={{ backgroundColor: colors.background }} >
            <div style={{ color: colors.text }}>Hello Js Enthusiast!</div>
            <button onClick={toggleTheme} >
                Switch to {theme === 'light' ? 'dark' : 'light'} mode
            </button>
        </div>
    );
}

export default Home;