import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import React, { FC } from 'react';
import { Pressable, TextStyle, View, ViewStyle } from 'react-native';
import Close from '@assets/svgs/close.svg';
import { Text } from '@components/Text';
import { AppStackParamList } from '@navigator/AppNavigator';

interface TopbarProps {
    type?: 'default' | 'close' | 'market' | 'character-adv';
    onClose?: () => void;
    onBack?: () => void;
}

const EditAdvancedTopbar: FC<TopbarProps> = ({ type = 'default', onClose }) => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    const handleClose = () => {
        navigation.navigate('UserCharactersScreen');
        onClose && onClose();
    };
    return (
        <View style={[$Topbar]}>
            <Text text="캐릭터 세부 설정" weight="bold" size="xl" style={$text} />
            <Pressable onPress={handleClose} style={{ padding: 10 }}>
                <Close />
            </Pressable>
        </View>
    );
};

export default EditAdvancedTopbar;

const $Topbar: ViewStyle = {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    backgroundColor: colors.background.light,
    justifyContent: 'space-between',
    borderBottomColor: colors.gray[100],
    borderBottomWidth: 1,
};

const $text: TextStyle = {
    color: colors.orange[500],
};
