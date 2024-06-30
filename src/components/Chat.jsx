import { Input, Button, List, Avatar } from 'antd';
import '../Chat.css';
import { useState } from 'react';
import avatarChat from "../assets/avatarChat.jpg";
import avatarPerson from "../assets/avatarPerson.jpg";
import { API_KEY, ENDPOINT } from '../utils/data';
import { SendOutlined } from '@ant-design/icons';


const { TextArea } = Input;
const { Item } = List;

const Chat = ({ inventary }) => {

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, I'm ChatBot Maker, how can I assist you with your inventory?", user: 'chat' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const fetchResponse = async () => {
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body:JSON.stringify({
          "model":"gpt-3.5-turbo",
          "messages":[
            { "role":"system",
              "content":
              ` You are an inventory assistant, helping the user.
                This is the current information ${inventary || {}}, analyzed.`,
            },

            { "role":"user",
              "content": newMessage },
          ],
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error making the request to the API');
      }
  
      const data = await response.json();
      console.log('Respuesta del modelo:', data);

      const newMsg = {
        id: messages.length + 1,
        text: data,
        user: 'chat',
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');

    } catch (error) {
      console.error('Error: ', error);
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
      setMessages([...messages, newMsg]);
      setNewMessage('');

      fetchResponse();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(message) => (
            <Item>
              <Item.Meta
                avatar={message.user === 'chat'
                  ? <Avatar src={avatarChat} />
                  : <Avatar src={avatarPerson} /> }
                title={<div className="message-text">{message.text}</div>}
              />
            </Item>
          )}
        />
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
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
