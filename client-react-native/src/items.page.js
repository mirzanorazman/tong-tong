import React, { useState, useEffect } from "react";
import { Text, ScrollView, StyleSheet, TextInput, Button } from "react-native";

export default class ItemsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }
  // const [items, setItems] = useState([]);

  componentDidMount() {
    const itemParam = this.props.navigation.getParam("items");
    var itemsObj = itemParam.item;
    // console.log(itemParam.items);

    itemParam.items.forEach(item => {
      // console.log(item);
      // this.setState({ items: [item, ...this.state.items] }, () => {
      //   console.log(this.state.items);
      // });
      item.person = "";
    });
    // console.log(itemParam.items);
    this.setState({ items: itemParam.items });
    // console.log(this.state.items);
  }
  //const [debts, setDebts] = useState([]);

  // run only once during initial render
  // useEffect(() => {
  //   // add a person property to store the name
  //   // mock_items will need to be changed with the tesseract data
  //   mock_items.forEach(item => {
  //     item.person = "";
  //   });
  //   setItems(mock_items);
  // }, []);

  handleChangeText(id, name) {
    let newItems = this.state.items.slice(); // copy
    newItems.find(element => element.id === id).person = name;
    this.setState({ items: newItems });

    // console.log(items)

    // const tempItem = item
    // const index = forms.indexOf(form)
    // forms.splice(index, 1)
    // setForms([
    //   ...forms,
    //   {
    //     itemid: tempItem.itemid,
    //     name: tempItem.name,
    //     price: tempItem.price,
    //     person: name
    //   }
    // ]);
  }

  shapeFinalInput() {
    let debtList = [];
    items.forEach(item => {
      if (item !== debtList) {
      }
    });

    // find unique names in the items array
    let newlist = items.map(a => a.person);
    let unique = new Set(newlist);
    newlist = [...unique];

    let finalInput = [];

    // create new array to contain the new output, with debt default to 0
    newlist.forEach(newitem => {
      finalInput.push({
        newitem: 0
      });
    });

    items.forEach(item => {
      if (finalInput.name[item.person]) item.price;
      finalInput.name[item.person];

      // if (item. in finalInput) {
      //   let tempItem = {
      //     id: Math.floor(Math.random() * 101),
      //     person: item.person,
      //     price: 13.96
      //   }
      //   finalInput.push(tempItem)
      // }
      // else {

      // }
    });

    return null;
  }

  render() {
    const { items } = this.state;
    // console.log(items);

    return (
      <ScrollView style={styles.container}>
        {items.map(item => (
          <ScrollView key={item.id} style={styles.items}>
            <Text>
              {item.name} ${item.price}{" "}
            </Text>
            <TextInput
              style={{ borderColor: "gray", borderWidth: 1 }}
              placeholder="Enter whose item is this"
              onChangeText={text => {
                this.handleChangeText(item.id, text);
              }}
            ></TextInput>
          </ScrollView>
        ))}
        <Text>
          Total: ${items.reduce((a, b) => a + (b["price"] || 0), 0).toFixed(2)}
        </Text>
        <Button
          title="Finish"
          onPress={() =>
            this.props.navigation.navigate("Summary", {
              debtors: this.state.items
            })
          }
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff"
  },
  items: {
    flexDirection: "row"
  }
});
