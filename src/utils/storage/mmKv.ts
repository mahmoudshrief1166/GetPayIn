import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

/// Token management functions
export const setToken = (token: string) => {
  try {
    storage.set('token', token);
  } catch (error) {}
};

export const getToken = (): string | null => {
  try {
    return storage.getString('token') || null;
  } catch (error) {
    return null;
  }
};

export const clearToken = () => {
  try {
    storage.delete('token');
  } catch (error) {}
};
///Theme management functions
export const setLocalTheme = (theme: string) => {
  try {
    storage.set('theme', theme);
  } catch (error) {}
};

export const getTheme = (): string | null => {
  try {
    return storage.getString('theme') || null;
  } catch (error) {
    return null;
  }
};

export const clearTheme = () => {
  try {
    storage.delete('theme');
  } catch (error) {}
};

///password fallback
export const setLocalPassword = (password: string) => {
  try {
    storage.set('password', password);
  } catch (error) {}
};

export const getPassword = (): string | null => {
  try {
    return storage.getString('password') || null;
  } catch (error) {
    return null;
  }
};

export const clearPassword = () => {
  try {
    storage.delete('password');
  } catch (error) {}
};

///user management functions
export const setUser = (user: string) => {
  try {
    storage.set('user', user);
  } catch (error) {}
};

export const getUser = () => {
  try {
    return storage.getString('user') || null;
  } catch (error) {
    return null;
  }
};

export const clearUser = () => {
  try {
    storage.delete('user');
  } catch (error) {}
};

///products management functions

export const setProducts = (product: any[]) => {
  try {
    const productsString = JSON.stringify(product);
    storage.set('products', productsString);
  } catch (error) {}
};
export const getProducts = (): any[] => {
  try {
    const data = storage.getString('products');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

export const deleteProduct = (id: number) => {
  try {
    const products = getProducts();
    const filteredProducts = products.filter(product => product.id !== id);
    setProducts(filteredProducts);
  } catch (error) {}
};
export const clearProducts = () => {
  try {
    storage.delete('products');
  } catch (error) {}
};

//categories  management functions
export const setCategories = (categories: any[]) => {
  try {
    const categoriesString = JSON.stringify(categories);
    storage.set('categories', categoriesString);
  } catch (error) {}
};

export const getCategories = (): any[] => {
  try {
    const data = storage.getString('categories');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

export const deleteCategory = (id: number) => {
  try {
    const categories = getCategories();
    const filteredCategories = categories.filter(
      category => category.id !== id,
    );
    setCategories(filteredCategories);
  } catch (error) {}
};
export const clearCategories = () => {
  try {
    storage.delete('categories');
  } catch (error) {}
};

//category products management functions
export const setCategoryProducts = (category: string, products: any[]) => {
  try {
    const productsString = JSON.stringify(products);
    storage.set(`category_${category}_products`, productsString);
  } catch (error) {}
};

export const getCategoryProducts = (category: string): any[] => {
  try {
    const data = storage.getString(`category_${category}_products`);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

export const deleteCategoryProduct = (category: string, id: number) => {
  try {
    const products = getCategoryProducts(category);
    const filtered = products.filter((p: any) => p.id !== id);
    setCategoryProducts(category, filtered);
  } catch (error) {}
};
