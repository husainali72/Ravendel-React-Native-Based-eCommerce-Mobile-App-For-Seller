import React, {useState} from 'react';
import {Text} from 'react-native';
import {
  OrdersWrapper,
  OrderCard,
  OrderAmount,
  OrderID,
  OrderStatus,
  OrderDate,
  OrderView,
} from './styles';
import CustomPicker from '../../components/custom-picker';

const Orders = [
  {
    order_date: '30 Oct 2020',
    order_id: '#ORD0001',
    order_status: 'Pending',
    type: 1,
    order_amount: '2500',
  },
  {
    order_date: '05 Nov 2020',
    order_id: '#ORD0002',
    order_status: 'Not-confirmed',
    type: 2,
    order_amount: '700',
  },
  {
    order_date: '12 Nov 2020',
    order_id: '#ORD0003',
    order_status: 'Out for delievery',
    type: 3,
    order_amount: '100',
  },
  {
    order_date: '31 Nov 2020',
    order_id: '#ORD0004',
    order_status: 'Process',
    type: 4,
    order_amount: '3500',
  },
];

const picker = [
  {label: 'Pending', value: 1},
  {label: 'Not Confirmed', value: 2},
  {label: 'Out for delievery', value: 3},
  {label: 'Process', value: 4},
];
const AllOrderView = ({navigation}) => {
  const [allOrders, setAllOrdres] = useState(Orders);
  const [fillter, setFillter] = useState('all');

  const getColor = (type) => {
    var bgcolor = {backgroundColor: ''};
    switch (type) {
      case 1:
        bgcolor = {backgroundColor: '#ffc10747'};
        break;
      case 2:
        bgcolor = {backgroundColor: '#f4433638'};
        break;
      case 3:
        bgcolor = {backgroundColor: '#4caf5045'};
        break;
      case 4:
        bgcolor = {backgroundColor: '#2196f336'};
        break;
      default:
        bgcolor = {backgroundColor: '#fff'};
        break;
    }
    return bgcolor;
  };
  const handleFilter = (val) => {
    if (val) {
      var filterOrder = Orders.filter((order) => order.type === val);
      setAllOrdres(filterOrder);
      setFillter(val);
    } else {
      setFillter('All');
      setAllOrdres(Orders);
    }
  };
  return (
    <OrdersWrapper>
      <CustomPicker
        iosSelect
        pickerKey="label"
        pickerVal="value"
        androidPickerData={picker}
        iosPickerData={picker}
        selectedValue={fillter}
        pickerValChange={(val) => {
          handleFilter(val);
        }}
        placeholder="All"
        label="Filter"
        getNullval
        onDonePress={() => {}}
      />
      {allOrders.length > 0
        ? allOrders.map((order, i) => (
            <OrderCard style={getColor(order.type)} key={i}>
              <OrderDate>{order.order_date}</OrderDate>
              <OrderID>{order.order_id}</OrderID>
              <OrderAmount>${order.order_amount}</OrderAmount>
              <OrderStatus>{order.order_status}</OrderStatus>
              <OrderView
                onPress={() => {
                  navigation.navigate('OrdersScreen', {
                    screen: 'ViewOrder',
                  });
                }}>
                <Text>Details</Text>
              </OrderView>
            </OrderCard>
          ))
        : null}
    </OrdersWrapper>
  );
};

export default AllOrderView;
