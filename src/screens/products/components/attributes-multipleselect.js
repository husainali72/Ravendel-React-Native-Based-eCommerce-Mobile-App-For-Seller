import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Overlay, Button, ListItem} from "@rneui/themed";
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../utils/color';

const AttrMulipleSelect = ({
  items,
  selected,
  onItemChange,
  label,
  itemkey,
  value,
}) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const onItemHandle = (item) => {
    var hasItems = selected.some((hasitem) => hasitem === item);
    if (hasItems) {
      var selectedItems = selected.filter((item) => item !== item);
      selected = selectedItems;
      onItemChange(selectedItems);
    } else {
      var selectedItemsElse = selected || [];
      selectedItemsElse.push(item);
      onItemChange(selectedItemsElse);
    }
  };

  const selectedItemsShow = () => {
    return (
      <View style={styles.selectedItemsWrapper}>
        {selected.map((select, i) => (
          <View key={i}>
            {items.map((item, i2) => {
              return (
                <React.Fragment key={i2}>
                  {item.value === select.value ? (
                    <View style={styles.badgeWrapper}>
                      <Text style={styles.selectedItemName}>{item.label}</Text>
                      <Icon
                        name="close"
                        color="#000"
                        size={14}
                        onPress={() => unselect(item)}
                      />
                    </View>
                  ) : null}
                </React.Fragment>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  const unselect = (removeItem) => {
    var items = selected.filter((item) => item !== removeItem);
    selected = items;
    onItemChange(items);
  };

  return (
    <>
      {items.length > 0 ? (
        <View style={styles.itemsWrapper}>
          <Text style={styles.title}>
            {label}{' '}
            {selected && selected.length > 0
              ? '( ' + selected.length + ' selected)'
              : null}
          </Text>
          {/* ============Selected items Show================ */}
          {selected && selected.length > 0 ? selectedItemsShow() : null}

          {/* ============Add item ================ */}
          <TouchableOpacity
            style={styles.addNewItemWrapper}
            onPress={toggleOverlay}>
            <Icon name="plus" color="#000" size={14} style={styles.checkIcon} />
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {/* ============ selection modal================ */}
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} fullScreen>
        <>
          <Text style={styles.title}>
            {label}{' '}
            {selected && selected.length > 0
              ? '( ' + selected.length + ' selected)'
              : null}
          </Text>
          {/* ============Selected items Show================ */}
          {selected && selected.length > 0 ? selectedItemsShow() : null}
          <ScrollView style={{flex: 1}}>
            {items && items.length > 0
              ? items.map((item, i) => (
                  <ListItem onPress={() => onItemHandle(item)} key={i}>
                    {selected.some((select) => select.value === item.value) ? (
                      <>
                        <ListItem.Content>
                          <ListItem.Title style={{color: '#008000'}}>
                            {item[itemkey]}
                          </ListItem.Title>
                        </ListItem.Content>
                        <Icon
                          name="check"
                          color="#008000"
                          size={14}
                          style={styles.checkIcon}
                        />
                      </>
                    ) : (
                      <>
                        <ListItem.Content>
                          <ListItem.Title>{item[itemkey]}</ListItem.Title>
                        </ListItem.Content>
                      </>
                    )}
                  </ListItem>
                ))
              : null}
          </ScrollView>
          <Button title="Confirm" onPress={toggleOverlay} />
        </>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  itemsWrapper: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#b7bfc5',
  },
  badgeWrapper: {
    // paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#3a3a3a',
    flexDirection: 'row',
    margin: 5,
    borderRadius: 25,
    alignItems: 'center',
  },
  selectedItemName: {
    marginRight: 10,
  },
  selectedItemsWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  addNewItemWrapper: {
    marginTop: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: Colors.primaryColor,
    opacity: 0.5,
  },
  checkIcon: {
    marginRight: 10,
  },
});

export default AttrMulipleSelect;
