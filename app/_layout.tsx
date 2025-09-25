import { useEffect } from 'react';

import { StatusBar } from 'react-native';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';

import { AppDataSource } from '@/db/local-db';
import { initializeDatabase } from '@/db/seed-example';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { fetchExercises } from '@/store/exercisesSlice';
import { store } from '@/store/index';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const initDatabase = async () => {
    console.log('Initializing database');
    try {
      if (AppDataSource.isInitialized) {
        console.log('Database already initialized');
        return;
      }
      await initializeDatabase();
    } catch (error) {
      console.error('Error initializing database', error);
    }
  };

  useEffect(() => {
    (async () => {
      await initDatabase();
      await store.dispatch(fetchExercises());
    })();
  }, []);

  return (
    <ReduxProvider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider style={{ flex: 1, backgroundColor: 'black' }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }} edges={['top']}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="new-exercise" options={{ headerShown: false }} />
                <Stack.Screen name="new-template" options={{ headerShown: false }} />
                <Stack.Screen name="details-template" options={{ headerShown: false }} />
                <Stack.Screen name="edit-template" options={{ headerShown: false }} />
              </Stack>
              <StatusBar hidden={false} />
            </SafeAreaView>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </ReduxProvider>
  );
}
