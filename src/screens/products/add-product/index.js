import React, {useState, useEffect} from 'react';
import AppHeader from '../../components/header';
import AddProductView from './view';
import {Alert} from 'react-native';
import {GET_CATEGORIES} from '../../../queries/productQueries';
import {GET_BRANDS} from '../../../queries/brandsQueries';
import {GET_ATTRIBUTES} from '../../../queries/attributesQueries';
import {GET_TAX} from '../../../queries/taxQueries';
import {GET_SHIPPING} from '../../../queries/shippingQueries';
import AppLoader from '../../components/loader';
import {useMutation, useQuery} from '@apollo/client';
import {unflatten, isEmpty, getUpdatedUrl} from '../../../utils/helper';
import {ADD_PRODUCT} from '../../../queries/productQueries';
import {GraphqlError, GraphqlSuccess} from '../../components/garphqlMessages';

var addObject = {
  name: 'Test',
  description: 'test',
  url: '',
  categoryId: [],
  brand: null,
  pricing: {
    price: 10,
    sellprice: 8,
  },
  status: 'Draft',
  meta: {
    title: 'Test Meta Title',
    description: 'Test Meta Description',
    keywords: 'Test Meta Keywords',
  },
  shipping: {
    height: 0,
    width: 0,
    depth: 0,
    weight: 0,
    shipping_class: '',
  },
  tax_class: '',
  feature_product: true,
  product_type: {
    virtual: true,
    downloadable: true,
  },
  quantity: '100',
  sku: 'TEST001',
  feautred_image: '',
  gallery_image: [],
  attribute: [],
  variant: [],
  short_description: '',
  custom_field: [],
};

const AddProductsScreen = ({navigation}) => {
  const [addProduct, {loading: AddLoading}] = useMutation(ADD_PRODUCT, {
    onError: (error) => {
      GraphqlError(error);
    },
    onCompleted: (data) => {
      GraphqlSuccess('Added successfully');
      setAddProductDetail(addObject);
      navigation.navigate('ProductsScreen', {
        screen: 'AllProduct',
        params: {reload: true},
      });
    },
  });
  const Categories = useQuery(GET_CATEGORIES);
  const Brands = useQuery(GET_BRANDS);
  const AttributesData = useQuery(GET_ATTRIBUTES);
  const Taxes = useQuery(GET_TAX);
  const Shippings = useQuery(GET_SHIPPING);
  const [loader, setLoader] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allAttributes, setAllAttributes] = useState([]);
  const [allTaxes, setAllTaxes] = useState({});
  const [allShipppings, setAllShippings] = useState({});
  const [featuredImage, setFeaturedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [addProductDetail, setAddProductDetail] = useState({
    name: '',
    description: '',
    url: '',
    categoryId: [],
    brand: null,
    pricing: {
      price: 0,
      sellprice: 0,
    },
    status: 'Draft',
    meta: {
      title: '',
      description: '',
      keywords: '',
    },
    shipping: {
      height: '',
      width: '',
      depth: '',
      weight: '',
      shipping_class: '',
    },
    tax_class: '',
    feature_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
    },
    quantity: '',
    sku: '',
    feautred_image: '',
    gallery_image: [],
    attribute: [],
    variant: [],
    short_description: '',
    custom_field: [],
  });

  useEffect(() => {
    if (Categories.data && Categories.data.productCategories) {
      var selectedCat = JSON.parse(
        JSON.stringify(Categories.data.productCategories),
      );
      if (selectedCat && selectedCat.length) {
        setAllCategories(unflatten(selectedCat));
      }
    }
  }, [Categories.data]);

  useEffect(() => {
    if (Brands.data && Brands.data.brands) {
      setAllBrands(Brands.data.brands);
    }
  }, [Brands.data]);

  useEffect(() => {
    if (AttributesData.data && AttributesData.data.product_attributes) {
      setAllAttributes(AttributesData.data.product_attributes);
    }
  }, [AttributesData.data]);

  useEffect(() => {
    if (Taxes.data && Taxes.data.tax) {
      setAllTaxes(Taxes.data.tax);
    }
  }, [Taxes.data]);

  useEffect(() => {
    if (Shippings.data && Shippings.data.shipping) {
      setAllShippings(Shippings.data.shipping);
    }
  }, [Shippings.data]);

  useEffect(() => {
    if (!isEmpty(allShipppings) && !isEmpty(allTaxes)) {
      if (allShipppings.shipping_class.length && allTaxes.tax_class.length) {
        setAddProductDetail({
          ...addProductDetail,
          shipping: {
            ...addProductDetail.shipping,
            shipping_class: allShipppings.shipping_class[0]._id,
          },
          tax_class: allTaxes.tax_class[0]._id,
        });
      }
    }
  }, [allTaxes, allShipppings]);

  const onBlurNameInput = (value) => {
    if (addProductDetail.url === '') {
      isUrlExist(value);
    }
    if (addProductDetail.meta.title === '') {
      addProductDetail.meta.title = value;
      setAddProductDetail({...addProductDetail});
    }
  };

  const onValueChange = (name, value) => {
    setAddProductDetail({...addProductDetail, [name]: value});
  };

  const onNestedObjectValueChange = (object, name, value) => {
    addProductDetail[object][name] = value;
    setAddProductDetail({...addProductDetail});
  };

  const removeFeaturedImage = () => {
    Alert.alert(
      'Are you sure?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            setAddProductDetail({...addProductDetail, feautred_image: ''}),
        },
      ],
      {cancelable: false},
    );
  };

  const removeGalleryImage = (img) => {
    Alert.alert(
      'Are you sure?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            var filterGalleryImages = addProductDetail.gallery_image.filter(
              (gallery_img) => gallery_img !== img,
            );
            addProductDetail.gallery_image = filterGalleryImages;
            setAddProductDetail({...addProductDetail});
          },
        },
      ],
      {cancelable: false},
    );
  };

  const featureImageAdd = (img) => {
    setFeaturedImage(img.uri);
    setAddProductDetail({...addProductDetail, ['feautred_image']: img});
  };

  const galleryImageAdd = (img) => {
    addProductDetail.gallery_image.push(img);
    setAddProductDetail({...addProductDetail});

    galleryImages.push(img.uri);
    setGalleryImages([...galleryImages]);
  };

  const isUrlExist = async (url) => {
    setLoader(true);
    let updatedUrl = await getUpdatedUrl('Product', url);
    setAddProductDetail({
      ...addProductDetail,
      url: updatedUrl,
    });
    setLoader(false);
  };

  const onAttrAndVariant = (variantItem, attributeItem) => {
    addProductDetail.variant = variantItem;
    addProductDetail.attribute = attributeItem;
    setAddProductDetail({...addProductDetail});
  };

  const addProductSubmit = () => {
    var CategoryIDs = addProductDetail.categoryId.map((cat) => cat.id);
    var details = {
      name: addProductDetail.name,
      url: addProductDetail.url,
      categoryId: CategoryIDs,
      brand: addProductDetail.brand,
      short_description: addProductDetail.short_description,
      description: addProductDetail.description,
      sku: addProductDetail.sku,
      quantity: addProductDetail.quantity,
      pricing: addProductDetail.pricing,
      status: addProductDetail.status,
      featured_product: addProductDetail.feature_product,
      product_type: addProductDetail.product_type,
      shipping: addProductDetail.shipping,
      tax_class: addProductDetail.tax_class,
      meta: addProductDetail.meta,
      custom_field: addProductDetail.custom_field,
      attribute: addProductDetail.attribute,
      variant: addProductDetail.variant,
      combinations: addProductDetail.combinations,
    };
    // console.log('AddProductSubmit details', details);
    addProduct({variables: details});
  };

  return (
    <>
      {AddLoading || loader ? <AppLoader /> : null}
      <AppHeader title="Add Product" navigation={navigation} back />
      <AddProductView
        navigation={navigation}
        addProductDetail={addProductDetail}
        featuredImage={featuredImage}
        galleryImages={galleryImages}
        onBlurNameInput={(value) => onBlurNameInput(value)}
        inputChange={(name, value) => onValueChange(name, value)}
        objectInputChange={(object, name, value) =>
          onNestedObjectValueChange(object, name, value)
        }
        featureImageAdd={(img) => featureImageAdd(img)}
        galleyImageAdd={(img) => galleryImageAdd(img)}
        removeGalleryImage={(img) => removeGalleryImage(img)}
        removeFeaturedImage={removeFeaturedImage}
        categories={allCategories}
        attributes={allAttributes}
        brands={allBrands}
        onAdd={addProductSubmit}
        allTaxes={allTaxes}
        allShipppings={allShipppings}
        onAttrAndVariantParent={(variantItem, attributeItem) =>
          onAttrAndVariant(variantItem, attributeItem)
        }
      />
    </>
  );
};

export default AddProductsScreen;
