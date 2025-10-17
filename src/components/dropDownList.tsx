import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAllCategories } from '../hooks/api_hooks/productsHooks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/nativeStackNavigation';
import { useAppSelector } from '../hooks/regular_hooks/hooks';
import { colors } from '../utils/constants/colors';
import { RootState } from '../store/store';
import { Dropdown } from 'react-native-element-dropdown';

export default function DropDownComponent() {
  const { data: categories, isLoading: loading } = useAllCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>('');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const themeColor = colors[theme];

  const handleChangeDopValue = (value: any) => {
    setSelectedCategory(value.label);
    navigation.push('Category', { category: value.label });
  };

  if (loading)
    return (
      <ActivityIndicator
        size="small"
        color={themeColor.primary}
        style={{ marginTop: 20 }}
      />
    );

  return (
    <Dropdown
      style={[
        styles.dropdown,
        {
          borderColor: themeColor.primary,
          backgroundColor: themeColor.card,
        },
      ]}
      placeholderStyle={{ color: themeColor.placeholderColor }}
      selectedTextStyle={{
        color: themeColor.text,
        fontWeight: '500',
      }}
      itemTextStyle={{ color: themeColor.text }}
      containerStyle={[
        styles.dropdownContainer,
        { backgroundColor: themeColor.card },
      ]}
      activeColor={themeColor.primary + '20'} // لون خفيف للعنصر المختار
      data={
        categories?.map((category: any) => ({
          label: category.slug,
          value: category.slug,
        })) || []
      }
      labelField="label"
      valueField="value"
      placeholder="Select category..."
      value={selectedCategory}
      onChange={handleChangeDopValue}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    marginTop: 100,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dropdownContainer: {
    borderRadius: 10,
    marginTop: 4,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
});
