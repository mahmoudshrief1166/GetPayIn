import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { RootStackParamList } from '../navigations/nativeStackNavigation';
import { RouteProp } from '@react-navigation/native';
import { useDeleteProduct, useProductsByCategory } from '../hooks/api_hooks/productsHooks';
import ProductCard from '../components/productCard';
import Toast from 'react-native-toast-message';

type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;

type Props = {
  route: CategoryScreenRouteProp;
};

export default function SpecificCategoryScreen({ route }: Props) {
  const { category } = route.params;
  const { data, isLoading, isError,isFetching,refetch } = useProductsByCategory(category);
  const deleteMutation=useDeleteProduct()
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
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductCard product={item} onDelete={handleDelete} />
        )}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      />
  );
}


const styles = StyleSheet.create({
    list: {
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  flatList: {
    paddingTop: 30,
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
});
