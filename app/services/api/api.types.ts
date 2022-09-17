import { GeneralApiProblem } from "./api-problem"
import { Movie } from "../../models/movies/movies"

export interface User {
  id: number
  name: string
}

export type GetMoviesResult = { kind: "ok"; movies: Movie[] } | GeneralApiProblem
