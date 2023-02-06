import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, Button, Image, Modal } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import Colors from '../constants/Colors';
import CartItem from "../components/CartItem";
import * as cartActions from '../store/actions/cart';
import * as ordersActions from '../store/actions/orders';
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, doc, getDocs, query, serverTimestamp  } from "firebase/firestore";
import { db } from '../config';


const ShoppingCart = ()=>{
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const userID = useSelector(state=>state.user.authuserId)
    const cartItemTotalAmount = useSelector(state=>state.cart.totalAmount)
    const cartItems = useSelector(state=>{
        const transformedCartItems = [];
        for(const key in state.cart.items){
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum

            })
        }
        return transformedCartItems.sort((a, b)=> a.productId > b.productId ? 1 : -1);
    })
const dispatch = useDispatch();


const createOrder = async()=>{
    try {
        
    // add a new order { total and userId }
     // fetch new order id
    let orderID;
    const ordrRef = collection(db,"Order")
        await addDoc(ordrRef,{
            total: cartItemTotalAmount,
            userId: userID,
            timestamp: serverTimestamp()
        }).then((doc)=>{
            orderID = doc.id
        })
    
    // get a reference to the added order with order id
// const newOrderRef = doc(db,"Order", orderID);
for(const key in cartItems){
    await addDoc(collection(ordrRef, orderID ,"products"), {
        productTitle: cartItems[key].productTitle,
        productPrice: cartItems[key].productPrice,
        quantity: cartItems[key].quantity
    })
    dispatch(cartActions.clearCart());

}

} catch (error) {
 console.log("Error", error)       
}}

 if(!cartItems){
        return<View  style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
    </View>
    }
    return(
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>جاري تجهيز الطلب</Text>
                    <View style={{flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-evenly'}}>
                        <Image style={{width: 75, height:75}} source={require('../assets/check.png')}/>
                    </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.totalAmount}>
                <Text style={styles.totalText}>الإجمالي:{'  '}<Text style={styles.subtotal}>
                    {cartItemTotalAmount.toFixed(2)} ج.م </Text></Text>
                <Button 
                    onPress={()=>{setModalVisible(!modalVisible), createOrder(), setTimeout(()=>{navigation.navigate("Home")},4000)}}
                    disabled={cartItems.length === 0} 
                    color={Colors.accent} title="اطلب"/>
            </View>
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={cartItems} keyExtractor={(item)=>item.productId} renderItem={({item})=>{
                return(
                    <CartItem 
                        quantity={item.quantity} 
                        title={item.productTitle} 
                        amount={item.sum} 
                        deletable
                        onRemove={()=>{dispatch(cartActions.removeFromCart(item.productId))}}/>
                )
            }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        margin: 20
    },
    totalAmount:{
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    totalText:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    subtotal:{
        color: Colors.primary,
        fontWeight: 'bold'
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

export default ShoppingCart;