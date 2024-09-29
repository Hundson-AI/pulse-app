import React, { FC } from 'react';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Pressable, View } from 'react-native';
import { Text } from '@components/Text';
import { UserCharacter } from 'src/services/characters.api';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { AppStackParamList } from '@navigator/AppNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { startNewChat } from 'src/ws/chats.ws';

interface Props {
    character: UserCharacter;
    onPress: () => void;
}

const CharacterCardBottomSheet: FC<Props> = ({ character, onPress }) => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const handleToAdvancedSettings = () => {
        if (character) {
            navigation.navigate('EditAdvancedSettingsScreen', {
                currentCharacter: character,
            });
        }
        onPress();
    };

    const handleStartChat = () => {
        if (character) {
            startNewChat(character.id, character.name);
            navigation.navigate('UserChatsScreen');
        }
        onPress();
    };

    return (
        <View style={styles.bottomSheetContent}>
            <Pressable onPress={handleStartChat}>
                <Text style={styles.optionText}>Start Chat</Text>
            </Pressable>
            <Pressable onPress={() => console.log('Edit General Settings')}>
                <Text style={styles.optionText}>Edit General Settings</Text>
            </Pressable>
            <Pressable onPress={handleToAdvancedSettings}>
                <Text style={styles.optionText}>Edit Advanced Settings</Text>
            </Pressable>
        </View>
    );
};

export default CharacterCardBottomSheet;

const styles = {
    bottomSheetContent: {
        padding: 20,
        backgroundColor: '#fff',
    },
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
