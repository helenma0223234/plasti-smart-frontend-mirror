import { View, StyleSheet} from "react-native";
import React from "react";

import Cat1 from "../../assets/avatars/cat1.svg";
import Cat2 from "../../assets/avatars/cat2.svg";
import Cat3 from "../../assets/avatars/cat3.svg";
import Penguin1 from "../../assets/avatars/penguin1.svg";
import Penguin2 from "../../assets/avatars/penguin2.svg";
import Penguin3 from "../../assets/avatars/penguin3.svg";
import Shiba1 from "../../assets/avatars/shiba1.svg";
import Shiba2 from "../../assets/avatars/shiba2.svg";
import Shiba3 from "../../assets/avatars/shiba3.svg";

interface AvatarProps {
  avatarID: number; // 1 is shiba, 2 is pengiun, 3 is cat
  color: number; // 1-3
  size: number; 
  accessory: number;
  style?: any;
  shadow: boolean;
  mirror?: boolean;
}

const Avatar = ({ avatarID, color , size, accessory, style, shadow, mirror}: AvatarProps) => {
  let AvatarSVG;

  switch (avatarID) {
    case 1: // shiba
      switch (color) {
        case 1: AvatarSVG = Shiba1; break;
        case 2: AvatarSVG = Shiba2; break;
        case 3: AvatarSVG = Shiba3; break;
      }
      break;
    case 2: // penguin
      switch (color) {
        case 1: AvatarSVG = Penguin1; break;
        case 2: AvatarSVG = Penguin2; break;
        case 3: AvatarSVG = Penguin3; break;
      }
      break;
    case 3: // cat
      switch (color) {
        case 1: AvatarSVG = Cat1; break;
        case 2: AvatarSVG = Cat2; break;
        case 3: AvatarSVG = Cat3; break;
      }
      break;
  }

  return (
    <View style={[style, shadow && styles.shadow, mirror ? {transform: [{ scaleX: -1 }] } : {}]}>
      <AvatarSVG width={size} height={size}/>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Avatar;