import React, { useLayoutEffect, useState, useRef, useCallback, useEffect } from 'react';
import { RefreshControl, View, ScrollView, ViewStyle, ToastAndroid } from 'react-native';
import { Screen } from '@components/Screen';
import Topbar from '@components/Topbar/Topbar';
import Button from '@components/Button';
import {
    selectAllUserCharacters,
    setAllCharacters,
    useUserCharactersSlice,
} from '@modules/user-characters/user-characters.slice';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { spacing } from 'src/theme/spacing';
import { AppStackParamList } from '@navigator/AppNavigator';
import BottomSheet from '@gorhom/bottom-sheet';
import CharacterCard from './CharacterCard';
import CharacterCardBottomSheet, { CustomBackdrop } from './CharacterCardBottomSheet';
import { Character, characterApi, UserCharacter } from 'src/services/characters.api';
import { useDispatch, useSelector } from 'react-redux';
import { CharacterApi } from 'src/services/characters.api';
import { TEMP_USER_CHARACTERS } from '@modules/user-characters/TEMP_CHARACTERS';
import { ActivityIndicator } from 'react-native-paper';
import useAuthorizedListeners from 'src/hooks/useAuthorizedListeners';
import { useCreateCharacterSlice } from '@modules/create-character/create-character.slice';
import { useTempCharacterSlice } from '@modules/create-character/update-tempcharacter.slice';

const UserCharactersScreen = () => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const userCharacters = useSelector(selectAllUserCharacters);
    const [selectedCharacter, setSelectedCharacter] = useState<UserCharacter | null>(null);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = ['25%', '50%'];
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(true);
    const { reset } = useCreateCharacterSlice();
    const { reset: resetTemp } = useTempCharacterSlice();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            header: () => <Topbar />,
        });
    }, []);

    const initializeTempCharacters = (data: UserCharacter[]) => {
        dispatch(setAllCharacters(data));
    };

    const handleSuccess = (data: UserCharacter[]) => {
        initializeTempCharacters(data);
        setLoading(false);
    };

    const handleFailed = (data: UserCharacter[]) => {
        ToastAndroid.show(
            '캐릭터 리스트를 조회하는데 실패했습니다. 다시 시도해주세요!',
            ToastAndroid.SHORT,
        );
        console.log('Failed to load character list!');
        initializeTempCharacters(data);
    };

    const getListCharacter = async () => {
        const minimumWaitTime = new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const characterDataList = characterApi.getCharacters();
            await Promise.all([characterDataList, minimumWaitTime]);
            console.log('success');

            handleSuccess(await characterDataList);
        } catch (error) {
            await minimumWaitTime;
            console.log('failed');
            const characterDataList: UserCharacter[] = [];

            handleSuccess(await characterDataList);
        }
    };

    useEffect(() => {
        dispatch(reset());
        dispatch(resetTemp());
        getListCharacter();
    }, []);

    const onRefresh = React.useCallback(() => {
        getListCharacter();
    }, []);

    const handleToCreateScreen = () => {
        navigation.navigate('CreateLobbyScreen');
    };

    const handleCharacterPress = useCallback((character: UserCharacter) => {
        setSelectedCharacter(character);
        bottomSheetRef.current?.expand();
    }, []);

    const renderCharacter = () => {
        return userCharacters.map(character => {
            return (
                <CharacterCard
                    key={character.id}
                    character={character}
                    onPress={handleCharacterPress}
                />
            );
        });
    };

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            setSelectedCharacter(null);
        }
    }, []);

    const handleSelectBottomSheetAction = () => {
        bottomSheetRef.current?.close();
    };

    return (
        <Screen preset="fixed" safeAreaEdges={['bottom']} contentContainerStyle={$rootContainer}>
            <View style={{ paddingVertical: 12, paddingHorizontal: 10 }}>
                <Button title="+ 새 캐릭터 만들기" onPress={handleToCreateScreen} />
            </View>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={colors.mint[500]} />
                </View>
            ) : (
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    {renderCharacter()}
                </ScrollView>
            )}
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                backdropComponent={CustomBackdrop}
                onChange={handleSheetChanges}>
                {selectedCharacter && (
                    <CharacterCardBottomSheet
                        character={selectedCharacter}
                        onPress={handleSelectBottomSheetAction}
                    />
                )}
            </BottomSheet>
        </Screen>
    );
};

export default UserCharactersScreen;

const $rootContainer: ViewStyle = {
    flex: 1,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background.light,
};
