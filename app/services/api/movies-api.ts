import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetMoviesResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

export class MoviesApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getNowPlayingList(): Promise<GetMoviesResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get("/now_playing")
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const movies = response.data?.results || []
      return { kind: "ok", movies: this.mapData(movies) }
    } catch (error) {
      __DEV__ && console.tron.log(error.message)
      return { kind: "bad-data" }
    }
  }

  async getPopularList(): Promise<GetMoviesResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get("/popular")
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const movies = response.data?.results || []
      return { kind: "ok", movies: this.mapData(movies) }
    } catch (error) {
      __DEV__ && console.tron.log(error.message)
      return { kind: "bad-data" }
    }
  }

  async getTopRatedList(): Promise<GetMoviesResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get("/top_rated")
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const movies = response.data?.results || []
      return { kind: "ok", movies: this.mapData(movies) }
    } catch (error) {
      __DEV__ && console.tron.log(error.message)
      return { kind: "bad-data" }
    }
  }

  async getUpcomingList(): Promise<GetMoviesResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get("/upcoming")
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const movies = response.data?.results || []
      return { kind: "ok", movies: this.mapData(movies) }
    } catch (error) {
      __DEV__ && console.tron.log(error.message)
      return { kind: "bad-data" }
    }
  }

  private mapData(beforeData: Array<any>): Array<any> {
    return beforeData.map((movie) => ({
      adult: movie.adult,
      backdropPath: movie.backdrop_path, // return path image like:  "/2RSirqZG949GuRwN38MYCIGG4Od.jpg"
      genreIds: movie.genre_ids, // Array<number>
      id: movie.id,
      originalLanguage: movie.original_language,
      originalTitle: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      posterPath: movie.poster_path, // return path image like:  "/v28T5F1IygM8vXWZIycfNEm3xcL.jpg"
      releaseDate: movie.release_date, // "2022-08-11"
      title: movie.title, // "Fall"
      video: movie.video,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
    }))
  }
}
