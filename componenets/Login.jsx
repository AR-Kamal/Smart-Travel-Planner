import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, Dimensions, Image, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { height } = Dimensions.get('window');

export default function Login() {
  const router = useRouter();
  const SHEET_HEIGHT = Math.round(height * 0.35); // show ~40% of screen when sheet is open

  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const lastTranslate = useRef(SHEET_HEIGHT);

  const openSheet = () => {
    Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
      lastTranslate.current = 0;
    });
  };

  const closeSheet = () => {
    Animated.timing(translateY, { toValue: SHEET_HEIGHT, duration: 300, useNativeDriver: true }).start(() => {
      lastTranslate.current = SHEET_HEIGHT;
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      // start only on a vertical swipe (upwards)
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gesture) => {
        // only start for an upward swipe stronger than threshold
        return gesture.dy < -6 && Math.abs(gesture.dx) < 50;
      },
      onPanResponderGrant: () => {
        // read current animated value into lastTranslate
        translateY.stopAnimation((value) => {
          lastTranslate.current = value;
        });
      },
      onPanResponderMove: (_, gesture) => {
        const newVal = Math.max(0, Math.min(SHEET_HEIGHT, lastTranslate.current + gesture.dy));
        translateY.setValue(newVal);
      },
      onPanResponderRelease: (_, gesture) => {
        const shouldOpen = gesture.vy < -0.5 || (lastTranslate.current + gesture.dy) < SHEET_HEIGHT / 2;
        if (shouldOpen) {
          openSheet();
        } else {
          closeSheet();
        }
      },
    })
  ).current;

  return (
    <View style={styles.root} {...panResponder.panHandlers}>
      <Image source={require('./../assets/images/beach.jpg')} style={styles.bg} resizeMode="cover" />

      {/* Swipe hint (informational only) */}
      <View style={[styles.swipeHint, { bottom: SHEET_HEIGHT -200 }]}>
        <Text style={styles.hintTitle}>Swipe up to</Text>
        <Text style={styles.hintSubtitle}>plan your Kedah adventure.</Text>
        <Ionicons name="chevron-up" size={28} color={Colors.WHITE} style={{ marginTop: 8, marginLeft:30 }} />
      </View>

      {/* Bottom sheet containing your container view */}
      <Animated.View
        style={[
          styles.sheet,
          {
            height: SHEET_HEIGHT,
            transform: [{ translateY }],
          },
        ]}
      >
        <View {...panResponder.panHandlers} style={styles.handleArea}>
          <View style={styles.handleBar} />
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>MaiKedah</Text>
          <Text style={styles.subtitle}>
            Find your Dream Destination with MaiKedah, an AI Planner with smart personalization for Kedah state.
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => router.push('auth/sign-in')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.WHITE },
  bg: { position: 'absolute', width: '100%', height: '100%' },

  swipeHint: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  hintTitle: { color: Colors.WHITE, fontFamily: 'outfit-bold', fontSize: 30, marginLeft:20 },
  hintSubtitle: { color: Colors.WHITE, fontFamily: 'outfit', fontSize: 20, marginTop: 4, marginLeft:20 },

  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 6,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },

  handleArea: { alignItems: 'center', paddingVertical: 8, height:90 },
  handleBar: { width: 60, height: 5, borderRadius: 3, backgroundColor: Colors.LIGHT_GRAY },

  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -60,  // no negative margin needed; sheet controls position
    height: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  title: { fontSize: 30, fontFamily: 'outfit-bold', textAlign: 'center', marginTop: 6 },
  subtitle: { fontFamily: 'outfit', fontSize: 17, textAlign: 'center', marginTop: 12, color: Colors.GRAY },

  button: { marginTop: 24, padding: 15, backgroundColor: Colors.PEIMARY, borderRadius: 99, width: '80%' },
  buttonText: { color: Colors.WHITE, textAlign: 'center', fontFamily: 'outfit', fontSize: 16 },
});