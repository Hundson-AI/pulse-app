import React, { useState, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { AppNavigator } from '@navigator/AppNavigator';
import store from '@modules/store';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { loadFonts, loadImages } from '@theme';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';
import wsManager from 'src/ws/websocketManager';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [isReady, setIsReady] = useState(false);

    const preload = async () => {
        try {
            wsManager.connect();
            // preload assets
            await Promise.all([loadImages(), loadFonts()]);
            console.log('[##] preload done');
            // hide splash screen
            SplashScreen.hideAsync();
            setIsReady(true);
        } catch (err) {
            console.log('[##] preload error:', err);
        }
    };

    useEffect(() => {
        preload();
    }, []);

    if (!isReady) {
        return null;
    }

    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <Provider store={store}>
                <PaperProvider>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <AppNavigator />
                    </GestureHandlerRootView>
                </PaperProvider>
            </Provider>
        </SafeAreaProvider>
    );
}
