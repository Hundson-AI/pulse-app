import Button from '@components/Button';
import { Screen } from '@components/Screen';
import Topbar from '@components/Topbar/Topbar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { Text, useWindowDimensions, View, ViewStyle } from 'react-native';
import { spacing } from 'src/theme/spacing';
import CreateStepper from '../CreateStepper';
import CreateInput from '../CreateInput';
import { useCreateCharacterSlice } from '@modules/create-character/create-character.slice';
import { AppStackParamList } from '@navigator/AppNavigator';
import { colors } from '@theme';
import StepsButtonGroup from '../StepsButtonGroup';

const CharacterNameScreen = () => {
	const windowHeight = useWindowDimensions().height;
	const navigation = useNavigation<NavigationProp<AppStackParamList>>();

	const {
		dispatch,
		upsertCharacterCreate,
		name: savedCharacterName,
		reset,
	} = useCreateCharacterSlice();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
			header: () => (
				<Topbar
					type='close'
					onClose={() => {
						reset();
						navigation.navigate('UserCharactersScreen');
					}}
				/>
			),
		});
	}, []);

	const [characterName, setCharacterName] = React.useState(
		savedCharacterName || ''
	);

	useEffect(() => {
		setCharacterName(savedCharacterName);
	}, [savedCharacterName]);

	const handleChange = (text: string) => {
		setCharacterName(text);
	};

	const handleToNext = () => {
		saveCharacterName();
		navigation.navigate('CharacterGenderScreen');
	};

	const saveCharacterName = () => {
		dispatch(upsertCharacterCreate({ name: characterName }));
	};

	return (
		<Screen
			preset='fixed'
			safeAreaEdges={['top']}
			contentContainerStyle={[$rootContainer]}
		>
			<View style={[$contentContainer]}>
				<CreateStepper currentStep={1} />
				<CreateInput
					title={['환영합니다!', '캐릭터의 이름이', '무엇인가요?']}
					value={characterName}
					onChange={handleChange}
					maxChar={30}
				/>
			</View>
			<StepsButtonGroup
				onNext={handleToNext}
				onBack={() => {
					saveCharacterName();
					navigation.goBack();
				}}
				nextDisabled={characterName.length < 1}
			/>
		</Screen>
	);
};

export default CharacterNameScreen;

const $rootContainer: ViewStyle = {
	flex: 1,
	paddingHorizontal: spacing.lg,
};

const $contentContainer: ViewStyle = {
	flex: 1,
	justifyContent: 'flex-start',
};
