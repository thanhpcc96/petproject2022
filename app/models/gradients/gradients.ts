import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Rick and Morty character model.
 */
export const GradientModel = types.model("Gradient").props({
  primary: types.maybe(types.string),
  secondary: types.maybe(types.string),
})

export interface Gradient extends Instance<typeof GradientModel> {}
export interface GradientSnapshotOut extends SnapshotOut<typeof GradientModel> {}
export interface GradientSnapshotIn extends SnapshotIn<typeof GradientModel> {}
export const createGradientDefaultModel = () => types.optional(GradientModel, {})
