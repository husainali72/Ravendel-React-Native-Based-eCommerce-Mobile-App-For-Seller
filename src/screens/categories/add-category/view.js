import React, {useState} from 'react';
import AppLoader from '../../components/loader';
import {Input} from 'react-native-elements';
import FeaturedImageComponents from '../../components/featuredImageComponents';
import {AddCategoryWrapper, FormWrapper, MetaSectiontitle} from './styles';
import {Query} from 'react-apollo';
import {useMutation} from '@apollo/client';
import {GET_CATEGORIES, ADD_CATEGORY} from '../../../queries/productQueries';
import CustomPicker from '../../components/custom-picker';
import FormActionsComponent from '../../components/formAction';
import {GraphqlError, GraphqlSuccess} from '../../components/garphqlMessages';
import {Text} from 'react-native';

var categoryObject = {
  name: '',
  parentId: null,
  description: '',
  url: '',
  image: '',
  meta: {
    title: '',
    description: '',
    keywords: '',
  },
};

const AddCategoryView = ({navigation}) => {
  const [categoryForm, setCategoryForm] = useState(categoryObject);
  const [validation, setValdiation] = useState({
    name: '',
    description: '',
  });

  const [addCategory, {loading: addedLoading}] = useMutation(ADD_CATEGORY, {
    onError: (error) => {
      GraphqlError(error);
    },
    onCompleted: (data) => {
      GraphqlSuccess('Added successfully');
      setCategoryForm(categoryObject);
      navigation.goBack();
    },
  });

  const AddCategoryForm = () => {
    if (categoryForm.name === '') {
      setValdiation({...validation, name: 'Required'});
    } else if (categoryForm.description === '') {
      setValdiation({...validation, name: '', description: 'Required'});
    } else {
      setValdiation({
        ...validation,
        name: '',
        description: '',
      });
      addCategory({variables: categoryForm});
    }
  };

  return (
    <>
      {addedLoading ? <AppLoader /> : null}
      <FormActionsComponent
        onCancel={() => navigation.goBack()}
        onSubmit={AddCategoryForm}
        submitText="Add"
      />
      <AddCategoryWrapper>
        <FormWrapper>
          <Input
            label="Name"
            value={categoryForm.name}
            onChangeText={(value) =>
              setCategoryForm({...categoryForm, ['name']: value})
            }
            errorMessage={validation.name}
            onEndEditing={(event) => {
              let value =
                !!event.nativeEvent && !!event.nativeEvent.text
                  ? event.nativeEvent.text
                  : event;
              if (categoryForm.meta && categoryForm.meta.title === '') {
                categoryForm.meta.title = value;
                setCategoryForm({
                  ...categoryForm,
                });
              }
            }}
          />
          <Input
            label="Description"
            value={categoryForm.description}
            onChangeText={(value) =>
              setCategoryForm({...categoryForm, ['description']: value})
            }
            multiline
            numberOfLines={2}
            errorMessage={validation.description}
          />
          <Query query={GET_CATEGORIES}>
            {({loading, error, data}) => {
              if (loading) {
                return <AppLoader />;
              }
              if (error) {
                return <Text>Somethng went wrong</Text>;
              }

              const allCategories = data.productCategories;
              return allCategories.length ? (
                <CustomPicker
                  iosDropdown
                  pickerKey="name"
                  pickerVal="id"
                  androidPickerData={allCategories}
                  selectedValue={categoryForm.parentId}
                  iosPickerData={allCategories}
                  pickerValChange={(val) =>
                    setCategoryForm({...categoryForm, ['parentId']: val})
                  }
                  placeholder="Please Select"
                  label="Parent Category"
                />
              ) : null;
            }}
          </Query>

          <FeaturedImageComponents
            image={categoryForm.image}
            inputChange={(img) => {
              setCategoryForm({...categoryForm, ['image']: img});
            }}
            removeImage={() =>
              setCategoryForm({...categoryForm, ['image']: ''})
            }
          />

          <MetaSectiontitle>Meta</MetaSectiontitle>
          <Input
            label="Meta Title"
            value={categoryForm.meta.title}
            onChangeText={(value) => {
              categoryForm.meta.title = value;
              setCategoryForm({
                ...categoryForm,
              });
            }}
          />
          <Input
            label="Meta Keyword"
            value={categoryForm.meta.keywords}
            onChangeText={(value) => {
              categoryForm.meta.keywords = value;
              setCategoryForm({
                ...categoryForm,
              });
            }}
          />
          <Input
            label="Meta Description"
            value={categoryForm.meta.description}
            onChangeText={(value) => {
              categoryForm.meta.description = value;
              setCategoryForm({
                ...categoryForm,
              });
            }}
            multiline
            numberOfLines={2}
          />
        </FormWrapper>
      </AddCategoryWrapper>
    </>
  );
};
export default AddCategoryView;
