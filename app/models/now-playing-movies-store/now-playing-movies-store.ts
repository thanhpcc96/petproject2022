import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { MovieModel, MovieSnapshotOut } from "../movies/movies"

/**
 * Example store containing Rick and Morty characters
 */
export const NowPlayingMovieStoreModel = types
  .model("NowPlayingMoviesStore")
  .props({
    movies: types.optional(types.array(MovieModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveListNowPlaying: (movieSnapshots: MovieSnapshotOut[]) => {
      // @ts-ignore
      self.movies.replace(movieSnapshots)
    },
  }))
  .actions((self) => ({
    getNowPlayingList: async () => {
      const result = await self.environment.movieApi.getNowPlayingList()

      if (result.kind === "ok") {
        self.saveListNowPlaying(result.movies)
      } else {
        __DEV__ && console?.tron?.log(result.kind)
      }
    },
  }))

export interface NowPlayingMovieStore extends Instance<typeof NowPlayingMovieStoreModel> {}
export interface NowPlayingMovieStoreSnapshotOut
  extends SnapshotOut<typeof NowPlayingMovieStoreModel> {}
export interface NowPlayingMovieStoreSnapshotIn
  extends SnapshotIn<typeof NowPlayingMovieStoreModel> {}
export const createNowPlayingMovieStoretModel = () => types.optional(NowPlayingMovieStoreModel, {})
