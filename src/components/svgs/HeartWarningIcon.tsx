import { Svg, Path, G, ClipPath, Defs, Rect, SvgProps } from 'react-native-svg';

const HeartWarningIcon: React.FC<SvgProps> = ({ width, height, fill }) => {
	return (
		<Svg
			width={width || 17}
			height={height || 16}
			viewBox='0 0 17 16'
			fill='none'
		>
			<G clipPath='url(#clip0_1882_6541)'>
				<Path
					d='M12.3326 8.92857V6.74579C12.3326 6.50189 12.4162 6.2962 12.5836 6.12872C12.7511 5.96137 12.9567 5.8777 13.2006 5.8777C13.4446 5.8777 13.6502 5.96137 13.8177 6.12872C13.9851 6.2962 14.0687 6.50189 14.0687 6.74579V8.92857C14.0687 9.17261 13.9851 9.3783 13.8177 9.54565C13.6502 9.71313 13.4446 9.79687 13.2006 9.79687C12.9567 9.79687 12.7511 9.71313 12.5836 9.54565C12.4162 9.3783 12.3326 9.17261 12.3326 8.92857ZM1.24719 8.20568C0.9816 7.76099 0.790671 7.31636 0.674403 6.87179C0.558134 6.42736 0.5 5.9713 0.5 5.50361C0.5 4.25066 0.916999 3.1917 1.751 2.32674C2.58487 1.46178 3.65643 1.0293 4.9657 1.0293C5.63195 1.0293 6.27457 1.16758 6.89353 1.44414C7.5125 1.72057 8.04721 2.11066 8.49765 2.6144C8.95123 2.10752 9.48423 1.71665 10.0967 1.44179C10.7091 1.16679 11.3534 1.0293 12.0296 1.0293C13.3389 1.0293 14.4112 1.46752 15.2466 2.34398C16.0822 3.22044 16.5 4.30546 16.5 5.59904C16.0694 5.18583 15.5715 4.86374 15.0062 4.63277C14.4409 4.40194 13.8391 4.28652 13.2006 4.28652C12.0155 4.28652 10.9848 4.66054 10.1086 5.40857C9.2323 6.15661 8.69178 7.08898 8.48707 8.20568H7.41733L6.11754 6.25374C6.02988 6.12062 5.92191 6.02075 5.79362 5.95412C5.66546 5.8875 5.52823 5.85418 5.38191 5.85418C5.23559 5.85418 5.09588 5.8875 4.96276 5.95412C4.8295 6.02075 4.71748 6.12062 4.62669 6.25374L3.3073 8.20568H1.24719ZM6.21983 13.5416C5.35422 12.7607 4.63106 12.088 4.05037 11.5237C3.46981 10.9592 2.9745 10.4476 2.56442 9.9889H3.79465C3.94397 9.9889 4.08447 9.95232 4.21615 9.87917C4.34784 9.80601 4.45255 9.7094 4.53028 9.58934L5.36231 8.34873L6.19435 9.58934C6.27208 9.7094 6.37679 9.80601 6.50847 9.87917C6.64016 9.95232 6.78066 9.9889 6.92998 9.9889H8.48707C8.62332 10.7261 8.91125 11.3868 9.35085 11.971C9.79058 12.5552 10.3331 13.014 10.9783 13.3474C10.9345 13.3849 10.8915 13.4232 10.8493 13.4623C10.8071 13.5013 10.7627 13.5427 10.7159 13.5865L9.67203 14.5257C9.50964 14.6752 9.32531 14.7864 9.11903 14.8594C8.91262 14.9326 8.70549 14.9692 8.49765 14.9692C8.2898 14.9692 8.08346 14.9326 7.87862 14.8594C7.6739 14.7864 7.48879 14.6752 7.32327 14.5257L6.21983 13.5416ZM13.2006 12.3169C12.9567 12.3169 12.7511 12.2332 12.5836 12.0659C12.4162 11.8984 12.3326 11.6927 12.3326 11.4488C12.3326 11.2049 12.4162 10.9992 12.5836 10.8317C12.7511 10.6644 12.9567 10.5807 13.2006 10.5807C13.4446 10.5807 13.6502 10.6644 13.8177 10.8317C13.9851 10.9992 14.0687 11.2049 14.0687 11.4488C14.0687 11.6927 13.9851 11.8984 13.8177 12.0659C13.6502 12.2332 13.4446 12.3169 13.2006 12.3169Z'
					fill={fill || 'white'}
				/>
			</G>
			<Defs>
				<ClipPath id='clip0_1882_6541'>
					<Rect
						width='16'
						height='16'
						fill='white'
						transform='translate(0.5)'
					/>
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export default HeartWarningIcon;
