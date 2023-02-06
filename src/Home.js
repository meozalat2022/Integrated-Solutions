import React, {useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Card from '../components/Card';
import ImageCarasoul from '../components/ImageCarasoul';
import CategoriesList from '../components/CategoriesList';
import Brands from '../components/Brands';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as categoriesActions from '../store/actions/Categories';
import * as promotionActions from '../store/actions/promotions';
import * as userAction from '../store/actions/authUser';
// import { db } from '../config';
// import { collection, getDocs, query, where } from 'firebase/firestore'

const Home = ()=>{

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const userId = useSelector(state=>state.user.authuserId)
    useEffect(()=>{
        // dispatch(productActions.fetchproducts());
        dispatch(categoriesActions.fetchCategories());
        dispatch(promotionActions.fetchPromotionProducts());
        dispatch(userAction.userLoggedInSession());
    },[])
    useEffect(()=>{
        dispatch(userAction.fetchAuthUser(userId))
    },[userId])


// const authUser = useSelector(state=>state.user.signedInUser) 
// console.log("0000000000000000000",authUser)
   
    const categoryObject = useSelector(state=>state.categories.availableCategory)
    const promotionArr = useSelector(state=>state.promoionProducts.promotionProducts)
   
const categoryTitle = [];
const categoryId = []

for(const key in categoryObject){
    categoryTitle.push(categoryObject[key].title)
    categoryId.push(categoryObject[key].id)
}

if(!categoryObject || !promotionArr){
    return<View  style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size={'large'} />
</View>
}
    return(
        <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{flex: 1, margin: 10}}>
        <ImageCarasoul pro={promotionArr}/>
           <View style={styles.catName}>
                <Text style={styles.catText}>{categoryTitle[0]}</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate("ProductsList", {catId: categoryId[0], title:  categoryTitle[0]})}}>
                    <Text style={styles.showAllText}>عرض الكل</Text>
          
                </TouchableOpacity>
            </View>
            
           <Card catId={categoryId[0]}/> 
           <CategoriesList />
           <View style={styles.catName}>
                <Text style={styles.catText}>{categoryTitle[1]}</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate("ProductsList", {catId: categoryId[1], title:  categoryTitle[1] })}}>
                    <Text style={styles.showAllText}>عرض الكل</Text>
                </TouchableOpacity>
            </View>
            <Card catId={categoryId[1]}/> 
           <View style={styles.catName}>
                <Text style={styles.catText}>{categoryTitle[2]}</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate("ProductsList", {catId: categoryId[2], title:  categoryTitle[2]})}}>
                    <Text style={styles.showAllText}>عرض الكل</Text>
                </TouchableOpacity>
            </View>
            <Card catId={categoryId[2]}/> 
            <Brands />
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    catName:{
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 5,
    },
    catText:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    showAllText:{
        fontSize: 15
    }
});

export default Home;