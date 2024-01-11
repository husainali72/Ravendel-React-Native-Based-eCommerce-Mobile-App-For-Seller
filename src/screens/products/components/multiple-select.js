import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, StyleSheet, ScrollView} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import Color from '../../../utils/color';

const MultipleItemsPicker = ({
  data,
  selected,
  onHandleChange,
  placeholder,
  displayKey,
  uniqueKey,
}) => {
  const [selectedArray, setSelectedArray] = useState([]);

  useEffect(() => {
    var items = [];
    selected.map((sItem) => {
      items.push(sItem.value);
    });
    setSelectedArray(items);
  }, [selected]);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View>
          <ScrollView>
            <MultiSelect
              items={data}
              uniqueKey={uniqueKey}
              onSelectedItemsChange={(items) => {
                var array = [];
                if (items.length) {
                  items.map((item) => {
                    data.map((d) => {
                      if (d.value === item) {
                        array.push(d);
                      }
                    });
                  });
                }
                onHandleChange(array);
              }}
              selectedItems={selectedArray}
              selectText={placeholder}
              tagRemoveIconColor="#777"
              tagBorderColor="#777"
              tagTextColor="#777"
              selectedItemTextColor={Color.primaryColor}
              selectedItemIconColor={Color.primaryColor}
              itemTextColor="#000"
              displayKey={displayKey}
              submitButtonColor={Color.primaryColor}
              submitButtonText="Confirm"
              styleMainWrapper={{marginVertical: 10}}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  badgeWrapper: {
    flexDirection: 'row',
  },
  badge: {
    // paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#3a3a3a',
    flexDirection: 'row',
    margin: 5,
    borderRadius: 25,
    alignItems: 'center',
  },
  selectedCatName: {
    marginRight: 10,
  },
  multiselectWrapper: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default MultipleItemsPicker;
