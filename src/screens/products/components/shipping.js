import React, {useState} from 'react';
import {Picker} from '@react-native-community/picker';
import {isEmpty} from '../../../utils/helper';
import {Input} from 'react-native-elements';
import Colors from '../../../utils/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  HeaderOpenStyle,
  AccordionWrapper,
  AccordionHeader,
  AccordionTitle,
  AccordionBody,
} from '../components/accordion-styles';
import styled from 'styled-components';

const ShippingComponent = ({
  shippingState,
  onShipppingChange,
  onShippingInput,
  shipping,
}) => {
  const [open, setOpen] = useState(false);

  const onAccordionChange = () => {
    setOpen(!open);
  };

  return (
    <AccordionWrapper>
      <AccordionHeader
        onPress={onAccordionChange}
        style={open ? HeaderOpenStyle : {}}>
        <AccordionTitle>Shipping</AccordionTitle>
        <Icon
          name={open ? 'chevron-up' : 'chevron-down'}
          color={Colors.primaryColor}
          size={16}
        />
      </AccordionHeader>
      <AccordionBody
        style={{
          height: open ? 'auto' : 0,
          paddingTop: open ? 15 : 0,
        }}>
        <ShippingWrapper>
          {!isEmpty(shippingState) ? (
            !shippingState.global.is_global ? (
              <Picker
                selectedValue={shipping.shipping_class}
                onValueChange={(itemValue, itemIndex) => {
                  onShipppingChange(itemValue);
                }}>
                <Picker.Item
                  value={null}
                  label={'Select Tax'}
                  color="rgba(0,0,0,0.5)"
                />
                {shippingState.shipping_class.map((shipping_c, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={shipping_c.name}
                      value={shipping_c._id}
                    />
                  );
                })}
              </Picker>
            ) : (
              <GlobalShippingActiveText>
                The global shipping option is on currently. To configure the
                shipping for individual products, please turn off the global
                shipping option first.
              </GlobalShippingActiveText>
            )
          ) : null}
          <Input
            keyboardType="numeric"
            type="number"
            label="Height"
            value={shipping.height.toString()}
            onChangeText={(value) => onShippingInput('height', parseInt(value))}
          />
          <Input
            keyboardType="numeric"
            type="number"
            label="Width"
            value={shipping.width.toString()}
            onChangeText={(value) => onShippingInput('width', parseInt(value))}
          />
          <Input
            keyboardType="numeric"
            type="number"
            label="Depth"
            value={shipping.depth.toString()}
            onChangeText={(value) => onShippingInput('depth', parseInt(value))}
          />
          <Input
            keyboardType="numeric"
            type="number"
            label="Weigth"
            value={shipping.weight.toString()}
            onChangeText={(value) => onShippingInput('weight', parseInt(value))}
          />
        </ShippingWrapper>
      </AccordionBody>
    </AccordionWrapper>
  );
};

const GlobalShippingActiveText = styled.Text`
  font-style: italic;
  background-color: #ffffe0;
  margin-bottom: 20px;
`;
const ShippingWrapper = styled.View``;

export default ShippingComponent;
