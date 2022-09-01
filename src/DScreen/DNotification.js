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

const DNotification = () => {
  const auth = useSelector(state => state.auth);
  const [user, setUser] = useState(auth?.user);
  const navigation = useNavigation();
  const initialList = [];
  const [list, setList] = React.useState(initialList);
  const [loading, setLoading] = React.useState(true);
  let myTimeout = () => {
    //make call to refresh logs
    getFilter1();
    //you could put this timeout inside successful log refresh
    setTimeout(() => {
      myTimeout();
    }, 600000);
  };

  // useLayoutEffect(() => {

  //   const unsubscribe = db.collection('usersCollections').doc(user.id).collection('alert').orderBy("createdAt", "desc").onSnapshot(snapshot =>
  //     {
  //       if(snapshot.empty){
  //         alert("No Notifications");
  //         setList([])
  //       }
  //     setList(snapshot.docs.map((doc,index) => ({
  //             index: index.toString(),
  //             name: doc.data().title,
  //             image: require('../../assets/notification.png'),
  //             msg: doc.data().body,
  //             hour:moment(doc.data().createdAt).fromNow().toLocaleString(),
  //     })))
  //   }
  //   )
  //   setLoading(false);
  //   return unsubscribe;
  // }, [])

  const getFilter1 = () => {
    axios
      .post(
        'https://us-central1-docker-347218.cloudfunctions.net/falling_alert_api',
        {
          date: '28/06/2022',
          email: 'dereckjos12@gmail.com',
          password: 'Vigilance@001',
        },
      )
      .then(function (response) {
        const data = response.data;
        for (const element in data) {
          const newList = data[element].map((item, index) => {
            const newMsg = {
              index: index.toString(),
              name: element,
              image: require('../../assets/notification.png'),
              msg: item[0],
              hour: moment(item[1], 'HH:mm:ss').format('hh:mm A'),
            };
            return newMsg;
          });
          setList(newList);
          setLoading(false);
          return newList;
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    myTimeout();
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
          onPress={() => navigation.navigate('DSetting')}
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
        }}>
        View your notification
      </Text>

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
                    style={{height: 30, width: 30, aspectRatio: 1}}
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
    </Layout>
  );
};

export default DNotification;

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
    paddingBottom: 30,
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
