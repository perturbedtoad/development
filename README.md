# Development

### Link to Deployed Website

https://perturbedtoad.github.io/development/

### Goal and Value of the Application

This is a simple shopping page for a cheese shop, where users can add sort and filter the available cheeses and add them to their cart.

### How the User Triggers State Changes

The user triggers state changes when Adding/Removing from the cart, changing the filters, or changing the sorting method.

The filtering for my page uses both AND and OR logic. I use OR logic for filters within the same category (if the user checks both "fresh" and "soft" under the Firmness category, cheeses that are fresh OR soft will show up). I use AND logic across the two categories (if the user checks "fresh" and "soft" under Firmness, and "goat" under Milk, then the cheeses that result must be goat cheese AND be either fresh OR soft).

### Usability Principles Considered

To make the page visually appealing and easily readable, I made sure to keep the layout organized with clear sections for the items, the cart, and the filtering/sorting. In areas with more text such as under filtering/sorting and on each Cheese card, I grouped text and used hierarchal font sizes to make it less cluttered.

### Organization of Components

Apart from the main App component, I have a component for each Cheese item, Checkbox, and the SortBy section.   

The Cheese component contains all information about that cheese item passed down from App, rendering it in a visually readable way. The Checkbox component is a single filter that keeps track of its state (checked or not), and uses the filtering logic passed from App when the state changes. The SortBy component contains the radio buttons for selecting the sorting method, keeping track of which method is currently selected. Like checkbox, it uses the sorting logic passed from App when the state changes.



