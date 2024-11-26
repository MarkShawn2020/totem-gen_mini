import { getStorageSync, removeStorageSync, setStorageSync } from "@tarojs/taro"
import { atomWithStorage, createJSONStorage } from "jotai/utils"

const createTaroStorage = <T>() =>
  createJSONStorage<T>(() => ({
    getItem: getStorageSync,
    setItem: setStorageSync,
    removeItem: removeStorageSync,
  }))
export const atomWithTaroStorage = <T>(key: string, initialValue: T) =>
  atomWithStorage(key, initialValue, createTaroStorage())
