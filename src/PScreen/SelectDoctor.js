import {
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {login} from '../reducers';
import {useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {Layout, Text, Input, Icon, Modal, Button} from '@ui-kitten/components';
import {db} from '../../firebase';
import {PageLoader} from './PageLoader';
import {connect, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const SearchIcon = props => <Icon {...props} name="search" />;

const SelectDoctor = props => {
  const authUser = useSelector(state => state.auth);
  const navigation = useNavigation();
  const UserDetails1 = authUser.user;
  const dispatch = useDispatch();

  const [doctors, setDoctors] = useState([]);
  const [myDoctor, setMyDoctor] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState(doctors);
  const [loading, setLoading] = React.useState(false);

  const handleSearch = value => {
    const filtered = doctors.filter(_data =>
      _data?.name?.toLowerCase().includes(value?.toLowerCase()),
    );
    return setSearchData(filtered);
  };

  const handleUpdate = myDoctor => {
    setLoading(true);
    db.collection('usersCollections')
      .doc(UserDetails1.id)
      .update({myDoctor: myDoctor});
    db.collection('usersCollections')
      .doc(UserDetails1.id)
      .get()
      .then(function (user) {
        var userdetails = {...user.data(), id: UserDetails1.id};
        dispatch(login(userdetails));
        setLoading(false);
        navigation.navigate('SucessScreen');
      })
      .catch(function (error) {
        setLoading(false);
        console.log('Error getting documents: ', error);
      });
  };
  const loadDoctors = () => {
    setLoading(true);
    db.collection('usersCollections')
      .where('role', '==', 'doctor')
      .get()
      .then(querySnapshot => {
        const availdoctors = [];
        querySnapshot.forEach(doc => {
          var newDoc = {
            index: doc.id,
            name: doc.data().fullname,
            designation: doc.data().designation,
            image: require('../../assets/user2.png'),
          };
          availdoctors.push(newDoc);
        });
        setDoctors(availdoctors);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log('Error getting documents: ', error);
      });
  };
  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    handleSearch(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);
  useEffect(() => {
    setSearchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctors]);
  return loading ? (
    <PageLoader />
  ) : (
    <Layout style={styles.Container}>
      <Layout style={styles.topHead}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Recoleta-Bold',
            marginLeft: 4,
            marginBottom: 10,
            marginTop: 40,
          }}>
          Hello !!!
        </Text>
      </Layout>
      <Text style={styles.DrTeaxt}>{UserDetails1.fullname}</Text>
      <Text style={styles.pText}>Its Mandatory to Select one Doctor</Text>
      <Layout style={styles.Search}>
        <Input
          placeholder="Search...."
          accessoryRight={SearchIcon}
          value={searchValue}
          onChangeText={newText => setSearchValue(newText)}
          style={styles.input}
          size="large"
        />
      </Layout>

      <ScrollView width="100%" showsVerticalScrollIndicator={false}>
        <Layout style={{width: '100%'}}>
          <SafeAreaView>
            <FlatList
              style={styles.textStyle}
              keyExtractor={key => {
                return key.index;
              }}
              vertical
              //inverted
              extraData={doctors}
              data={doctors}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <>
                    <Layout style={styles.card}>
                      <Image
                        source={item.image}
                        resizeMode="cover"
                        style={{
                          height: 60,
                          width: 60,
                          borderRadius: 50,
                        }}
                      />
                      <Text style={styles.text}>{item.name}</Text>
                      <Text style={styles.msg}>{item.designation}</Text>
                      <Text
                        style={styles.details}
                        onPress={() => handleUpdate(item.index)}>
                        Select Your Doctor
                      </Text>
                    </Layout>
                  </>
                );
              }}
            />
          </SafeAreaView>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default SelectDoctor;

const styles = StyleSheet.create({
  Container: {
    height: '100%',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  topHead: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userImage: {
    width: 65,
    height: 65,
    marginTop: 25,
    borderRadius: 50,
  },
  button: {
    marginTop: 5,
    backgroundColor: '#0075A9',
    width: 200,
    borderColor: 'transparent',
  },
  DrTeaxt: {
    fontSize: 25,
    fontFamily: 'Recoleta-Bold',
    color: '#0075A9',
  },
  Search: {
    marginTop: 30,
  },
  input: {
    borderRadius: 30,
    fontFamily: 'GTWalsheimPro-Regular',
  },
  pText: {
    fontSize: 17,
    marginTop: 17,
    fontFamily: 'GTWalsheimPro-Bold',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F9F9F9',
    width: '100%',
    marginTop: 15,
    padding: 15,
    paddingBottom: 20,
  },
  text: {
    position: 'absolute',
    marginTop: 10,
    marginLeft: 90,
    fontSize: 18,
    fontFamily: 'GTWalsheimPro-Bold',
  },
  msg: {
    position: 'absolute',
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 90,
    color: '#D5D5D5',
    fontSize: 14,
    fontFamily: 'GTWalsheimPro-Bold',
  },
  noti: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#FF6969',
    color: 'white',
    width: 30,
    height: 30,
    borderRadius: 50,
    paddingTop: 4,
    textAlign: 'center',
    fontSize: 15,
    marginTop: -10,
  },
  details: {
    marginTop: -7,
    marginHorizontal: 75,
    fontSize: 15,
    color: '#0075A9',
    fontFamily: 'GTWalsheimPro-Bold',
  },
  msgNow: {
    position: 'absolute',
    bottom: 20,
    right: 29,
    fontSize: 16,
    fontFamily: 'GTWalsheimPro-Bold',
  },
  bottomButton: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 30,
    top: 50,
  },
  cancel: {
    width: 150,
    backgroundColor: '#0F7BAB',
    borderColor: '#0F7BAB',
  },
  save: {
    width: 150,
    backgroundColor: '#0F7BAB',
    borderColor: '#0F7BAB',
    left: 30,
  },
  arrow: {
    width: 30,
    height: 30,
  },
  textStyle: {
    paddingBottom: 100,
  },
});
