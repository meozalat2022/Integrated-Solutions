import React, {useState, useEffect} from "react";
import { View, Text, Image, Modal, Pressable ,StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import Colors from "../constants/Colors";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from '../store/actions/cart';
import * as selectedProductActions  from '../store/actions/selectedProduct';

const ProductDetails = ({route})=>{
    const navigation = useNavigation()
    const product = useSelector(state=>state.selectedProduct.AvailableSelectedProduct);
    const authUser = useSelector(state=>state.user.currentUser)
    const dispatch = useDispatch();

    const itemId = route.params.itemId;
    const [newQuantity, setNewQuantity] = useState(1)
    const [modalVisible, setModalVisible] = useState(false);

    const catID = product.categories
    useEffect(()=>{
        setNewQuantity(1)
        dispatch(selectedProductActions.fetchSelectedProduct(itemId))
    },[itemId])

    if(!product){
        return<View  style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
    </View>
    }
    return(
        <View style={{flex: 1}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.modalText}>يجب تسجيل الدخول!</Text>
                    <Pressable 
                        onPress={()=>{setModalVisible(!modalVisible)}}
                        style={{position:"absolute", top: 10, right: 20}}>
                        <Text style={{fontSize: 18}}>X</Text>
                    </Pressable>
                    <View style={{flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-evenly'}}>
                        <Pressable
                            style={[styles.button, styles.buttonCloseSignIn]}
                            onPress={() => {navigation.navigate("SignIn"), setModalVisible(!modalVisible)}}
                        >
                            <Text style={styles.textStyle}>تسجيل الدخول</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonCloseSignUP ]}
                            onPress={() => {navigation.navigate("SignUp"), setModalVisible(!modalVisible)}}
                        >
                            <Text style={styles.textStyle}>حسـاب جـديـد</Text>
                        </Pressable>
                    </View>
                    </View>
                </View>
            </Modal>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                    <Image style={{width: '90%', aspectRatio: 3/2, marginHorizontal: 15, marginTop: 10}} source={{uri: product.image}}/>
                </View>
                <View style={{backgroundColor: 'white', paddingHorizontal: 10}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{product.title}</Text>
                    <Text style={{color: Colors.accent, fontSize: 20, fontWeight: '500', marginVertical: 10}}>{product.price} ج.م </Text>
                </View>
                <View style={{backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 35, marginTop: 15}}>
                    <Text numberOfLines={2} style={{fontSize: 20, fontWeight: 'bold'}}>{product.description}</Text>
                </View>
                {   catID === undefined ? <View/>
                    :
                    <Card catId={catID[0]}/>
                }
            </ScrollView>
            <View style={styles.addToCartView}>
                <TouchableOpacity onPress={()=>{!authUser ? setModalVisible(!modalVisible)  :dispatch(cartActions.addToCart(product, newQuantity))}} style={styles.addToCart}>
                    <Text style={styles.addToCartText}>أضف للسلة</Text>
                </TouchableOpacity>
                <View style={styles.quantityView}>
                    <TouchableOpacity onPress={()=>{setNewQuantity(newQuantity + 1)}}><Text style={styles.plusMinu}>+</Text></TouchableOpacity>
                    <Text style={styles.plusMinu}>{newQuantity}</Text>
                    <TouchableOpacity onPress={()=>{setNewQuantity(Math.max(1, newQuantity - 1))}}><Text style={styles.plusMinu}>-</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    addToCartView: {
        backgroundColor: 'white', 
        flexDirection: 'row-reverse', 
        justifyContent: 'space-evenly', 
        paddingVertical:5
    },
    addToCart: {
        backgroundColor: Colors.primary, 
        borderRadius: 15, 
        paddingVertical: 15, 
        width: '45%', 
        borderColor: 'grey', 
        borderWidth: 1
    },
    addToCartText: {
        color: 'white', 
        textAlign: 'center', 
        fontSize: 18, 
        fontWeight: 'bold'
    },
    quantityView: {
        borderWidth: 1, 
        borderColor: 'grey', 
        borderRadius: 15, 
        padding: 15, 
        width: '45%', 
        flexDirection: 'row-reverse', 
        justifyContent: 'space-around', 
        alignItems: 'center'
    },
    plusMinu:{
        fontSize: 20, 
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

export default ProductDetails;