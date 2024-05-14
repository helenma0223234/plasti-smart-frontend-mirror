/* eslint-disable max-len */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Modal, Button } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { logout } from '../../../redux/slices/authSlice';

import Colors from 'utils/Colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SettingsPage = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const dispatch = useAppDispatch();
  
  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overall}>
        <Text style={{ marginTop: screenHeight * 0.01, fontSize: screenWidth * 0.08, marginBottom: screenHeight * 0.02, color: Colors.primary.dark, fontWeight: 'bold' }}>Settings</Text>
        <View style={{ marginBottom: 20, width: '100%', borderColor: Colors.primary.dark, borderWidth: 1, borderStyle: 'solid', alignSelf:'center', borderRadius: 10, padding:15,  display: 'flex',  flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <Image
            source={require('../../../assets/settings/profile.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={{ position: 'relative', right: screenWidth * 0.075 }}>
            <Text style={{ color: Colors.primary.dark, fontWeight: 'bold', fontSize: screenHeight * 0.020 }}>diner_Lukelore</Text>
            <Text style={{ color: '#ADC0AB', fontSize: screenHeight * 0.016, marginTop:2 }}>luke.a.danes.92@dartmouth.edu</Text>
          </View>
        </View>
        

        <View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(173, 192, 171, 1)' }}>
            {/* <TouchableOpacity style={styles.alignButtons} onPress={()=>navigation.navigate('Profile_Settings')}> */}
            <TouchableOpacity style={styles.alignButtons} >
              <Text style={{ color: Colors.primary.dark, fontSize: screenHeight * 0.020, fontWeight: 'bold' }}>Profile</Text>
              <MaterialIcons name="chevron-right" size={screenHeight * 0.028} color={Colors.primary.dark} />
            </TouchableOpacity>
          </View>


          <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(173, 192, 171, 1)' }}>
            {/* <TouchableOpacity style={styles.alignButtons} onPress={()=>navigation.navigate('Password_Settings')}> */}
            <TouchableOpacity style={styles.alignButtons}>
              <Text style={{ color: Colors.primary.dark, fontSize: screenHeight * 0.020, fontWeight: 'bold' }}>Password</Text>
              <MaterialIcons name="chevron-right" size={screenHeight * 0.028} color={Colors.primary.dark} />
            </TouchableOpacity>
          </View>



          <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(173, 192, 171, 1)' }}>
            {/* <TouchableOpacity style={styles.alignButtons} onPress={()=>navigation.navigate('Notifications_Settings')}> */}
            <TouchableOpacity style={styles.alignButtons}>
              <Text style={{ color: Colors.primary.dark, fontSize: screenHeight * 0.020, fontWeight: 'bold' }}>Notifications</Text>
              <MaterialIcons name="chevron-right" size={screenHeight * 0.028} color={Colors.primary.dark} />
            </TouchableOpacity>
          </View>



          <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(173, 192, 171, 1)' }}>
            <TouchableOpacity style={styles.alignButtons}>
              <Text style={{ color: Colors.primary.dark, fontSize: screenHeight * 0.020, fontWeight: 'bold' }}>About Us/FAQ</Text>
              <MaterialIcons name="chevron-right" size={screenHeight * 0.028} color={Colors.primary.dark} />
            </TouchableOpacity>
          </View>



          <View>
            <TouchableOpacity style={styles.alignButtons} onPress={toggleOverlay}>
              <Text style={{ color: Colors.primary.dark, fontSize: screenHeight * 0.020, fontWeight: 'bold' }}>Delete Account</Text>
              <MaterialIcons name="chevron-right" size={screenHeight * 0.028} color={Colors.primary.dark} />
            </TouchableOpacity>
          </View>
        </View>

         

        <TouchableOpacity style={styles.LogoutButton} onPress={() => dispatch(logout({}))}>
          <Text style={{ color: '#FBFBF4', fontSize: 15, fontWeight: 'bold' }}>LOG OUT</Text>
        </TouchableOpacity>
          
        <Modal visible={isOverlayVisible} animationType="slide" transparent={true}>
          <View style={styles.overlay}>
            <View style={styles.overlayContent}>
              <TouchableOpacity onPress={toggleOverlay}  style={styles.closeButton}>
                <AntDesign name="closecircleo" size={24} color={Colors.primary.dark} />
              </TouchableOpacity>
              <Image
                source={require('../../../assets/settings/profileSad.png')}
                resizeMode="contain"
                style={styles.closeImage}
              />
              <Text style={{ color: Colors.primary.dark, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>We're sorry to see you go! Are you sure you want to delete your account? </Text>
              
              <TouchableOpacity onPress={toggleOverlay} style={{ marginTop: 15, backgroundColor: Colors.primary.dark, paddingTop:12, paddingBottom: 12, paddingLeft: 25, paddingRight: 25, borderRadius: 10, width:screenWidth * 0.5, alignItems:'center', justifyContent:'center'  }}>
                <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 14, fontWeight: 'bold' }}>KEEP ACCOUNT</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginTop: 15, backgroundColor: 'transparent', paddingTop:12, paddingBottom: 12, paddingLeft: 25, paddingRight: 25, borderRadius: 10, borderColor: Colors.primary.dark, borderWidth: 1, borderStyle: 'solid', width:screenWidth * 0.5, alignItems:'center', justifyContent:'center'   }}>
                <Text style={{ color: Colors.primary.dark, fontSize: 14, fontWeight: 'bold' }}>DELETE ACCOUNT</Text>
              </TouchableOpacity>


            </View>
          </View>
        </Modal>
       
       
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FBFBF4',
  },
  overall:{
    margin:screenWidth * 0.05,
  },
  image:{
    height:screenWidth * 0.15,
    width: screenWidth * 0.16,
    position: 'relative',
    right: screenWidth * 0.04,
    borderRadius: 100,
  },
  alignButtons:{
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingTop: 15,
    paddingBottom: 15,
  },
  LogoutButton:{
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.primary.dark,
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    position: 'relative',
  },
  overlayContent: {
    backgroundColor: 'rgba(218, 229, 215, 1)',
    padding: 20,
    alignItems: 'center',
    width: 298,
    height: 428,
    borderRadius: 20,
  },
  closeButton:{
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height:30,
  
    position: 'relative',
    left: 110,
  },
  closeImage:{
    width: 148,
    height: 148,
    borderRadius: 100,
    marginBottom: 10,
  },
});


export default SettingsPage; 
