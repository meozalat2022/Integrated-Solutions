import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, Alert } from 'react-native';
import LoggingInput from '../components/LoggingInput';
import {useForm} from 'react-hook-form';
import { RadioButton } from 'react-native-paper';
import Colors from '../constants/Colors';
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from '../config';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUp = ({navigation})=>{

    const auth = getAuth();
    const [checked, setChecked] = React.useState("بيتشو");

    const {
        control,
        handleSubmit,watch,
        formState: {errors},
      } = useForm();

      const pwd = watch('password');

     


    const getAuthUser = async(userId, email, name, phone_number, address)=>{
        await setDoc(doc(db,"User", userId),{
            email: email,
            name: name,
            phone: phone_number,
            address: address,
            area: checked
        });
    }

      const onSubmitHandler = (data)=>{

        const { email, name, phone_number, address, password} = data;
                createUserWithEmailAndPassword (auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                getAuthUser(user.uid, email, name, phone_number, address)
                navigation.navigate("SignIn")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    return(
        <ScrollView 
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            {/* <View style={styles.logo}>
                <Text style={{fontSize: 20, color: Colors.accent, fontWeight: 'bold'}}>تسجيل</Text>
            </View> */}
            <View styles={styles.form}>
            <LoggingInput 
                    name= 'name' 
                    placeholder='الأسم' 
                    control={control} 
                    rules={{required: 'الأسم مطلوب',
                        minLength: {value: 6, message: '6 حروف او ارقام على الاقل'}
                    }}  
                    iconName='user'
                    
                /> 
                <LoggingInput 
                    name= 'email' 
                    placeholder='الأيميل' 
                    control={control} 
                    rules={{required: 'الأيميل مطلوب',
                        pattern: {value: EMAIL_REGEX, message: 'الاميل غير صحيح'}
                    }}  
                    iconName='mail'
                    
                />    
                 <LoggingInput 
                    name= 'password' 
                    placeholder='كلمة المرور' 
                    control={control} 
                    rules={{required: 'كلمةالمرور مطلوبة',
                        minLength: {value: 6, message: '6 حروف او ارقام على الاقل'}
                    }}  
                    iconName='key'
                    secureTextEntry
                    
                />
                  
                <LoggingInput 
                    name= 'phone_number' 
                    placeholder='رقم الموبايل' 
                    control={control} 
                    keyboardType ='number-pad'
                    textContentType='telephoneNumber'
                    rules={{required: 'رقم الموبايل مطلوب',
                        minLength: {value: 6, message: "{رقم غيرصحيح: 01111111111"}
                    }}  
                    iconName='mobile1'
                    
                />     
                 <LoggingInput 
                    name= 'address' 
                    placeholder='عنوان التوصيل' 
                    control={control} 
                    textContentType='deliveryAddress'
                    rules={{required: 'عنوان التوصيل مطلوب'}}  
                    iconName='home'
                />
                <View style={{marginRight: 20, marginTop: 10, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>المنطقة</Text>
                </View>

            <View style={{flexDirection: 'row-reverse', justifyContent: 'space-evenly', marginTop: 15}}>
                <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: '600'}}>بيتشو</Text>
                    <RadioButton
                        color={Colors.primary}
                        value="بيتشو"
                        status={ checked === 'بيتشو' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('بيتشو')}
                    />
                </View>
                <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: '600'}}>تيجان</Text>
                    <RadioButton
                        color={Colors.primary}
                        value="تيجان"
                        status={ checked === 'تيجان' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('تيجان')}
                    />
                </View>
                <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: '600'}}>الياسمين</Text>
                    <RadioButton
                      color={Colors.primary}
                        value="الياسمين"
                        status={ checked === 'الياسمين' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('الياسمين')}
                    />
                </View>
            </View>
               
                
               
            </View>
           <TouchableOpacity style={styles.SubmitButton}
            onPress={handleSubmit(onSubmitHandler)} >

                <Text style={{color: "white", fontSize: 18,fontWeight: 'bold'}}>تسجيل</Text>
            </TouchableOpacity>
            {/* <View>
                <TouchableOpacity>
                    <LoggingButton logText={'سجل بالفيس بوك'} SocialIconName={'facebook-square'} SocialIconColor={'#4267B2'}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <LoggingButton logText={'سجل بالفيس تويتر'} SocialIconName={'twitter'} SocialIconColor={'#00acee'}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <LoggingButton logText={'سجل بالفيس جوجل'} SocialIconName={'google'} SocialIconColor={'#DB4437'}/>
                </TouchableOpacity>
            </View> */}
            <View style={styles.haveAcc}>
                <Text>لديك حساب؟</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('SignIn')}}>
                    <Text style={styles.logInText}>سجل الدخول</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 10,
        marginTop: 5
    },
    logo:{
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form:{
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 10
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
    haveAcc:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    logInText:{
        color: 'red',
        fontSize: 15
    }
});

export default SignUp;