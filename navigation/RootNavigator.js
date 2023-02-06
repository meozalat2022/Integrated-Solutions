import React, {useState, useEffect} from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../src/Home";
import ProductCategory from "../src/ProductCategory";
import Offers from "../src/Offers";
import Search from "../src/Search";
import OrderDetails from '../src/OrderDetails';
import ProductsByBrand from '../src/ProductsByBrand';
import ShoppingCart from "../src/ShoppingCart";
import EditeProfile from '../src/EditeProfile';
import ProductDetails from '../src/ProductDetails';
import ProductsList from "../src/ProductsList";
import OrdersScreen from '../src/OrdersScreen';
import ForgotPassword from '../src/ForgotPassword';
import SignIn from "../src/SignIn";
import SignUp from '../src/SignUp';
import UserAccount from "../src/UserAccount";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons'
import Colors from '../constants/Colors';
import { useSelector, useDispatch } from "react-redux";
import * as userAction from '../store/actions/authUser';

const Tab = createBottomTabNavigator();

const BottomTab = ()=>{

    const dispatch = useDispatch()
    const authUser = useSelector(state=>state.user.currentUser)

    return(
        <Tab.Navigator screenOptions={({route})=>({
            tabBarIcon: ({focused, color, size })=>{
                let iconName;
                
                if(route.name === 'Home'){
                    iconName = focused ? 'home': 'home-outline' 
                }  
                if(route.name === 'ProductCategory'){
                    iconName = focused ? 'grid' : 'grid-outline'
                }
                if(route.name === 'Offers'){
                    iconName = focused ? 'pricetags' : 'pricetags-outline'
                }
                if(route.name === 'UserAccount'){
                    iconName = focused ? 'person' : 'person-outline'
                }
                if(route.name === 'Search'){
                    iconName = focused ? 'search' : 'search-outline'
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: '#888',
        })}>
            <Tab.Screen name="Home" component={Home}
                options={({navigation})=>({
                    headerRight: ()=>(
                        <View style={{margin: 15}}>
                            <TouchableOpacity onPress={()=>{navigation.navigate("ShoppingCart")}} >
                                <Feather name="shopping-cart" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerLeft: ()=>(
                    <View>
                        {
                            !authUser 
                                ? 
                                    (
                                        <TouchableOpacity 
                                            style={{alignItems: 'center', justifyContent: 'center', marginHorizontal: 10}} 
                                            onPress={()=>{navigation.navigate('SignIn')}}
                                        >
                                            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>تسجيل الدخول</Text>
                                        </TouchableOpacity>
                                    )  
                                : 
                                    (
                                        <View style={{alignItems: 'center', justifyContent: 'center', marginHorizontal: 10}}>
                                            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>مرحباً</Text>
                                            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>{authUser.name}</Text>
                                        </View>
                                    )
                        }
                    </View>
                ),

                    title: 'المكتبة',
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerTitleStyle: {
                    fontSize: 25,
                    fontWeight: 'bold'  
                },
                
                headerStyle:{
                    backgroundColor: Colors.primary,
                    
                }
                })}/>
                
             <Tab.Screen name="ProductCategory" component={ProductCategory} options={{
                headerRight: ()=>(
                    <View style={{margin: 15}}>
                        <TouchableOpacity>
                            <Feather name="shopping-cart" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                ),
                title: 'الأصناف',
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontSize: 25,
                  fontWeight: 'bold'  
                },
                
                headerStyle:{
                    backgroundColor: Colors.primary,
                    
                }
            }}/>
            <Tab.Screen name="Offers" component={Offers} 
            
            options={({navigation})=>({
                
                    headerRight: ()=>(
                        <View style={{margin: 15}}>
                            <TouchableOpacity onPress={()=>navigation.navigate("ShoppingCart")}>
                                <Feather name="shopping-cart" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    ),
                    title: 'العروض',
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerTitleStyle: {
                      fontSize: 25,
                      fontWeight: 'bold'  
                    },
                    
                    headerStyle:{
                        backgroundColor: Colors.primary,
                        
                    }
            })}
            />
            <Tab.Screen name="UserAccount" component={UserAccount} 
                options={({navigation})=>({
                    headerRight: ()=>(
                        <View style={{margin: 15}}>
                            <TouchableOpacity onPress={()=>{navigation.navigate("EditeProfile")}}>
                                <Feather name="edit" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerLeft: ()=>(
                        <View style={{margin: 15}}>
                            <TouchableOpacity onPress={()=>{dispatch(userAction.authUserSignOut()), navigation.navigate("Home")}}>
                                <FontAwesome name="sign-out" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    ),
                    title: 'بيانات العميل',
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerTitleStyle: {
                      fontSize: 25,
                      fontWeight: 'bold'  
                    },
                    
                    headerStyle:{
                        backgroundColor: '#FF312E',
                        
                    }
                })}
            
            />
            {/* <Tab.Screen name="Search" component={Search} 
            
            options={{
                headerRight: ()=>(
                    <View style={{margin: 15}}>
                        <TouchableOpacity>
                            <Feather name="shopping-cart" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                ),
                title: 'بحث',
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontSize: 25,
                  fontWeight: 'bold'  
                },
                
                headerStyle:{
                    backgroundColor: Colors.primary,
                    
                }
            }}
            /> */}


        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator();
const RootNavigator = ()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="BottomTab" component={BottomTab} options={{headerShown: false}}/> 
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}}/> 
                <Stack.Screen name="ProductDetails" component={ProductDetails}
                options={({route, navigation})=>({
                    title: route.params.productTitle,
                    headerRight: ()=>(
                        <View style={{margin: 15}}>
                            <TouchableOpacity onPress={()=>{navigation.navigate("ShoppingCart")}}>
                                <Feather name="shopping-cart" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerTitleStyle: {
                    fontSize: 25,
                    fontWeight: 'bold'  
                    },
                    
                    headerStyle:{
                        backgroundColor: '#FF312E',
                        
                    }
                })}
                /> 
              <Stack.Screen name="SignUp" component={SignUp} options={{
                    title: 'انشاء حساب جديد',
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerTitleStyle: {
                      fontSize: 25,
                      fontWeight: 'bold'  
                    },
                    
                    headerStyle:{
                        backgroundColor: '#FF312E',
                        
                    }
                }}/>
                <Stack.Screen name="SignIn" component={SignIn} options={{
                    title: 'تسجيل الدخول',
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerTitleStyle: {
                      fontSize: 25,
                      fontWeight: 'bold'  
                    },
                    
                    headerStyle:{
                        backgroundColor: '#FF312E',
                        
                    }
                }}/>
               <Stack.Screen name="EditeProfile" component={EditeProfile}  options={({ navigation})=>({
                        title: "بياناتك",
                        headerRight: ()=>(
                            <View style={{margin: 15}}>
                                <TouchableOpacity onPress={()=>{navigation.navigate("Home")}}>
                                    <Ionicons name="home" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        ),
                        headerTitleAlign: 'center',
                        headerTintColor: 'white',
                        headerTitleStyle: {
                          fontSize: 25,
                          fontWeight: 'bold'  
                        },
                        
                        headerStyle:{
                            backgroundColor: '#FF312E',
                            
                        }
                    })}/>

              <Stack.Screen name="ProductsList" component={ProductsList} options={({route, navigation})=>({
                headerRight: ()=>(
                    <View style={{margin: 15}}>
                        <TouchableOpacity onPress={()=>navigation.navigate("ShoppingCart")}>
                            <Feather name="shopping-cart" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                ),
                 headerTitleAlign: 'center',
                 headerTintColor: 'white',
                 headerTitleStyle: {
                   fontSize: 25,
                   fontWeight: 'bold'  
                 },
                 
                 headerStyle:{
                     backgroundColor: '#FF312E',
                     
                 },
                 title: route?.params?.title

              })}/>
              <Stack.Screen name="ProductsByBrand" component={ProductsByBrand}  options={({route, navigation})=>({
                headerRight: ()=>(
                    <View style={{margin: 15}}>
                        <TouchableOpacity onPress={()=>navigation.navigate("ShoppingCart")}>
                            <Feather name="shopping-cart" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                ),
                headerTitleAlign: 'center',
                 headerTintColor: 'white',
                 headerTitleStyle: {
                   fontSize: 25,
                   fontWeight: 'bold'  
                 },
                 
                 headerStyle:{
                     backgroundColor: '#FF312E',
                     
                 },
                 title: route?.params?.title
              })}/>
              <Stack.Screen name="ShoppingCart" component={ShoppingCart}  options={{
                 headerTitleAlign: 'center',
                 headerTintColor: 'white',
                 headerTitleStyle: {
                   fontSize: 25,
                   fontWeight: 'bold'  
                 },
                 
                 headerStyle:{
                     backgroundColor: '#FF312E',
                     
                 },
                 title: "سلة التسوق"
              }}/>
              <Stack.Screen name="OrdersScreen" component={OrdersScreen}  options={{
                 headerTitleAlign: 'center',
                 headerTintColor: 'white',
                 headerTitleStyle: {
                   fontSize: 25,
                   fontWeight: 'bold'  
                 },
                 
                 headerStyle:{
                     backgroundColor: '#FF312E',
                     
                 },
                 title: "قائمة الطلبات"
              }}/>
              <Stack.Screen name="OrderDetails" component={OrderDetails}  options={{
                 headerTitleAlign: 'center',
                 headerTintColor: 'white',
                 headerTitleStyle: {
                   fontSize: 25,
                   fontWeight: 'bold'  
                 },
                 
                 headerStyle:{
                     backgroundColor: '#FF312E',
                     
                 },
                 title: "تفاصيل الطلب"
              }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;