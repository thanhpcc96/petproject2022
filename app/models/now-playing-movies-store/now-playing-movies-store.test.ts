import { NowPlayingMovieStoreModel } from "./now-playing-movies-store"

let instance
beforeEach(() => {
  const mockEnvironment = {
    movieApi: {
      getNowPlayingList: jest.fn(),
    },
  }
  instance = NowPlayingMovieStoreModel.create({}, mockEnvironment)
})
afterEach(() => jest.clearAllMocks())

test("Can be create NowPlayingMovies store", () => {
  expect(instance).toBeTruthy()
})

const mockDataSuccess = {
  kind: "ok",
  movies: [
    {
      adult: false,
      backdropPath: "/2RSirqZG949GuRwN38MYCIGG4Od.jpg",
      genreIds: [53],
      id: 985939,
      originalLanguage: "en",
      originalTitle: "Fall",
      overview:
        "For best friends Becky and Hunter, life is all about conquering fears and pushing limits. But after they climb 2,000 feet to the top of a remote, abandoned radio tower, they find themselves stranded with no way down. Now Becky and Hunter’s expert climbing skills will be put to the ultimate test as they desperately fight to survive the elements, a lack of supplies, and vertigo-inducing heights",
      popularity: 8419.389,
      posterPath: "/v28T5F1IygM8vXWZIycfNEm3xcL.jpg",
      releaseDate: "2022-08-11",
      title: "Fall",
      video: false,
      voteAverage: 7.4,
      voteCount: 625,
    },
  ],
}

test("Get list now playing movies api success", async () => {
  instance.environment.movieApi.getNowPlayingList.mockReturnValue(Promise.resolve(mockDataSuccess))
  await instance.environment.movieApi.getNowPlayingList(0)
  expect(instance.environment.movieApi.getNowPlayingList).toHaveBeenCalledWith(0)
})

test("Get list now playing movies and save success", async () => {
  instance.environment.movieApi.getNowPlayingList.mockReturnValue(Promise.resolve(mockDataSuccess))
  await instance.getNowPlayingList()
  expect(instance.movies.length).toEqual(1)
})

/*
 * Test case false
 */

const mockDataFail = {
  kind: "fail",
  movies: null,
}

test("Get list now playing movies fail", async () => {
  instance.environment.movieApi.getNowPlayingList.mockReturnValue(Promise.resolve(mockDataFail))
  await instance.getNowPlayingList()
  expect(instance.movies.length).toEqual(0)
})
