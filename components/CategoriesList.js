import React from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const CategoriesList = ()=>{
    const CATEGORY = useSelector(state=>state.categories.availableCategory)

    const navigation = useNavigation();
    return(
        <View>
            <View style={styles.categories}>
                <Text style={styles.categoriesText}>كل الأصناف</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <FlatList 
                    // horizontal
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    data={CATEGORY} 
                    numColumns={5}
                    renderItem={({item})=>{
                        return(
                                <TouchableOpacity onPress={()=>navigation.navigate("ProductsList", {catId: item.id, title: item.title})}>
                                    <LinearGradient colors={['#57C84D', '#83D475', '#ABE098', '#C5E8B7', '#ffffff']} style={styles.linearGradient}>
                                        <View style={styles.categoryRenderItem}>
                                            <View style={styles.imageView}>
                                                <Image style={styles.image} source={{uri:item.image}}/>
                                            </View>
                                            <View style={styles.categoryTextView}>
                                                <Text style={styles.categoryText}>{item.title}</Text>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                        )
                    }}
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
    linearGradient:{
        margin: 10 , 
        borderRadius: 20,
        // width: 200,
        // aspectRatio: 5/4
         
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
    categories:{
        marginHorizontal: 5
    },
    categoriesText:{
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default CategoriesList;