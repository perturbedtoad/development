import { useState } from "react";

export default function SortBy(props) {
    const [selected, setSelected] = useState("Popular");

    const handleChange = (option) => {
        if (selected != option) {
            uncheck(selected);
            setSelected(option); 
            props.onChange(option);
        }
    }

    const check = (option) => {
        document.getElementById(option).checked = true;
    }

    const uncheck = (option) => {
        document.getElementById(option).checked = false;
    }

    return (
      <div>
        <div>
            <input type="radio" id="Popular" onClick={() => handleChange("Popular")} defaultChecked="true"/>
            <label htmlFor="radio">Popular</label>
        </div>
        <div>
            <input type="radio" id="Price" onClick={() => handleChange("Price")}/>
            <label htmlFor="radio">Price</label>
        </div> 
      </div>
    )
}