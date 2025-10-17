import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import ProductCard from './productCard';
import { hp, wp } from '../utils/constants/responsive';

interface CustomFlatListProps {
  data: any[];
  onDelete?: (id: number) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export default function CustomFlatList({
  data,
  onDelete,
  refreshing = false,
  onRefresh,
}: CustomFlatListProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <ProductCard product={item} onDelete={onDelete!} />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: wp(2),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
})
