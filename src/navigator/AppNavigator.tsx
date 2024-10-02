import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from '@react-navigation/native';
import {
	createNativeStackNavigator,
	NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import * as Screens from '../screens';
import Config from '../config';
import { colors, loadFonts, loadImages } from '@theme';
import { navigationRef, useBackButtonHandler } from './navigationUtilities';
import * as SplashScreen from 'expo-splash-screen';
import CreateLobbyScreen from 'src/screens/CreateScreen/CreateLobbyScreen';
import CharacterNameScreen from 'src/screens/CreateScreen/CharacterNameScreen';
import CharacterGenderScreen from 'src/screens/CreateScreen/CharacterGenderScreen';
import CharacterAgeScreen from 'src/screens/CreateScreen/CharacterAgeScreen';
import CharacterLanguageScreen from 'src/screens/CreateScreen/CharacterLanguageScreen';
import CharacterTagScreen from 'src/screens/CreateScreen/CharacterTagScreen';
import CharacterImageScreen from 'src/screens/CreateScreen/CharacterImageScreen';
import CharacterDetailScreen from 'src/screens/CreateScreen/CharacterDetailScreen';
import CharacterFinalScreen from 'src/screens/CreateScreen/CharacterFinalScreen';
import CreatingCharacterScreen from 'src/screens/CreateScreen/CreatingCharacterScreen';
import CharacterSuccessScreen from 'src/screens/CreateScreen/CharacterSuccessScreen';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated, useAuthSlice } from '@modules/auth/auth.slice';
import { AuthHomeScreen } from 'src/screens/AuthHomeScreen';
import UserCharactersScreen from 'src/screens/UserCharactersScreen';
import EditAdvancedSettingsScreen from 'src/screens/EditAdvancedSettingsScreen';
import { DataPersistKeys, useDataPersist } from '@hooks';
import UserChatsScreen from 'src/screens/UserChatsScreen';
import MainTabNavigator from './MainTabNavigator';
import { UserCharacter } from 'src/services/characters.api';
import ChatScreen from 'src/screens/ChatScreen';
import { authenticateWS, registerAuthListeners } from 'src/ws/auth.ws';
import wsManager from 'src/ws/websocketManager';
import { registerErrorListener } from 'src/ws/error.ws';
import CharacterOccupationScreen from 'src/screens/CreateScreen/CharacterOccupationScreen';

export type AppStackParamList = {
	MainTabNavigator: undefined;
	UserCharactersScreen: undefined;
	CreateLobbyScreen: undefined;
	CharacterNameScreen: undefined;
	CharacterGenderScreen: undefined;
	CharacterAgeScreen: undefined;
	CharacterOccupationScreen: undefined;
	CharacterLanguageScreen: undefined;
	CharacterTagScreen: undefined;
	CharacterImageScreen: undefined;
	CharacterDetailScreen: undefined;
	CharacterFinalScreen: undefined;
	CreatingCharacterScreen: undefined;
	CharacterSuccessScreen: {
		currentCharacter: UserCharacter;
		imageUrl: string;
	};
	AuthHomeScreen: undefined;
	EditAdvancedSettingsScreen: {
		currentCharacter: UserCharacter;
	};
	UserChatsScreen: undefined;
	ChatScreen: {
		chatId: string;
	};
};

const exitRoutes = Config.exitRoutes;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
	NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

SplashScreen.preventAutoHideAsync();

const AuthenticatedAppStack = () => {
	const dispatch = useDispatch();
	const { token } = useAuthSlice();

	const initializeWs = () => {
		try {
			registerAuthListeners(dispatch);
			registerErrorListener();
		} catch (err) {
			console.log('[##] initializeWs error:', err);
		}
	};

	useEffect(() => {
		initializeWs();
	}, [token]);
	return (
		<>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					navigationBarColor: colors.background.light,
				}}
				initialRouteName='MainTabNavigator'
			>
				<Stack.Screen
					name='MainTabNavigator'
					component={MainTabNavigator}
				/>
				<Stack.Screen
					name='CreateLobbyScreen'
					component={CreateLobbyScreen}
				/>
				<Stack.Screen
					name='CharacterNameScreen'
					component={CharacterNameScreen}
				/>
				<Stack.Screen
					name='CharacterGenderScreen'
					component={CharacterGenderScreen}
				/>
				<Stack.Screen
					name='CharacterAgeScreen'
					component={CharacterAgeScreen}
				/>
				<Stack.Screen
					name='CharacterOccupationScreen'
					component={CharacterOccupationScreen}
				/>
				<Stack.Screen
					name='CharacterLanguageScreen'
					component={CharacterLanguageScreen}
				/>
				<Stack.Screen
					name='CharacterTagScreen'
					component={CharacterTagScreen}
				/>
				<Stack.Screen
					name='CharacterImageScreen'
					component={CharacterImageScreen}
				/>
				<Stack.Screen
					name='CharacterDetailScreen'
					component={CharacterDetailScreen}
				/>
				<Stack.Screen
					name='CharacterFinalScreen'
					component={CharacterFinalScreen}
				/>
				<Stack.Screen
					name='CreatingCharacterScreen'
					component={CreatingCharacterScreen}
				/>
				<Stack.Screen
					name='CharacterSuccessScreen'
					component={CharacterSuccessScreen}
				/>
				<Stack.Screen
					name='EditAdvancedSettingsScreen'
					component={EditAdvancedSettingsScreen}
				/>
				<Stack.Screen
					name='UserChatsScreen'
					component={UserChatsScreen}
				/>
				<Stack.Screen name='ChatScreen' component={ChatScreen} />
			</Stack.Navigator>
		</>
	);
};

const PublicAppStack = () => {
	return (
		<>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					navigationBarColor: colors.background.light,
				}}
				initialRouteName='AuthHomeScreen'
			>
				<Stack.Screen
					name='AuthHomeScreen'
					component={AuthHomeScreen}
				/>
			</Stack.Navigator>
		</>
	);
};

export interface NavigationProps
	extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
	const colorScheme = useColorScheme();
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const dispatch = useDispatch();
	const { setToken, setLoggedIn } = useAuthSlice();
	const { getPersistData } = useDataPersist();

	const preload = async () => {
		try {
			const token = await getPersistData<string>(DataPersistKeys.TOKEN);

			dispatch(setToken(token));
			dispatch(setLoggedIn(!!token));
		} catch (err) {
			console.log('[##] preload error:', err);
		}
	};

	useEffect(() => {
		preload();
	}, []);

	useBackButtonHandler((routeName) => exitRoutes.includes(routeName));

	return (
		<NavigationContainer
			ref={navigationRef}
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
			{...props}
		>
			{isAuthenticated ? <AuthenticatedAppStack /> : <PublicAppStack />}
		</NavigationContainer>
	);
};
