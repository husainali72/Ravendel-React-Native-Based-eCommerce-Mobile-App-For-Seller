import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Overlay, Button, ListItem} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/color';

const MulipleSelect = ({
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

  const onItemHandle = item => {
    console.log(item, 'iiiii');
    var hasItems = selected.some(hasitem => hasitem === item[value]);
    if (hasItems) {
      var selectedItems = selected.filter(item => item !== item[value]);
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
            {items.map((item, i2) => (
              <>
                {item[value] === select ? (
                  <View style={styles.badgeWrapper} key={i2}>
                    <Text style={styles.selectedItemName}>{item[itemkey]}</Text>
                    <Icon
                      name="close"
                      color="#000"
                      size={14}
                      onPress={() => unselect(item[value])}
                    />
                  </View>
                ) : null}
              </>
            ))}
          </View>
        ))}
      </View>
    );
  };

  const unselect = removeItem => {
    var items = selected.filter(item => item !== removeItem);
    selected = items;
    onItemChange(items);
  };

  return (
    <>
      {items.length ? (
        <View style={styles.itemsWrapper}>
          <Text style={styles.title}>
            {label}{' '}
            {selected && selected.length > 0
              ? '( ' + selected.length + ' selected)'
              : null}
          </Text>
          {/* ============Selected items Show================ */}
          {selected && selected.length ? selectedItemsShow() : null}

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
          {console.log(selected, 'selec')}
          {selected && selected.length ? selectedItemsShow() : null}
          <ScrollView style={{flex: 1}}>
            {items && items.length > 0
              ? items.map((item, i) => (
                  <ListItem onPress={() => onItemHandle(item[value])} key={i}>
                    {selected &&
                    selected.some(select => select === item[value]) ? (
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

export default MulipleSelect;
