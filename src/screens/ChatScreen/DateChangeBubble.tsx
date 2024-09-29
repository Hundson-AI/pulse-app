import { colors } from '@theme';
import { formatDate } from '@utils/dateUtils';
import React, { FC } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';

export interface DateChangeBubbleProps {
    date: Date;
}

const DateChangeBubble: FC<DateChangeBubbleProps> = ({ date }) => {
    return (
        <View style={$container}>
            <View style={$bubble}>
                <Text style={$text}>{formatDate(date.toISOString())}</Text>
            </View>
        </View>
    );
};

const $container: ViewStyle = {
    alignItems: 'center',
    marginVertical: 10,
};

const $bubble: ViewStyle = {
    backgroundColor: colors.gray[50],
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
};

const $text: TextStyle = {
    fontSize: 12,
    color: colors.gray[300],
};

export default DateChangeBubble;
