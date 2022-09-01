import {StyleSheet, Image} from 'react-native';
import React from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

const DSuccess2 = () => {
  const navigation = useNavigation();
  return (
    <Layout style={styles.Container}>
      <Layout style={styles.mainHeader}>
        <Image
          style={styles.image}
          source={require('../../assets/VigilanceAI_logo.png')}
          resizeMode="contain"
        />
        <Image
          style={styles.SImage}
          source={require('../../assets/95029-success.gif')}
          resizeMode="contain"
        />
        <Layout style={styles.success}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,

              color: '#10C741',
              fontFamily: 'GTWalsheimPro-Bold',
            }}>
            Success !!!
          </Text>
          <Text
            style={{
              paddingTop: 10,
              color: '#818181',
              fontSize: 18,
              fontFamily: 'GTWalsheimPro-Regular',
            }}>
            You are Logged in
          </Text>
        </Layout>
        <Button
          onPress={() => navigation.navigate('DoctorBottomTab')}
          style={styles.button}
          size="giant">
          Continue
        </Button>
      </Layout>
    </Layout>
  );
};

export default DSuccess2;

const styles = StyleSheet.create({
  Container: {
    height: '100%',
    paddingHorizontal: 30,
  },
  mainHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 150,
    marginTop: 50,
  },
  success: {
    marginTop: 50,
  },
  button: {
    marginTop: 50,
    backgroundColor: '#0075A9',
    width: 300,
    borderColor: 'transparent',
  },
  SImage: {
    width: 150,
    height: 150,
    aspectRatio: 1,
    marginTop: 100,
  },
});
