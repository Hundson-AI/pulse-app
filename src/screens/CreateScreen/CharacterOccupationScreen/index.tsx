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

const CharacterOccupationScreen = () => {
	const windowHeight = useWindowDimensions().height;
	const navigation = useNavigation<NavigationProp<AppStackParamList>>();

	const {
		dispatch,
		upsertCharacterCreate,
		occupation: savedCharacterOccupation,
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

	const [occupation, setOccupation] = React.useState(
		savedCharacterOccupation || ''
	);

	useEffect(() => {
		setOccupation(savedCharacterOccupation);
	}, [savedCharacterOccupation]);

	const handleChange = (text: string) => {
		setOccupation(text);
		console.log(savedCharacterOccupation);
	};

	const handleToNext = () => {
		saveCharacterName();
		navigation.navigate('CharacterLanguageScreen');
	};

	const saveCharacterName = () => {
		dispatch(upsertCharacterCreate({ occupation }));
	};

	return (
		<Screen
			preset='fixed'
			safeAreaEdges={['top']}
			contentContainerStyle={[$rootContainer]}
		>
			<View style={[$contentContainer]}>
				<CreateStepper currentStep={4} />
				<CreateInput
					title={['캐릭터의 직업을', '알려 주세요!']}
					value={occupation}
					onChange={handleChange}
					maxChar={20}
					placeholder='대한민국을 대표하는 대기업 CEO'
				/>
			</View>
			<StepsButtonGroup
				onNext={handleToNext}
				onBack={() => {
					saveCharacterName();
					navigation.goBack();
				}}
			/>
		</Screen>
	);
};

export default CharacterOccupationScreen;

const $rootContainer: ViewStyle = {
	flex: 1,
	paddingHorizontal: spacing.lg,
};

const $contentContainer: ViewStyle = {
	flex: 1,
	justifyContent: 'flex-start',
};
