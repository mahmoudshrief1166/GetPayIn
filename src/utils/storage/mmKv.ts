import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

/// Token management functions
export const setToken = (token: string) => {
  try {
    storage.set('token', token);
    console.log('Token saved:', token);
  } catch (error) {
    console.log('MMKV setToken error:', error);
  }
};

export const getToken = (): string | null => {
  try {
    return storage.getString('token') || null;
  } catch (error) {
    console.log('MMKV getToken error:', error);
    return null;
  }
};

export const clearToken = () => {
  try {
    storage.delete('token');
  } catch (error) {
    console.log('MMKV clearToken error:', error);
  }
};

///user management functions
export const setUser=(user:string)=>{
    try {
    storage.set('user', user);
    console.log('Token saved:', user);
  } catch (error) {
    console.log('MMKV setToken error:', error);
  }
}

export const getUser=()=>{
    try {
    return storage.getString('user') || null;
  } catch (error) {
    console.log('MMKV getToken error:', error);
    return null;
  }
  
}

export const clearUser = () => {
  try {
    storage.delete('user');
  } catch (error) {
    console.log('MMKV clearToken error:', error);
  }
};

///products management functions

export const setProducts=(product:any[])=>{
  try{
    const productsString=JSON.stringify(product);
    storage.set('products',productsString)
  }catch (error) {
    console.log('MMKV setProducts error:', error);
  }
}
export const getProducts=():any[]=>{
  try{
    const data=storage.getString('products');
    return data? JSON.parse(data):[];
  }catch (error) {
    console.log('MMKV getProducts error:', error);
    return [];
  }
}

export const deleteProduct=(id:number)=>{
  try{
    const products=getProducts();
    const filteredProducts=products.filter(product=>product.id!==id);
    setProducts(filteredProducts);
  }catch (error) {
    console.log('MMKV deleteProduct error:', error);
  }
}
export const clearProducts=()=>{
  try{
    storage.delete('products');
  }catch (error) {
    console.log('MMKV clearProducts error:', error);
  }
}

//categories  management functions
export const setCategories=(categories:any[])=>{
  try{
    const categoriesString=JSON.stringify(categories);
    storage.set('categories',categoriesString);
  }catch (error) {
    console.log('MMKV setCategories error:', error);
  }
}

export const getCategories=():any[]=>{
  try{
    const data=storage.getString('categories');
    return data? JSON.parse(data):[];
  }catch (error) {
    console.log('MMKV getCategories error:', error);
    return [];
  }
}

export const deleteCategory=(id:number)=>{
  try{
    const categories=getCategories();
    const filteredCategories=categories.filter(category=>category.id!==id);
    setCategories(filteredCategories);
  }catch (error) {
    console.log('MMKV deleteCategory error:', error);
  }
}
export const clearCategories=()=>{
  try{
    storage.delete('categories');
  }catch (error) {
    console.log('MMKV clearCategories error:', error);
  }
}

//category products management functions
export const setCategoryProducts=(category:string, products:any[])=>{
  try{
    const productsString=JSON.stringify(products);
    storage.set(`category_${category}_products`,productsString);
  }catch (error) {
    console.log('MMKV setCategoryProducts error:', error);
  }
}

export const getCategoryProducts=(category:string):any[]=>{
  try{
    const data=storage.getString(`category_${category}_products`);
    return data? JSON.parse(data):[];
  }catch (error) {
    console.log('MMKV getCategoryProducts error:', error);
    return [];
  }
}

