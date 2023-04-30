import React, { useEffect, useState } from "react";
import { View, FlatList, Pressable, Image, StyleSheet, Text, Button } from "react-native";
import FiltersList from "../../components/filter/filterList";
import FilterOptions from "../../components/filter/filterOptions";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { FAB } from 'react-native-paper';
import { change } from "../../slice/filterSlice";

const Filters = () => {

    const [activeFilter, setActiveFilter] = useState(Object.keys(filters)[0])
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [filterStore, setFilterStore] = useState({})
    const changeActiveFilter = (filtername)=>{
        
        setActiveFilter(filtername)
        console.log('>>>>>>>>>>>>>>>>>>>>>>Set to :', filtername)
    }
    const handleApplyFilters = () =>{
        dispatch(change({filterdata : filterStore, filtersApplied:true}))
        
        navigation.navigate('Recipes')
    }
  return (
    <View style={styles.Container}>
        
        <View style={styles.topBar}>
            <View style={styles.filterIcon}>
                <Image source="https://w7.pngwing.com/pngs/403/20/png-transparent-computer-icons-filter-miscellaneous-angle-rectangle-thumbnail.png" />
            </View>
            <Text style={styles.filterText}>Filters</Text>
        </View>
       
        <View style={styles.filterContainer}>
            <View style={styles.filterNames}><FiltersList filterMapping={filterMapping} filterList={Object.keys(filters)} currentFilter={activeFilter} changeCurrentFilter={changeActiveFilter}/></View>
            <View style={styles.filterChoices}><FilterOptions filters={filters} currentFilter={activeFilter} setFilterStore={setFilterStore}/></View> 
        </View>

        <FAB
            style={styles.fab}
            small
            label={"APPLY"}
            onPress={handleApplyFilters}
        />
    </View>
  )
}

const filters = {
    preparationTime : ['5min','10min','15min','20min','25min','30min','35min','40min','45min'],
    nutrition : ['High in Protein', 'Low in sugar', 'Low in Calories', 'High in Carbs']
}

const filterMapping = {
    preparationTime:'Preparation Time',
    nutrition: 'Nutrition'
}

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        paddingBottom: 20,
    },
    topBar:{
        height: '8%',
        width: 'auto',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    filterContainer:{
        flexDirection:'row',
        justifyContent: 'center',
        
    },
    filterNames:{
        flex: 0.35,
    },
    filterChoices:{
        flex: 0.65,
        paddingLeft: '1%'
    },
    filterText:{
        textShadowRadius: 10,
        fontSize: 20,
        fontWeight:'bold'
    },
    filterIcon: {
        height: 20,
        width: 20,
        marginLeft: 15
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom:0,
        padding: 5,
        backgroundColor:'orange',
        color: 'white',
        fontSize: 25,
      },
})

export default Filters