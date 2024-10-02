import Button from '@components/Button';
import { Screen } from '@components/Screen';
import Topbar from '@components/Topbar/Topbar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import {
	ScrollView,
	Text,
	useWindowDimensions,
	View,
	ViewStyle,
	Image,
	ImageStyle,
	TouchableOpacity,
} from 'react-native';
import { spacing } from 'src/theme/spacing';
import CreateStepper from '../CreateStepper';
import CreateInput from '../CreateInput';
import { useCreateCharacterSlice } from '@modules/create-character/create-character.slice';
import { AppStackParamList } from '@navigator/AppNavigator';
import Chip from '@components/Chip';
import CreateLabel from '../CreateLabel';
import { colors } from '@theme';
import StepsButtonGroup from '../StepsButtonGroup';
import * as ImagePicker from 'expo-image-picker';
import Plus from '@assets/svgs/plus.svg';

const CharacterImageScreen = () => {
	const windowHeight = useWindowDimensions().height;
	const navigation = useNavigation<NavigationProp<AppStackParamList>>();

	const [image, setImage] = useState<string | null>(null);

	const { dispatch, upsertCharacterCreate, aiGenerated, reset } =
		useCreateCharacterSlice();

	const buttonRef = useRef();

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

	const handleToNext = () => {
		handleImage(typeof image == 'string' ? image : '');
		navigation.navigate('CharacterDetailScreen');
	};

	const handleChange = (value: boolean) => {
		dispatch(upsertCharacterCreate({ aiGenerated: value }));
	};

	const handleImage = (value: string) => {
		dispatch(upsertCharacterCreate({ imageString: value }));
	};

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [3, 4],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		<Screen
			preset='fixed'
			safeAreaEdges={['top']}
			contentContainerStyle={[$rootContainer]}
		>
			<View style={$contentContainer}>
				<CreateStepper currentStep={7} />
				<ScrollView
					style={{
						display: 'flex',
						flexGrow: 1,
						flex: 1,
					}}
					contentContainerStyle={{ paddingBottom: 20 }}
				>
					<CreateLabel
						title={['캐릭터와 이미지를', '등록해 주세요']}
					/>
					<View style={$imageBox}>
						{image != null ? (
							<TouchableOpacity
								onPress={() => {
									pickImage();
								}}
								style={{}}
							>
								<Image
									source={{ uri: image }}
									style={[$image]}
									resizeMode='contain'
								/>
							</TouchableOpacity>
						) : (
							<Button
								title=''
								variant='ghost'
								onPress={() => {
									pickImage();
								}}
								style={{
									flexGrow: 0,
									justifyContent: 'center',
								}}
							>
								<Plus />
							</Button>
						)}
					</View>
					<View>
						<CreateLabel title={['AI가 생성한', '이미지입니까?']} />
						<View style={$aiButtonContainer}>
							<Chip
								title='네'
								onPress={() => handleChange(true)}
								variant={aiGenerated ? 'default' : 'outlined'}
							/>
							<Chip
								title='아니요'
								onPress={() => handleChange(false)}
								variant={!aiGenerated ? 'default' : 'outlined'}
							/>
						</View>
					</View>
				</ScrollView>
			</View>
			<StepsButtonGroup
				onNext={handleToNext}
				onBack={() => navigation.goBack()}
			/>
		</Screen>
	);
};

export default CharacterImageScreen;

const $rootContainer: ViewStyle = {
	flex: 1,
	paddingHorizontal: spacing.lg,
};

const $contentContainer: ViewStyle = {
	flex: 1,
	justifyContent: 'flex-start',
};

const $imageBox: ViewStyle = {
	width: '100%',
	aspectRatio: 1,
	borderWidth: 2,
	borderColor: colors.gray[200],
	borderRadius: 20,
	borderStyle: 'dashed',
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center',
};

const $image: ImageStyle = {
	width: '100%',
	aspectRatio: 1,
};

const $aiButtonContainer: ViewStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'flex-start',
	gap: spacing.xxs,
};
