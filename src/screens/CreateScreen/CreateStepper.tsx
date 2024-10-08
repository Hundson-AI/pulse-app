import { Text } from '@components/Text';
import { colors } from '@theme';
import React, { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import { spacing } from 'src/theme/spacing';

interface Props {
	currentStep: number;
}

const TOTAL_STEPS = 9;

const CreateStepper: FC<Props> = ({ currentStep }) => {
	const renderSteps = () => {
		const steps = [];
		for (let i = 0; i < TOTAL_STEPS; i++) {
			if (i >= currentStep) {
				steps.push(
					<View
						key={i}
						style={[$rootStep, i == 0 && $firstStep, $step]}
					/>
				);
			} else {
				steps.push(
					<View
						key={i}
						style={[
							$rootStep,
							i == TOTAL_STEPS && $lastStep,
							$doneStep,
						]}
					/>
				);
			}
		}
		return steps;
	};

	return <View style={$rootContainer}>{renderSteps()}</View>;
};

export default CreateStepper;

const $rootContainer: ViewStyle = {
	width: '100%',
	display: 'flex',
	flexDirection: 'row',
};

const $firstStep: ViewStyle = {
	height: 18,
	flex: 1,
	borderRadius: 99,
	marginRight: 2,
};

const $rootStep: ViewStyle = {
	height: 18,
	flex: 1,
	borderRadius: 99,
	marginHorizontal: 2,
};

const $lastStep: ViewStyle = {
	height: 18,
	flex: 1,
	borderRadius: 99,
	marginLeft: 2,
};

const $step: ViewStyle = { backgroundColor: colors.gray[100] };
const $doneStep: ViewStyle = { backgroundColor: colors.mint[500] };
