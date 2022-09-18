import React, { useEffect } from "react"
import { View, StyleSheet, Animated } from "react-native"
/* istanbul ignore next */
import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import { useFade } from "../../hooks/useFade"
import { useStores } from "../../models"

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const GradientLayout = observer(({ children }: Props) => {
  const { gradientUIStore } = useStores()
  const { opacity, fadeIn, fadeOut } = useFade()

  useEffect(() => {
    fadeIn(() => {
      gradientUIStore?.setPrevMainColors(gradientUIStore?.colors)
      fadeOut()
    })
  }, [gradientUIStore?.colors])

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          gradientUIStore?.prevColors?.primary,
          gradientUIStore?.prevColors?.secondary,
          "white",
        ]}
        style={{ ...StyleSheet.absoluteFillObject }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.5, y: 0.7 }}
      />
      <Animated.View style={{ ...StyleSheet.absoluteFillObject, opacity }}>
        <LinearGradient
          colors={[gradientUIStore?.colors?.primary, gradientUIStore?.colors?.secondary, "white"]}
          style={{ ...StyleSheet.absoluteFillObject }}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.5, y: 0.7 }}
        />
      </Animated.View>
      {children}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
