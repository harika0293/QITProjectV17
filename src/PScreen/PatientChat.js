import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import {auth, db} from '../../firebase';
import {connect, useSelector} from 'react-redux';
import {GiftedChat} from 'react-native-gifted-chat';
import {PageLoader} from './PageLoader';
const SearchIcon = props => <Icon {...props} name="search" />;
const PatientChat = navigation => {
  const [messages, setMessages] = useState([]);
  const auth = useSelector(state => state.auth);
  const [loading, setLoading] = React.useState(true);
  const newMessage = useRef(auth.user.newMessages ? auth.user.newMessages : 0);
  console.log('newMessage', newMessage);

  const [user, setUser] = useState({
    uid: auth?.user?.id,
    displayName: auth?.user?.fullname,
    photoURL: auth.user.image
      ? auth.user.image
      : 'https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-avatar-icon-png-image_695765.jpg',
    email: auth.user.email,
  });
  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('usersCollections')
      .doc(user.uid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({
            _id: doc.data()._id,
            text: doc.data().text,
            createdAt: doc.data().createdAt.toDate(),
            user: doc.data().user,
          })),
        ),
      );
    setLoading(false);
    return unsubscribe;
  }, []);
  // Function to increment count by 1

  const onSend = useCallback((messages = []) => {
    newMessage.current = newMessage.current + 1;
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, text, createdAt, user} = messages[0];

    db.collection('usersCollections').doc(user._id).collection('messages').add({
      _id,
      text,
      createdAt,
      user,
    });
  }, []);
  useEffect(() => {
    db.collection('usersCollections').doc(user.uid).update({
      newMessages: newMessage.current,
    });
  }, [newMessage.current]);

  return loading ? (
    <PageLoader />
  ) : (
    // <Text>Hello</Text>
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      textInputStyle={{color: '#000'}}
      user={{
        _id: user?.uid,
        name: user?.displayName,
        avatar: user?.photoURL,
      }}
      scrollToBottom={true}
    />
  );
};

export default PatientChat;

const styles = StyleSheet.create({
  mainHead: {
    marginHorizontal: 30,
  },
  input: {
    borderRadius: 30,
    fontFamily: 'GTWalsheimPro-Regular',
  },
  icon: {
    height: 30,
    width: 30,
  },
  headTop: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
  },
  pText: {
    fontSize: 20,
    fontFamily: 'Recoleta-Bold',
    left: 10,
  },
  Search: {
    marginTop: 20,
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
    marginLeft: 90,
    color: '#D5D5D5',
    fontSize: 16,
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
    marginTop: 20,
    marginHorizontal: 75,
    fontSize: 15,
    color: '#0075A9',
    fontFamily: 'GTWalsheimPro-Bold',
  },
  msgNow: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    fontSize: 15,
    fontFamily: 'GTWalsheimPro-Bold',
  },
});
