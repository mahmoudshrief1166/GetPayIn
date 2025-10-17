import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  useAllProducts,
  useDeleteProduct,
} from '../hooks/api_hooks/productsHooks';
import ProductCard from '../components/productCard';
import Toast from 'react-native-toast-message';
import { useAppSelector } from '../hooks/regular_hooks/hooks';
import { RootState } from '../store/store';
import { colors } from '../utils/constants/colors';
import DropDownComponent from '../components/dropDownList';

export default function AllProductScreen() {
  const { data, isError, isLoading, refetch, isFetching } = useAllProducts();
  const deleteMutation = useDeleteProduct();
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const themeColor = colors[theme];
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
        <ActivityIndicator size="large" color={themeColor.primary} />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.center}>
        <Text style={[styles.errorText, { color: themeColor.colorError }]}>
          Failed to load products...
        </Text>
      </View>
    );
  }
  return (
    <View
      style={[styles.container, { backgroundColor: themeColor.background }]}
    >
      <DropDownComponent />
      <FlatList
      key={"two-columns"}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard product={item} onDelete={handleDelete} />
        )}
        contentContainerStyle={styles.list}
        numColumns={2}
        columnWrapperStyle={styles.row}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatList: {
    paddingTop: 30,
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
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
});
