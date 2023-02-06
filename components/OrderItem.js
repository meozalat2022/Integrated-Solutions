import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import CartItem from './CartItem';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import moment from "moment";


const OrderItem = (props)=>{

const navigation = useNavigation();
    return(
        <View style={{flexDirection: 'row-reverse', backgroundColor: 'white', justifyContent: 'space-evenly', alignItems:'center', margin: 7, paddingVertical: 10, paddingHorizontal: 5}}>
            <View>
                {/* <Text style={{ fontWeight: 'bold', fontSize: 15}}>{props.date}</Text> */}
            </View>
            <View style={{flexDirection: 'row-reverse', marginHorizontal: 20}}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft: 15}}> {moment(props.date.toDate()).format('ll')}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft: 15, color: Colors.accent}}>الإجمالي {props.amount.toFixed(2)} ج.م</Text>
            </View>
            <TouchableOpacity 
              onPress={()=>navigation.navigate("OrderDetails", {orderId: props.orderId, orderTotal: props.amount})}
              style={{backgroundColor: Colors.primary, paddingHorizontal: 10,paddingVertical: 5, borderRadius: 5}}>
              <Text style={{color: 'white', fontWeight: 'bold', textDecorationLine: 'underline', fontSize: 15}}>التفاصيل</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
   
});

export default OrderItem;