import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AccItem({ text, handle, setToggle, isToggled, setFontSize, fontSize, font }) {
  const [manualChange, setManualChange] = useState(false);

  const handleToggle = () => {
    setToggle(!isToggled);
    
        if (text === "Aumentar Fuente") {setFontSize(15);}
        handle();
    
  };

  const handleFontSizeChange = (e) => {
      setFontSize(e.target.value);
      setManualChange(true);
  };

  const handleFontSizeChangeComplete = () => {
    if (text === "Aumentar Fuente"  && isToggled && manualChange) {
      setManualChange(false); 
      setFontSize(fontSize);  setToggle(true);
      handle();
    }
  };

  return (
    <div>
      <li className="itemAcc">
        <div className={`toggle-switch ${isToggled ? "on" : "off"}`} onClick={handleToggle}>
          <div className="slider"></div>
        </div>
        <p className="textAcc">{text}</p>
      </li>
      <li className="itemAcc">
        {text === "Aumentar Fuente" && isToggled && (
          <><input type="range" min="10" max="32" value={fontSize} onChange={(e)=>handleFontSizeChange(e)}
            onMouseUp={handleFontSizeChangeComplete}/>
            <span>{fontSize} px</span></>
        )}
      </li>
    </div>
  );
}

export default AccItem;
