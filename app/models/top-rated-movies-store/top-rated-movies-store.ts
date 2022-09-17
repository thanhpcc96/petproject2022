import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { MovieModel, MovieSnapshotOut } from "../movies/movies"

/**
 * Example store containing Rick and Morty characters
 */
export const TopRatedMoviesStoreModel = types
  .model("TopRatedMoviesStore")
  .props({
    movies: types.optional(types.array(MovieModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveListTopRatedMovies: (movieSnapshots: MovieSnapshotOut[]) => {
      // @ts-ignore
      self.movies.replace(movieSnapshots)
    },
  }))
  .actions((self) => ({
    getTopRatedList: async () => {
      const result = await self.environment.movieApi.getTopRatedList()
      if (result.kind === "ok") {
        self.saveListTopRatedMovies(result.movies)
      } else {
        __DEV__ && console?.tron?.log(result.kind)
      }
    },
  }))

export interface TopRatedMoviesStore extends Instance<typeof TopRatedMoviesStoreModel> {}
export interface TopRatedMoviesStoreSnapshotOut
  extends SnapshotOut<typeof TopRatedMoviesStoreModel> {}
export interface TopRatedMoviesStoreSnapshotIn
  extends SnapshotIn<typeof TopRatedMoviesStoreModel> {}
export const createTopRatedMoviesStoretModel = () => types.optional(TopRatedMoviesStoreModel, {})
