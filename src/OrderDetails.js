import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import { addDoc, collection, getDocs, query, doc } from "firebase/firestore";
import { db } from '../config';

// fetch total price from collection

const OrderDetails = ({route})=>{
    const [order, setOrder] = useState()
    useEffect(()=>{
        const fetchOrder = async()=>{
            const orderRef = doc(db, "Order", route.params.orderId)
            const orderCollectionRef =  collection(orderRef, "products")
            const q = await query(orderCollectionRef)
            const getOrder =await getDocs(q)
            let orders = []
            getOrder.forEach(doc=>{
                //this is the right way to push the orders to an array
                orders.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
            setOrder(orders)
        } 
        fetchOrder()
    },[])

    
    return(
            <View style={{marginTop: 15, backgroundColor: 'white', marginHorizontal: 15, borderRadius: 10, paddingHorizontal: 5}}>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={order} renderItem={({item})=>{
                    return(
                        <View style={{flexDirection: 'row-reverse', justifyContent: 'space-evenly', margin: 10}}>
                            <View style={{justifyContent: 'center', alignItems:'center'}}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15}}>{item.quantity}</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15}}>{item.productTitle}</Text>
                            </View>
                            <View style={{justifyContent: 'center', alignItems:'center'}}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15}}>{item.productPrice.toFixed(2)} ج.م</Text>
                            </View>
                        </View>
                    )
                }}/>
                <View style={{marginTop: 10, backgroundColor: Colors.accent, paddingVertical: 10, borderRadius: 10, marginHorizontal: 34, marginBottom: 10,alignItems: 'center', justifyContent: 'space-around'}}>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}> اجمالي قيمة الطلب {route.params.orderTotal.toFixed(2)} ج.م </Text>
                </View>
            </View>
    );
};

const styles = StyleSheet.create({});

export default OrderDetails;