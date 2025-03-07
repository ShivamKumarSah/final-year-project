import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import { View, Image, Text, StyleSheet, useColorScheme } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated';

function CustomSplash() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Animated.View 
      entering={FadeIn.duration(1000)}
      exiting={FadeOut.duration(500)}
      style={[styles.splashContainer, isDark && styles.splashContainerDark]}
    >
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?q=80&w=2400&auto=format&fit=crop' }}
        style={styles.backgroundImage}
      />
      <View style={[styles.overlay, isDark && styles.overlayDark]} />
      <View style={styles.content}>
        <Animated.Image
          entering={ZoomIn.duration(1000)}
          source={{ uri: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=300&auto=format&fit=crop' }}
          style={styles.logo}
        />
        <Animated.Text 
          entering={FadeIn.duration(1000).delay(300)}
          style={[styles.appName, isDark && styles.textDark]}
        >
          Factory Monitor
        </Animated.Text>
        <Animated.Text 
          entering={FadeIn.duration(1000).delay(600)}
          style={[styles.tagline, isDark && styles.textDark]}
        >
          Real-Time Predictive Maintenance
        </Animated.Text>
        <Animated.View 
          entering={ZoomIn.duration(1000).delay(900)}
          style={styles.loader}
        />
      </View>
    </Animated.View>
  );
}

export default function RootLayout() {
  useFrameworkReady();
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <CustomSplash />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  splashContainerDark: {
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlayDark: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
  },
  appName: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#fff',
    marginBottom: 8,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 48,
  },
  textDark: {
    color: '#fff',
  },
  loader: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.1)',
    borderTopColor: '#fff',
  },
});