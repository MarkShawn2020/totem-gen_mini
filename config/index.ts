import { defineConfig, type UserConfigExport } from "@tarojs/cli"
import { resolve } from "path"
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import vitePluginImp from "vite-plugin-imp"
import devConfig from "./dev"
import prodConfig from "./prod"

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<"vite">(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<"vite"> = {
    projectName: "totem-gen_mini_2",
    date: "2024-11-25",
    designWidth: 375,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: "src",
    outputRoot: "dist",
    plugins: ["@tarojs/plugin-html"],
    defineConstants: {},
    copy: {
      patterns: [
        // load fonts
        // {
        //   from: "src/assets/",
        //   to: "dist/assets/",
        // },
      ],
      options: {},
    },
    framework: "react",
    compiler: {
      type: "vite",
      vitePlugins: [
        vitePluginImp({
          libList: [
            {
              libName: "@nutui/nutui-react-taro",
              style: () => "@nutui/nutui-react-taro/dist/style.css",
              replaceOldImport: false,
              camel2DashComponentName: false,
            },
          ],
        }),
      ],
    },
    mini: {
      debugReact: true,

      webpackChain(chain) {
        chain.resolve.plugin("tsconfig-paths").use(TsconfigPathsPlugin)

        chain.module
          .rule("csv")
          .test(/\.csv$/)
          .use("csv-loader")
          .loader("csv-loader")
      },
      postcss: {
        pxtransform: {
          enable: true,
          config: {
            selectorBlackList: ["nut-"],
          },
        },
        url: {
          enable: true,
          config: {
            limit: 1024, // 设定转换尺寸上限
          },
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    },
    h5: {
      webpackChain(chain) {
        chain.resolve.plugin("tsconfig-paths").use(TsconfigPathsPlugin)
      },
      esnextModules: ["@nutui/nutui-react-taro"],
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    },
    rn: {
      appName: "taroDemo",
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
      },
    },
    alias: {
      "@": resolve(__dirname, "../src"),
    },
  }
  if (process.env.NODE_ENV === "development") {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
