import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GradientUIStoreModel } from "../gradient-ui-store/gradient-ui-store"
import { NowPlayingMovieStoreModel } from "../now-playing-movies-store/now-playing-movies-store"
import { PopularMovieStoreModel } from "../popular-movies-store/popular-movies-store"
import { TopRatedMoviesStoreModel } from "../top-rated-movies-store/top-rated-movies-store"
import { UpComingMoviesStoreModel } from "../up-coming-movies-store/up-coming-movies-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  gradientUIStore: types.optional(GradientUIStoreModel,{} as any),
  nowPlayingMoviesStore: types.optional(NowPlayingMovieStoreModel, {} as any),
  popularMoviesStore: types.optional(PopularMovieStoreModel, {} as any),
  topRatedMoviesStore: types.optional(TopRatedMoviesStoreModel, {} as any),
  upcomingMoviesStore: types.optional(UpComingMoviesStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
