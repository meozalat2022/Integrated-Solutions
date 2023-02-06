import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useSelector } from "react-redux";
import CategoryItem from "../components/CategoryItem";

const ProductCategory = ()=>{
const CATEGORY = useSelector(state=>state.categories.availableCategory);
    

if(!CATEGORY){
    return<View  style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size={'large'} />
</View>
}
return(
        <ScrollView>
            <View style={styles.viewHolder}>
                <View style={[styles.header, {backgroundColor: '#B5F5D7'}]}>
                    <Text>{CATEGORY[0].title}</Text>
                    <Image style={styles.image} source={{uri: CATEGORY[0].image}}/>
                </View>
                <CategoryItem catID={CATEGORY[0].id}/>
            </View>
            <View style={styles.viewHolder}>
                <View style={[styles.header, {backgroundColor: '#F9E5F0'}]}>
                    <Text>{CATEGORY[1].title}</Text>
                    <Image style={styles.image} source={{uri: CATEGORY[1].image}}/>
                </View>
                <CategoryItem catID={CATEGORY[1].id}/>
            </View>
            <View style={styles.viewHolder}>
                <View style={[styles.header, {backgroundColor: '#F5E2F4'}]}>
                    <Text>{CATEGORY[2].title}</Text>
                    <Image style={styles.image} source={{uri: CATEGORY[2].image}}/>
                </View>
                <CategoryItem catID={CATEGORY[2].id}/>
            </View>
            <View style={styles.viewHolder}>
                <View style={[styles.header, {backgroundColor: '#F0E2F5'}]}>
                    <Text>{CATEGORY[3].title}</Text>
                    <Image style={styles.image} source={{uri: CATEGORY[3].image}}/>
                </View>
                <CategoryItem catID={CATEGORY[3].id}/>
            </View>
            <View style={styles.viewHolder}>
                <View style={[styles.header, {backgroundColor: '#E2E9F5'}]}>
                    <Text>{CATEGORY[4].title}</Text>
                    <Image style={styles.image} source={{uri: CATEGORY[4].image}}/>
                </View>
                <CategoryItem catID={CATEGORY[4].id}/>
            </View>
            <View style={styles.viewHolder}>
                <View style={[styles.header, {backgroundColor: '#E2F5F4'}]}>
                    <Text>{CATEGORY[5].title}</Text>
                    <Image style={styles.image} source={{uri: CATEGORY[5].image}}/>
                </View>
                <CategoryItem catID={CATEGORY[5].id}/>
            </View>
            <View style={styles.viewHolder}>
                <View style={[styles.header, {backgroundColor: '#F5E6E2'}]}>
                    <Text>{CATEGORY[6].title}</Text>
                    <Image style={styles.image} source={{uri: CATEGORY[6].image}}/>
                </View>
                <CategoryItem catID={CATEGORY[6].id}/>
            </View>
        </ScrollView>
    );
};



const styles = StyleSheet.create({
    header: {
        flexDirection: 'row-reverse', 
        justifyContent: 'space-between', 
        margin: 10,
        marginHorizontal: 15,  
        paddingVertical:10, 
        borderRadius: 10, 
        alignItems: 'center',
        paddingHorizontal: 20 
    },
    image :{
        width: 30, 
        height: 30
    },
    viewHolder: {
        backgroundColor: 'white', 
        marginVertical: 10
    }
});

export default ProductCategory;