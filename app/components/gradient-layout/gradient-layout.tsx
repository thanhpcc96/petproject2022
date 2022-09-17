import React, { useEffect } from "react"
import { View, StyleSheet, Animated } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import { useFade } from "../../hooks/useFade"
import { useStores } from "../../models"

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const GradientLayout = observer(({ children }: Props) => {
  const {
    gradientUIStore: { colors, prevColors, setPrevMainColors },
  } = useStores()
  const { opacity, fadeIn, fadeOut } = useFade()

  useEffect(() => {
    fadeIn(() => {
      setPrevMainColors(colors)
      fadeOut()
    })
  }, [colors])

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[prevColors.primary, prevColors.secondary, "white"]}
        style={{ ...StyleSheet.absoluteFillObject }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.5, y: 0.7 }}
      />
      <Animated.View style={{ ...StyleSheet.absoluteFillObject, opacity }}>
        <LinearGradient
          colors={[colors.primary, colors.secondary, "white"]}
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
