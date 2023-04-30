import { View, FlatList, Pressable, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar, Text } from "@react-native-material/core";
import { Card, Checkbox, Title } from 'react-native-paper';
const FiltersList = ({filterMapping, filterList, currentFilter, changeCurrentFilter}) => {

  const handleFilterChange = (newCurrentFilter) =>{
   
    changeCurrentFilter(newCurrentFilter)
  }
  return (
    <View style={styles.container}>
      <FlatList
          data={filterList}
          renderItem={(filterItem) => {
            return (
              <TouchableOpacity onPress={()=>handleFilterChange(filterItem.item)} >
                  
                  <Card style={filterItem.item==currentFilter ? styles.selectedCard:styles.card}>
                <Card.Content style={styles.content}> 
                    <Title style={filterItem.item==currentFilter?{color:'white'}:{color:'black'}}>
                      {filterMapping[filterItem.item]}
                    </Title>
                </Card.Content>
              </Card>
              </TouchableOpacity>
            )}
          }
      />
    </View>
  )
}

const styles = StyleSheet.create({  
  container:{
    backgroundColor: 'white',
  },
  card: {
    borderRadius: 2,
  },
  selectedCard:{
    opacity: 0.8,
    backgroundColor:'grey',
    color:'white'
  },
  textStyle:{
    
  }
})

export default FiltersList