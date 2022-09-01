import {StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {db} from '../../firebase';
import {PageLoader} from './PageLoader';
import {useDispatch} from 'react-redux';
import {login} from '../reducers';
import {
  Layout,
  Text,
  Icon,
  Divider,
  Input,
  Button,
  IndexPath,
  Select,
  SelectItem,
  Datepicker,
} from '@ui-kitten/components';
import moment from 'moment';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker'; //calendar

const CalendarIcon = props => <Icon {...props} name="calendar" />;
const data = ['Other', 'Male', 'Female'];

const PPatientDetails = ({navigation, route}) => {
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.auth);
  const user = authUser.user;
  const [fullname, setFullname] = useState(user?.fullname);
  const [phone, setPhone] = useState(user?.phone);
  const [email, setEmail] = useState(user?.email);
  const [gender, setGender] = useState(user?.gender);

  const [loading, setLoading] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const displayValue = data[selectedIndex.row];

  useEffect(() => {
    setGender(displayValue);
  }, [displayValue]);
  //calendar start
  const [date, setDate] = useState(new Date(Date.now())); //current date code
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };
  const showDatepicker = () => {
    showMode('date');
  };
  //calendar End

  const handleUpdate = () => {
    setLoading(true);
    const data = {
      email: email,
      fullname: fullname,
      phone: phone,
      gender: gender,
      dob: moment(date).format('MM/DD/YYYY'),
    };
    const user_uid = user.id;
    db.collection('usersCollections').doc(user_uid).update(data);
    db.collection('usersCollections')
      .doc(user_uid)
      .get()
      .then(function (user) {
        var userdetails = {...user.data(), id: user_uid};
        dispatch(login(userdetails));
        if (user.exists) {
          setLoading(false);
          navigation.navigate('BottomNavigator');
        } else {
          setLoading(false);
          Alert.alert('Please try again');
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log('Error getting document:', error);
      });
  };
  const renderOption = title => <SelectItem key={title} title={title} />;
  return loading ? (
    <PageLoader />
  ) : (
    <Layout style={styles.container}>
      <Layout style={styles.topHead}>
        <Icon
          style={styles.arrow}
          fill="#0075A9"
          name="arrow-back"
          onPress={() => navigation.navigate('PSetting')}
        />
        <Text
          style={{
            left: 70,
            fontFamily: 'Recoleta-Bold',
            paddingBottom: 15,
            textTransform: 'uppercase',
            marginLeft: 10,
            fontSize: 20,
          }}>
          Edit Your Profile
        </Text>
      </Layout>
      <Divider />
      <Layout style={styles.mainContainer}>
        <Image
          source={require('../../assets/user2.png')}
          style={styles.image}
        />
        <Input
          placeholder="Full Name"
          style={styles.input}
          value={fullname}
          onChangeText={text => setFullname(text)}
          label={evaProps => (
            <Text
              {...evaProps}
              style={{
                fontFamily: 'GTWalsheimPro-Bold',
                marginBottom: 5,
                fontSize: 17,
              }}>
              Full Name
            </Text>
          )}
        />

        {/*Calendar start*/}

        <Text
          style={{
            fontFamily: 'GTWalsheimPro-Bold',
            marginBottom: 5,
            fontSize: 17,
          }}>
          Date of Birth
        </Text>

        <Layout style={styles.calendar}>
          <TouchableOpacity
            style={{
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={() => showDatepicker()}
            date={date}
            onSelect={nextDate => setDate(nextDate)}>
            <Text style={{color: '#8F9BB3', fontSize: 15, paddingLeft: 10}}>
              {' '}
              {moment(date).format('DD-MM-YYYY')}
            </Text>
            <Icon
              style={{height: 25, width: 25, right: 15}}
              fill="#0075A9"
              name="calendar"
            />
          </TouchableOpacity>
        </Layout>

        {/*Calendar end*/}
        <Select
          style={styles.input}
          label={evaProps => (
            <Text
              {...evaProps}
              style={{
                fontFamily: 'GTWalsheimPro-Bold',
                marginBottom: 5,
                fontSize: 17,
              }}>
              Gender
            </Text>
          )}
          placeholder="Default"
          value={displayValue}
          onSelect={index => setSelectedIndex(index)}>
          {data.map(renderOption)}
        </Select>

        <Input
          placeholder="name@email.com"
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          label={evaProps => (
            <Text
              {...evaProps}
              style={{
                fontFamily: 'GTWalsheimPro-Bold',
                marginBottom: 5,
                fontSize: 17,
              }}>
              Email Address
            </Text>
          )}
        />
        <Input
          placeholder="Phone Number"
          style={styles.input}
          value={phone}
          onChangeText={text => setPhone(text)}
          label={evaProps => (
            <Text
              {...evaProps}
              style={{
                fontFamily: 'GTWalsheimPro-Bold',
                marginBottom: 5,
                fontSize: 17,
              }}>
              Phone Number
            </Text>
          )}
        />
      </Layout>
      <Layout style={styles.bottomButton}>
        <Button
          style={styles.cancel}
          onPress={() => {
            navigation.navigate('PSetting');
          }}>
          Cancel
        </Button>
        <Button style={styles.save} onPress={handleUpdate}>
          Save
        </Button>
      </Layout>
    </Layout>
  );
};

export default PPatientDetails;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  Arrow: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 10,
    left: 20,
  },
  arrow: {
    height: 30,
    width: 30,
  },
  mainContainer: {
    backgroundColor: '#F9F9F9',
    marginHorizontal: 30,
    top: 30,
    padding: 30,
  },
  input: {
    marginTop: 15,
  },
  Button: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  buttontrn: {
    backgroundColor: 'white',
    borderColor: '#0F7BAB',
    color: '#0F7BAB',
  },
  button: {
    marginLeft: 10,
    borderColor: '#0F7BAB',
  },
  image: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: -25,
    right: 10,
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
    left: 30,
    top: 30,
  },
  calendar: {
    //for calendar
    padding: 4,
    top: 10,
    borderWidth: 1,
    borderColor: '#E4E9F2',
    borderRadius: 3,
    backgroundColor: '#F7F9FC',
  },
});
