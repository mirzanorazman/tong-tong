import React, { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, TextInput, Button } from 'react-native';

export default function SummaryPage() {
  return(
    <ScrollView style={styles.container}>
      {/* {items.map(item => (
        <ScrollView key={item.itemid} style={styles.items}>
          <Text>{item.name} owes you ${item.price} </Text>
        </ScrollView>
        
      ))} */}

      <Text>You are owed in total ${items.reduce((a, b) => a + (b["price"] || 0), 0).toFixed(2)}</Text>
      <Button 
        title="Start again"
        onPress={() => {
          this.props.navigation.navigate("Camera")
        }}
      />
    </ScrollView>
  );
}

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