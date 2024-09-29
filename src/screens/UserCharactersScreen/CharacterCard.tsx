import { Text } from '@components/Text';
import { colors } from '@theme';
import React, { FC, useCallback, useRef } from 'react';
import { Pressable, TextStyle, View, ViewStyle, ImageBackground } from 'react-native';
import { UserCharacter } from 'src/services/characters.api';
import CharacterCardTag from './CharacterCardTag';
import { LinearGradient } from 'expo-linear-gradient';
import CharacterCardChip from './CharacterCardChip';
import Config from 'src/config';

interface Props {
    character: UserCharacter;
    onPress: (character: UserCharacter) => void;
}

const CharacterCard: FC<Props> = ({ character, onPress }) => {
    const handlePress = () => {
        onPress(character);
    };

    const renderTags = () => {
        return character.tags.map((tag, idx) => {
            return (
                <CharacterCardTag key={`character_tags_${tag.tag_id}_${idx}`} text={tag.tag_name} />
            );
        });
    };

    return (
        <Pressable style={{ marginBottom: 20 }} onPress={handlePress}>
            <ImageBackground
                source={{
                    uri:
                        character.images?.medium_src !== 'None'
                            ? typeof Config.API_URL == 'string'
                                ? Config.API_URL.replace('/api/v1', '') +
                                  character.images?.medium_src
                                : 'https://pulsevoice.hudson-ai.com/pulse/static/default/default.jpg'
                            : typeof character.temporalImage == 'string'
                              ? character.temporalImage
                              : 'https://pulsevoice.hudson-ai.com/pulse/static/default/default.jpg',
                }}
                style={$imageBackground}
                imageStyle={{ borderRadius: 30 }}>
                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']} style={$card}>
                    <View style={$chipsContainer}>
                        {character.aiGenerated && <CharacterCardChip type={'AI'} />}
                        <CharacterCardChip type={character.gender} />
                    </View>
                    <View>
                        <Text
                            weight="extraBold"
                            size="lg"
                            text={character.name}
                            style={$characterText}
                        />
                        <Text
                            weight="bold"
                            size="xxs"
                            text={character.description}
                            style={$characterText}
                        />
                    </View>
                    <View style={$tagsContainer}>{renderTags()}</View>
                </LinearGradient>
            </ImageBackground>
        </Pressable>
    );
};

export default CharacterCard;

const $imageBackground: ViewStyle = {
    width: '100%',
    aspectRatio: 1.5,
    borderRadius: 30,
    overflow: 'hidden',
};

const $card: ViewStyle = {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 10,
    paddingRight: 74,
    paddingVertical: 20,
};

const $characterText: TextStyle = {
    color: colors.white,
    overflow: 'hidden',
    maxHeight: 40,
};

const $chipsContainer: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 6,
    marginBottom: 6,
};

const $tagsContainer: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 6,
    rowGap: 2,
    marginTop: 6,
};
