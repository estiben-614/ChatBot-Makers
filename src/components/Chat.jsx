import { Input, Button, List, Avatar, notification } from 'antd';
import '../Chat.css';
import { useEffect, useState } from 'react';
import avatarChat from "../assets/avatarChat.jpg";
import avatarPerson from "../assets/avatarPerson.jpg";
import { BASE_URL  } from '../utils/data';
import { SendOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';

const { TextArea } = Input;
const { Item } = List;

const Chat = () => {

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, I'm ChatBot Maker, how can I assist you with your inventory?", user: 'chat' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const fetchResponse = async () => {

    const dataForm = new FormData();
    dataForm.append('pregunta', newMessage);
    try {
      setIsFetching(true);
      const response = await fetch(`${BASE_URL}/chatbot`, {
        method: 'POST',
        body: dataForm,
      });

      if (!response.ok) {
        setIsFetching(false);
        return notification.error({
          description: 'Error making the request to the API',
          message: 'Error',
        });
      }
  
      const data = await response.json();
      console.log('Respuesta del modelo:', data);

      const newMsg = {
        id: messages.length + 1,
        text: data,
        user: 'chat',
      };
      setIsFetching(false);
      setNewMessage('');
      setMessages((prevMessages) => [...prevMessages, newMsg]);

    } catch (error) {
      console.error('Error: ', error);

      notification.error({
        description: 'Error',
        message: error,
      });
      setIsFetching(false);
      return null;
    }
  };
  
  const onHandleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        user: 'user',
      };
      setMessages((prevMessages) => [...prevMessages, newMsg]);

    }
  };

  useEffect(() => {
    if (messages && !isEmpty(newMessage)) {
      fetchResponse();
    }
    
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(message) => (
            <>
              <Item>
                <Item.Meta
                  avatar={message.user === 'chat'
                    ? <Avatar src={avatarChat} />
                    : <Avatar src={avatarPerson} /> }
                  title={<div className="message-text">{message.text}</div>}
                />
              
              </Item>
            </>
          )}
        />
        {
          (isFetching) && (
            <Item style={{ textAlign: 'center' }}>
              <Item.Meta
                avatar={<Avatar src={avatarChat} />}
                title={<div className="message-text">Typing...</div>}
              />
            </Item>
          )
        }
      </div>
      <div className="chat-input">
        <TextArea
          rows={3}
          placeholder="Type here..."
          value={newMessage}
          onChange={handleInputChange}
        />
        <Button
          type="primary"
          onClick={onHandleSendMessage}
          icon={<SendOutlined />}
          style={{ width: '100%', marginTop: 10 }}
          disabled={isFetching}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
