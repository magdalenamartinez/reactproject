import React from "react";
import { Link } from "react-router-dom";

function DropDownItem(props) {

    return(
        <li className="dropDownItem">
            <i className={props.icon}></i>
            <Link href={props.link} className="link_drop">{props.text}</Link>
        </li>
    );

}

export default DropDownItem;