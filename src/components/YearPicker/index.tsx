import { ScrollView, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import "./index.scss";

interface YearPickerProps {
  value: string;
  onChange: (year: string) => void;
  minYear?: number;
  maxYear?: number;
  themeColors?: any;
}

// 添加类型定义
interface ScrollRef {
  scrollTo: (options: ScrollToOptions) => void;
}

// 添加滚动事件的类型定义
interface ScrollEvent {
  detail: {
    scrollLeft: number;
    scrollTop: number;
    scrollHeight: number;
    scrollWidth: number;
    deltaX?: number;
    deltaY?: number;
  };
}

const YearPicker = ({
  value,
  onChange,
  minYear = 1924,
  maxYear = 2024,
  themeColors,
}: YearPickerProps) => {
  const [years, setYears] = useState<number[]>([]);
  const [scrollIntoView, setScrollIntoView] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [centerIndex, setCenterIndex] = useState(-1);
  const [initialized, setInitialized] = useState(false);
  const [screenWidth, setScreenWidth] = useState(375);
  const scrollRef = useRef<ScrollRef>(null);

  const ITEM_WIDTH = 80;
  const HALF_ITEM = ITEM_WIDTH / 2;

  // 在组件挂载时获取屏幕宽度
  useEffect(() => {
    const systemInfo = Taro.getSystemInfoSync();
    setScreenWidth(systemInfo.windowWidth);
  }, []);

  const HALF_SCREEN = screenWidth / 2;
  const LEFT_OFFSET = HALF_SCREEN - HALF_ITEM;

  const handleScroll = (e: ScrollEvent) => {
    const { scrollLeft } = e.detail;

    // 考虑左侧padding的影响
    const adjustedScrollLeft = Math.max(0, scrollLeft - LEFT_OFFSET);
    const index = Math.round(adjustedScrollLeft / ITEM_WIDTH);
    const actualIndex = Math.max(0, Math.min(index, years.length - 1));

    console.log("Scroll Debug:", {
      scrollLeft,
      adjustedScrollLeft,
      index,
      actualIndex,
      currentYear: years[actualIndex],
      value,
      LEFT_OFFSET,
    });

    const centerYear = years[actualIndex];
    if (centerYear && centerYear.toString() !== value) {
      setCenterIndex(actualIndex);
      onChange(centerYear.toString());
    }
  };

  const handleScrollEnd = (e: ScrollEvent) => {
    const { scrollLeft } = e.detail;
    const velocity = e.detail?.deltaX || 0;

    // 考虑左侧padding的影响
    const adjustedScrollLeft = Math.max(0, scrollLeft - LEFT_OFFSET);
    const index = Math.round(adjustedScrollLeft / ITEM_WIDTH);
    const momentumOffset =
      Math.sign(velocity) * Math.min(Math.abs(velocity) * 0.2, 0.5);
    const targetIndex = Math.max(
      0,
      Math.min(Math.round(index + momentumOffset), years.length - 1)
    );

    // 计算目标滚动位置时加回左侧padding
    const targetScrollLeft = targetIndex * ITEM_WIDTH + LEFT_OFFSET;

    const targetYear = years[targetIndex];
    if (targetYear && targetYear.toString() !== value) {
      setCenterIndex(targetIndex);
      onChange(targetYear.toString());
    }

    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth",
        });
      }
    });
  };

  useEffect(() => {
    const yearsList: number[] = [];
    for (let year = maxYear; year >= minYear; year--) {
      yearsList.push(year);
    }
    setYears(yearsList);
  }, [maxYear, minYear]);

  // 修改初始滚动位置的计算
  useEffect(() => {
    if (!initialized && value && years.length > 0) {
      const yearIndex = years.findIndex((year) => year.toString() === value);
      if (yearIndex !== -1) {
        // 计算初始滚动位置时也要考虑左侧padding
        const initialScrollLeft = yearIndex * ITEM_WIDTH + LEFT_OFFSET;
        setScrollPosition(initialScrollLeft);
        setCenterIndex(yearIndex);
        setInitialized(true);

        // 使用 requestAnimationFrame 确保滚动位置正确设置
        requestAnimationFrame(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              left: initialScrollLeft,
              behavior: "auto",
            });
          }
        });
      }
    }
  }, [value, years, initialized, LEFT_OFFSET]);

  const getItemClassName = (year: number) => {
    const yearIndex = years.indexOf(year);
    let classes = ["year-item"];

    if (centerIndex === -1) {
      // 初始状态，使用value判断
      if (year.toString() === value) {
        classes.push("active");
      } else if (Math.abs(years.indexOf(parseInt(value)) - yearIndex) === 1) {
        classes.push("near");
      } else {
        classes.push("far");
      }
    } else {
      // 滚动状态，使用centerIndex判断
      const distance = Math.abs(yearIndex - centerIndex);
      if (distance === 0) {
        classes.push("active");
      } else if (distance === 1) {
        classes.push("near");
      } else {
        classes.push("far");
      }
    }

    return classes.join(" ");
  };

  return (
    <View className="year-picker">
      <ScrollView
        ref={scrollRef}
        scrollX
        className="year-scroll"
        scrollIntoView={scrollIntoView}
        onScroll={handleScroll}
        onScrollEnd={handleScrollEnd}
        enhanced
        showScrollbar={false}
        scrollWithAnimation
        scrollAnimationDuration="300"
        fastDeceleration
      >
        <View className="year-list">
          {years.map((year) => (
            <View
              key={year}
              id={`year-${year}`}
              className={getItemClassName(year)}
            >
              <Text className="year-number">{year}</Text>
              <Text className="year-text">年</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="scroll-decoration left" />
      <View className="scroll-decoration right" />
    </View>
  );
};

export default YearPicker;
