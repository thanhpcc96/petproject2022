import { renderHook } from "@testing-library/react-hooks"
import { useFade } from "./useFade"

it("render ok", () => {
  const { result } = renderHook(() => useFade())
  expect(result.current).toBeDefined()
})

it("test fadein with callback", () => {
  const callback = jest.fn()
  const { result } = renderHook(() => useFade(callback))
  expect(result.current.opacity).toBeTruthy()
})
