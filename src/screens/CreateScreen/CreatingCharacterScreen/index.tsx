import Button from '@components/Button';
import { Screen } from '@components/Screen';
import Topbar from '@components/Topbar/Topbar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { TextStyle, ToastAndroid, useWindowDimensions, View, ViewStyle } from 'react-native';
import { spacing } from 'src/theme/spacing';
import {
    selectCreateCharacter,
    useCreateCharacterSlice,
} from '@modules/create-character/create-character.slice';
import { AppStackParamList } from '@navigator/AppNavigator';
import { Text } from '@components/Text';
import Image from '@components/Image';
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';
import { AddCharacterRequest, characterApi, UserCharacter } from 'src/services/characters.api';

const CreatingCharacterScreen = () => {
    const windowHeight = useWindowDimensions().height;
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const characterData = useSelector(selectCreateCharacter);
    const { reset } = useCreateCharacterSlice();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            header: () => <Topbar />,
        });
    }, []);

    const handleSuccess = (characterCreation: UserCharacter, imageUrl: string) => {
        navigation.navigate('CharacterSuccessScreen', {
            currentCharacter: characterCreation,
            imageUrl: imageUrl,
        });
    };

    const handleFailed = () => {
        ToastAndroid.show(
            '캐릭터를 생성하는데 실패했습니다. 다시 시도해주세요!',
            ToastAndroid.SHORT,
        );
        console.log('Failed to create character, moving to final screen');
        navigation.navigate('CharacterFinalScreen');
    };

    useEffect(() => {
        const createCharacter = async () => {
            const minimumWaitTime = new Promise(resolve => setTimeout(resolve, 1000));
            try {
                const characterCreation = characterApi.createCharacter({
                    ...characterData,
                    tag_ids: characterData.tags.map(tag => tag.tag_id),
                } as AddCharacterRequest);
                await Promise.all([characterCreation, minimumWaitTime]);
                console.log('success');
                reset();
                handleSuccess(await characterCreation, characterData.imageString);
            } catch (error) {
                console.log(error);
                await minimumWaitTime;
                handleFailed();
            }
        };

        createCharacter();
    }, []);

    return (
        <Screen
            preset="fixed"
            safeAreaEdges={['top']}
            contentContainerStyle={[$rootContainer, { minHeight: Math.round(windowHeight) }]}>
            <View style={$textContainer}>
                <Text style={$textStyle} size="xxl">
                    캐릭터 생성중...
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    paddingTop: 100,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                <LottieView
                    source={require('@assets/lottie/load.json')}
                    autoPlay
                    loop
                    style={{ width: 200, height: 200 }}
                />
            </View>
        </Screen>
    );
};

export default CreatingCharacterScreen;

const $rootContainer: ViewStyle = {
    flex: 1,
    paddingHorizontal: spacing.lg,
};

const $textContainer: ViewStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: spacing.xxl,
    rowGap: spacing.xxs,
};

const $textStyle: TextStyle = {
    textAlign: 'center',
};
