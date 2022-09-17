import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { MovieModel, MovieSnapshotOut } from "../movies/movies"

/**
 * Example store containing Rick and Morty characters
 */
export const UpComingMoviesStoreModel = types
  .model("UpComingMoviesStore")
  .props({
    movies: types.optional(types.array(MovieModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveListUpcomingMovies: (movieSnapshots: MovieSnapshotOut[]) => {
      // @ts-ignore
      self.movies.replace(movieSnapshots)
    },
  }))
  .actions((self) => ({
    getListUpcoming: async () => {
      const result = await self.environment.movieApi.getUpcomingList()

      if (result.kind === "ok") {
        self.saveListUpcomingMovies(result.movies)
      } else {
        __DEV__ && console?.tron?.log(result.kind)
      }
    },
  }))

export interface UpComingMoviesStore extends Instance<typeof UpComingMoviesStoreModel> {}
export interface UpComingMoviesStoreSnapshotOut
  extends SnapshotOut<typeof UpComingMoviesStoreModel> {}
export interface UpComingMoviesStoreSnapshotIn
  extends SnapshotIn<typeof UpComingMoviesStoreModel> {}
export const createUpComingMoviesStoretModel = () => types.optional(UpComingMoviesStoreModel, {})
