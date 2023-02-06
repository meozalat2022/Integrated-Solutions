import React, {useEffect ,useState} from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../config";

const CategoryItem = (props)=>{
    const navigation = useNavigation();

    const CatId = props.catID


    const [data, setData] = useState([]);

    useEffect(()=>{
        try {
            const fetchProducts = async()=>{
                const categoryProductsCollection = query(collection(db, "Product"), where("categories", "array-contains", CatId))
                const getCategoryProductsCollection = getDocs(categoryProductsCollection)
                const productData = (await getCategoryProductsCollection).docs.map(item=>{
                    const data = item.data()
                    data.id = item.id
                    return data
                })
                setData(productData)
            }
            fetchProducts()
            
        } catch (error) {
            console.log("Error", error)
        }
    },[CatId])
    return(
        <View>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                horizontal 
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({item})=>{
                    return(
                        <TouchableOpacity onPress={()=>{navigation.navigate("ProductDetails", {itemId: item.id, productTitle: item.title, catId: item.categoryId})}} style={styles.container}>
                            <Image style={styles.itemImage} source={{uri: item.image}}/>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 10,
        paddingVertical: 10
    },
    itemImage: {
        width: 100,
        height: 100,
        padding: 10,
        marginBottom: 5,
        resizeMode: "contain",
        borderColor: '#ededed',
        borderWidth: 1,
        borderRadius: 15
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: 'bold'
    }

});

export default CategoryItem;