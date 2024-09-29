import { Text } from '@components/Text';
import { useCreateCharacterSlice } from '@modules/create-character/create-character.slice';
import { colors } from '@theme';
import React from 'react';
import { View, ViewStyle, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CharacterCardChip from './CharacterCardChip';
import { spacing } from 'src/theme/spacing';
import Config from 'src/config';

const CharacterCard = () => {
    const { name, tags, description, imageString } = useCreateCharacterSlice();

    const renderTags = () => {
        if (!tags || tags.length === 0) {
            return;
        }
        return tags?.map(tag => {
            return <CharacterCardChip key={`${name} ${tag.tag_name}`} tag={tag} />;
        });
    };

    return (
        <View style={styles.cardRoot}>
            <ImageBackground
                source={{
                    uri: imageString,
                }}
                style={$imageBackground}
                imageStyle={{ borderRadius: 30 }}>
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={styles.gradientOverlay}
                />
                <Text size="lg" weight="extraBold" style={styles.text}>
                    {name}
                </Text>
                {description && (
                    <Text size="xxs" weight="bold" style={styles.text}>
                        {description}
                    </Text>
                )}
                <View style={$chipContainer}>{renderTags()}</View>
            </ImageBackground>
        </View>
    );
};

export default CharacterCard;

const styles = StyleSheet.create({
    cardRoot: {
        width: '90%',
        aspectRatio: 0.75,
        backgroundColor: colors.gray[100],
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        //paddingHorizontal: 16,
        //paddingVertical: 21,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    } as ViewStyle,
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    text: {
        color: colors.white,
        marginBottom: spacing.xs,
        marginHorizontal: spacing.xs,
        height: 30,
    },
});
const $imageBackground: ViewStyle = {
    width: '100%',
    height: '100%',
    aspectRatio: 0.75,
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
