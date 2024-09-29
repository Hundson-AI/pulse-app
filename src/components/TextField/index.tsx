import { Text, TextProps } from '@components/Text';
import { colors } from '@theme';
import React, { ComponentType, forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import {
    StyleProp,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { spacing } from 'src/theme/spacing';

export interface TextFieldAccessoryProps {
    style: StyleProp<any>;
    status: TextFieldProps['status'];
    multiline: boolean;
    editable: boolean;
}

export interface TextFieldProps extends Omit<TextInputProps, 'ref'> {
    /**
     * A style modifier for different input states.
     */
    status?: 'error' | 'disabled';
    /**
     * The label text to display if not using `labelTx`.
     */
    label?: TextProps['text'];
    /**
     * Pass any additional props directly to the label Text component.
     */
    LabelTextProps?: TextProps;
    /**
     * The helper text to display if not using `helperTx`.
     */
    helper?: TextProps['text'];
    /**
     * Pass any additional props directly to the helper Text component.
     */
    HelperTextProps?: TextProps;
    /**
     * The placeholder text to display if not using `placeholderTx`.
     */
    placeholder?: TextProps['text'];
    /**
     * Optional input style override.
     */
    style?: StyleProp<TextStyle>;
    /**
     * Style overrides for the container
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Style overrides for the input wrapper
     */
    inputWrapperStyle?: StyleProp<ViewStyle>;
    /**
     * An optional component to render on the right side of the input.
     * Example: `RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
     * Note: It is a good idea to memoize this.
     */
    RightAccessory?: ComponentType<TextFieldAccessoryProps>;
    /**
     * An optional component to render on the left side of the input.
     * Example: `LeftAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
     * Note: It is a good idea to memoize this.
     */
    LeftAccessory?: ComponentType<TextFieldAccessoryProps>;
}

/**
 * A component that allows for the entering and editing of text.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-TextField.md)
 */
export const TextField = forwardRef(function TextField(props: TextFieldProps, ref: Ref<TextInput>) {
    const {
        label,
        placeholder,
        helper,
        status,
        RightAccessory,
        LeftAccessory,
        HelperTextProps,
        LabelTextProps,
        style: $inputStyleOverride,
        containerStyle: $containerStyleOverride,
        inputWrapperStyle: $inputWrapperStyleOverride,
        ...TextInputProps
    } = props;
    const input = useRef<TextInput>(null);

    const disabled = TextInputProps.editable === false || status === 'disabled';

    const placeholderContent = placeholder;

    const $containerStyles = [$containerStyleOverride];

    const $labelStyles = [$labelStyle, LabelTextProps?.style];

    const $inputWrapperStyles = [
        $inputWrapperStyle,
        status === 'error' && { borderColor: colors.red },
        TextInputProps.multiline && { minHeight: 112 },
        LeftAccessory && { paddingStart: 0 },
        RightAccessory && { paddingEnd: 0 },
        $inputWrapperStyleOverride,
    ];

    const $inputStyles = [
        $inputStyle,
        disabled && { color: colors.gray[500] },
        TextInputProps.multiline && { height: 'auto' as unknown as number },
        $inputStyleOverride,
    ];

    const $helperStyles = [
        $helperStyle,
        status === 'error' && { color: colors.red },
        HelperTextProps?.style,
    ];

    function focusInput() {
        if (disabled) return;

        input.current?.focus();
    }

    useImperativeHandle(ref, () => input.current as TextInput);

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={$containerStyles}
            onPress={focusInput}
            accessibilityState={{ disabled }}>
            {!!label && (
                <Text preset="formLabel" text={label} {...LabelTextProps} style={$labelStyles} />
            )}

            <View style={$inputWrapperStyles}>
                {!!LeftAccessory && (
                    <LeftAccessory
                        style={$leftAccessoryStyle}
                        status={status}
                        editable={!disabled}
                        multiline={TextInputProps.multiline || false}
                    />
                )}

                <TextInput
                    ref={input}
                    underlineColorAndroid={colors.transparent}
                    textAlignVertical="top"
                    placeholder={placeholderContent}
                    placeholderTextColor={colors.gray[500]}
                    {...TextInputProps}
                    editable={!disabled}
                    style={$inputStyles}
                />

                {!!RightAccessory && (
                    <RightAccessory
                        style={$rightAccessoryStyle}
                        status={status}
                        editable={!disabled}
                        multiline={TextInputProps.multiline || false}
                    />
                )}
            </View>

            {!!helper && (
                <Text
                    preset="formHelper"
                    text={helper}
                    {...HelperTextProps}
                    style={$helperStyles}
                />
            )}
        </TouchableOpacity>
    );
});

const $labelStyle: TextStyle = {
    marginBottom: spacing.xs,
};

const $inputWrapperStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.gray[200],
    borderColor: colors.gray[400],
    overflow: 'hidden',
};

const $inputStyle: TextStyle = {
    flex: 1,
    alignSelf: 'stretch',
    color: colors.gray[950],
    fontSize: 16,
    height: 24,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginVertical: spacing.xs,
    marginHorizontal: spacing.sm,
};

const $helperStyle: TextStyle = {
    marginTop: spacing.xs,
};

const $rightAccessoryStyle: ViewStyle = {
    marginEnd: spacing.xs,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
};
const $leftAccessoryStyle: ViewStyle = {
    marginStart: spacing.xs,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
};
