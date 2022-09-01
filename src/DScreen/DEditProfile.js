import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {PageLoader} from '../PScreen/PageLoader';
import {useNavigation} from '@react-navigation/native';
import {db} from '../../firebase';
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
  Alert,
} from '@ui-kitten/components';
import moment from 'moment';
import {connect, useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {login} from '../reducers';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker'; //calendar

const CalendarIcon = props => <Icon {...props} name="calendar" />;
const data = ['Other', 'Male', 'Female'];

const DEditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.auth);
  const user = authUser.user;

  const [fullname, setFullname] = useState(user.fullname);
  const [designation, setDesignation] = useState(user.designation);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);
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
      designation: designation,
      dob: moment(date).format('MM/DD/YYYY'),
    };
    const user_uid = user.id;

    db.collection('usersCollections').doc(user_uid).set(data, {merge: true});
    db.collection('usersCollections')
      .doc(user_uid)
      .get()
      .then(function (user) {
        var userdetails = {...user.data(), id: user_uid};
        dispatch(login(userdetails));
        if (user.exists) {
          setLoading(false);
          navigation.navigate('DSetting');
        } else {
          setLoading(false);
          Alert.alert('Please try again');
        }
      });
  };
  const renderOption = title => <SelectItem title={title} />;
  return loading ? (
    <PageLoader />
  ) : (
    <Layout style={styles.container}>
      <Layout style={styles.topHead}>
        <Icon
          style={styles.arrow}
          fill="#0075A9"
          name="arrow-back"
          onPress={() => navigation.navigate('DSetting')}
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
        <Input
          placeholder="Designation "
          value={designation}
          defaultValue={designation}
          onChangeText={text => setDesignation(text)}
          label={evaProps => (
            <Text
              {...evaProps}
              style={{
                fontFamily: 'GTWalsheimPro-Bold',
                marginBottom: 5,
                fontSize: 17,
                paddingTop: 10,
              }}>
              Designation
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
          value={phone}
          onChangeText={text => setPhone(text)}
          style={styles.input}
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
            navigation.navigate('DSetting');
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

export default DEditProfile;

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
