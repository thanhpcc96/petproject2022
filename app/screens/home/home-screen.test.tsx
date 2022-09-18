import React from "react"
import { render, screen, fireEvent } from "@testing-library/react-native"
import { HomeScreen } from "./home-sreen"

const createTestProps = (props: any) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
})

let props

beforeEach(() => {
  props = createTestProps({})
})

test("renders correctly", () => {
  const { getByTestId } = render(<HomeScreen {...props} />)
  expect(getByTestId("carousel")).toBeTruthy()
})
