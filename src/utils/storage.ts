import { getStorageSync, removeStorageSync, setStorageSync } from "@tarojs/taro"

export const taroStorage = {
  getItem: getStorageSync,
  setItem: setStorageSync,
  removeItem: removeStorageSync,
}
