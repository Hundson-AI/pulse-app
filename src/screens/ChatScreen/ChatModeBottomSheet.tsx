import React, { FC } from 'react';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Pressable, View, ViewStyle } from 'react-native';
import { Text } from '@components/Text';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { AppStackParamList } from '@navigator/AppNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import ChatModeButton from './ChatModeButton';
import { ChatMode, useChatModeSlice } from '@modules/chat-mode/chat-mode.slice';
import { set } from 'react-hook-form';

interface Props {}

const ChatModeBottomSheet: FC<Props> = () => {
	const navigation = useNavigation<NavigationProp<AppStackParamList>>();
	const { mode, setChatMode, dispatch } = useChatModeSlice();
	const isRegular = mode === ChatMode.REGULAR;

	const handleChangeChatMode = (mode: ChatMode) => {
		dispatch(setChatMode(mode));
	};

	return (
		<View style={$container}>
			<View style={$headerContainer}>
				<Text
					text='채팅 모드 변경'
					weight='bold'
					style={{ color: colors.white }}
				/>
			</View>
			<View style={$optionsContainer}>
				<View style={option}>
					<ChatModeButton
						disabled={isRegular}
						mode={ChatMode.REGULAR}
						onPress={() => handleChangeChatMode(ChatMode.REGULAR)}
					/>
				</View>
				<View style={option}>
					<ChatModeButton
						disabled={!isRegular}
						mode={ChatMode.SECRET}
						onPress={() => handleChangeChatMode(ChatMode.SECRET)}
					/>
				</View>
			</View>
		</View>
	);
};

export default ChatModeBottomSheet;

const $container: ViewStyle = {
	backgroundColor: colors.white,
};

const $headerContainer: ViewStyle = {
	backgroundColor: colors.mint[500],
	justifyContent: 'center',
	alignItems: 'center',
	paddingBottom: 20,
};

const $optionsContainer: ViewStyle = {
	paddingHorizontal: 20,
	paddingVertical: 30,
};

const option: ViewStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	paddingVertical: 20,
};

const styles = {
	optionText: {
		fontSize: 18,
		marginVertical: 10,
		color: '#333',
	},
};

export const CustomBackdrop = (props: BottomSheetBackdropProps) => {
	return (
		<BottomSheetBackdrop
			{...props}
			disappearsOnIndex={-1}
			appearsOnIndex={0}
			style={{ ...(props.style as object), top: 0 }}
		/>
	);
};
