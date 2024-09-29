import { Path, Svg, SvgProps } from 'react-native-svg';

const GoToLinkIcon: React.FC<SvgProps> = ({ width, height, fill }) => {
    return (
        <Svg width={width || 24} height={height || 24} viewBox="0 0 24 24" fill="none">
            <Path
                d="M1.48317 12C1.07266 12 0.722842 11.8554 0.433705 11.5663C0.144568 11.2772 0 10.9273 0 10.5168V1.48317C0 1.07266 0.144568 0.722842 0.433705 0.433705C0.722842 0.144568 1.07266 0 1.48317 0H6V1.48317H1.48317V10.5168H10.5168V6H12V10.5168C12 10.9273 11.8554 11.2772 11.5663 11.5663C11.2772 11.8554 10.9273 12 10.5168 12H1.48317ZM4.6213 8.41219L3.58781 7.3787L9.48333 1.48317H7.30389V0H12V4.69611H10.5168V2.51667L4.6213 8.41219Z"
                fill={fill || 'currentColor'}
            />
        </Svg>
    );
};

export default GoToLinkIcon;
