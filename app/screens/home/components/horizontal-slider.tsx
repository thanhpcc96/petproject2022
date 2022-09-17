import React from "react"
import { Text, View, FlatList, TextStyle } from "react-native"
import { Movie } from "../../../models/movies/movies"
import { MoviePoster } from "./movies-poster"

interface Props {
  title?: string
  movies: Movie[]
}

export const HorizontalSlider = ({ title, movies }: Props) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View>
      {title && <Text style={TITLE}>{title}</Text>}
      <FlatList
        data={movies}
        renderItem={({ item }: any) => <MoviePoster movie={item} width={140} height={200} />}
        keyExtractor={(item: Movie) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const TITLE: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  marginLeft: 10,
  color: "#000",
  marginBottom: 8,
}
