import { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/themeContext";
import colorsResource from '../res/colors';

const useColors = () => {
    const { theme } = useContext(ThemeContext);
    const [colors, setColors] = useState({});

    useEffect(() => {
        setColors(colorsResource[theme])
    }, [theme])

    return colors
};

export default useColors;
