import React, { useLayoutEffect, useState, useEffect, FC, useRef } from 'react';
import { View, TouchableOpacity, Animated, ViewStyle } from 'react-native';
import { Screen } from '@components/Screen';
import Topbar from '@components/Topbar/Topbar';
import {
	selectUserCharacterById,
	setAllCharacters,
} from '@modules/user-characters/user-characters.slice';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { spacing } from 'src/theme/spacing';
import { AppStackParamList } from '@navigator/AppNavigator';
import { characterApi, UserCharacter } from 'src/services/characters.api';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateCharacterSlice } from '@modules/create-character/create-character.slice';
import { useTempCharacterSlice } from '@modules/create-character/update-tempcharacter.slice';
import { State } from '@modules/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from '@components/Text';
import CharacterProfile from './CharacterProfile';
import { startNewChat } from 'src/ws/chats.ws';

interface Props
	extends NativeStackScreenProps<
		AppStackParamList,
		'CharacterProfileScreen'
	> {}

const CharacterProfileScreen: FC<Props> = ({ route }) => {
	const params = route.params;

	if (!params?.character) {
		throw new Error('CharacterProfileScreen: params is undefined');
	}

	const navigation = useNavigation<NavigationProp<AppStackParamList>>();
	const character = useSelector((state: State) =>
		selectUserCharacterById(state, params.character.id)
	);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const { reset } = useCreateCharacterSlice();
	const { reset: resetTemp } = useTempCharacterSlice();
	const scrollY = useRef(new Animated.Value(0)).current;

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
			header: () => <Topbar type='back' />,
		});
	}, []);

	const initializeTempCharacters = (data: UserCharacter[]) => {
		dispatch(setAllCharacters(data));
	};

	const handleSuccess = (data: UserCharacter[]) => {
		initializeTempCharacters(data);
		setLoading(false);
	};

	const getListCharacter = async () => {
		try {
			const characterDataList = characterApi.getCharacters();
			await Promise.all([characterDataList]);

			handleSuccess(await characterDataList);
		} catch (error) {
			const characterDataList: UserCharacter[] = [];

			handleSuccess(await characterDataList);
		}
	};

	useEffect(() => {
		dispatch(reset());
		dispatch(resetTemp());
		getListCharacter();
	}, []);

	const buttonOpacity = scrollY.interpolate({
		inputRange: [0, 150],
		outputRange: [1, 0.8],
		extrapolate: 'clamp',
	});

	const buttonTranslateY = scrollY.interpolate({
		inputRange: [0, 150],
		outputRange: [0, -50],
		extrapolate: 'clamp',
	});

	const handleStartChat = () => {
		startNewChat(character.id, character.name);
		navigation.navigate('UserChatsScreen');
	};

	return (
		<Screen
			preset='fixed'
			safeAreaEdges={['bottom']}
			contentContainerStyle={$rootContainer}
		>
			<View style={{ flex: 1 }}>
				<Animated.ScrollView
					contentContainerStyle={{
						paddingBottom: 125,
						paddingTop: spacing.lg,
					}}
					scrollEventThrottle={16}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: scrollY } } }],
						{ useNativeDriver: false }
					)}
				>
					<View>
						<CharacterProfile character={character} />
					</View>
				</Animated.ScrollView>
				<Animated.View
					style={[
						$startChatButtonContainer,
						{
							opacity: buttonOpacity,
							transform: [{ translateY: buttonTranslateY }],
						},
					]}
				>
					<TouchableOpacity
						style={$startChatButton}
						onPress={handleStartChat}
					>
						<Text
							style={{ color: colors.white }}
							weight='semiBold'
							size='sm'
						>
							새로운 채팅 시작하기
						</Text>
					</TouchableOpacity>
				</Animated.View>
			</View>
		</Screen>
	);
};

export default CharacterProfileScreen;

const $rootContainer = {
	flex: 1,
	backgroundColor: colors.background.light,
};

const $startChatButtonContainer: ViewStyle = {
	position: 'absolute',
	bottom: 0,
	width: '100%',
	alignItems: 'center',
	paddingHorizontal: spacing.lg,
};

const $startChatButton: ViewStyle = {
	width: '100%',
	backgroundColor: colors.mint[500],
	paddingVertical: spacing.sm,
	alignItems: 'center',
	marginHorizontal: 16,
	marginBottom: 16,
	borderRadius: 8,
};
