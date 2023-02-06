import React, {useState, useEffect} from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../config';

const EditeProfile = ()=>{
    const dispatch = useDispatch()
    const authUser = useSelector(state=>state.user.currentUser)
    const authUserId = useSelector(state=>state.user.authuserId)
    console.log("user id",authUserId)

    const [name, setName] = useState(authUser?.name);
    const [address, setAddress] = useState(authUser?.address);
    const [phone , setPhone] = useState(authUser?.phone);
    const [checked, setChecked] = useState(authUser?.area);

const navigation = useNavigation();

const editProfileUser = async(name, address,phone, checked)=>{
    try {
        const userRef = doc(db, "User", authUserId);
    
        await updateDoc(userRef, {
            name: name,
            address: address,
            phone: phone,
            area: checked
        });
        
    } catch (error) {
        console.log("Error", error)
    }
}
    return(
        <ScrollView>
            <View>
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>الأسم: </Text>
                <TextInput
                        style={styles.itemText} 
                        name= 'name' 
                        placeholder='الأسم'  
                        value={name}
                        onChangeText={(newText)=>setName(newText)}
                    /> 
                </View>
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>رقم الموبايل: </Text>       
                    <TextInput 
                        style={styles.itemText}
                        name= 'phone_number' 
                        placeholder='رقم الموبايل' 
                        value={phone}
                        onChangeText={(newText)=>setPhone(newText)}
                    />     
                </View>
        
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>عنوان التوصيل: </Text>       
                    <TextInput 
                        style={styles.itemText}
                        name= 'address' 
                        placeholder='عنوان التوصيل' 
                        value={address}
                        onChangeText={(newText)=>setAddress(newText)}
                    />
                </View>
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
                { !authUser ? 
                        <TouchableOpacity 
                            onPress={()=>{navigation.navigate("SignIn")}}
                            style={styles.createEditeAcc}>
                            <Text style={styles.createEditeAccText}>تسجيل الدخول</Text>
                        </TouchableOpacity>
                :
                        <TouchableOpacity 
                            onPress={()=>{editProfileUser(name, address,phone, checked), navigation.navigate("UserAccount")}}
                            style={styles.createEditeAcc}>
                            <Text style={styles.createEditeAccText}>تعديل البيانات</Text>
                        </TouchableOpacity>       
                }
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    itemView: {
        flexDirection: 'row-reverse', 
        marginHorizontal: 5, 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: 'grey'
    },
    itemText: {
        marginRight: 15,
        fontSize: 20,
        fontWeight: '500',
        // color: 'red'
    },
    createEditeAcc : {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 15, 
        backgroundColor: Colors.accent, 
        paddingVertical: 15, 
        borderRadius: 15 
    },
    createEditeAccText: {color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold'
}

});

export default EditeProfile;