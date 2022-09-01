import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Layout, Text, Icon} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import {auth, db} from '../../firebase';
import {connect, useSelector} from 'react-redux';
import {PageLoader} from '../PScreen/PageLoader';

const Notification = () => {
  const auth = useSelector(state => state.auth);
  const navigation = useNavigation();
  const [user, setUser] = useState(auth?.user);
  const initialList = [];
  const [list, setList] = React.useState(initialList);
  const [loading, setLoading] = React.useState(true);

  // let myTimeout = (() => {
  //   //make call to refresh logs
  //   getFilter1();
  //   //you could put this timeout inside successful log refresh
  //   setTimeout(() => {
  //     myTimeout()
  //   }, 600000);
  // })

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('usersCollections')
      .doc(user.id)
      .collection('alerts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        if (snapshot.empty) {
          alert('No Notifications');
          setList([]);
        }
        setList(
          snapshot.docs.map((doc, index) => ({
            index: index.toString(),
            name: doc.data().title,
            image: require('../../assets/notification.png'),
            msg: doc.data().body,
            hour: moment(doc.data().createdAt).fromNow().toLocaleString(),
          })),
        );
      });
    setLoading(false);
    return unsubscribe;
  }, []);

  return loading ? (
    <PageLoader />
  ) : (
    <Layout style={styles.Container}>
      <Layout style={styles.topHead}>
        <Icon
          style={styles.arrow}
          fill="#0075A9"
          name="arrow-back"
          onPress={() => navigation.navigate('PSetting')}
        />

        <Text
          style={{fontSize: 20, fontFamily: 'Recoleta-Bold', marginLeft: 10}}>
          Notification
        </Text>
      </Layout>
      <Text
        style={{
          fontSize: 15,
          color: '#DDDDDD',
          fontFamily: 'GTWalsheimPro-Bold',
          marginLeft: 60,
          paddingBottom: 10,
        }}>
        View your notifications
      </Text>
      {list.length === 0 ? (
        <Layout
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
            fontFamily: 'GTWalsheimPro-Bold',
          }}>
          <Text style={{textAlign: 'center', fontFamily: 'GTWalsheimPro-Bold'}}>
            No Notifications
          </Text>
        </Layout>
      ) : (
        <SafeAreaView>
          <FlatList
            style={styles.textStyle}
            keyExtractor={(item, index) => index.toString()}
            data={list}
            extraData={list}
            renderItem={({item}) => {
              return (
                <>
                  <Layout style={styles.card}>
                    <Image
                      source={item.image}
                      resizeMode="contain"
                      style={{
                        height: 30,
                        width: 30,
                        aspectRatio: 1,
                        fontFamily: 'GTWalsheimPro-Bold',
                      }}
                    />
                    <Text
                      style={{
                        marginLeft: 20,
                        fontSize: 17,

                        color: '#0075A9',
                        fontFamily: 'GTWalsheimPro-Bold',
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 20,
                        fontSize: 15,
                        fontWeight: '500',
                        fontFamily: 'GTWalsheimPro-Bold',
                      }}>
                      {item.hour}
                    </Text>
                    <Text style={styles.msg}>{item.msg}</Text>
                  </Layout>
                </>
              );
            }}
          />
        </SafeAreaView>
      )}
    </Layout>
  );
};

export default Notification;

const styles = StyleSheet.create({
  Container: {
    height: '100%',
  },
  topHead: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
  },
  arrow: {
    width: 30,
    height: 30,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FCFCFC',
    width: '100%',
    marginTop: 15,
    padding: 15,
    paddingBottom: 5,
    borderRadius: 10,
    marginBottom: 35,
    marginHorizontal: 30,
  },
  msg: {
    position: 'absolute',
    marginTop: 30,
    width: 200,
    left: 65,
    top: 20,
    fontSize: 15,
    fontFamily: 'GTWalsheimPro-Bold',
  },
});
