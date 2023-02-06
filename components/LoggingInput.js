import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {Controller} from 'react-hook-form';



const LoggingInput = ({name, 
    iconName, 
    rules={}, 
    control, 
    keyboardType,
    textContentType,
    placeholder, 
    secureTextEntry,
    autoCapitalize= 'non',
    autoCorrect = false
})=>{


 
    return(
        <View style={styles.container}>
            <View style={styles.icon}>
                <AntDesign name={iconName} size={24} color="black" />
            </View>
            <View style={{flex: 1}}>
                <Controller 
                    control={control}
                    name={name}
                    rules={rules}
                    keyboardType={keyboardType}
                    textContentType={textContentType}
                    render={({field: {value, onBlur, onChange}, fieldState: {error}})=>(
                        <>
                            <View style={[styles.textInput, {borderColor: error ? 'red' : '#e8e8e8'},]}>
                                <TextInput 
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder={placeholder}
                                        secureTextEntry={secureTextEntry}
                                />
                            </View>
                            {error && (
                                <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                            )}
                        </>
                    )}
                />
            </View>
        </View>


    )
};

const styles = StyleSheet.create({
    container:{
        // flex: 1, 
        flexDirection: 'row-reverse',
        // marginHorizontal: 5,
        marginVertical: 5,
        paddingHorizontal: 10,
        // backgroundColor: 'white',
        
    },
    icon:{
        width: '10%',
        // height: '100%',
        backgroundColor: 'white',
        marginHorizontal: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 10
        
    },
    textInput:{
        width: '100%',
        // height: '100%',
        backgroundColor: 'white',
        padding: 10,
        // alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 10
        
    }
});

export default LoggingInput;