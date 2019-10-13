import React, { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, TextInput, Button } from 'react-native';

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  //const [debts, setDebts] = useState([]);

  // run only once during initial render
  useEffect(() => {
    // add a person property to store the name
    // mock_items will need to be changed with the tesseract data
    mock_items.forEach((item) => {
      item.person = ""
    })
    setItems(mock_items);
  }, [])

  function handleChangeText(id, name) {

    let newItems = items.slice();
    newItems.find((element) => element.itemid === id).person = name;
    setItems(newItems);

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

  function shapeFinalInput() {

    let debtList = []
    items.forEach((item) => {
      if (item !== debtList) {

      }

    })

    // find unique names in the items array
    let newlist = items.map(a => a.person);
    let unique = new Set(newlist)
    newlist = [...unique]

    let finalInput = []

    // create new array to contain the new output, with debt default to 0
    newlist.forEach((newitem) => {
      finalInput.push({
        newitem: 0
      })
    })

    items.forEach((item) => {
      if (finalInput.name[item.person])
        item.price 
        finalInput.name[item.person]

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
    })

    return null
  }

  return (
    <ScrollView style={styles.container}>
      {items.map(item => (
        <ScrollView key={item.itemid} style={styles.items}>
          <Text>{item.name} ${item.price} </Text>
          <TextInput 
            style={{borderColor: 'gray', borderWidth: 1}}
            placeholder="Enter whose item is this"
            onChangeText={(text) => {
              handleChangeText(item.itemid, text);
            }}
          ></TextInput>
        </ScrollView>
        
      ))}
      <Text>Total: ${items.reduce((a, b) => a + (b["price"] || 0), 0).toFixed(2)}</Text>
      <Button 
        title="Finish"
        onPress={ () => this.props.navigation.navigate("Summary", {debtors: items}) }
      />
    </ScrollView>
  );
}

let mock_items = [
  {
    itemid: 0,
    name: "minyak masak",
    price: 2.83
  },
  {
    itemid: 1,
    name: "cili kering",
    price: 1.22
  },
  {
    itemid: 2,
    name: "telur",
    price: 6.09
  },
  {
    itemid: 3,
    name: "roti gardenia",
    price: 13.96
  },
  {
    itemid: 4,
    name: "ubat gigi colgate",
    price: 3.75
  },
  {
    itemid: 5,
    name: "pisang tanduk",
    price: 5.02
  }
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  items: {
    flexDirection:'row'
  }
});