// import React from "react"
// jest.mock(
//   "react-native-safe-area-view",
//   () =>
//     class MockSafeAreaView extends React.Component {
//       render() {
//         const { children } = this.props
//         return React.createElement("SafeAreaView", this.props, children)
//       }
//     },
// )

// jest.mock("react-native-safe-area-context", () => ({
//   useSafeArea: () => ({ insets: null }),
// }))

import mockSafeAreaContext from "react-native-safe-area-context/jest/mock"
jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn().mockImplementation(({ children }) => children),
    SafeAreaConsumer: jest.fn().mockImplementation(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
  }
})
