import React from "react";
import AccItem from "./Accitem.js";
import { useStyle } from "../styleContext.js";
import { useState, useEffect } from "react";

function DropDownAcc({ openclass }) {
  const { style, updateStyle } = useStyle();
  const [isContrast, setContrast] = useState(false);
  const [isFont, setFont] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [isBack, setBack] = useState(false);
  const [fontSize, setFontSize] = useState(15);
  useEffect(() => {
    // Este efecto se ejecuta cuando cambian los estados relevantes
    console.log('isFont:', isFont, 'fontSize:', fontSize, 'style.font:', style.font);
    if (isFont !== style.font) {
      // Si isFont y style.font son diferentes, actualiza el estilo
      updateStyle({ font: !style.font });
    }
    if (fontSize !== style.fontSize) {
      // Si el tamaño de fuente es diferente, actualiza el estilo
      updateStyle({ fontSize: fontSize });
    }
  }, [isFont, fontSize, style.font, style.fontSize]);


  const handleContrast = () => {
    setDarkMode(false);
    updateStyle({ darkMode: false });
    updateStyle({ highContrast: !style.highContrast });
    setBack(false);
  };

  const handleSize = () => {
    setBack(false);
    
    
  };  

  const handleDarkMode = () => {
    setContrast(false);
    setBack(false);
    updateStyle({ highContrast: false });
    updateStyle({ darkMode: !style.darkMode });
  }

  const handleReestablecer = () => {
    setContrast(false); setDarkMode(false); setFont(false);
    updateStyle({ highContrast: false });
    updateStyle({ fontSize: false });
    updateStyle({ darkMode: false });
    updateStyle({ back: !style.back });

  }

  return (
    <div className={openclass} id="drop_menu">
        <AccItem handle={handleContrast} text={"Alto Contraste"} setToggle={setContrast} isToggled={isContrast}/>
        <AccItem handle={handleSize} text={"Aumentar Fuente"} setFontSize={setFontSize} font={true} fontSize={fontSize}  setToggle={setFont} isToggled={isFont}/>
        <AccItem handle={handleDarkMode} text={"Modo Nocturno"} setToggle={setDarkMode} isToggled={isDarkMode}/>
        <AccItem handle={handleReestablecer} text={"Reestablecer"} setToggle={setBack} isToggled={isBack}/>
    </div>
  );
}

export default DropDownAcc;
