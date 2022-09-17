import { GradientUIStoreModel } from "./gradient-ui-store"

test("Can be create gradient store", () => {
  const instance = GradientUIStoreModel.create({})

  expect(instance).toBeTruthy()
})

test("Can set new color", () => {
  const instance = GradientUIStoreModel.create({})
  instance.setMainColors({ primary: "red", secondary: "green" })
  expect(instance.colors.primary).toEqual("red")
})
test("Set prev color", () => {
  const instance = GradientUIStoreModel.create({})
  instance.setPrevMainColors({ primary: "yellow", secondary: "blue" })
  expect(instance.prevColors.primary).toEqual("yellow")
})
