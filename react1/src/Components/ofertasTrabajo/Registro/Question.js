import React from "react";

function Question({valueCheck, questionText, idQuestion, handleC}) {
    return(
        <div className='questions form_group'>
            <input onChange={handleC} className="form_checkbox" type="checkbox" id={idQuestion} name={idQuestion} defaultChecked={valueCheck}/>
            <label className="form_label" htmlFor={idQuestion}>{questionText}</label>
        </div>
    );
}

export default Question;