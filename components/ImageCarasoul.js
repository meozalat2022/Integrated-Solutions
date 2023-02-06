import React, {useState, useCallback} from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground, Dimensions, ImageEditor } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const ImageCarasoul = ({pro})=>{

    
    const navigation = useNavigation();
    const width = Dimensions.get("window").width;
    const [activeIndex, setActiveIndex] = useState(1)

    const onFlatListChange = useCallback(({viewableItems})=>{
        if(viewableItems.length > 0){
            setActiveIndex(viewableItems[0].index || 0)
        }
    },[])
    const dots = []
    for(const key in pro){
        dots.push(pro[key])
    }

    return(
        <View >
             <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                viewabilityConfig={{
                    viewAreaCoveragePercentThreshold: 50,
                }}
                onViewableItemsChanged={onFlatListChange}
                snapToInterval={width-30}
                snapToAlignment={'center'}
                decelerationRate={'fast'}
                data={pro}
                keyExtractor={(item, index)=>index.toString()}
                renderItem={({item})=>{
                    return(
                        <TouchableOpacity onPress={()=>{navigation.navigate("ProductDetails", {itemId: item.id, productTitle: item.title})}} style={[styles.backgroundImageView, {width: width - 40}]}>
                            <ImageBackground 
                                style={styles.backgroundImage}
                                source={{uri: item.image}}>
                                    <View style={{backgroundColor: 'red',  width: 100, height: 30, position: 'absolute', top: 5, left: 5, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{textAlign: 'center', color: 'white', fontSize: 18, fontWeight: 'bold' }}> % {item.promotionRate}</Text>
                                    </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    )
                }}
            />
            <View style={styles.dotsView}>
            {dots.map((pic, index)=>(
                    <View style={[styles.dots, {
                        backgroundColor : index === activeIndex ? "#c9c9c9" : "#ededed"
                    }]}/>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundImageView: {
        width: '100%',
        height: '100%',
        marginHorizontal: 5
    },
    backgroundImage: {
        height: 220,
        resizeMode: 'contain',
        // borderColor: 'red',
        // borderWidth: 1,
        margin: 10,
        // padding: 10,
    },
    dotsView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dots:{
        width: 15,
        height: 15,
        borderRadius: 15,
        borderWidth: 1,
        margin: 5,
        borderColor: '#c9c9c9',
        backgroundColor: '#ededed'
    }
});
export default ImageCarasoul;