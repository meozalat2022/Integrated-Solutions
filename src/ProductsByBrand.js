import React, {useState,useEffect} from "react";
import { View, Text, StyleSheet, FlatList, Image, Pressable, Modal ,TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from "../constants/Colors";
import { db } from "../config";
import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import { useNavigation } from "@react-navigation/native";
import {useDispatch, useSelector } from "react-redux";
import * as cartActions from '../store/actions/cart';


const ProductByBrand = ({route})=>{
const brandID = route?.params?.brandID;
const [products, setProducts] = useState("")
const navigation = useNavigation()
const [modalVisible, setModalVisible] = useState(false);
const authUser = useSelector(state=>state.user.currentUser)
const dispatch = useDispatch();
useEffect(()=>{
    const fetchBrandProduct = async ()=>{
        try {
            const productBrandRef = query(collection(db, "Product"), where("brand", "==", brandID))
            const getProductBrand = getDocs(productBrandRef)
            const productBrand = (await getProductBrand).docs.map((item)=>{
                const data = item.data()
                data.id = item.id
                return data
            })
            setProducts(productBrand)
        } catch (error) {
            console.log("Error", error)
        }
    }
    fetchBrandProduct()
},[brandID])

if(!products){
    return<View  style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size={'large'} />
</View>
}
    return(
        <View  style={{ alignItems: 'center'}}>
            <FlatList 
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={products} 
                renderItem={({item})=>{
                return(
                    <View>
                         <View style={styles.cardView}>
                            <TouchableOpacity onPress={()=>{navigation.navigate("ProductDetails", {itemId: item.id, catId: item.categoryId, productTitle: item.title})}} style={styles.imageView}>
                                <Image style={styles.image} source={{uri: item.image}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{navigation.navigate("ProductDetails", {itemId: item.id, catId: item.categoryId, productTitle: item.title})}} style={styles.priceView}>
                                <View>
                                    <Text style={styles.price}> ج.م {item.price}</Text>
                                </View>
                                <View style={styles.priceView}>
                                    <Text style={styles.description}>{item.description}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                    onPress={()=>{!authUser ? setModalVisible(!modalVisible)  :dispatch(cartActions.addToCart(item, 1))}}
                                    style={styles.addToCartView}>
                                <Text style={styles.renderAddToCart}>اضف للسلة</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }}
        />
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
        </View>
    );
};

const styles = StyleSheet.create({
    imageView :{
        // backgroundColor: 'yellow', 
        width: '100%', 
        height: '50%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginHorizontal: 5,
        // marginTop: 5, 
        marginBottom: 2,
        // borderWidth: 2, 
        // borderColor: 'red',
        overflow: 'hidden',
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cardView:{
        width: 170,
        aspectRatio: 3/5,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 2,
        // borderColor: 'black',
        marginHorizontal:10,
    },
    priceView: {
        width: '100%', 
        // height: '50%', 
        alignItems: 'center',
        backgroundColor: 'white'
    },
    price:{
        color: Colors.accent,
        fontSize: 15,
        fontWeight: 'bold',
        // marginBottom: 5
    },
    description:{
        textAlign: 'center',
        fontSize: 10
    },
    addToCartView: {
        backgroundColor: Colors.accent, 
        width: '100%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
        
    },
    renderAddToCart:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        marginBottom: 5
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

export default ProductByBrand;