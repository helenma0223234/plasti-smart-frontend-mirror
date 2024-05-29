import { View, StyleSheet} from "react-native";
import React from "react";

import Penguin1 from "../../assets/avatars/penguin1.svg";
import Penguin2 from "../../assets/avatars/penguin2.svg";
import Penguin3 from "../../assets/avatars/penguin3.svg";
import Shiba1 from "../../assets/avatars/shiba1.svg";
import Shiba2 from "../../assets/avatars/shiba2.svg";
import Shiba3 from "../../assets/avatars/shiba3.svg";
import Shiba1Hat from "../../assets/avatars/shiba1hat.svg";
import Shiba2Hat from "../../assets/avatars/shiba2hat.svg";
import Shiba3Hat from "../../assets/avatars/shiba3hat.svg";
import Penguin1Hat from "../../assets/avatars/penguin1hat.svg";
import Penguin2Hat from "../../assets/avatars/penguin2hat.svg";
import Penguin3Hat from "../../assets/avatars/penguin3hat.svg";
import Penguin1Glasses from "../../assets/avatars/penguin1glasses.svg";
import Penguin2Glasses from "../../assets/avatars/penguin2glasses.svg";
import Penguin3Glasses from "../../assets/avatars/penguin3glasses.svg";
import Shiba1Glasses from "../../assets/avatars/shiba1glasses.svg";
import Shiba2Glasses from "../../assets/avatars/shiba2glasses.svg";
import Shiba3Glasses from "../../assets/avatars/shiba3glasses.svg";
import Shiba1Beanie from "../../assets/avatars/shiba1beanie.svg";
import Shiba2Beanie from "../../assets/avatars/shiba2beanie.svg";
import Shiba3Beanie from "../../assets/avatars/shiba3beanie.svg";
import Penguin1Beanie from "../../assets/avatars/penguin1beanie.svg";
import Penguin2Beanie from "../../assets/avatars/penguin2beanie.svg";
import Penguin3Beanie from "../../assets/avatars/penguin3beanie.svg";
import Shiba1Bow from "../../assets/avatars/shiba1bow.svg";
import Shiba2Bow from "../../assets/avatars/shiba2bow.svg";
import Shiba3Bow from "../../assets/avatars/shiba3bow.svg";
import Penguin1Bow from "../../assets/avatars/penguin1bow.svg";
import Penguin2Bow from "../../assets/avatars/penguin2bow.svg";
import Penguin3Bow from "../../assets/avatars/penguin3bow.svg";
import Bird1 from "../../assets/avatars/bird1.svg";
import Bird1Hat from "../../assets/avatars/bird1hat.svg";
import Bird1Glasses from "../../assets/avatars/bird1glasses.svg";
import Bird1Beanie from "../../assets/avatars/bird1beanie.svg";
import Bird1Bow from "../../assets/avatars/bird1bow.svg";
import Bird2 from "../../assets/avatars/bird2.svg";
import Bird3 from "../../assets/avatars/bird3.svg";
import Bird2Hat from "../../assets/avatars/bird2hat.svg";
import Bird3Hat from "../../assets/avatars/bird3hat.svg";
import Bird2Glasses from "../../assets/avatars/bird2glasses.svg";
import Bird3Glasses from "../../assets/avatars/bird3glasses.svg";
import Bird2Beanie from "../../assets/avatars/bird2beanie.svg";
import Bird3Beanie from "../../assets/avatars/bird3beanie.svg";
import Bird2Bow from "../../assets/avatars/bird2bow.svg";
import Bird3Bow from "../../assets/avatars/bird3bow.svg";


interface AvatarProps {
  avatarID: number; // 1 is shiba, 2 is pengiun, 3 is cat, 4 is bird
  color: number; // 1-3, only 1 for bird
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
        case 1: 
          switch (accessory) {
            case -1: AvatarSVG = Shiba1; break;
            case 1: AvatarSVG = Shiba1Hat; break;
            case 2: AvatarSVG = Shiba1Glasses; break;
            case 3: AvatarSVG = Shiba1Beanie; break;
            case 4: AvatarSVG = Shiba1Bow; break;
            default: AvatarSVG = Shiba1; break;

          }
          break;
        case 2: 
          switch (accessory) {
            case -1: AvatarSVG = Shiba2; break;
            case 1: AvatarSVG = Shiba2Hat; break;
            case 2: AvatarSVG = Shiba2Glasses; break;
            case 3: AvatarSVG = Shiba2Beanie; break;
            case 4: AvatarSVG = Shiba2Bow; break;
            default: AvatarSVG = Shiba2; break;

          }
          break;
        case 3:
          switch (accessory) {
            case -1: AvatarSVG = Shiba3; break;
            case 1: AvatarSVG = Shiba3Hat; break;
            case 2: AvatarSVG = Shiba3Glasses; break;
            case 3: AvatarSVG = Shiba3Beanie; break;
            case 4: AvatarSVG = Shiba3Bow; break;
            default: AvatarSVG = Shiba3; break;

          }
          break;
        default: AvatarSVG = Shiba1; break;
      }
      break;
    case 2: // penguin
      switch (color) {
        case 1: 
          switch (accessory) {
            case -1: AvatarSVG = Penguin1; break;
            case 1: AvatarSVG = Penguin1Hat; break;
            case 2: AvatarSVG = Penguin1Glasses; break;
            case 3: AvatarSVG = Penguin1Beanie; break;
            case 4: AvatarSVG = Penguin1Bow; break;
            default: AvatarSVG = Penguin1; break;
          }
          break;
        case 2: 
          switch (accessory) {
            case -1: AvatarSVG = Penguin2; break;
            case 1: AvatarSVG = Penguin2Hat; break;
            case 2: AvatarSVG = Penguin2Glasses; break;
            case 3: AvatarSVG = Penguin2Beanie; break;
            case 4: AvatarSVG = Penguin2Bow; break;
            default: AvatarSVG = Penguin2; break;
          }
          break;
        case 3: 
          switch (accessory) {
            case -1: AvatarSVG = Penguin3; break;
            case 1: AvatarSVG = Penguin3Hat; break;
            case 2: AvatarSVG = Penguin3Glasses; break;
            case 3: AvatarSVG = Penguin3Beanie; break;
            case 4: AvatarSVG = Penguin3Bow; break;
            default: AvatarSVG = Penguin3; break;
          }
          break;
        default: AvatarSVG = Penguin1; break;

      }
      break;
    case 3: // bird
      switch (color) {
        case 1:
          switch (accessory) {
            case -1: AvatarSVG = Bird1; break;
            case 1: AvatarSVG = Bird1Hat; break;
            case 2: AvatarSVG = Bird1Glasses; break;
            case 3: AvatarSVG = Bird1Beanie; break;
            case 4: AvatarSVG = Bird1Bow; break;
            default: AvatarSVG = Bird1; break;
          }
          break;
        case 2: 
          switch (accessory) {
            case -1: AvatarSVG = Bird2; break;
            case 1: AvatarSVG = Bird2Hat; break;
            case 2: AvatarSVG = Bird2Glasses; break;
            case 3: AvatarSVG = Bird2Beanie; break;
            case 4: AvatarSVG = Bird2Bow; break;
            default: AvatarSVG = Bird2; break;
          }
          break;
        case 3: 
          switch (accessory) {
            case -1: AvatarSVG = Bird3; break;
            case 1: AvatarSVG = Bird3Hat; break;
            case 2: AvatarSVG = Bird3Glasses; break;
            case 3: AvatarSVG = Bird3Beanie; break;
            case 4: AvatarSVG = Bird3Bow; break;
            default: AvatarSVG = Bird3; break;
          }
          break;
        default: AvatarSVG = Bird1; break;
      }
      break;
    default:
      console.error('Invalid avatarID or color');
      return null;
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