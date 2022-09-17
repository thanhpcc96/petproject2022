import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { GradientModel, GradientSnapshotOut } from "../gradients/gradients"

/**
 * Example store containing Rick and Morty characters
 */
export const GradientUIStoreModel = types
  .model("GradientUIStore")
  .props({
    colors: types.optional(GradientModel, {
      primary: "transparent",
      secondary: "transparent",
    }),
    prevColors: types.optional(GradientModel, {
      primary: "transparent",
      secondary: "transparent",
    }),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setPrevMainColors: (gradientSnapshotOut: GradientSnapshotOut) => {
      self.prevColors = gradientSnapshotOut
    },
    setMainColors: (gradientSnapshotOut: GradientSnapshotOut) => {
      self.colors = gradientSnapshotOut
    },
  }))

export interface GradientUIStore extends Instance<typeof GradientUIStoreModel> {}
export interface GradientUIStoreSnapshotOut extends SnapshotOut<typeof GradientUIStoreModel> {}
export interface GradientUIStoreSnapshotIn extends SnapshotIn<typeof GradientUIStoreModel> {}
export const createGradientUIStoreModel = () => types.optional(GradientUIStoreModel, {})
