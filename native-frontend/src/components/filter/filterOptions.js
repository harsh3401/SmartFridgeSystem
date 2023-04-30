import React, { useEffect, useState } from "react";
import { View, FlatList, Pressable,Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Card, Checkbox, Title } from 'react-native-paper';
import { useSelector} from "react-redux";
import { useDispatch} from "react-redux";
import { change } from "../../slice/filterSlice";

const FilterOptions = ({filters, currentFilter, setFilterStore}) => {

  const [checkedList, setCheckedList] = useState({})
  const [appliedFilters, setAppliedFilters] = useState({})
  const appliedFilterData = useSelector((state)=>state.filter.filterdata)
  const dispatch = useDispatch();
  const loadFilters = ()=>{
    setAppliedFilters(appliedFilterData)
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%",appliedFilters.currentFilter)
    typeof appliedFilters[currentFilter]!='undefined' && setCheckedList(appliedFilters[currentFilter])
  }
  useEffect(()=>{
    console.log('/////////////////////////'+filters[currentFilter])
    loadFilters()
  }, [])

useEffect(() => {
    console.log("array being received : ", checkedList)
      let activeFilters = {}
      // activeFilters[currentFilter] = checkedList
      Object.keys(appliedFilters).map(key=>{
        if(key!=currentFilter) activeFilters[key] = appliedFilters[key]
      })
      activeFilters[currentFilter] = checkedList[currentFilter]!=='undefined'?checkedList[currentFilter]:[]
      console.log("array being set : ", activeFilters)
      dispatch(change({filterdata : activeFilters, filtersApplied:false}))
      setAppliedFilters(activeFilters)
      setFilterStore(activeFilters)
}, [checkedList]);

  const isChecked = (choiceItem)=>{
    const checkedListArray = checkedList
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&"+(typeof checkedListArray))
    return checkedListArray.hasOwnProperty(currentFilter) && checkedListArray[currentFilter].includes(choiceItem)
  }
  const toggleItem = (choiceItem)=>{
        let activeList = {}
      // activeFilters[currentFilter] = checkedList
        Object.keys(checkedList).map(key=>{
          if(key!=currentFilter) activeList[key] = checkedList[key]
        })
      if(isChecked(choiceItem)){
        activeList[currentFilter] = checkedList[currentFilter].filter((item)=>item!=choiceItem)
      }else{
        console.log("fsdlajflsjfs", activeList)
        console.log("dsfjdlsfdsljfls",checkedList.hasOwnProperty(currentFilter))
        activeList[currentFilter] = checkedList.hasOwnProperty(currentFilter)?[...checkedList[currentFilter], choiceItem]:[choiceItem,]
        console.log("jjjjjjjjjjjj", activeList)
      }
      setCheckedList(activeList)
  }
  return (
    
    <View style={styles.root}>
      <FlatList
          data={filters[currentFilter]}
          renderItem={(filterChoice) => {
            return (
              <TouchableOpacity onPress={() => toggleItem(filterChoice.item)}>
              <Card style={{backgroundColor:'white'}}>
                <Card.Content style={styles.content}>
                  <Checkbox status={isChecked(filterChoice.item) ? "checked" : "unchecked"} />

                  <View>
                    <Title>
                      {filterChoice.item}
                    </Title>
                  </View>
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
  root: {
    backgroundColor: 'white',
  },
  content: {
    flexDirection: "row"
  }
});

export default FilterOptions