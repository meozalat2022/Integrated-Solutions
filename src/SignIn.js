import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput, Alert } from 'react-native';
import LoggingInput from '../components/LoggingInput';
import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as userActions from '../store/actions/authUser';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Colors from '../constants/Colors';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignIn = ({navigation})=>{
const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: {errors},
      } = useForm();


const auth = getAuth();

  

  
const onSubmitHandler =  (data)=>{
    const {email, password} = data;
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // dispatch auth user
          dispatch(userActions.fetchAuthUser(user.uid))
          navigation.navigate('BottomTab', {screen: 'Home'})
        })
        .catch((error) => {
            const message = error.message;
            if(message === "Firebase: Error (auth/user-not-found)."){
                Alert.alert("اميل غير موجود")
            }
            if(message === "Firebase: Error (auth/wrong-password)."){
                Alert.alert("رقم سري خطأ")
            }
        });
}
    return(
        <View style={styles.container}>
            {/* <View style={styles.logo}>
                <Text>تسجيل</Text>
            </View> */}
          
            <View styles={styles.form}>
                <LoggingInput 
                    name= 'email' 
                    placeholder='الأميل' 
                    control={control} 
                    keyboardType='default'
                    textContentType='email'
                    rules={{required: 'الأيميل مطلوب',
                        pattern: {value: EMAIL_REGEX, message: 'الاميل غير صحيح'}
                    }}   
                    iconName='mail'
                    
                />
                <LoggingInput  
                    name='password'
                    placeholder='كلمة المرور' 
                    control={control}
                    rules={{required: 'كلمة المرور مطلوبة',
                        minLength:{
                            value: 6,
                            message: 'كلمة المرور لا يقل عن 6 احرف او ارقام'
                        }   
                    }}
                    iconName='key' 
                    secureTextEntry
                    
                />
            </View>
            <TouchableOpacity style={styles.SubmitButton}
                onPress={handleSubmit(onSubmitHandler)} >
                <Text style={{color: "white", fontSize: 18,fontWeight: 'bold'}}>تسجيل</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('ForgotPassword')}} style={styles.forgotPass}>
                <Text style={styles.forgotPassText}>نسيت كلمة المرور</Text>
            </TouchableOpacity>
            <View>
                {/* <TouchableOpacity>
                    <LoggingButton logText={'سجل بالفيس بوك'} SocialIconName={'facebook-square'} SocialIconColor={'#4267B2'}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <LoggingButton logText={'سجل بتويتر'} SocialIconName={'twitter'} SocialIconColor={'#00acee'}/>
                </TouchableOpacity>
                <TouchableOpacity >
                    <LoggingButton logText={'سجل بجوجل'} SocialIconName={'google'} SocialIconColor={'#DB4437'}/>
                </TouchableOpacity> */}
                <View style={{justifyContent: 'center' ,flexDirection: 'row-reverse'}}>
                <Text>ليس لديك حساب</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('SignUp')}}>
                    <Text style={{color: 'red', marginEnd: 5}}>سجل الأن</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10
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
    
    }
});

export default SignIn;