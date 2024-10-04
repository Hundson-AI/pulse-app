import { Text } from '@components/Text';
import { colors } from '@theme';
import React, { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import { spacing } from 'src/theme/spacing';

interface Props {
	text?: string;
}

const Divider: FC<Props> = ({ text }) => {
	if (text) {
		return (
			<View style={$dividerContainer}>
				<View
					style={[
						$divider,
						{
							flex: 1,
						},
					]}
				/>
				<Text
					text={text}
					style={{
						color: colors.gray[200],
						marginHorizontal: spacing.sm,
					}}
					size='xs'
					weight='bold'
				/>
				<View
					style={[
						$divider,
						{
							flex: 1,
						},
					]}
				/>
			</View>
		);
	}
	return (
		<View>
			<View style={$divider} />
		</View>
	);
};

export default Divider;

const $dividerContainer: ViewStyle = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
};

const $divider: ViewStyle = {
	marginVertical: spacing.lg,
	backgroundColor: colors.gray[200],
	height: 1,
};
