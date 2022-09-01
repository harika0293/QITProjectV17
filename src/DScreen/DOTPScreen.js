import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Layout,
  Text,
  Input,
  Button,
  Icon,
  IndexPath,
  View,
  Select,
  SelectItem,
  Datepicker,
} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {login} from '../reducers';
import {db} from '../../firebase';
import firebase from 'firebase/compat/app';
import {PageLoader} from '../PScreen/PageLoader';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker'; //calendar
const DOTPScreen = () => {
  const data = ['None', 'Male', 'Female', 'Custom'];

  const CalendarIcon = props => <Icon {...props} name="calendar" />;
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
  const AlertIcon = props => <Icon {...props} name="alert" />;
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [designation, setDesignation] = useState('');

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [toggleSecureEntry, setoggleSecureEntry] = useState(true);
  const displayValue = data[selectedIndex.row];
  useEffect(() => {
    setGender(displayValue);
  }, [displayValue]);

  const dispatch = useDispatch();
  const renderOption = title => <SelectItem title={title} />;
  const renderIcon = props => (
    <TouchableWithoutFeedback
      onPress={() => setoggleSecureEntry(!toggleSecureEntry)}>
      <Icon {...props} name={toggleSecureEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );
  const renderCaption = () => {
    return (
      <Text style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>
          Should contain at least 8 letters
        </Text>
      </Text>
    );
  };

  const onRegister = () => {
    if (
      fullname === '' ||
      phone === '' ||
      email === '' ||
      password === '' ||
      designation === '' ||
      gender === '' ||
      date === ''
    ) {
      Alert.alert('Please fill all the fields');
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          const data = {
            email: email,
            fullname: fullname,
            phone: phone,
            role: 'doctor',
            designation: designation,
            dob: moment(date).format('MM/DD/YYYY'),
            gender: gender,

            appIdentifier: 'rn-android-universal-listings',
          };
          const user_uid = response.user.uid;
          db.collection('usersCollections').doc(user_uid).set(data);
          db.collection('usersCollections')
            .doc(user_uid)
            .get()
            .then(function (user) {
              AsyncStorage.setItem('@loggedInUserID:id', user_uid);
              AsyncStorage.setItem('@loggedInUserID:email', email);
              AsyncStorage.setItem('@loggedInUserID:password', password);
              AsyncStorage.setItem('@loggedInUserID:role', user.data().role);
              AsyncStorage.setItem('@loggedInUserID:onboarded', 'true');
              var userdetails = {...user.data(), id: user_uid};
              dispatch(login(userdetails));
              navigation.navigate('DSuccess');
            })
            .catch(function (error) {
              setLoading(false);
              const {code, message} = error;

              Alert.alert(message);
            });
        })
        .catch(error => {
          setLoading(false);
          const {code, message} = error;
          switch (code) {
            case 'auth/email-already-in-use':
              Alert.alert('Email already in use');
              break;
            case 'auth/invalid-email':
              Alert.alert('Invalid email');
              break;
            case 'auth/weak-password':
              Alert.alert('Weak password');
              break;
            default:
              Alert.alert(message);
          }
        });
    }
  };
  return loading ? (
    <PageLoader />
  ) : (
    <Layout style={styles.Container}>
      <Layout style={styles.headMain}>
        <Image
          style={styles.image}
          source={require('../../assets/VigilanceAI_logo.png')}
          resizeMode="contain"
        />
        <Text style={styles.heading}>
          Create your{' '}
          <Text
            style={{
              fontFamily: 'Recoleta-Bold',
              color: '#0075A9',
              fontSize: 22,
            }}>
            ACCOUNT
          </Text>
        </Text>
        <Text style={styles.paragraph}>
          With our innovative technology,we're making the world safer for
          elderly people
        </Text>

        <Layout style={styles.signin}>
          <Text
            style={{
              fontSize: 15,
              color: '#818181',
              fontFamily: 'Recoleta-Medium',
            }}>
            Already Have An Account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('DLogin')}>
            <Text
              style={{
                fontSize: 17,
                color: '#0075A9',
                fontFamily: 'Recoleta-Medium',
              }}>
              {' '}
              Sign in
            </Text>
          </TouchableOpacity>
        </Layout>

        <ScrollView width="100%" showsVerticalScrollIndicator={false}>
          <Layout style={{width: '100%'}}>
            <Input
              placeholder="Full Name"
              value={fullname}
              onChangeText={nextValue => setFullname(nextValue)}
              size="large"
              style={styles.input}
            />
            <Input
              placeholder="Phone Number"
              value={phone}
              onChangeText={nextValue => setPhone(nextValue)}
              size="large"
              style={styles.input}
            />
            <Input
              placeholder="Email Address"
              value={email}
              onChangeText={nextValue => setEmail(nextValue)}
              size="large"
              style={styles.input}
            />
            <Input
              placeholder="Specialization "
              value={designation}
              defaultValue={designation}
              onChangeText={text => setDesignation(text)}
              style={styles.input}
            />

            {/*Calendar start*/}
            <Text
              style={{
                fontFamily: 'Recoleta-Medium',
                marginTop: 10,
                color: 'grey',
                paddingLeft: 15,
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
            {/*Gender Start*/}
            <Text
              style={{
                fontFamily: 'Recoleta-Medium',
                marginTop: 20,
                marginBottom: 0,
                color: 'grey',
                paddingLeft: 15,
              }}>
              Gender
            </Text>
            <Select
              style={styles.input}
              placeholder="Default"
              value={displayValue}
              onSelect={index => setSelectedIndex(index)}>
              {data.map(renderOption)}
            </Select>

            <Input
              placeholder="Password"
              style={styles.input}
              value={password}
              onChangeText={nextValue => setPassword(nextValue)}
              size="large"
              caption={'Should contain at least 8 symbols'}
              // caption={renderCaption}
              accessoryRight={renderIcon}
              secureTextEntry={toggleSecureEntry}
            />

            <Button
              onPress={() => onRegister()}
              style={styles.button}
              size="giant">
              Sign Up
            </Button>
          </Layout>
        </ScrollView>
      </Layout>
    </Layout>
  );
};

export default DOTPScreen;

const styles = StyleSheet.create({
  Container: {
    height: '100%',
  },
  headMain: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  image: {
    height: 130,
    width: 100,
    aspectRatio: 1,
    marginTop: 30,
  },
  heading: {
    marginTop: 20,
    fontSize: 22,
    fontFamily: 'Recoleta-Bold',
  },
  paragraph: {
    fontSize: 16,
    marginTop: 20,
    color: '#C1C1C1',
    fontFamily: 'GTWalsheimPro-Regular',
    justifyContent: 'center',
    textAlign: 'center',
  },
  buttonText: {
    color: '#eee',
    fontSize: 16,
  },
  input: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#0075A9',
    borderColor: 'transparent',
    marginBottom: 200,
  },
  line: {
    height: 1,
    width: 120,
    backgroundColor: '#0075A9',
  },
  button1: {
    backgroundColor: 'grey',
    width: 330,
  },
  btnSecondary: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '95%',
  },
  social_btn: {
    height: 55,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  btnImage: {
    width: 25,
    height: 25,
    marginLeft: 15,
  },
  btnText: {
    width: '80%',
    textAlign: 'center',
    fontSize: 16,
  },
  signin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 20,
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
