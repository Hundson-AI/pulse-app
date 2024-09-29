import { Path, Svg, SvgProps } from 'react-native-svg';

const SendIcon: React.FC<SvgProps> = ({ width, height, fill }) => {
    return (
        <Svg width={width || 24} height={height || 24} viewBox="0 0 24 24" fill="none">
            <Path
                d="M2.16567 21.2519C1.64691 21.466 1.15627 21.4224 0.693764 21.1209C0.231255 20.8192 0 20.3863 0 19.8222V13.9502L11.2622 11.0003L0 8.05033V2.17835C0 1.61422 0.231255 1.18131 0.693764 0.879624C1.15627 0.578165 1.64691 0.534501 2.16567 0.748629L23.0436 9.57055C23.6812 9.8525 24 10.3291 24 11.0003C24 11.6715 23.6812 12.148 23.0436 12.43L2.16567 21.2519Z"
                fill={fill || 'currentColor'}
            />
        </Svg>
    );
};

export default SendIcon;
