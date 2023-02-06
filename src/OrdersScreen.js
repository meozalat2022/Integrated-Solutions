import React, {useState, useEffect} from "react";
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from "react-redux";
import OrderItem from '../components/OrderItem';
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from '../config';

const OrderScreen = ()=>{

const userID = useSelector(state=>state.user.authuserId)
const [order, setOrder]= useState()
useEffect(()=>{
    const fetchOrderItems = async()=>{
        try {
            const orderCollection = query(collection(db, "Order"), where("userId", '==', userID), orderBy("timestamp"))
            const getOrderCollection = getDocs(orderCollection)
            const order = (await getOrderCollection).docs.map(item=>{
                const data = item.data()
                data.id = item.id
                return data
            })
            setOrder(order)
        } catch (error) {
            console.log("Error", error)
        }
    }
fetchOrderItems();
},[])

if(!userID){
    return<View  style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size={'large'} />
</View>
}
//date totalAmount pass orderId
    return(
        <View>
            <FlatList 
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                data={order} renderItem={({item})=>{
                return(
                    <OrderItem amount={item.total}  orderId={item.id} date={item.timestamp}/>
                )
            }}/>

        </View>
    )
};

const styles = StyleSheet.create({});

export default OrderScreen;