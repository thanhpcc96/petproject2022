import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { View, ViewStyle, ScrollView, useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Carousel from "react-native-snap-carousel"
import { GradientLayout } from "../../components/gradient-layout/gradient-layout"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"
import { getImageColors } from "../../utils/image-colors"
import { HorizontalSlider } from "./components/horizontal-slider"
import { MoviePoster } from "./components/movies-poster"
const { IMAGE_PREFIX } = require("../../config/env")

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(() => {
  const { top } = useSafeAreaInsets()
  const {
    nowPlayingMoviesStore,
    popularMoviesStore,
    topRatedMoviesStore,
    upcomingMoviesStore,
    gradientUIStore,
  } = useStores()
  const { width: deviceWidth } = useWindowDimensions()

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        nowPlayingMoviesStore.getNowPlayingList(),
        popularMoviesStore.getPopularList(),
        topRatedMoviesStore.getTopRatedList(),
        upcomingMoviesStore.getListUpcoming(),
      ])
    }

    fetchData()
  }, [])

  const getPosterColors = async (index: number) => {
    const movie = nowPlayingMoviesStore.movies[index]
    const uri = `${IMAGE_PREFIX}${movie.posterPath}`
    const [primary = "transparent", secondary = "transparent"] = await getImageColors(uri)
    gradientUIStore.setMainColors({ primary, secondary })
  }

  return (
    <GradientLayout>
      <View style={FULL_VIEW}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[FULL_VIEW, { marginTop: top }]}>
            <View style={CAROUSEL_CONTAINER} testID="carousel">
              <Carousel
                data={nowPlayingMoviesStore?.movies || []}
                renderItem={({ item }: any) => <MoviePoster movie={item} />}
                sliderWidth={deviceWidth}
                itemWidth={300}
                inactiveSlideOpacity={0.9}
                onSnapToItem={(index) => getPosterColors(index)}
              />
            </View>
            <HorizontalSlider title="Most popular" movies={popularMoviesStore?.movies} />
            <HorizontalSlider title="Top Rated" movies={topRatedMoviesStore?.movies} />
            <HorizontalSlider title="Upcomming" movies={upcomingMoviesStore?.movies} />
          </View>
        </ScrollView>
      </View>
    </GradientLayout>
  )
})

const FULL_VIEW: ViewStyle = { flex: 1 }
const CAROUSEL_CONTAINER: ViewStyle = { height: 440 }
