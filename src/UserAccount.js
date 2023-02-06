import React, {useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";



const UserAccount = ()=>{

const navigation = useNavigation();
const authUser = useSelector(state=>state.user.currentUser)
const userID = useSelector(state=>state.user.authuserId)

    return(
     
     <View>
         <View>
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>{authUser?.name}</Text>
                    <Text style={styles.itemText}>اسم المستخدم:</Text>
                </View>
                </View>
                <View style={styles.itemView}>
                    {!authUser 
                        ?
                            <Text style={styles.itemText}>{""}</Text>
                        :
                            <Text style={styles.itemText}>{authUser?.address}</Text>
                    }
                    <Text style={styles.itemText}>العنوان:</Text>
                </View>
                <View style={styles.itemView}>
                {!authUser 
                        ?
                            <Text style={styles.itemText}>{""}</Text>
                        :
                        <Text style={styles.itemText}>{authUser?.area}</Text>
                    }
                    <Text style={styles.itemText}>المنطقة:</Text>
                </View>
                <View style={styles.itemView}>
                {!authUser 
                        ?
                            <Text style={styles.itemText}>{""}</Text>
                        :
                        <Text style={styles.itemText}>{authUser?.phone}</Text>
                    }
                    <Text style={styles.itemText}>الموبايل:</Text>
                </View>
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>{authUser?.email}</Text>
                    <Text style={styles.itemText}>الأميل:</Text>
                </View>
                {!authUser ?
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("SignIn")}
                        style={styles.orderListView}>
                        <Text style={styles.orderListText}>تسجيل الدخول</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("OrdersScreen",{userId: userID})}
                        style={styles.orderListView}>
                        <Text style={styles.orderListText}>قائمة الطلبات</Text>
                    </TouchableOpacity>   
                }

        </View>
    
       
   
    )
};

const styles = StyleSheet.create({
    itemView: {
        flexDirection: 'row', 
        marginHorizontal: 5, 
        justifyContent: 'flex-end', 
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
    orderListView: {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 15, 
        backgroundColor: Colors.accent, 
        paddingVertical: 15, 
        borderRadius: 15 
    },
    orderListText: {
        color: 'white', 
        fontSize: 20, 
        fontWeight: 'bold'
    }
});

export default UserAccount;