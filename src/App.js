import "./App.css";
import { useState } from "react";
import cheeseData from "./assets/cheese-data.json";
import Cheese from "./components/Cheese";
import Checkbox from "./components/Checkbox";
import SortBy from "./components/SortBy";

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
  const [sort, setSort] = useState("Popular");

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
    let filteredMilk = cheeseData.filter(filterItems);
    let filteredMilkAndCheese = filteredMilk.filter(filterItems);
    sortList(sort, filteredMilkAndCheese);
    setItems(filteredMilkAndCheese);
  }

  //determines if an item is valid based on filters
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

  //called when sort method is switched
  const updateSort = (sort) => {
    setSort(sort);
    sortList(sort, items);
    setItems([...items]);
  }

  const sortList = (sort, list) => {
    if (sort == "Popular") {
      list.sort((a, b) => {
        return a.rank - b.rank;
      })
    } else if (sort == "Price") {
      list.sort((a, b) => {
        return a.price - b.price;
      })
    }
  }

  const onAddToCart = (name, price) => {
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

  const onRemoveItem = (item) => {
    cart.splice(cart.indexOf(item), 1);
    setCart([...cart]);
    setTotal(total - (item.quantity*item.price));
  }

  return (
    <div className="App">
      <div className="left">
        <p className="title">(Cheesy Dreams Creamery)</p> {/* TODO: personalize your bakery (if you want) */}
        <div className="items">
          {items.map((item, index) => ( // TODO: map cheeseData to Cheese components
            <div className="CheeseDiv"><Cheese name={item.name} image={item.image} 
            desc={item.description} price={item.price} firmness={item.firmness} milk={item.milk} onAdd={onAddToCart} key={item.name}/></div> // replace with Cheese component      
          ))}
        </div>
      </div>
      
      <div className="right">
        <div className="filters">
          <h4 id="sortby">Sort By</h4>
          <SortBy onChange={updateSort} />

          <h4 id="filter">Filter</h4>
          <h5>Firmness</h5>
          <Checkbox category={"firmness"} filter={"Hard to semi-hard"} onClick={updateFilters}/>
          <Checkbox category={"firmness"} filter={"Soft to semi-soft"} onClick={updateFilters} />
          <Checkbox category={"firmness"} filter={"Fresh"} onClick={updateFilters}/>

          <h5>Milk Type</h5>
          <Checkbox category={"milk"} filter={"Cow"} onClick={updateFilters}/>
          <Checkbox category={"milk"} filter={"Goat"} onClick={updateFilters}/>
          <Checkbox category={"milk"} filter={"Sheep"} onClick={updateFilters}/>
        </div>
        
        <div className="cart">
          <h3 className="carttitle">My Cart</h3>
          <div className="cartitems">
            {cart.length == 0 ? <p className="cartitem">No items added!</p> : 
              cart.map(item => (
                <div>
                  <p className="cartitem">{item.quantity}x {item.name}</p>
                  <p className="remove" onClick={() => onRemoveItem(item)}>Remove</p>
                </div>
              ))
            }
            <hr/>
            <h4>Total: ${total.toFixed(2)}</h4>
          </div>     
        </div>
        
      </div>
    </div>
  );
}

export default App;
