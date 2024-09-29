import Button from '@components/Button';
import { Screen } from '@components/Screen';
import Topbar from '@components/Topbar/Topbar';
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import React, { FC, useLayoutEffect } from 'react';
import { TextStyle, useWindowDimensions, View, ViewStyle } from 'react-native';
import { spacing } from 'src/theme/spacing';
import { useCreateCharacterSlice } from '@modules/create-character/create-character.slice';
import { AppStackParamList } from '@navigator/AppNavigator';
import { Text } from '@components/Text';
import CharacterCard from './CharacterCard';
import { windowHeight, windowWidth } from '@utils/deviceInfo';
import { fonts } from '@theme';
import { UserCharacter } from 'src/services/characters.api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { addUserCharacter } from '@modules/user-characters/user-characters.slice';
import { useDispatch } from 'react-redux';

interface CharacterSuccessScreenProps
    extends NativeStackScreenProps<AppStackParamList, 'CharacterSuccessScreen'> {}

const CharacterSuccessScreen: FC<CharacterSuccessScreenProps> = ({ route }) => {
    const windowHeight = useWindowDimensions().height;
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const { currentCharacter } = route.params;
    const { reset, upsertCharacterCreate, imageString } = useCreateCharacterSlice();
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(addUserCharacter({ ...currentCharacter, temporalImage: imageString }));
        navigation.setOptions({
            headerShown: true,
            header: () => <Topbar />,
        });
        navigation.addListener('beforeRemove', e => {
            e.preventDefault();
        });
    }, []);

    const handleToHome = () => {
        dispatch(reset());
        //navigation.reset({ routes: [{ name: 'UserCharactersScreen' }] });
        navigation.navigate('UserCharactersScreen');
    };

    const handleToAdvance = () => {
        dispatch(reset());
        navigation.navigate('EditAdvancedSettingsScreen', { currentCharacter: currentCharacter });
    };

    return (
        <Screen preset="fixed" safeAreaEdges={['top']} contentContainerStyle={[$rootContainer]}>
            <View style={[$itemContainer]}>
                <View style={[$congratulationTextView]}>
                    <Text size="xxl" style={$congratulationText}>
                        {'축하합니다!\n캐릭터 카드가\n생성되었습니다'}
                    </Text>
                </View>
                <View style={[$previewChara]}>
                    <CharacterCard />
                </View>
            </View>
            <View style={$buttonContainer}>
                <Button title="이대로 저장하기" onPress={handleToHome} />
                <Button
                    title="캐릭터 세부 설정하기"
                    variant="secondary"
                    onPress={handleToAdvance}
                />
                <Button title="기본설정 수정하기" variant="ghost" />
            </View>
        </Screen>
    );
};

export default CharacterSuccessScreen;

const $rootContainer: ViewStyle = {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xxl,
    alignItems: 'center',
    height: '100%',
};

const $itemContainer: ViewStyle = {
    flex: 1,
    paddingHorizontal: spacing.xl,
    minWidth: windowWidth,
    paddingTop: 0,
};

const $congratulationTextView: ViewStyle = {
    flexGrow: 0,
    marginBottom: 20,
};

const $congratulationText: TextStyle = {
    textAlign: 'center',
};
const $previewChara: ViewStyle = {
    flex: 4,
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
};

const $buttonContainer: ViewStyle = {
    paddingHorizontal: spacing.lg,
    minWidth: windowWidth,
    justifyContent: 'flex-end',
    flex: 1,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    rowGap: spacing.xxs,
};
