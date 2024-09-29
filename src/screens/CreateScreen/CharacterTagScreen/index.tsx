import Button from '@components/Button';
import { Screen } from '@components/Screen';
import Topbar from '@components/Topbar/Topbar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { ScrollView, Text, useWindowDimensions, View, ViewStyle } from 'react-native';
import { spacing } from 'src/theme/spacing';
import CreateStepper from '../CreateStepper';
import { useCreateCharacterSlice } from '@modules/create-character/create-character.slice';
import { AppStackParamList } from '@navigator/AppNavigator';
import Chip from '@components/Chip';
import CreateLabel from '../CreateLabel';
import { Tag, tagApi } from 'src/services/tags.api';
import StepsButtonGroup from '../StepsButtonGroup';

const CharacterTagScreen = () => {
    const [loading, setLoading] = React.useState(false);
    const [tags, setTags] = React.useState<Tag[]>([]);
    const windowHeight = useWindowDimensions().height;
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    const {
        dispatch,
        upsertCharacterCreate,
        tags: selectedTags,
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

    useEffect(() => {
        const fetchTags = async () => {
            setLoading(true);
            try {
                const data = await tagApi.getAllTags();
                if (data) {
                    setTags(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTags();
    }, []);

    const renderTags = () => {
        if (!tags || tags.length === 0) {
            return;
        }
        return tags?.map(tag => {
            return (
                <Chip
                    key={tag.tag_name}
                    title={tag.tag_name}
                    onPress={() => {
                        if (selectedTags.includes(tag)) {
                            dispatch(
                                upsertCharacterCreate({
                                    tags: selectedTags.filter(t => t !== tag),
                                }),
                            );
                        } else {
                            dispatch(
                                upsertCharacterCreate({
                                    tags: [...selectedTags, tag],
                                }),
                            );
                        }
                    }}
                    disabled={selectedTags.length >= 6}
                    variant={selectedTags.includes(tag) ? 'default' : 'outlined'}
                />
            );
        });
    };

    const handleToNext = () => {
        navigation.navigate('CharacterImageScreen');
    };

    return (
        <Screen preset="fixed" safeAreaEdges={['top']} contentContainerStyle={[$rootContainer]}>
            <View style={$contentContainer}>
                <CreateStepper totalSteps={8} currentStep={5} />
                <CreateLabel
                    title={['캐릭터를 나타내는', '태그를 3가지 이상', '선택해 주세요!']}
                    subtitle="최대 6개까지 선택이 가능합니다"
                />
                <View style={$selectedChipContainer}>
                    {selectedTags.map(tag => (
                        <Chip
                            icon="x-white"
                            key={tag.tag_name}
                            title={tag.tag_name}
                            onPress={() => {
                                dispatch(
                                    upsertCharacterCreate({
                                        tags: selectedTags.filter(t => t !== tag),
                                    }),
                                );
                            }}
                            variant="mint"
                        />
                    ))}
                </View>

                <ScrollView style={$chipScrollContainer}>
                    <View style={$chipContainer}>{renderTags()}</View>
                </ScrollView>
            </View>
            <StepsButtonGroup
                onNext={handleToNext}
                onBack={() => navigation.goBack()}
                nextDisabled={selectedTags.length < 3}
            />
        </Screen>
    );
};

export default CharacterTagScreen;

const $rootContainer: ViewStyle = {
    flex: 1,
    paddingHorizontal: spacing.lg,
};

const $contentContainer: ViewStyle = {
    flex: 1,
    justifyContent: 'flex-start',
};

const $selectedChipContainer: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.xl,
    columnGap: spacing.xxs,
    rowGap: spacing.xs,
};

const $chipScrollContainer: ViewStyle = {
    flex: 1,
    marginVertical: spacing.md,
};

const $chipContainer: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: spacing.xxs,
    rowGap: spacing.xs,
};
