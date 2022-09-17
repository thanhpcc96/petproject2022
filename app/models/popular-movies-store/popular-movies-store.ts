import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { MovieModel, MovieSnapshotOut } from "../movies/movies"

/**
 * Example store containing Rick and Morty characters
 */
export const PopularMovieStoreModel = types
  .model("PopularMoviesStore")
  .props({
    movies: types.optional(types.array(MovieModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveListPopuloarMovies: (movieSnapshots: MovieSnapshotOut[]) => {
      // @ts-ignore
      self.movies.replace(movieSnapshots)
    },
  }))
  .actions((self) => ({
    getPopularList: async () => {
      const result = await self.environment.movieApi.getPopularList()

      if (result.kind === "ok") {
        self.saveListPopuloarMovies(result.movies)
      } else {
        __DEV__ && console?.tron?.log(result.kind)
      }
    },
  }))

export interface PopularMovieStore extends Instance<typeof PopularMovieStoreModel> {}
export interface PopularMovieStoreSnapshotOut extends SnapshotOut<typeof PopularMovieStoreModel> {}
export interface PopularMovieStoreSnapshotIn extends SnapshotIn<typeof PopularMovieStoreModel> {}
export const createPopularMovieStoretModel = () => types.optional(PopularMovieStoreModel, {})
