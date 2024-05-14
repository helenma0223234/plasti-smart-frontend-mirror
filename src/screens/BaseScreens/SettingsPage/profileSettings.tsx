import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ProfileSettings = ({ navigation }) => {
  const [isPickerVisible, setIsPickerAvailable] = useState(0);
  const togglePicker = ()=>(
    setIsPickerAvailable(!isPickerVisible)
  );


 
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrowBorder} onPress={()=>{navigation.goBack();}} > 
        <AntDesign name="arrowleft" size={24} color="rgba(27, 69, 60, 1)"  style={{ alignSelf:'center' }}/>
      </TouchableOpacity>
      
      <Text style={{ fontSize: 30, marginBottom: 10, fontWeight:'bold', color: 'rgba(27, 69, 60, 1)' }}>Profile Settings</Text>

      <View style={{ alignSelf: 'center', width:148, height:148, backgroundColor: 'rgba(218, 229, 215, 1)', borderRadius: 100, justifyContent:'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 15 }}>
        <Image
          source={require('../../../../assets/profile.png')}
          style={styles.profilePicture}
          resizeMode="contain"
        />

        <TouchableOpacity onPress={togglePicker} style={{ position: 'relative', bottom: 14, left: 40, backgroundColor: 'rgba(244, 243, 231, 1)', width: 44, height: 44, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('../../../../assets/pencil.png')}
            style={{ height: 22, width: 22 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Code below for text input */}
      <ScrollView behavior="padding" style={styles.allInputs} showsVerticalScrollIndicator={false}>



        <View style={styles.inputContainer}>
          <Text style={{ color:'rgba(27, 69, 60, 1)', fontSize:18, fontWeight:'bold' }}>Update Email</Text>
          <TextInput 
            placeholder='luke.a.danes.92@dartmouth.edu'
            style={styles.inputDesign}
            required
          />
        </View>


        <View style={styles.inputContainer}>
          <Text style={{ color:'rgba(27, 69, 60, 1)', fontWeight:'bold', fontSize:18  }}>Update username</Text>
          <TextInput 
            placeholder='diner_luklore'
            style={styles.inputDesign}
            required
          />
        </View>
     

        {/* <View style={styles.inputContainer}>
          <Text style={{ color:'rgba(27, 69, 60, 1)',  fontWeight:'bold', fontSize:18  }}>Update password</Text>
          <TextInput 
            placeholder='1232dfe33##%&'
            style={styles.inputDesign}
            required
            secureTextEntry={true}
          />
        </View>


        <View style={styles.inputContainer}>
          <Text style={{ color:'rgba(27, 69, 60, 1)',  fontWeight:'bold', fontSize:18  }}>Confirm password</Text>
          <TextInput 
            placeholder='1232dfe33##%&'
            style={styles.inputDesign}
            required
            secureTextEntry={true}
          />
        </View> */}





        <TouchableOpacity style={styles.updateButton}>
          <Text style={{ color: 'rgba(218, 229, 215, 1)', fontSize: 15, fontWeight: 'bold' }}>UPDATE PROFILE</Text>
        </TouchableOpacity>


      </ScrollView>

      <Modal visible={isPickerVisible} animationType="slide" transparent={true} >
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>

            
            <TouchableOpacity title="Close" onPress={togglePicker}  style={styles.closeButton}>
              <AntDesign name="closecircleo" size={24} color="rgba(27, 69, 60, 1)" />
            </TouchableOpacity>
            {/* <View>


              <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'rgba(27, 69, 60, 1)' }}>Profile Picture</Text>

              <View style={styles.alignButtons}>

                <TouchableOpacity style={styles.designButton} onPress={()=> alert('Camera Opened')}>
                  <EvilIcons name="camera" size={26} color="white" />
                  <Text style={{ color: 'white' }}>Camera</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.designButton}>
                  <EvilIcons name="image" size={26} color="white" onPress={()=> alert('Gallery Opened') } />
                  <Text style={{ color: 'white' }}>Gallery</Text>
                </TouchableOpacity>
              </View>



            </View> */}


          </View>
        </View>
      </Modal>







    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    boxSizing: 'border-box',
    paddingLeft: 20,
    paddingRight: 20, 
    paddingTop: 30,
  },
  arrowBorder:{
   
    borderColor: 'rgba(27, 69, 60, 1)',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 40,
    width: 40,
    borderRadius: 100,
    marginBottom: 30,
    justifyContent: 'center',
  },
  profilePicture:{
    width: 150,
    height: 162,
    position: 'relative',
    top: 20,
  },
  inputContainer:{
    display: 'flex',
    flexDirection: 'column',
    alignItems:'left',
    justifyContent: 'center',
    marginBottom: 10,
  },
  inputDesign:{
    width: '100%',
    borderColor: 'rgba(27, 69, 60, 1)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 12,
    marginTop: 5,
    color: 'rgba(27, 69, 60, 1)',
    fontSize: 16,
  },
  allInputs:{
    position:'relative',
    paddingTop: 30,
    paddingBottom: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    position: 'relative',
  },
  overlayContent: {
    backgroundColor: 'rgba(218, 229, 215, 1)',
    padding: 20,
    alignItems: 'center',
    width: 348,
    height: 198,
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
    left: 140,
  },
  closeImage:{
    width: 148,
    height: 148,
    borderRadius: 100,
    marginBottom: 10,
  },
  designButton:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 60,
    height: 60,
    padding: 40,
    backgroundColor: 'rgba(27, 69, 60, 1)',
    borderRadius: 10,
    marginTop: 10,
    margin: 10,
  },
  alignButtons:{
    width: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  updateButton:{
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(27, 69, 60, 1)',
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },

});

export default ProfileSettings;
