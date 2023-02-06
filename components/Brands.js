import React, {useEffect} from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import * as brandsActions from '../store/actions/Brands';


const Brands = ()=>{

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(brandsActions.fetchBrands());
    },[])

    const BRAND = useSelector(state=>state.brands.availableBrands)

    const navigation = useNavigation();
    return(
        <View>
            <View style={styles.brands}>
                <Text style={styles.brandsText}>العلامات التجارية</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <FlatList 
                    // horizontal
                    showsHorizontalScrollIndicator={false}
                    data={BRAND} 
                    numColumns={5}
                    renderItem={({item})=>{
                        return(
                                <TouchableOpacity onPress={()=>{navigation.navigate("ProductsByBrand", {brandID: item.id, title: item.title})}} style={styles.categoryRenderItem}>
                                    <View style={styles.imageView}>
                                        <Image style={styles.image} source={{uri:item.image}}/>
                                    </View>
                                </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    imageView:{ 
        width: '100%', 
        height: '80%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        // marginHorizontal: 5,
        // marginTop: 15, 
        // borderWidth: 2, 
        // borderColor: 'red',
        overflow: 'hidden',
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20
    },
    categoryRenderItem: { 
        width: 140,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 2,
        // borderColor: 'black',
        margin:5,
        // borderRadius: 25
    },
    image:{
        
        width: '70%',
        height: '80%',
        resizeMode: 'cover',
    },

    categoryTextView: {
        // backgroundColor: 'white', 
        alignItems: 'center', 
        justifyContent: 'center', 
        // marginTop: 5, 
        marginHorizontal: 5, 
        // borderWidth: 2, 
        // borderColor: 'yellow', 
        width: '100%',
        height: '20%',
        // resizeMode: 'cover',
        textAlign: 'center',
        
    },
    categoryText: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    brands:{
        marginHorizontal: 5
    },
    brandsText:{
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default Brands;