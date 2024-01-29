import React from "react";
import { Link } from "react-router-dom";

function DropDownItem(props) {

    return(
        <li className="dropDownItem">
            <i className={props.icon}></i>
            <a href={props.link} className="link_drop">{props.text}</a>
        </li>
    );

}

export default DropDownItem;