import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { useAllCategories } from '../hooks/api_hooks/productsHooks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/nativeStackNavigation';
import { useAppSelector } from '../hooks/regular_hooks/hooks';
import { colors } from '../utils/constants/colors';
import { RootState } from '../store/store';
import { Dropdown } from 'react-native-element-dropdown';
import { wp, hp } from '../utils/constants/responsive';

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
        style={{ marginTop: hp(2) }}
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
      placeholderStyle={{
        color: themeColor.placeholderColor,
        fontSize: wp(4),
      }}
      selectedTextStyle={{
        color: themeColor.text,
        fontWeight: '500',
        fontSize: wp(4),
      }}
      itemTextStyle={{
        color: themeColor.text,
        fontSize: wp(3.8),
      }}
      containerStyle={[
        styles.dropdownContainer,
        { backgroundColor: themeColor.card },
      ]}
      activeColor={themeColor.primary + '20'} 
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
    height: hp(6),
    borderWidth: 1,
    borderRadius: wp(3),
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
    marginTop: hp(12),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dropdownContainer: {
    borderRadius: wp(3),
    marginTop: hp(1),
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
});
