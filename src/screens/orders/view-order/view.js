import React from 'react';
import {
  OrdersWrapper,
  OrderViewCardTitle,
  OrderViewCard,
  OrderInfoVal,
  OrderInfoLabel,
  OrderInfoRow,
  ShippingName,
  ShippingDetails,
  OrderDetailRow,
  OrderDetailLeftCol,
  OrderDetailRightCol,
  ProductName,
  ProductQty,
  ProductPrice,
  OrderAmountRow,
  OrderAmountLabel,
  OrderAmountValue,
} from './styles';
import BottomDivider from '../../components/bottom-divider';

const OrderView = ({navigation}) => {
  return (
    <OrdersWrapper>
      <OrderViewCard>
        <OrderViewCardTitle>Order Info</OrderViewCardTitle>
        <OrderInfoRow>
          <OrderInfoLabel>Order No.</OrderInfoLabel>
          <OrderInfoVal>#ORD001</OrderInfoVal>
        </OrderInfoRow>
        <OrderInfoRow>
          <OrderInfoLabel>Date</OrderInfoLabel>
          <OrderInfoVal>26 Aug 2020</OrderInfoVal>
        </OrderInfoRow>
        <OrderInfoRow>
          <OrderInfoLabel>Total</OrderInfoLabel>
          <OrderInfoVal>$500</OrderInfoVal>
        </OrderInfoRow>
        <OrderInfoRow>
          <OrderInfoLabel>Payment Method</OrderInfoLabel>
          <OrderInfoVal>Cash on Delievery </OrderInfoVal>
        </OrderInfoRow>
      </OrderViewCard>

      <OrderViewCard>
        <OrderViewCardTitle>Shipping Info</OrderViewCardTitle>
        <ShippingName>John Doe</ShippingName>
        <ShippingDetails>Email@email.com</ShippingDetails>
        <ShippingDetails>9997774441</ShippingDetails>
        <ShippingDetails>
          Address Line First, Address Line Second,
        </ShippingDetails>
        <ShippingDetails>City, State, Country</ShippingDetails>
      </OrderViewCard>

      <OrderViewCard>
        <OrderViewCardTitle>Order Details</OrderViewCardTitle>
        <OrderDetailRow>
          <OrderDetailLeftCol>
            <ProductName>Product First</ProductName>
            <ProductQty>x2</ProductQty>
          </OrderDetailLeftCol>
          <OrderDetailRightCol>
            <ProductPrice>$100</ProductPrice>
          </OrderDetailRightCol>
        </OrderDetailRow>
        <OrderDetailRow>
          <OrderDetailLeftCol>
            <ProductName>Product Second</ProductName>
            <ProductQty>x2</ProductQty>
          </OrderDetailLeftCol>
          <OrderDetailRightCol>
            <ProductPrice>$150</ProductPrice>
          </OrderDetailRightCol>
        </OrderDetailRow>
        <OrderDetailRow>
          <OrderDetailLeftCol>
            <ProductName>Product Third</ProductName>
            <ProductQty>x2</ProductQty>
          </OrderDetailLeftCol>
          <OrderDetailRightCol>
            <ProductPrice>$175</ProductPrice>
          </OrderDetailRightCol>
        </OrderDetailRow>

        <OrderAmountRow>
          <OrderAmountLabel>Subtotal</OrderAmountLabel>
          <OrderAmountValue>$425</OrderAmountValue>
        </OrderAmountRow>

        <OrderAmountRow>
          <OrderAmountLabel>Tax</OrderAmountLabel>
          <OrderAmountValue>$50</OrderAmountValue>
        </OrderAmountRow>

        <OrderAmountRow>
          <OrderAmountLabel>Shipping</OrderAmountLabel>
          <OrderAmountValue>$25</OrderAmountValue>
        </OrderAmountRow>

        <OrderAmountRow>
          <OrderAmountLabel>Total</OrderAmountLabel>
          <OrderAmountValue>$500</OrderAmountValue>
        </OrderAmountRow>
      </OrderViewCard>

      <BottomDivider />
    </OrdersWrapper>
  );
};

export default OrderView;
