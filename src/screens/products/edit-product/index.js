import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/header';
import EditProductView from './view';
import {useMutation, useQuery} from '@apollo/client';
import AppLoader from '../../components/loader';
import {GET_PRODUCT, UPDATE_PRODUCT} from '../../../queries/productQueries';
import {useIsFocused} from '@react-navigation/native';
import {Alert} from 'react-native';
import {GET_CATEGORIES} from '../../../queries/productQueries';
import {GET_BRANDS} from '../../../queries/brandsQueries';
import {GET_ATTRIBUTES} from '../../../queries/attributesQueries';
import {GET_TAX} from '../../../queries/taxQueries';
import {GET_SHIPPING} from '../../../queries/shippingQueries';
import {
  BASE_URL,
  unflatten,
  allPossibleCases,
  isEmpty,
} from '../../../utils/helper';
import {GraphqlError, GraphqlSuccess} from '../../components/garphqlMessages';

const EditProductsScreen = ({route, navigation}) => {
  const Categories = useQuery(GET_CATEGORIES);
  const Brands = useQuery(GET_BRANDS);
  const AttributesData = useQuery(GET_ATTRIBUTES);
  const Taxes = useQuery(GET_TAX);
  const Shippings = useQuery(GET_SHIPPING);
  const isFocused = useIsFocused();
  const [productDetail, setProductDetail] = useState({
    id: '',
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
      height: 0,
      width: 0,
      depth: 0,
      weight: 0,
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
  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const {loading, error, data} = useQuery(GET_PRODUCT, {
    variables: {id: route.params.id},
  });
  const [allCategories, setAllCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allAttributes, setAllAttributes] = useState([]);
  const [allTaxes, setAllTaxes] = useState({});
  const [allShipppings, setAllShippings] = useState({});

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
        setProductDetail({
          ...productDetail,
          shipping: {
            ...productDetail.shipping,
            shipping_class: allShipppings.shipping_class[0]._id,
          },
          tax_class: allTaxes.tax_class[0]._id,
        });
      }
    }
  }, [allTaxes, allShipppings]);

  useEffect(() => {
    if (isFocused) {
      if (data && data.product) {
        var singleProduct = data.product;
        if (
          singleProduct.feature_image &&
          singleProduct.feature_image.original
        ) {
          setFeaturedImage(BASE_URL + singleProduct.feature_image.original);
        }
        if (singleProduct.gallery_image.length > 0) {
          var allGalleryImage = singleProduct.gallery_image.map(
            (gallery) => BASE_URL + gallery.original,
          );
          setGallery(allGalleryImage);
        }
        setProductDetail(singleProduct);
      }
    } else {
      setProductDetail({});
    }
  }, [data, isFocused]);

  const onValueChange = (name, value) => {
    setProductDetail({...productDetail, [name]: value});
  };

  const onNestedObjectValueChange = (object, name, value) => {
    productDetail[object][name] = value;
    setProductDetail({...productDetail});
  };

  const onGalleryImagesAdd = (img) => {
    var updatedImages = productDetail.update_gallery_image || [];
    updatedImages.push(img);
    productDetail.update_gallery_image = updatedImages;
    productDetail.gallery_image.push(img);
    setProductDetail({...productDetail});
    setGallery([...gallery, img]);
  };

  const onGalleryImagesRemove = (img) => {
    if (img._id) {
      let galleryImages = productDetail.gallery_image;
      let removed_image = productDetail.removed_image || [];
      removed_image.push(img._id);
      setProductDetail({
        ...productDetail,
        gallery_image: galleryImages.filter(
          (galleryImg) => galleryImg._id !== img._id,
        ),
        removed_image,
      });
      return;
    }
    setGallery(gallery.filter((galleryImg) => galleryImg !== img));
  };

  const onFeaturedImageAdd = (img) => setFeaturedImage(img);
  const onFeaturedImageRemove = () => setFeaturedImage(null);

  const [updateProduct, {loading: UpdateLoading}] = useMutation(
    UPDATE_PRODUCT,
    {
      onError: (error) => {
        GraphqlError(error);
      },
      onCompleted: (data) => {
        GraphqlSuccess('Updated Successfully');
        setProductDetail({});
        navigation.goBack();
      },
    },
  );

  const onAttrAndVariant = (variantItem, attributeItem) => {
    productDetail.variant = variantItem;
    productDetail.attribute = attributeItem;
    setProductDetail({...productDetail});
  };

  const UpdateProductSubmit = () => {
    var CategoryIDs = productDetail.categoryId.map((cat) => cat.id);
    var details = {
      id: productDetail.id,
      name: productDetail.name,
      url: productDetail.url,
      categoryId: CategoryIDs,
      brand: productDetail.brand.id,
      short_description: productDetail.short_description,
      description: productDetail.description,
      sku: productDetail.sku,
      quantity: productDetail.quantity,
      pricing: productDetail.pricing,
      status: productDetail.status,
      featured_product: productDetail.featured_product,
      product_type: productDetail.product_type,
      shipping: productDetail.shipping,
      tax_class: productDetail.tax_class,
      meta: productDetail.meta,
      custom_field: productDetail.custom_field,
      attribute: productDetail.attribute,
      variant: productDetail.variant,
      combinations: productDetail.combinations,
      update_gallery_image: productDetail.update_gallery_image || '',
      removed_image: productDetail.removed_image || '',
      update_feature_image: productDetail.update_feature_image || '',
    };
    console.log('UpdateProductSubmit details', details);
    updateProduct({variables: details});
  };

  return (
    <>
      {loading ||
      UpdateLoading ||
      Categories.loading ||
      Brands.loading ||
      AttributesData.loading ? (
        <AppLoader />
      ) : null}
      <AppHeader title="Edit Product" navigation={navigation} back />
      {!isEmpty(productDetail) && !isEmpty(productDetail.id) ? (
        <EditProductView
          editProductDetail={productDetail}
          featuredImage={featuredImage}
          onFeaturedImageAdd={(img) => onFeaturedImageAdd(img)}
          onFeaturedImageRemove={onFeaturedImageRemove}
          galleryImages={gallery}
          onGalleryImagesAdd={(img) => onGalleryImagesAdd(img)}
          onGalleryImagesRemove={(img) => onGalleryImagesRemove(img)}
          navigation={navigation}
          inputChange={(name, value) => onValueChange(name, value)}
          objectInputChange={(object, name, value) =>
            onNestedObjectValueChange(object, name, value)
          }
          update={UpdateProductSubmit}
          allCategories={allCategories}
          allAttributes={allAttributes}
          allBrands={allBrands}
          allTaxes={allTaxes}
          allShipppings={allShipppings}
          onAttrAndVariantParent={(variantItem, attributeItem) =>
            onAttrAndVariant(variantItem, attributeItem)
          }
        />
      ) : null}
    </>
  );
};

export default EditProductsScreen;
