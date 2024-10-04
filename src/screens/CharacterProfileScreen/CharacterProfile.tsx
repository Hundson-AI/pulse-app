import React, { FC } from 'react';
import { View, ViewStyle, ImageBackground, StyleSheet } from 'react-native';
import { colors } from '@theme';
import { spacing } from 'src/theme/spacing';
import { UserCharacter } from 'src/services/characters.api';
import { Text } from '@components/Text';
import { buildImageUrl } from '@utils/buildImageUrl';
import { LinearGradient } from 'expo-linear-gradient';
import CharacterCardChip from '../CreateScreen/CharacterSuccessScreen/CharacterCardChip';

interface Props {
	character: UserCharacter;
}

const CharacterProfile: FC<Props> = ({ character }) => {
	const renderTags = () => {
		const { name, tags } = character;
		if (!tags || tags.length === 0) {
			return;
		}
		return tags?.map((tag) => {
			return (
				<CharacterCardChip key={`${name} ${tag.tag_name}`} tag={tag} />
			);
		});
	};

	return (
		<ImageBackground
			source={{
				uri: buildImageUrl(character?.images?.full_size_src || ''),
			}}
			style={$imageBackground}
		>
			<LinearGradient
				colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
				style={{ ...StyleSheet.absoluteFillObject }}
			/>
			<Text
				size='lg'
				weight='extraBold'
				style={{
					color: colors.white,
					marginBottom: spacing.xs,
					marginHorizontal: spacing.xs,
					height: 30,
				}}
			>
				{character.name}
			</Text>
			{character?.description && (
				<Text
					size='xxs'
					weight='bold'
					style={{
						color: colors.white,
						marginBottom: spacing.xs,
						marginHorizontal: spacing.xs,
						height: 45,
					}}
				>
					{character.description}
				</Text>
			)}
			<View style={$chipContainer}>{renderTags()}</View>
		</ImageBackground>
	);
};

export default CharacterProfile;

const $imageBackground: ViewStyle = {
	width: '100%',
	height: '100%',
	aspectRatio: 1,
	overflow: 'hidden',
	display: 'flex',
	flex: 1,
	justifyContent: 'flex-end',
};

const $chipContainer: ViewStyle = {
	flexDirection: 'row',
	flexWrap: 'wrap',
	columnGap: spacing.xs,
	rowGap: spacing.xxxs,
	paddingBottom: 10,
	paddingHorizontal: spacing.xs,
};
