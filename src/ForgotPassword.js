import React, {useState} from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Modal, Pressable } from 'react-native';
import LoggingInput from '../components/LoggingInput';
import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as userActions from '../store/actions/authUser';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import Colors from '../constants/Colors';
const ForgotPassword = ({navigation})=>{
const [modalVisible, setModalVisible] = useState(false);
    const {
        control,
        handleSubmit,
        formState: {errors},
      } = useForm();


const auth = getAuth();

  
  
const onSubmitHandler =  (data)=>{
    const {email} = data;
    sendPasswordResetEmail(auth, email)
    .then(() => {
        setModalVisible(!modalVisible)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
    
    return(
        <View style={styles.container}>
            {/* <View style={styles.logo}>
                <Text>تسجيل</Text>
            </View> */}
           <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.modalText}>تم ارسال اميل تعديل الرقم السري</Text>
                    <Pressable 
                        onPress={()=>{setModalVisible(!modalVisible), navigation.navigate("SignIn")}}
                        style={{position:"absolute", bottom: 10, justifyContent: 'center', backgroundColor: Colors.primary,padding: 3, paddingHorizontal: 15,borderRadius: 15}}>
                        <Text style={{fontSize: 18, color: 'white'}}>ok</Text>
                    </Pressable>
                    </View>
                </View>
            </Modal>
            <View styles={styles.form}>
                <LoggingInput 
                    name= 'email' 
                    placeholder='الأميل' 
                    control={control} 
                    keyboardType='default'
                    textContentType='email'
                    rules={{required: 'الأميل مطلوب'}}  
                    iconName='mail'
                    
                />
                
            </View>
            <TouchableOpacity style={styles.SubmitButton}
                onPress={handleSubmit(onSubmitHandler)} >
                <Text style={{color: "white", fontSize: 18,fontWeight: 'bold'}}>ارسال</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 10,
        marginTop: 50
    },
    logo:{
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form:{
        height: '75%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    SubmitButton:{
        marginTop: 20,
        marginBottom: 5,
        marginHorizontal: 10,
        // alignItems:'center',
        justifyContent: 'center',
        backgroundColor: Colors.accent,
        padding: 10,
        // width: "75%",
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 15
    },
    logInText:{
        color: 'red',
        fontSize: 15,
        
    },
    forgotPass: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    forgotPassText:{
        fontSize: 20,
        textDecorationLine: 'underline',
        color: 'red'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 5,
        justifyContent: 'space-evenly'
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonCloseSignIn: {
        backgroundColor: Colors.primary,
      },
      buttonCloseSignUP: {
        backgroundColor: Colors.accent,
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18
      },
      modalText: {
        marginBottom: 20,
        textAlign: "center",
        color: Colors.accent,
        fontWeight: 'bold',
        fontSize: 18,
        fontWeight: 'bold'
      }
});

export default ForgotPassword;