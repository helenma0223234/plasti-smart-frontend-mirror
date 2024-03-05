import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Colors from 'utils/Colors';
import TextStyles from 'utils/TextStyles';

/* eslint-disable max-len */
interface PlasticSymbolProps {
  color: string;
  height: number;
  width: number;
  number: number;
  top: number;
  left: number;

}
const PlasticSymbol = ({ color, height, width, number, top, left }: PlasticSymbolProps) => {
  return (
    <View style={{ alignItems: 'center', width: width, height: height, position: 'relative', right: 2, bottom: 1 }}>
      <Svg width={width} height={height} viewBox="0 0 144 133" fill="none">
        <Path d="M78.974 103.374L65.1143 116.507M65.1143 116.507L78.974 129.64M65.1143 116.507H127.483C129.691 116.399 131.84 115.793 133.75 114.738C135.66 113.683 137.275 112.21 138.462 110.442C139.649 108.675 140.373 106.664 140.573 104.578C140.772 102.492 140.442 100.39 139.61 98.4493L135.799 91.8828" stroke={color} stroke-opacity="0.9" strokeWidth="7" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M54.8858 63.9789L49.8079 45.9688M49.8079 45.9688L30.857 50.7946M49.8079 45.9688L18.5936 97.3496C17.5872 99.2227 17.067 101.297 17.0762 103.4C17.0855 105.503 17.624 107.574 18.6468 109.439C19.6697 111.304 21.1471 112.909 22.9558 114.121C24.7645 115.333 26.8519 116.116 29.0439 116.405L36.9587 116.561" stroke={color} stroke-opacity="0.9" strokeWidth="7" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M102.942 63.977L121.893 68.8028M121.893 68.8028L126.971 50.7927M121.893 68.8028L90.6789 17.422C89.4752 15.6572 87.8448 14.1917 85.9237 13.1478C84.0026 12.1039 81.8466 11.5119 79.6357 11.4212C77.4248 11.3305 75.2232 11.7438 73.2146 12.6265C71.206 13.5093 69.4488 14.8358 68.0896 16.4955L63.9899 22.9315" stroke={color} stroke-opacity="0.9" strokeWidth="7" stroke-linecap="round" stroke-linejoin="round" />
      </Svg>
      <Text style={{ position: 'absolute', top: top, left: left, color: color, fontSize: (width / 2.5), zIndex: 100 }}>{number}</Text>
    </View >
  );
};

export default PlasticSymbol;