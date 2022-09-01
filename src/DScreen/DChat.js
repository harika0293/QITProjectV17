import {Text, StyleSheet} from 'react-native';
import React, {useState, useCallback, useLayoutEffect} from 'react';
import {auth, db} from '../../firebase';
// import { Button, Avatar } from 'react-native-elements'
import {GiftedChat} from 'react-native-gifted-chat';
import {Layout, Icon} from '@ui-kitten/components';
import {connect, useSelector} from 'react-redux';
import {PageLoader} from '../PScreen/PageLoader';

const DChat = ({navigation, route}) => {
  const {thread} = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(thread.newMessages);
  const auth = useSelector(state => state.auth);
  const [loading, setLoading] = React.useState(true);

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
      .doc(thread.index)
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
    db.collection('usersCollections').doc(thread.index).update({
      newMessages: 0,
    });
    setLoading(false);
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setNewMessage(newMessage + 1);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, text, createdAt, user} = messages[0];

    db.collection('usersCollections')
      .doc(thread.index)
      .collection('messages')
      .add({
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
        <Layout style={styles.Arrow}>
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
    </>
  );
};
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
    paddingBottom: 20,
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
    right: 20,
    fontSize: 15,
    fontFamily: 'GTWalsheimPro-Bold',
  },
});

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default DChat;
