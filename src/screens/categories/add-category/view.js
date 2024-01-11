import React, {useState} from 'react';
import AppLoader from '../../components/loader';
import {Input} from '@rneui/themed';
import FeaturedImageComponents from '../../components/featuredImageComponents';
import {AddCategoryWrapper, FormWrapper, MetaSectiontitle} from './styles';
import {Query, gql, useQuery} from '@apollo/client';
import {useMutation} from '@apollo/client';
import {GET_CATEGORIES, ADD_CATEGORY} from '../../../queries/productQueries';
import CustomPicker from '../../components/custom-picker';
import FormActionsComponent from '../../components/formAction';
import {GraphqlError, GraphqlSuccess} from '../../components/garphqlMessages';
import {Text} from 'react-native';
const GET_APP_SETTING = gql`
  query HomePageSettings {
    getSettings {
      seo {
        meta_title
        meta_tag
        meta_description
      }
      imageStorage {
        status
        s3_id
        s3_key
      }
      store {
        currency_options {
          currency
          currency_position
          thousand_separator
          decimal_separator
          number_of_decimals
        }
        store_address {
          city
          country
          state
          zip
        }
        measurements {
          weight_unit
          dimensions_unit
        }
        inventory {
          manage_stock
          notifications {
            show_out_of_stock
            alert_for_minimum_stock
          }
          notification_recipients
          low_stock_threshold
          out_of_stock_threshold
          out_of_stock_visibility
          stock_display_format
        }
      }
      paymnet {
        cash_on_delivery {
          enable
          title
          description
          instructions
        }
        bank_transfer {
          enable
          title
          description
          instructions
          account_details {
            account_name
            account_number
            bank_name
            short_code
            iban
            bic_swift
          }
        }
        stripe {
          enable
          title
          description
          inline_credit_card_form
          statement_descriptor
          capture
          test_mode
          publishable_key
          secret_key
          webhook_key
        }
        paypal {
          enable
          title
          description
          paypal_email
          ipn_email_notification
          receiver_email
          paypal_identity_token
          invoice_prefix
          test_mode
          api_username
          api_password
          api_signature
        }
      }
      appearance {
        home {
          slider {
            image
            link
            open_in_tab
          }
          add_section_in_home {
            feature_product
            recently_added_products
            most_viewed_products
            recently_bought_products
            product_recommendation
            products_on_sales
            product_from_specific_categories
          }
          add_section_web {
            label
            name
            visible
            category
          }
        }
        theme {
          primary_color
          logo
        }
        mobile {
          slider {
            image
            link
            open_in_tab
          }
          mobile_section {
            label
            section_img
            visible
            url
            category
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;
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

  const {loading, error, data} = useQuery(GET_APP_SETTING);
  console.log(loading, error, data, 'pop');
  const [addCategory, {loading: addedLoading}] = useMutation(ADD_CATEGORY, {
    onError: error => {
      GraphqlError(error);
    },
    onCompleted: data => {
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
            onChangeText={value =>
              setCategoryForm({...categoryForm, ['name']: value})
            }
            errorMessage={validation.name}
            onEndEditing={event => {
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
            onChangeText={value =>
              setCategoryForm({...categoryForm, ['description']: value})
            }
            multiline
            numberOfLines={2}
            errorMessage={validation.description}
          />
          {/* <Query query={GET_CATEGORIES}>
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
                  pickerValChange={val =>
                    setCategoryForm({...categoryForm, ['parentId']: val})
                  }
                  placeholder="Please Select"
                  label="Parent Category"
                />
              ) : null;
            }}
          </Query> */}

          <FeaturedImageComponents
            image={categoryForm.image}
            inputChange={img => {
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
            onChangeText={value => {
              categoryForm.meta.title = value;
              setCategoryForm({
                ...categoryForm,
              });
            }}
          />
          <Input
            label="Meta Keyword"
            value={categoryForm.meta.keywords}
            onChangeText={value => {
              categoryForm.meta.keywords = value;
              setCategoryForm({
                ...categoryForm,
              });
            }}
          />
          <Input
            label="Meta Description"
            value={categoryForm.meta.description}
            onChangeText={value => {
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
