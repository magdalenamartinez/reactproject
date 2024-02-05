import React from "react";
import { Link } from "react-router-dom";
import { useStyle } from "../../styleContext";

function LinkItem({to, txt}) {
  const {style} = useStyle();
    
    const st = {
        cont: style.highContrast ? 'contrastlink' : '',
        cont2: style.highContrast ? 'link-contrast' : '',
      };
    return(
        <Link to={to} className={`link_container ${st.cont}`}><span className={`link-gradient ${st.cont2}`}>{txt}</span></Link>
    );
}

export default LinkItem;