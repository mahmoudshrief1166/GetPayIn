
// Base URL for API requests
export const BASE_URL='https://dummyjson.com/' as const;

//Endpoints for API requests
export const APP_END_POINTS={
    LOGIN:'auth/login',
    ME:'auth/me',
    PRODUCT:'products',
    CATEGORY:'products/categories',
    PRODUCT_CATEGORY:(category:string):string=>`products/category/${category}`,
    DELETE_PRODUCT:(id:number):string=>`products/${id}`,
} as const;

//Storage Keys(AsyncStorage&mmkv)
export const STORAGE_KEYS={
    TOKEN:'token_data',
    USER:'user_data',
    QUERY_CACHE:'query_Cache',
}as const;

//User Roles
export enum USER_ROLES {
  USER = 'USER',
  ADMIN = 'SuperAdmin',
}

export const APP_SETTINGS={
    APP_LOCK_TIMEOUT:10_000, //in milliseconds
}as const;


export type AppEndPoints=typeof APP_END_POINTS;
export type StorageKeys=typeof STORAGE_KEYS;
export type UserRoles=typeof USER_ROLES;
export type AppSettings=typeof APP_SETTINGS;

