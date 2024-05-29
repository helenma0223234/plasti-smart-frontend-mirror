import { View, StyleSheet } from "react-native";
import React from "react";

import Bird1 from "../../assets/profilepics/bird1.svg";
import Bird2 from "../../assets/profilepics/bird2.svg";
import Bird3 from "../../assets/profilepics/bird3.svg";
import Bird1Beanie from "../../assets/profilepics/bird1beanie.svg";
import Bird1Bow from "../../assets/profilepics/bird1bow.svg";
import Bird1Glasses from "../../assets/profilepics/bird1glasses.svg";
import Bird1Hat from "../../assets/profilepics/bird1hat.svg";
import Bird2Beanie from "../../assets/profilepics/bird2beanie.svg";
import Bird2Bow from "../../assets/profilepics/bird2bow.svg";
import Bird2Glasses from "../../assets/profilepics/bird2glasses.svg";
import Bird2Hat from "../../assets/profilepics/bird2hat.svg";
import Bird3Beanie from "../../assets/profilepics/bird3beanie.svg";
import Bird3Bow from "../../assets/profilepics/bird3bow.svg";
import Bird3Glasses from "../../assets/profilepics/bird3glasses.svg";
import Bird3Hat from "../../assets/profilepics/bird3hat.svg";
import Penguin1 from "../../assets/profilepics/penguin1.svg";
import Penguin2 from "../../assets/profilepics/penguin2.svg";
import Penguin3 from "../../assets/profilepics/penguin3.svg";
import Penguin1Beanie from "../../assets/profilepics/penguin1beanie.svg";
import Penguin1Bow from "../../assets/profilepics/penguin1bow.svg";
import Penguin1Glasses from "../../assets/profilepics/penguin1glasses.svg";
import Penguin1Hat from "../../assets/profilepics/penguin1hat.svg";
import Penguin2Beanie from "../../assets/profilepics/penguin2beanie.svg";
import Penguin2Bow from "../../assets/profilepics/penguin2bow.svg";
import Penguin2Glasses from "../../assets/profilepics/penguin2glasses.svg";
import Penguin2Hat from "../../assets/profilepics/penguin2hat.svg";
import Penguin3Beanie from "../../assets/profilepics/penguin3beanie.svg";
import Penguin3Bow from "../../assets/profilepics/penguin3bow.svg";
import Penguin3Glasses from "../../assets/profilepics/penguin3glasses.svg";
import Penguin3Hat from "../../assets/profilepics/penguin3hat.svg";
import Shiba1 from "../../assets/profilepics/shiba1.svg";
import Shiba2 from "../../assets/profilepics/shiba2.svg";
import Shiba3 from "../../assets/profilepics/shiba3.svg";
import Shiba1Beanie from "../../assets/profilepics/shiba1beanie.svg";
import Shiba1Bow from "../../assets/profilepics/shiba1bow.svg";
import Shiba1Glasses from "../../assets/profilepics/shiba1glasses.svg";
import Shiba1Hat from "../../assets/profilepics/shiba1hat.svg";
import Shiba2Beanie from "../../assets/profilepics/shiba2beanie.svg";
import Shiba2Bow from "../../assets/profilepics/shiba2bow.svg";
import Shiba2Glasses from "../../assets/profilepics/shiba2glasses.svg";
import Shiba2Hat from "../../assets/profilepics/shiba2hat.svg";
import Shiba3Beanie from "../../assets/profilepics/shiba3beanie.svg";
import Shiba3Bow from "../../assets/profilepics/shiba3bow.svg";
import Shiba3Glasses from "../../assets/profilepics/shiba3glasses.svg";
import Shiba3Hat from "../../assets/profilepics/shiba3hat.svg";

interface ProfilePicProps {
  avatarID: number; // 1 is shiba, 2 is pengiun, 3 is bird
  color: number; // 1-3
  size: number;
  accessory: number; // -1 is no accessory, 1 is hat, 2 is glasses, 3 is beanie, 4 is bow
  style?: any;
}

const ProfilePicture = ({
  avatarID,
  color,
  size,
  accessory,
  style,
}: ProfilePicProps) => {
  let ProfileSVG;
  //   console.log('profilepic props:', avatarID, color, accessory);
  
  switch (avatarID) {
    case 1: // shiba
      switch (color) {
        case 1:
          switch (accessory) {
            case -1:
              ProfileSVG = Shiba1;
              break;
            case 1:
              ProfileSVG = Shiba1Hat;
              break;
            case 2:
              ProfileSVG = Shiba1Glasses;
              break;
            case 3:
              ProfileSVG = Shiba1Beanie;
              break;
            case 4:
              ProfileSVG = Shiba1Bow;
              break;
          }
          break;
        case 2:
          switch (accessory) {
            case -1:
              ProfileSVG = Shiba2;
              break;
            case 1:
              ProfileSVG = Shiba2Hat;
              break;
            case 2:
              ProfileSVG = Shiba2Glasses;
              break;
            case 3:
              ProfileSVG = Shiba2Beanie;
              break;
            case 4:
              ProfileSVG = Shiba2Bow;
              break;
          }
          break;
        case 3:
          switch (accessory) {
            case -1:
              ProfileSVG = Shiba3;
              break;
            case 1:
              ProfileSVG = Shiba3Hat;
              break;
            case 2:
              ProfileSVG = Shiba3Glasses;
              break;
            case 3:
              ProfileSVG = Shiba3Beanie;
              break;
            case 4:
              ProfileSVG = Shiba3Bow;
              break;
          }
          break;
      }
      break;
    case 2: // penguin
      switch (color) {
        case 1:
          switch (accessory) {
            case -1:
              ProfileSVG = Penguin1;
              break;
            case 1:
              ProfileSVG = Penguin1Hat;
              break;
            case 2:
              ProfileSVG = Penguin1Glasses;
              break;
            case 3:
              ProfileSVG = Penguin1Beanie;
              break;
            case 4:
              ProfileSVG = Penguin1Bow;
              break;
          }
          break;
        case 2:
          switch (accessory) {
            case -1:
              ProfileSVG = Penguin2;
              break;
            case 1:
              ProfileSVG = Penguin2Hat;
              break;
            case 2:
              ProfileSVG = Penguin2Glasses;
              break;
            case 3:
              ProfileSVG = Penguin2Beanie;
              break;
            case 4:
              ProfileSVG = Penguin2Bow;
              break;
          }
          break;
        case 3:
          switch (accessory) {
            case -1:
              ProfileSVG = Penguin3;
              break;
            case 1:
              ProfileSVG = Penguin3Hat;
              break;
            case 2:
              ProfileSVG = Penguin3Glasses;
              break;
            case 3:
              ProfileSVG = Penguin3Beanie;
              break;
            case 4:
              ProfileSVG = Penguin3Bow;
              break;
          }
          break;
      }
      break;
    case 3: // bird
      switch (color) {
        case 1:
          switch (accessory) {
            case -1:
              ProfileSVG = Bird1;
              break;
            case 1:
              ProfileSVG = Bird1Hat;
              break;
            case 2:
              ProfileSVG = Bird1Glasses;
              break;
            case 3:
              ProfileSVG = Bird1Beanie;
              break;
            case 4:
              ProfileSVG = Bird1Bow;
              break;
          }
          break;
        case 2:
          switch (accessory) {
            case -1:
              ProfileSVG = Bird2;
              break;
            case 1:
              ProfileSVG = Bird2Hat;
              break;
            case 2:
              ProfileSVG = Bird2Glasses;
              break;
            case 3:
              ProfileSVG = Bird2Beanie;
              break;
            case 4:
              ProfileSVG = Bird2Bow;
              break;
          }
          break;
        case 3:
          switch (accessory) {
            case -1:
              ProfileSVG = Bird3;
              break;
            case 1:
              ProfileSVG = Bird3Hat;
              break;
            case 2:
              ProfileSVG = Bird3Glasses;
              break;
            case 3:
              ProfileSVG = Bird3Beanie;
              break;
            case 4:
              ProfileSVG = Bird3Bow;
              break;
          }
          break;
      }
      break;
  }

  return (
    <View style={{ ...style }}>
      <ProfileSVG width={size} height={size} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfilePicture;
