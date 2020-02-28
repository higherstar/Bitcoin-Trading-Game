
import React, { useState, useEffect } from 'react';
import { Chat } from '@progress/kendo-react-conversational-ui';
function ChatUI (props) {
	const {avatarUrl, avatarUrlBot, newMessages, sendMessage, userName} = props;
	const [ user, setUser ] = useState({ id: 1,	avatarUrl: 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png'});
	const [ bot, setBot ] = useState({id: 0, avatarUrl: 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png'});
	const [ messages, setMessages ] = useState([]);


	useEffect (()=> {
		console.log('newMessage>>>>>>', newMessages)
		let newMSG = [];
		newMessages.forEach(item => {
			newMSG.push(item.message)
		});
		if(newMessages.length > 0)
			receiveMessage(newMSG);
	}, [newMessages]);

	const receiveMessage = (message) => {
		// let botResponce = Object.assign({}, message);
		// let botResponce = Object.assign({}, message);
		// botResponce.text = message;
		// botResponce.author = bot;
		console.log('mergeMessage>>>>>>>>>>.',message)
		setMessages([
			...messages,
			...message
		])
	}

	const addNewMessage = (event) => {
		let botResponce = Object.assign({});
		botResponce.text = countReplayLength(userName + ": " +  event.message.text);
		botResponce.author = bot;
		sendMessage(botResponce);
		setMessages([
			...messages,
			event.message
		]);
	};

    const countReplayLength = (question) => {
			let length = question.length;
			let answer = question;
			return answer;
    }
		return (
				<Chat user={user}
					messages={messages}
					onMessageSend={addNewMessage}
					placeholder={"Type a message..."}
					width={300}>
				</Chat>
		);
}

export default ChatUI;
