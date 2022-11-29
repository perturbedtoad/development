// TODO: create a component that displays a single bakery item
export default function Cheese(props) {
    return (
        <div className="Cheese">
            <img src={props.image}/>
            <div className="info">
                <div className="infoDiv">
                    <h1>{props.name}</h1>
                    <h3 className="stats"><i>Firmness: </i>{props.firmness}</h3>
                    <h3 className="stats"><i>Type of milk: </i>{props.milk}</h3>
                    <h3>{props.desc}</h3>
                </div>
                <div className="priceButtonDiv">
                    <div className="priceDiv"><h2>${props.price}</h2></div>
                    <div className="buttonDiv">
                        <button onClick={() => props.onAdd(props.name, props.price)}>Add to Cart</button>
                    </div>
               </div>
                
            </div>
        </div>
    );
}