import React, { useMemo, useState } from 'react';
import Home from './containers/Home';
import ThemeContext from './context/themeContext';

function App(props) {
    const [theme, setTheme] = useState('light');

    const themeContext = useMemo(() => {
        return {
            theme,
            toggleTheme: () => {
                setTheme(theme === "light" ? "dark" : "light");
            }
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={themeContext} >
            <Home />
        </ThemeContext.Provider>
    );
}

export default App;