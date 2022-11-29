import "./App.css";
import { useState } from "react";
import cheeseData from "./assets/cheese-data.json";
import Cheese from "./components/Cheese";
import Checkbox from "./components/Checkbox";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
cheeseData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  
  const [cart, setCart] = useState(new Array());
  const [total, setTotal] = useState(0);

  const [milk, setMilk] = useState(new Array());
  const [firmness, setFirmness] = useState(new Array());

  const [items, setItems] = useState(cheeseData)

  //updates state for which filters are checked
  const updateFilters = (category, filter, add) => {
    if (category == "milk") {
      let currMilk = milk;
      if (add) {
        currMilk.push(filter) //add new filter
      } else {
        currMilk.splice(currMilk.indexOf(filter), 1); //remove existing filter
      }
      setMilk(currMilk);
    }
    else if (category == "firmness") {
      let currFirmness = firmness;
      if (add) {
        currFirmness.push(filter)
      } else {
        currFirmness.splice(currFirmness.indexOf(filter), 1); //remove existing filter
      }
      setFirmness(currFirmness);
    }
    updateItems();
  }

  //updates list of items matching filters
  const updateItems = () => {
    console.log("milk: " + milk);
    let filteredMilk = cheeseData.filter(filterItems);
    console.log("filteredMilk: " + filteredMilk);
    let filteredMilkAndCheese = filteredMilk.filter(filterItems);
    setItems(filteredMilkAndCheese);
  }

  const filterItems = item => {
    //filter for milk
    //valid if matching any selected milk filters (OR logic)
    let valid = false;
    if (milk.length == 0) { //no filters, all items valid
      valid = true;
    } else {
      for (var milkType of milk) { //if matching any milk filter, then valid (OR logic)
        if (item.milk == milkType) {
          valid = true;
          break;
        }
      }
    }
    if (!valid) { //did not match any milk filters
      return false;
    }

    //AND filter for firmness (AND logic)
    //valid if matching any selected firmness filters (OR logic)
    valid = false;
    if (firmness.length == 0) { //no filters, all items valid
      valid = true;
    } else {
      for (var firmnessLevel of firmness) { //if matching any firmness filter, then valid (OR logic)
        if (item.firmness == firmnessLevel) {
          valid = true;
          break;
        }
      }
    }
    //if true, then passed both milk and firmness filters. if false, failed firmness filters after passing milk filters
    return valid; 
  }

  const matchesFilters = (category) => {
    return function(item) {
      if (category == "milk") {
        if (milk.length == 0) { //no filters, all items valid
          return true;
        } else {
          milk.forEach(milkType => { //if matching any milk filter, then valid (OR logic)
            if (item.milk == milkType) {
              console.log("found valid");
              return true;
            }
          })
        }
        return false;
      } else {
        if (firmness.length == 0) { //no filters, all items valid
          return true;
        } else {
          firmness.forEach(firmnessLevel => { //if matching any firmness filter, then valid (OR logic)
            if (item.firmness == firmnessLevel) {
              return true;
            }
          })
        }
        return false;
      } 
    }
  }

  const onClick = (name, price) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name == name) {
        cart[i].quantity += 1
        setCart([...cart])
        setTotal(total + cart[i].price)
        return;
      }
    }
    cart.push({name: name, price: price, quantity: 1});
    setCart([...cart]);
    setTotal(total + price);
  }

  return (
    <div className="App">
      <div className="left">
        <h1 className="title">Cheesy Dreams Creamery</h1> {/* TODO: personalize your bakery (if you want) */}
        <div className="items">
          {items.map((item, index) => ( // TODO: map cheeseData to Cheese components
            <div className="CheeseDiv"><Cheese name={item.name} image={item.image} 
            desc={item.description} price={item.price} firmness={item.firmness} milk={item.milk} onAdd={onClick} key={item.name}/></div> // replace with Cheese component      
          ))}
        </div>
      </div>
      
      <div className="cart">
        <h1 className="carttitle">Filter</h1>
        <h3>Firmness</h3>
        <Checkbox category={"firmness"} filter={"Hard to semi-hard"} onClick={updateFilters}/>
        <Checkbox category={"firmness"} filter={"Soft to semi-soft"} onClick={updateFilters} />
        <Checkbox category={"firmness"} filter={"Fresh"} onClick={updateFilters}/>

        <h3>Milk Type</h3>
        <Checkbox category={"milk"} filter={"Cow"} onClick={updateFilters}/>
        <Checkbox category={"milk"} filter={"Goat"} onClick={updateFilters}/>
        <Checkbox category={"milk"} filter={"Sheep"} onClick={updateFilters}/>


        <h1 className="carttitle">My Cart</h1>
        <div className="cartitems">
          {cart.map(item => (
            <h5>{item.quantity}x {item.name}</h5>
          ))}
          <hr/>
          <h4>Total: ${total.toFixed(2)}</h4>
        </div>     
      </div>
    </div>
  );
}

export default App;
