import { StyleSheet, Image, TouchableOpacity} from "react-native";
import React, {useEffect} from 'react';
import { Layout, Text } from "@ui-kitten/components";

const SplashScreen = ({navigation}) => {
  
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Loader')}>
        <Layout style={styles.Container}>
            <Image
                style={styles.avatar}
                source={require("../../assets/VigilanceAI_logo.png")}
                resizeMode="contain"
            />
            <Layout style={styles.mainHeader}>
                <Text style={styles.text }>ALERT</Text>
                <Layout style={styles.cicle}></Layout>
                <Text style={styles.text}>ACT</Text>
                <Layout style={styles.cicle}></Layout>
                <Text style={styles.text}>PREVENT</Text>
            </Layout>
        </Layout>
        </TouchableOpacity>
    );
};

export default SplashScreen;
const styles = StyleSheet.create({
    Container: {
        height:"100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: 8,
    },
    avatar: {
        height: 200,
        width: 200,
        aspectRatio: 1,
        marginTop: 230,
    },
    mainHeader: {
        display: "flex",
        flexDirection: "row",
        marginTop: 20,
    },
    text:{
        color: "#0075A9",
        fontSize: 18, 
        fontFamily:'GTWalsheimPro-Bold'
    },
    cicle: {
        marginTop: 10,
        width: 6,
        height: 6,
        borderRadius: 10,
        backgroundColor: "grey",
        marginLeft: 5,
        marginRight: 5,
    },
});
