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
import Shiba1Hat from "../../assets/avatars/shiba1hat.svg";
import Shiba2Hat from "../../assets/avatars/shiba2hat.svg";
import Shiba3Hat from "../../assets/avatars/shiba3hat.svg";
import Penguin1Hat from "../../assets/avatars/penguin1hat.svg";
import Penguin2Hat from "../../assets/avatars/penguin2hat.svg";
import Penguin3Hat from "../../assets/avatars/penguin3hat.svg";
import Cat1hat from "../../assets/avatars/cat1hat.svg";
import Cat2hat from "../../assets/avatars/cat2hat.svg";
import Cat3hat from "../../assets/avatars/cat3hat.svg";
import Cat1Glasses from "../../assets/avatars/cat1glasses.svg";
import Cat2Glasses from "../../assets/avatars/cat2glasses.svg";
import Cat3Glasses from "../../assets/avatars/cat3glasses.svg";
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
import Cat1Beanie from "../../assets/avatars/cat1beanie.svg";
import Cat2Beanie from "../../assets/avatars/cat2beanie.svg";
import Cat3Beanie from "../../assets/avatars/cat3beanie.svg";
import Shiba1Bow from "../../assets/avatars/shiba1bow.svg";
import Shiba2Bow from "../../assets/avatars/shiba2bow.svg";
import Shiba3Bow from "../../assets/avatars/shiba3bow.svg";
import Penguin1Bow from "../../assets/avatars/penguin1bow.svg";
import Penguin2Bow from "../../assets/avatars/penguin2bow.svg";
import Penguin3Bow from "../../assets/avatars/penguin3bow.svg";
import Cat1Bow from "../../assets/avatars/cat1bow.svg";
import Cat2Bow from "../../assets/avatars/cat2bow.svg";
import Cat3Bow from "../../assets/avatars/cat3bow.svg"; 


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
        case 1: 
          switch (accessory) {
            case -1: AvatarSVG = Shiba1; break;
            case 1: AvatarSVG = Shiba1Hat; break;
            case 2: AvatarSVG = Shiba1Glasses; break;
            case 3: AvatarSVG = Shiba1Beanie; break;
            case 4: AvatarSVG = Shiba1Bow; break;
          }
          break;
        case 2: 
          switch (accessory) {
            case -1: AvatarSVG = Shiba2; break;
            case 1: AvatarSVG = Shiba2Hat; break;
            case 2: AvatarSVG = Shiba2Glasses; break;
            case 3: AvatarSVG = Shiba2Beanie; break;
            case 4: AvatarSVG = Shiba2Bow; break;
          }
          break;
        case 3:
          switch (accessory) {
            case -1: AvatarSVG = Shiba3; break;
            case 1: AvatarSVG = Shiba3Hat; break;
            case 2: AvatarSVG = Shiba3Glasses; break;
            case 3: AvatarSVG = Shiba3Beanie; break;
            case 4: AvatarSVG = Shiba3Bow; break;
          }
          break;
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
          }
          break;
        case 2: 
          switch (accessory) {
            case -1: AvatarSVG = Penguin2; break;
            case 1: AvatarSVG = Penguin2Hat; break;
            case 2: AvatarSVG = Penguin2Glasses; break;
            case 3: AvatarSVG = Penguin2Beanie; break;
            case 4: AvatarSVG = Penguin2Bow; break;
          }
          break;
        case 3: 
          switch (accessory) {
            case -1: AvatarSVG = Penguin3; break;
            case 1: AvatarSVG = Penguin3Hat; break;
            case 2: AvatarSVG = Penguin3Glasses; break;
            case 3: AvatarSVG = Penguin3Beanie; break;
            case 4: AvatarSVG = Penguin3Bow; break;
          }
          break;
      }
      break;
    case 3: // cat
      switch (color) {
        case 1:
          switch (accessory) {
            case -1: AvatarSVG = Cat1; break;
            case 1: AvatarSVG = Cat1hat; break;
            case 2: AvatarSVG = Cat1Glasses; break;
            case 3: AvatarSVG = Cat1Beanie; break;
            case 4: AvatarSVG = Cat1Bow; break;
          }
          break;
        case 2: 
          switch (accessory) {
            case -1: AvatarSVG = Cat2; break;
            case 1: AvatarSVG = Cat2hat; break;
            case 2: AvatarSVG = Cat2Glasses; break;
            case 3: AvatarSVG = Cat2Beanie; break;
            case 4: AvatarSVG = Cat2Bow; break;
          }
          break;
        case 3: 
          switch (accessory) {
            case -1: AvatarSVG = Cat3; break;
            case 1: AvatarSVG = Cat3hat; break;
            case 2: AvatarSVG = Cat3Glasses; break;
            case 3: AvatarSVG = Cat3Beanie; break;
            case 4: AvatarSVG = Cat3Bow; break;
          }
          break;
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