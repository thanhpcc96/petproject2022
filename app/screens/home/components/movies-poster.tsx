import React from "react"
import { Image, ImageStyle, TouchableOpacity, View, ViewStyle } from "react-native"
// import { useNavigation } from "@react-navigation/core"
// import { StackNavigationProp } from "@react-navigation/stack"
// import { NavigatorParamList } from "../../../navigators"
import { Movie } from "../../../models/movies/movies"

const { IMAGE_PREFIX } = require("../../../config/env")

interface Props {
  movie: Movie
  height?: number
  width?: number
}

// type HomeScreenNavigationProp = StackNavigationProp<NavigatorParamList, "home">

export const MoviePoster = ({ movie, height = 420, width = 300 }: Props) => {
  // const navigation = useNavigation<HomeScreenNavigationProp>()

  const uri = `${IMAGE_PREFIX}${movie.posterPath}`

  return (
    <TouchableOpacity
      onPress={() => {
        return null
      }}
      activeOpacity={0.8}
      style={[CONTAINER, { width, height }]}
    >
      <View style={[CONTAINER_IMAGE, SHADOW]}>
        <Image source={{ uri }} style={IMAGE} />
      </View>
    </TouchableOpacity>
  )
}
const CONTAINER: ViewStyle = {
  marginHorizontal: 2,
  paddingBottom: 20,
  paddingHorizontal: 7,
}
const CONTAINER_IMAGE: ViewStyle = {
  borderRadius: 18,
  flex: 1,
}
const IMAGE: ImageStyle = {
  borderRadius: 18,
  flex: 1,
}
const SHADOW: ViewStyle = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.24,
  shadowRadius: 7,
  elevation: 9,
}
