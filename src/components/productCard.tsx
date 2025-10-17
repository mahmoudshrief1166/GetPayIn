import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useAppSelector } from '../hooks/regular_hooks/hooks';
import { RootState } from '../store/store';
import { colors } from '../utils/constants/colors';
import { USER_ROLES } from '../utils/constants/constants';
import Toast from 'react-native-toast-message';
import { useDeleteProduct } from '../hooks/api_hooks/productsHooks';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24;

export default function ProductCard({
  product,
  onDelete,
}: {
  product: any;
  onDelete: (id: number) => void;
}) {
  const { role } = useAppSelector((state: RootState) => state.auth);
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const themeColor = colors[theme];
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

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: themeColor.card, borderColor: themeColor.primary },
      ]}
    >
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text
        style={[styles.title, { color: themeColor.text }]}
        numberOfLines={1}
      >
        {product.title}
      </Text>
      <View style={styles.bottomRow}>
        <Text style={[styles.price, { color: themeColor.placeholderColor }]}>
          ${product.price.toFixed(2)}
        </Text>

        {role === USER_ROLES.ADMIN && (
          <TouchableOpacity
            style={[
              styles.deleteButton,
              { backgroundColor: themeColor.button },
            ]}
            onPress={() => onDelete(product.id)}
          >
            <Text style={styles.deleteText}>Del</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1.5,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 13,
  },
  deleteButton: {
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  deleteText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});
