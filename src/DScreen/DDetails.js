import {StyleSheet, Image, FlatList} from 'react-native';
import React from 'react';
import {Layout, Text, Icon, Divider} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

const DDetails = ({route}) => {
  const {patient} = route.params;
  //console.log(patient);
  const navigation = useNavigation();
  const patientDetails = [
    {
      index: '1',
      image: require('../../assets/user2.png'),
      name: patient.name,
      age: patient.age ? patient.age : 'N/A',
      height: patient.height ? patient.height : 'N/A',
      address: patient.address ? patient.address : 'N/A',
      mobile: patient.phone ? patient.phone : '9999999999',
      email: patient.email ? patient.email : 'example@gmail.com',
      dob: patient.dob ? patient.dob : '6/12/2000',
      specification: patient.diagnosis ? patient.diagnosis : 'N/A',
    },
  ];
  return (
    <Layout style={styles.Container}>
      <Image source={require('../../assets/colored-bg.jpeg')} />
      <Layout style={styles.Arrow}>
        <Icon
          style={styles.arrow}
          fill="#fff"
          name="arrow-back"
          onPress={() => navigation.navigate('DFilter', {patient: patient})}
        />
      </Layout>
      <Layout style={styles.imgTop}></Layout>
      <Image
        style={styles.UserImg}
        source={patientDetails[0].image}
        resizeMode="contain"
      />
      <Text
        style={{
          marginTop: 60,
          textAlign: 'center',
          fontSize: 20,
          fontFamily: 'Recoleta-Bold',
        }}>
        {patientDetails[0].name}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
          marginTop: 5,
          paddingBottom: 20,
          color: 'grey',

          fontFamily: 'GTWalsheimPro-Bold',
        }}>
        Patient
      </Text>
      <Divider />
      <Text
        style={{
          fontSize: 20,
          marginHorizontal: 30,
          paddingBottom: 15,
          fontFamily: 'Recoleta-Bold',
          paddingTop: 20,
        }}>
        Patient Personal Details
      </Text>
      <Divider />
      <FlatList
        style={styles.textStyle}
        keyExtractor={key => {
          return key.index;
        }}
        data={patientDetails}
        renderItem={({item}) => {
          return (
            <>
              <Layout style={styles.personalDetail}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'GTWalsheimPro-Bold',
                    color: 'grey',
                    paddingBottom: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: 'GTWalsheimPro-Bold',
                      paddingBottom: 5,
                    }}>
                    Name :{' '}
                  </Text>{' '}
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'GTWalsheimPro-Bold',
                    paddingTop: 8,
                    color: 'grey',
                    paddingBottom: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: 'GTWalsheimPro-Bold',

                      paddingBottom: 5,
                    }}>
                    DOB :{' '}
                  </Text>{' '}
                  {item.dob}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'GTWalsheimPro-Bold',
                    paddingTop: 8,

                    color: 'grey',
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: 'GTWalsheimPro-Bold',
                    }}>
                    Height :{' '}
                  </Text>{' '}
                  {item.height}
                </Text>
              </Layout>
              <Divider />
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 30,
                  fontFamily: 'Recoleta-Bold',
                  marginTop: 20,
                }}>
                Contact Details
              </Text>
              <Layout style={styles.personalDetail}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'GTWalsheimPro-Bold',
                    paddingBottom: 5,
                    color: 'grey',
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: 'GTWalsheimPro-Bold',
                    }}>
                    Email :{' '}
                  </Text>{' '}
                  {item.email}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    paddingTop: 7,
                    fontFamily: 'GTWalsheimPro-Bold',
                    color: 'grey',
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: 'GTWalsheimPro-Bold',
                    }}>
                    Mobile no. :{' '}
                  </Text>{' '}
                  {item.mobile}
                </Text>
              </Layout>
              <Divider />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Recoleta-Bold',
                  marginHorizontal: 30,
                  marginTop: 20,
                }}>
                Disease Details
              </Text>
              <Layout style={styles.personalDetail}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'GTWalsheimPro-Bold',
                    color: 'grey',
                  }}>
                  <Text
                    style={{
                      fontSize: 17,

                      fontFamily: 'GTWalsheimPro-Bold',
                    }}>
                    Specification :{' '}
                  </Text>{' '}
                  {item.specification}
                </Text>
              </Layout>
            </>
          );
        }}
      />
    </Layout>
  );
};

export default DDetails;

const styles = StyleSheet.create({
  Container: {
    height: '100%',
  },
  imgTop: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
  },
  Arrow: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 20,
    left: 20,
  },
  arrow: {
    height: 30,
    width: 30,
  },
  icon1: {
    height: 30,
    width: 30,
  },
  icon2: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  UserImg: {
    height: 100,
    width: 100,
    position: 'absolute',
    marginTop: 50,
    left: 140,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#0F7BAB',
  },
  personalDetail: {
    marginTop: 10,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
});
