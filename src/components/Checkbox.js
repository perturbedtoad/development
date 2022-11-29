import { useState } from "react";

export default function Checkbox(props) {
    const [checked, setChecked] = useState(false);
    const handleChange = () => {
        const toggle = !checked;
        setChecked(toggle);
        if (props.filter == "Hard to semi-hard") {
            props.onClick(props.category, "Hard", toggle);
            props.onClick(props.category, "Semi-hard", toggle);
        }
        else if (props.filter == "Soft to semi-soft") {
            props.onClick(props.category, "Soft", toggle);
            props.onClick(props.category, "Semi-soft", toggle);
        } else {
            props.onClick(props.category, props.filter, toggle);
        } 
    }
    return (
      <div>
        <input type="checkbox" id="checkbox" onChange={handleChange}/>
        <label htmlFor="checkbox">{props.filter}</label>
      </div>
    )
}