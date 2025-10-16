
import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useAllCategories, useAllProducts, useDeleteProduct } from '../hooks/api_hooks/productsHooks';
import ProductCard from '../components/productCard';
import Toast from 'react-native-toast-message';
import {Dropdown} from 'react-native-element-dropdown'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/nativeStackNavigation';


export default function AllProductScreen() {
  const { data, isError, isLoading,refetch,isFetching } = useAllProducts();
  const {data:categories,isLoading:loading}=useAllCategories()
  const deleteMutation = useDeleteProduct();
  const [selectedCategory,setSelectedCategory]=useState<string|null>('')
  const navigation=useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Deleted!',
          text2: 'Product deleted successfully',
        });
      },
      onError: () => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to delete product',
        });
      },
    });
  };
  const handleChangeDopValue=(value:any)=>{
    setSelectedCategory(value.label)
    navigation.push('Category',{category:value.label});
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load products...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="small" color="#007AFF" />
      ) : (
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={
            categories?.map((category:any)=>
                ({
                
                label:category.slug,
                value:category.slug
            })
        )||[]
        }
        labelField="label"
        valueField="value"
        placeholder='Select category.....'
        value={selectedCategory}
        onChange={handleChangeDopValue}
        
        />
      )}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductCard product={item} onDelete={handleDelete} />
        )}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch}/>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatList:{
    paddingTop:30,

  },
  list: {
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
    container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
    dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop:100
  },
  placeholderStyle: {
    color: "#888",
  },
  selectedTextStyle: {
    color: "#333",
    fontSize: 16,
  },

});

 


