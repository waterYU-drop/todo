module.exports = {
  preset: "ts-jest",
  // testMatch: ["<rootDir>/src/__test__/**/*.(spec|test).ts?(x)"],  默认路径
  transform: {
      // 将.js后缀的文件使用babel-jest处理  转化
      "^.+\\.js$": "babel-jest",
      "^.+\\.(ts|tsx)$": "ts-jest"
  },
       

"moduleNameMapper": {
  "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
  "\\.(css|less)$": "identity-obj-proxy"
},
setupFilesAfterEnv: [
  "<rootDir>/src/setupTests.js"
],

  // 下面非要从重要, 将不忽略 lodash-es, other-es-lib 这些es库, 从而使babel-jest去处理它们
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(lodash-es|other-es-lib))"]
};
