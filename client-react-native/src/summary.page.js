import React, { useState, useEffect } from "react";
import { Text, ScrollView, StyleSheet, TextInput, Button } from "react-native";

export default class SummaryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { debtors: [] };
  }

  componentDidMount() {
    const debtParam = this.props.navigation.getParam("debtors");
    this.setState({ debtors: debtParam });
  }

  render() {
    const { debtors } = this.state;

    let newList = debtors.map(a => a.person);
    let unique = new Set(newList);
    newList = [...unique];

    let totalList = {};
    newList.forEach(person => {
      var totalPerPerson = 0;
      debtors.forEach(debtor => {
        if (debtor.person === person) {
          totalPerPerson += debtor.price;
        }
      });
      totalList[person] = totalPerPerson;
    });

    return (
      <ScrollView style={styles.container}>
        {debtors.map(debtor => (
          <ScrollView key={debtor.id} style={styles.items}>
            <Text>
              {debtor.person} owes you ${debtor.price}
            </Text>
          </ScrollView>
        ))}

        {/* {Object.keys(totalList).map(function(key) {
          <Text>
            {key} owes you ${totalList[key]}
          </Text>;
        })} */}

        <Text>
          You are owed in total $
          {debtors.reduce((a, b) => a + (b["price"] || 0), 0).toFixed(2)}
        </Text>
        <Button
          title="Start again"
          onPress={() => {
            this.props.navigation.navigate("ImageGallery");
          }}
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
