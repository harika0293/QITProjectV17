import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react';
import {auth, db} from '../../firebase';
// import { Button, Avatar } from 'react-native-elements'
// import { AntDesign } from '@expo/vector-icons';
import {GiftedChat} from 'react-native-gifted-chat';
import {Layout, Icon} from '@ui-kitten/components';
import {connect, useSelector} from 'react-redux';
import {PageLoader} from '../PScreen/PageLoader';

const Chat = ({navigation, route}) => {
  const {thread} = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(thread.newMessages);
  const auth = useSelector(state => state.auth);
  const [loading, setLoading] = React.useState(true);

  const [user, setUser] = useState({
    uid: 'bvjlCVvqU0RmYw9fdsbjYsM0ZMY2',
    displayName: 'BeeZee',
    photoURL:
      'https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-avatar-icon-png-image_695765.jpg',
    email: 'fhrhyj@yiyy.com',
  });

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('chats')
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
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, text, createdAt, user} = messages[0];

    db.collection('chats').doc(user._id).collection('messages').add({
      _id,
      text,
      createdAt,
      user,
    });
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: user?.displayName,

      headerLeft: () => (
        <Layout style={styles.arrow}>
          <Icon
            style={styles.arrow}
            fill="#fff"
            name="arrow-back"
            onPress={() => navigation.navigate('DHome')}
          />
        </Layout>
      ),
    });
  }, []);
  return loading ? (
    <PageLoader />
  ) : (
    <>
      <Layout>
        <Layout style={styles.mainHead}>
          <Layout style={styles.headTop}>
            <Icon
              name="arrow-back"
              fill="#0075A9"
              style={styles.icon}
              onPress={() => navigation.navigate('PSetting')}
            />
            <Text style={styles.pText}>{thread.name}</Text>
          </Layout>
        </Layout>
      </Layout>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        textInputStyle={{color: '#000', fontFamily: 'GTWalsheimPro-Regular'}}
        user={{
          _id: user?.uid,
          name: user?.displayName,
          avatar: user?.photoURL,
        }}
      />
    </>
  );
};
const mapStateToProps = state => ({
  user: state.auth.user,
});

export default Chat;

const styles = StyleSheet.create({
  Container: {
    height: '100%',
  },
  mainHead: {
    marginHorizontal: 30,
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
    paddingBottom: 20,
  },
  arrow: {
    width: 30,
    height: 30,
  },

  icon: {
    height: 30,
    width: 30,
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
