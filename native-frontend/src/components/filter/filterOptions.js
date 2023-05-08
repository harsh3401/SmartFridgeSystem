import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Pressable,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Card, Checkbox, Title } from "react-native-paper";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { change } from "../../slice/filterSlice";
import Slider from "react-native-a11y-slider";
const FilterOptions = ({ filters, currentFilter, setFilterStore }) => {
  const [checkedList, setCheckedList] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const appliedFilterData = useSelector((state) => state.filter.filterdata);
  const dispatch = useDispatch();
  const loadFilters = () => {
    setAppliedFilters(appliedFilterData);

    typeof appliedFilters[currentFilter] != "undefined" &&
      setCheckedList(appliedFilters[currentFilter]);
  };
  useEffect(() => {
    loadFilters();
  }, []);

  useEffect(() => {
    console.log("array being received : ", checkedList);
    let activeFilters = {};
    // activeFilters[currentFilter] = checkedList
    Object.keys(appliedFilters).map((key) => {
      if (key != currentFilter) activeFilters[key] = appliedFilters[key];
    });
    activeFilters[currentFilter] =
      checkedList[currentFilter] !== "undefined"
        ? checkedList[currentFilter]
        : [];
    dispatch(change({ filterdata: activeFilters, filtersApplied: false }));
    setAppliedFilters(activeFilters);
    setFilterStore(activeFilters);
  }, [checkedList]);

  const isChecked = (choiceItem) => {
    const checkedListArray = checkedList;

    return (
      checkedListArray.hasOwnProperty(currentFilter) &&
      checkedListArray[currentFilter].includes(choiceItem)
    );
  };
  const manageSliderValues = (values) => {
    let activeList = {};

    Object.keys(checkedList).map((key) => {
      if (key != currentFilter) activeList[key] = checkedList[key];
    });
    activeList[currentFilter] = checkedList.hasOwnProperty(currentFilter)
      ? [...values]
      : [];
    setCheckedList(activeList);
  };
  const toggleItem = (choiceItem) => {
    let activeList = {};
    // activeFilters[currentFilter] = checkedList
    Object.keys(checkedList).map((key) => {
      if (key != currentFilter) activeList[key] = checkedList[key];
    });
    if (isChecked(choiceItem)) {
      activeList[currentFilter] = checkedList[currentFilter].filter(
        (item) => item != choiceItem
      );
    } else {
      activeList[currentFilter] = checkedList.hasOwnProperty(currentFilter)
        ? [...checkedList[currentFilter], choiceItem]
        : [choiceItem];
    }
    setCheckedList(activeList);
  };
  console.log(appliedFilters[currentFilter]);
  console.log(checkedList[currentFilter]);

  return (
    <View style={styles.root}>
      {currentFilter == "preparationTime" ? (
        <View>
          <Text style={{ margin: 10, color: "purple", fontWeight: "bold" }}>
            Preparation Time in Minutes
          </Text>
          <Slider
            onChange={(values) => {
              manageSliderValues(values);
            }}
            min={1}
            max={200}
            increment={5}
            values={
              checkedList[currentFilter] ? checkedList[currentFilter] : [1, 100]
            }
          />
        </View>
      ) : (
        <FlatList
          data={filters[currentFilter]}
          renderItem={(filterChoice) => {
            return (
              <TouchableOpacity onPress={() => toggleItem(filterChoice.item)}>
                <Card style={{ backgroundColor: "white" }}>
                  <Card.Content style={styles.content}>
                    <Checkbox
                      status={
                        isChecked(filterChoice.item) ? "checked" : "unchecked"
                      }
                    />

                    <View>
                      <Title>{filterChoice.item}</Title>
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
  },
  content: {
    flexDirection: "row",
  },
});

export default FilterOptions;
