import { getStorageSync, setStorageSync, removeStorageSync } from "@tarojs/taro"

export const taroStorage = {
  getItem: (key: string) => {
    try {
      const value = getStorageSync(key)
      if (value === null || value === undefined || value === "") {
        return null
      }
      try {
        return JSON.parse(value)
      } catch {
        return value
      }
    } catch (e) {
      console.error("Error getting storage item:", e)
      return null
    }
  },
  setItem: (key: string, value: any) => {
    try {
      // Convert value to string if it's not already
      const stringValue = typeof value === "string" ? value : JSON.stringify(value)
      setStorageSync(key, stringValue)
    } catch (e) {
      console.error("Error setting storage item:", e)
    }
  },
  removeItem: (key: string) => {
    try {
      removeStorageSync(key)
    } catch (e) {
      console.error("Error removing storage item:", e)
    }
  },
}
