import React from 'react';

class App extends React.Component {
  state = {
    shoppingItems: [
    {
      name: 'apples',
      checked: false
    },
    {
      name: 'oranges',
      checked: true
    },
    {
      name: 'bread',
      checked: false
    }
  ]};

  handleDeleteItem = (item) => {
    console.log('delete ', item)
    this.deleteItem(item)
  };

  handleCheckItem = (item) => {
    console.log('check ', item)
    this.checkItem(item)
  };

  deleteItem = (item) => {
    const newList = this.state.shoppingItems.filter(itm => itm.name !== item)
    console.log(newList)
    this.setState({
      shoppingItems: newList
    })
  };

  checkItem = (item) => {
    const newItems = this.state.shoppingItems.map(itm => {
      if (itm.name === item) {
        console.log('itm.checked = ', itm.checked)
        itm.checked = !itm.checked
      }
      return itm
    })
    this.setState({
      shoppingItems: newItems
    })
  }

  handleOnAddItem = (item) => {
    const newItems = this.state.shoppingItems.concat({
      name: item,
      checked: false
    })
    this.setState({
      shoppingItems: newItems
    })
  }
  
  render() {
    return (
      <>
        <header>
          <h1> Shopping List</h1>
        </header>
        <main>
          <section>
            <AddItemForm 
              onAddItem={this.handleOnAddItem}
            />
          </section>
          <section>
            <ShoppingList 
            items={this.state.shoppingItems}
            handleDeleteItem={this.handleDeleteItem}
            handleCheckItem={this.handleCheckItem}
            />
          </section>
        </main>
      </>
    )
  }
}

class AddItemForm extends React.Component {
  onSubmitForm = (e) => {
    e.preventDefault()
    this.props.onAddItem(e.target.itemToAdd.value)
  }

  render() {
    return (
      <form onSubmit={this.onSubmitForm}>
        <input
          name='itemToAdd'
          type='text'
          placeholder='carrots'
          aria-label='Shopping list item'
        />
        <button type='submit'>Add Item</button>
      </form>
    )
  }
}

class ShoppingList extends React.Component {


  render() {
    const list = this.props.items.map((item, i) => (
      <ShoppingItem
        key={i}
        item={item}
        handleDeleteItem={this.props.handleDeleteItem}
        handleCheckItem={this.props.handleCheckItem}
      />
    ));

    return (
      <div>
        {list}
      </div>
    )
  }
}

class ShoppingItem extends React.Component {
  onDeleteItem = () => {
    this.handleDelete(this.props.item.name)
  };

  onCheckItem = () => {
    this.handleCheck(this.props.item.name)
  };

  handleDelete = (item) => {
    this.props.handleDeleteItem(item)
  };

  handleCheck = (item) => {
    this.props.handleCheckItem(item)
  };

  render() {
    return (
      <li>
        <h2 style={ {textDecoration: this.props.item.checked ? 'line-through' : null} }>
          {this.props.item.name}
        </h2>
        <button type='button' onClick={this.onCheckItem}>check</button>
        <button type='button' onClick={this.onDeleteItem} >delete</button>
      </li>
    )
  }
}

export default App;
