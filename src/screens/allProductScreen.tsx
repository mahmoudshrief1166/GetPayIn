import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAllProducts, useDeleteProduct } from '../hooks/api_hooks/productsHooks';
import Toast from 'react-native-toast-message';
import { useAppSelector } from '../hooks/regular_hooks/hooks';
import { RootState } from '../store/store';
import { colors } from '../utils/constants/colors';
import DropDownComponent from '../components/dropDownList';
import CustomFlatList from '../components/customFlatList';
import { wp, hp } from '../utils/constants/responsive';

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
        <ActivityIndicator size={hp(6)} color={themeColor.primary} />
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
    <View style={[styles.container, { backgroundColor: themeColor.background }]}>
      <DropDownComponent />
      <CustomFlatList
        data={data}
        onRefresh={refetch}
        refreshing={isFetching}
        onDelete={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(5),
  },
  errorText: {
    fontSize: hp(2),
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: wp(2),
  },
});
