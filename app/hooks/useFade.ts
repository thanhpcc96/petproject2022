import { useRef } from "react"
import { Animated } from "react-native"

export const useFade = () => {
  const opacity = useRef(new Animated.Value(0)).current
  const fadeDuration = 300

  const fadeIn = (callback?: () => void) => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: fadeDuration,
      useNativeDriver: true,
    }).start(() => {
      if (callback) {
        callback()
      }
    })
  }

  const fadeOut = (callback?: () => void) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: fadeDuration,
      useNativeDriver: true,
    }).start(() => {
      if (callback) {
        callback()
      }
    })
  }

  return {
    opacity,
    fadeIn,
    fadeOut,
  }
}
