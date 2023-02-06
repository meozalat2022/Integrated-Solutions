import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';


const CartItem = (props)=>{
    return(
        <View style={{flex: 1, flexDirection: 'row-reverse', backgroundColor: 'white', justifyContent: 'space-evenly', alignItems:'center', marginVertical: 5, paddingVertical: 10, paddingHorizontal: 5}}>
          <View style={{ marginLeft: 5}}>
            <Text>{props.quantity}</Text>
          </View>
          <View style={{ flex: 1}}>
            <Text>{props.title}</Text>
          </View>
          <View style={{ marginLeft: 15}}>
            <Text style={{color: Colors.accent, fontWeight: '600'}}>{props.amount.toFixed(2)} ج.م </Text>
          </View>
          <View >
            {props.deletable && <TouchableOpacity onPress={props.onRemove}>
                  <Ionicons name='md-trash' size={24} color={"red"}/>
              </TouchableOpacity>

            }
          </View>
      </View>
    );
};


const styles = StyleSheet.create({
    
});

export default CartItem;