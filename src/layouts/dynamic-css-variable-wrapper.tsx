import { themeConfigAtom } from "@/atoms"
import { hexToRgb } from "@/utils/color"
import { View } from "@tarojs/components"
import { useAtom } from "jotai"
import { PropsWithChildren } from "react"
import StyleToJS from "style-to-js"

/**
 * todo: why 需要在 pages/ 下用，直接在 app.tsx 里用不行……
 * @param children
 * @constructor
 */
export const DynamicCssVariableWrapper = ({ children }: PropsWithChildren) => {
  const [themeConfig] = useAtom(themeConfigAtom)

  const cssVars = {
    // todo: why 需要把 @/app.scss 文件里的动态 css 变量给补过来……
    ...StyleToJS(
      `
    // 3. 语义化变量 - 使用主题变量
    --theme-primary: var(--primary-color);
    --theme-bg: var(--background-color);
    --theme-surface: var(--surface-color);
    --theme-text: var(--text-color);
    --theme-text-secondary: var(--secondary-text-color);
    --theme-border: var(--border-color);
    --theme-error: var(--error-color);

    // 4. 透明度变体
    --theme-bg-alpha-80: rgba(var(--background-color-rgb), 0.8);
    --theme-primary-alpha-10: rgba(var(--primary-color-rgb), 0.1);
    --theme-primary-alpha-20: rgba(var(--primary-color-rgb), 0.2);`
        .split("\n")
        .filter(line => line.includes(": "))
        .join("\n"),
    ),

    "--primary-color-rgb": hexToRgb(themeConfig.primary),
    "--primary-color": themeConfig.primary,
    "--background-color": themeConfig.backgroundColor,
    "--surface-color": themeConfig.surface,
    "--text-color": themeConfig.text,
    "--secondary-text-color": themeConfig.secondaryText,
    "--border-color": themeConfig.border,
  } as React.CSSProperties

  return (
    <View className="app-wrapper" style={cssVars}>
      {children}
    </View>
  )
}
