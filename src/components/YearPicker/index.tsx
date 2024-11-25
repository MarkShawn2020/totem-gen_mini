import { View, Text, ScrollView } from '@tarojs/components'
import { useState, useCallback, useEffect, useRef } from 'react'
import Taro from '@tarojs/taro'
import "./index.scss";

interface YearPickerProps {
  value: string
  onChange: (year: string) => void
  minYear?: number
  maxYear?: number
  themeColors?: any
}

const YearPicker = ({
  value,
  onChange,
  minYear = 1924,
  maxYear = 2024,
  themeColors,
}: YearPickerProps) => {
  const [years, setYears] = useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const lastScrollLeft = useRef(0)
  const scrollTimeout = useRef<any>(null)
  const itemWidth = 80 // Width of each year item

  // Initialize years list
  useEffect(() => {
    const yearsList: number[] = []
    for (let year = maxYear; year >= minYear; year--) {
      yearsList.push(year)
    }
    setYears(yearsList)
    
    // Set initial selected index based on value
    const initialIndex = yearsList.findIndex(year => year.toString() === value)
    if (initialIndex !== -1) {
      setSelectedIndex(initialIndex)
      // Set initial scroll position after a short delay to ensure the component is mounted
      setTimeout(() => {
        const newScrollLeft = initialIndex * itemWidth
        setScrollLeft(newScrollLeft)
        lastScrollLeft.current = newScrollLeft
      }, 100)
    }
  }, [maxYear, minYear, value])

  const handleScrollStart = useCallback(() => {
    setIsScrolling(true)
  }, [])

  const handleScroll = useCallback((e) => {
    const { scrollLeft: newScrollLeft } = e.detail
    lastScrollLeft.current = newScrollLeft

    // Clear existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current)
    }

    // Set a new timeout
    scrollTimeout.current = setTimeout(() => {
      const index = Math.round(newScrollLeft / itemWidth)
      if (index >= 0 && index < years.length && index !== selectedIndex) {
        setSelectedIndex(index)
        const newScrollLeft = index * itemWidth
        setScrollLeft(newScrollLeft)
        onChange(years[index].toString())
      }
      setIsScrolling(false)
    }, 150) // Debounce time
  }, [years, onChange, selectedIndex, itemWidth])

  const handleItemClick = useCallback((index: number) => {
    if (isScrolling) return
    setSelectedIndex(index)
    const newScrollLeft = index * itemWidth
    setScrollLeft(newScrollLeft)
    lastScrollLeft.current = newScrollLeft
    onChange(years[index].toString())
  }, [years, onChange, isScrolling])

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  return (
    <View className='year-picker'>
      <ScrollView
        className='year-picker__container'
        scrollX
        enhanced
        showScrollbar={false}
        scrollWithAnimation
        scrollLeft={scrollLeft}
        onScrollStart={handleScrollStart}
        onScroll={handleScroll}
        style={{
          '--theme-primary': themeColors?.primary,
          '--theme-text': themeColors?.text,
        } as any}
      >
        <View className='year-picker__items'>
          {years.map((year, index) => (
            <View
              key={year}
              className={`year-picker__item ${index === selectedIndex ? 'year-picker__item--selected' : ''}`}
              onClick={() => handleItemClick(index)}
            >
              <Text>{year}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default YearPicker
