import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import io from 'socket.io-client';
import Ficon from 'react-native-vector-icons/FontAwesome';
import {
  Header,
  SafeWrapper,
  MessageComponent,
  Textinput,
  BtnWrapper,
} from '../../../shared/components';
import axios from 'axios';
import Env from '../../../env/env';
import * as Work from '../../../shared/exporter';

const {
  WP,
  THEME: {colors},
} = Work;

const socket = io(Env.SOCKET_URL);
const Chat = ({navigation}) => {
  const user = useSelector((state) => state?.auth?.user);
  const [isLoading, setLoading] = useState(false);
  const [msgs, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPages] = useState(1);
  const [typeMsg, setTypeMessage] = useState('');

  useEffect(() => {
    getMessages(1);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', ({message, userId, name}) => {
        if (userId == user?.data?._id) {
          console.log('from our side');
          setMessages([
            {_id: userId, id: 0, message, senderName: name, user: userId},
            ...msgs,
          ]);
        } else
          setMessages([
            {id: userId, _id: userId, message, senderName: name, user: userId},
            ...msgs,
          ]);
      });
    }
  }, [msgs]);
  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', user?.data?.city);
    }
    return () => {
      if (socket) return socket.emit('leaveRoom', user?.data?.city);
    };
  }, []);

  const handleMsg = () => {
    if (typeMsg.length > 0) {
      if (socket) {
        socket.emit('chatRoomMessage', {
          chatroom: user?.data?.city,
          message: typeMsg,
          userId: user?.data?._id,
        });
        setTypeMessage('');
      }
    } else {
      Work.showToast('Type Message');
      return;
    }
  };

  const getMessages = async (p) => {
    const isConnected = await Work.checkInternetConnection();
    if (isConnected) {
      setLoading(true);
      try {
        const response = await axios.get(
          `chat/getChat?city=${user?.data?.city}&page=${p}&limit=10`,
        );
        if (response?.data) {
          setTotalPages(response?.data?.total_pages);
          if (page == 1) {
            setMessages(response?.data?.data);
          } else setMessages([...msgs, ...response?.data?.data]);
        }
      } catch (error) {
        Work.showToast(
          error?.response?.data?.message ||
            error?.message ||
            Work.GENERAL_ERROR_MSG,
        );
      }
      setLoading(false);
    } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
  };

  return (
    <SafeWrapper>
      <Header label="Chat" drawer={navigation} />

      <FlatList
        inverted
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        data={msgs}
        renderItem={({item}) => (
          <MessageComponent
            message={item?.message}
            date={item?.createdAt}
            sender={
              item?.user?._id == user?.data?._id ||
              item?.user == user?.data?._id
            }
          />
        )}
        keyExtractor={(item) =>
          item._id + (Math.random() * 1000) / (Math.random() * 1.2) ||
          item?.user + (Math.random() * 2000) / (Math.random() * 1.2)
        }
      />

      <View style={styles.msgContainer}>
        <Textinput
          placeholder="Type message..."
          containerStyle={{width: '85%'}}
          onChangeText={(t) => setTypeMessage(t)}
          value={typeMsg}
        />
        <BtnWrapper onPress={handleMsg}>
          <View style={styles.sendBtnContainer}>
            <Ficon
              name="send"
              size={WP('5')}
              color={colors.white}
              style={{padding: WP('3.4')}}
            />
          </View>
        </BtnWrapper>
      </View>
    </SafeWrapper>
  );
};

export default Chat;

const styles = StyleSheet.create({
  sendBtnContainer: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: WP('7'),
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: WP('4'),
    // position: 'absolute',
    // bottom: 0,
  },
});
