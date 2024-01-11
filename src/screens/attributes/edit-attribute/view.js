import React, {useState, useEffect} from 'react';
import AppLoader from '../../components/loader';
import {Input} from '@rneui/themed';
import {EditAttributeWrapper, FormWrapper, NotesForAttribute} from './styles';
import {useMutation, useQuery} from '@apollo/client';
import {
  UPDATE_ATTRIBUTE,
  GET_ATTRIBUTE,
} from '../../../queries/attributesQueries';
import {isEmpty} from '../../../utils/helper';
import FormActionsComponent from '../../components/formAction';
import {GraphqlError, GraphqlSuccess} from '../../components/garphqlMessages';

const EditAttrView = ({navigation, singleAttrID}) => {
  const {loading, error, data} = useQuery(GET_ATTRIBUTE, {
    variables: {id: singleAttrID},
  });
  console.log(data, 'edit attrib');
  const [loadingState, setLoadingState] = useState(false);
  const [attribute, setAttribute] = useState({});
  const [validation, setValdiation] = useState({
    name: '',
    value: '',
  });

  useEffect(() => {
    if (data && data.productAttribute) {
      setLoadingState(false);
      var valuesArray = data.productAttribute.data.values;
      var string = valuesArray.map(val => val.name).join('\n');
      data.productAttribute.data.value = string;
      setAttribute(data.productAttribute.data);
    }
  }, [data]);

  if (loading && !loadingState) {
    setLoadingState(loading);
  }
  if (error) {
    if (loadingState) {
      setLoadingState(false);
    }
    return <Text>Something went wrong</Text>;
  }

  const [UpdateAttributes, {loading: updateLoading}] = useMutation(
    UPDATE_ATTRIBUTE,
    {
      onError: error => {
        GraphqlError(error);
      },
      onCompleted: data => {
        GraphqlSuccess('Update successfully');
        setAttribute({});
        navigation.goBack();
      },
    },
  );

  const updateAttrSubmit = () => {
    if (attribute.name === '') {
      setValdiation({...validation, name: 'Required'});
    } else if (attribute.value === '') {
      setValdiation({...validation, name: '', value: 'Required'});
    } else {
      setValdiation({
        ...validation,
        name: '',
        value: '',
      });
      var string = attribute.value;
      var valuesArray = string.split('\n').map(val => {
        var hasOldVal = attribute.values.filter(aVal => aVal.name === val);

        if (hasOldVal.length > 0) {
          return hasOldVal[0];
        } else {
          return {name: val};
        }
      });
      attribute.values = valuesArray;
      setAttribute({...attribute});

      var attrObject = {
        id: attribute.id,
        name: attribute.name,
        values: valuesArray,
      };

      UpdateAttributes({
        variables: {
          attribute: attrObject,
        },
      });
    }
  };

  return (
    <>
      {updateLoading || loadingState ? <AppLoader /> : null}
      {!isEmpty(attribute) ? (
        <>
          <FormActionsComponent
            onCancel={() => navigation.goBack()}
            onSubmit={updateAttrSubmit}
            submitText="Save"
          />
          <EditAttributeWrapper>
            <FormWrapper>
              <Input
                label="Name"
                value={attribute.name}
                onChangeText={value =>
                  setAttribute({...attribute, ['name']: value})
                }
                errorMessage={validation.name}
              />
              <Input
                label="Items"
                value={attribute.value}
                onChangeText={value =>
                  setAttribute({...attribute, ['value']: value})
                }
                multiline
                numberOfLines={3}
                errorMessage={validation.value}
              />
              <NotesForAttribute>
                Add attribute by typing them into the text box, one attribute
                per line.
              </NotesForAttribute>
            </FormWrapper>
          </EditAttributeWrapper>
        </>
      ) : null}
    </>
  );
};
export default EditAttrView;
