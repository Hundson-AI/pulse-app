import Button from '@components/Button';
import { Screen } from '@components/Screen';
import Topbar from '@components/Topbar/Topbar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { ScrollView, useWindowDimensions, View, ViewStyle } from 'react-native';
import { spacing } from 'src/theme/spacing';
import CreateStepper from '../CreateStepper';
import { useCreateCharacterSlice } from '@modules/create-character/create-character.slice';
import { AppStackParamList } from '@navigator/AppNavigator';
import CreateTextArea from '../CreateTextArea';
import StepsButtonGroup from '../StepsButtonGroup';

const CharacterDetailScreen = () => {
    const windowHeight = useWindowDimensions().height;
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    const {
        dispatch,
        upsertCharacterCreate,
        first_word,
        description: savedDescription,
        reset,
    } = useCreateCharacterSlice();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            header: () => (
                <Topbar
                    type="close"
                    onClose={() => {
                        reset();
                        navigation.navigate('UserCharactersScreen');
                    }}
                />
            ),
        });
    }, []);

    const [firstLine, setFirstLine] = React.useState(first_word || '');
    const [description, setDescription] = React.useState(savedDescription || '');

    const handleChangeFirstLine = (text: string) => {
        setFirstLine(text);
    };
    const handleChangeDescription = (text: string) => {
        setDescription(text);
    };

    const saveCharacterDetail = () => {
        dispatch(
            upsertCharacterCreate({
                first_word: firstLine,
                description,
            }),
        );
    };

    const handleToNext = () => {
        saveCharacterDetail();
        navigation.navigate('CharacterFinalScreen');
    };

    return (
        <Screen preset="fixed" safeAreaEdges={['top']} contentContainerStyle={[$rootContainer]}>
            <View style={[$contentContainer]}>
                <CreateStepper totalSteps={8} currentStep={7} />
                <ScrollView
                    style={{
                        display: 'flex',
                        flexGrow: 1,
                    }}
                    contentContainerStyle={{ paddingBottom: 20 }}>
                    <CreateTextArea
                        title={['캐릭터를 한 문장으로', '소개해 주세요']}
                        subtitle="캐릭터를 다른 사람들도 알기 쉽게 소개해 주세요!"
                        value={description}
                        onChange={handleChangeDescription}
                        maxChar={500}
                        style={{
                            height: 131,
                        }}
                    />
                    <CreateTextArea
                        title={['캐릭터의 첫 마디를', '적어 주세요']}
                        subtitle="캐릭터가 가장 처음으로 할 대화를 작성해 주세요"
                        value={firstLine}
                        onChange={handleChangeFirstLine}
                        maxChar={500}
                        style={{
                            height: 131,
                        }}
                    />
                </ScrollView>
            </View>

            <StepsButtonGroup
                onNext={handleToNext}
                onBack={() => {
                    navigation.goBack();
                    saveCharacterDetail();
                }}
            />
        </Screen>
    );
};

export default CharacterDetailScreen;

const $rootContainer: ViewStyle = {
    flex: 1,
    paddingHorizontal: spacing.lg,
};

const $contentContainer: ViewStyle = {
    flex: 1,
};
