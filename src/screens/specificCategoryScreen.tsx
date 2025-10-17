import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { RootStackParamList } from '../navigations/nativeStackNavigation';
import { RouteProp } from '@react-navigation/native';
import {
  useDeleteProduct,
  useProductsByCategory,
} from '../hooks/api_hooks/productsHooks';
import Toast from 'react-native-toast-message';
import { useAppSelector } from '../hooks/regular_hooks/hooks';
import { RootState } from '../store/store';
import { colors } from '../utils/constants/colors';
import CustomFlatList from '../components/customFlatList';

type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;

type Props = {
  route: CategoryScreenRouteProp;
};

export default function SpecificCategoryScreen({ route }: Props) {
  const { category } = route.params;
  const { data, isLoading, isError, isFetching, refetch } =
    useProductsByCategory(category);
    
  const deleteMutation = useDeleteProduct();
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
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const themeColor = colors[theme];

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
  list: {
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 10,
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
    fontSize: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
});
