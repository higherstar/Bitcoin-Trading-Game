const axios = require('axios');
const crypto = require('crypto');
const {
    getUserInfo,
    updateProfileInfo
} = require("./user.service");

const appId = 'tVNR0vFA';
const secretKey = 'sk_test_VWZficYQXe1adJUzO0vKaYxd';
const config = {
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${secretKey}`,
  }
};

const createHmac = userID => {
  const hash = crypto.createHmac('sha256', "sk_test_VWZficYQXe1adJUzO0vKaYxd").update(userID.valueOf().toString());
  const temp = hash.digest('hex');
  console.log('hash>>>>>>>>>>', temp)
  return temp;
}

const createTalkJsUser = async (user) => {
  let res = await axios.put(`https://api.talkjs.com/v1/${appId}/users/${user._id}`, user, config)
    .then((res) => {
      return { status: true };
    }).catch((err) => {
    //   console.log(err);
      return { status: false, errorMessage: err };
    });
  return !!res.status;
};

module.exports.isUserOnline = async (event) => {
  let {userId} = JSON.parse(event.body);
  let res = await axios.get(`https://api.talkjs.com/v1/${appId}/users/${userId}/sessions`, config)
    .then((res) => {
      return {status: true, data: res.data};
    }).catch((err) => {
      console.log(err);
      return {status: false, errorMessage: err};
    });
  return createResponse(200, res);
};

const createConversation = async ({data, conversationId}) => {
  let res = await axios.put(`https://api.talkjs.com/v1/${appId}/conversations/${conversationId}`, data, config)
    .then((res) => {
      return {status: true, data: res.data};
    }).catch((err) => {
      console.log('venus----->error createConversateion', err)
      // console.log(err);
      return {status: false, errorMessage: err};
    });
  return !!res.status;
};

const getConversations = async () => {
  let res = await axios.get(`https://api.talkjs.com/v1/${appId}/conversations`, config)
    .then((res) => {
      return {status: true, data: res.data};
    }).catch((err) => {
      console.log(err.response.data);
      return {status: false, errorMessage: err.response.data.Message};
    });
  console.log("conversations: ", res);
  return res;
};

const sendMessage = async ({conversationId, msg}) => {
  let res = await axios.post(`https://api.talkjs.com/v1/${appId}/conversations/${conversationId}/messages`, msg, config)
    .then((res) => {
      return {status: true, data: res.data};
    }).catch((err) => {
      // console.log(err);
      return {status: false, errorMessage: err};
    });
  return !!res.status;
};

exports.openConversation = async (req, res) => {
  let { senderID, receiverID } = req.body;
  let me = await getUserInfo(senderID);
  let other = await getUserInfo(receiverID);
  
  if (!me || !other) {
    return res.json({ status: false });
  }
  // create signature
  if (other.signature === undefined || me.signature === '') {
    const createMacId = createHmac(me._id);
    const newMe = {
      ...JSON.parse(JSON.stringify(me)),
      signature: createMacId
    }

    const temp = JSON.parse(JSON.stringify(newMe));
    const ret = await updateProfileInfo(temp)
    if (!ret) {
      return res.status(404).json({ error: "Cannot set signature for user!"});
    }
  }
  if (other.signature === undefined || other.signature === '') {
    const newOther = {
      ...JSON.parse(JSON.stringify(other)),
      signature: createHmac(other._id)
    }
    const temp = JSON.parse(JSON.stringify(newOther));
    const ret = await updateProfileInfo(temp)
    if (!ret) {
      return res.status(404).json({ error: "Cannot set signature for user!"});
    }
  }

  // create users
  let meModel = {
    id: me._id,
    name: me.name,
    photoUrl: "https://a.icons8.com/ujfdoifk/knIb2p/location@4x.png",
    welcomeMessage: `Hello ${other.name}, how are you?`
  };
  let otherModel = {
    id: other._id,
    name: other.name,
    photoUrl: "https://a.icons8.com/ujfdoifk/knIb2p/location@4x.png",
    welcomeMessage: `Hello ${me.name}, how are you?`
  };

  console.log('>>>>>>>>>>>>>>>>>>', otherModel)
  let res1 = await createTalkJsUser(meModel);
  let res2 = await createTalkJsUser(otherModel);
  
  // create conversation
  let conversationId = meModel.id > otherModel.id ? meModel.id + '-' + otherModel.id : otherModel.id + '-' + meModel.id;
  console.log('>>>>>>>>>>>>>>>>>>>>>ConversationId',conversationId);
  let data = {
    "participants": [meModel.id, otherModel.id],
    "subject": "open conversation",
    "welcomeMessages": [meModel.welcomeMessage, otherModel.welcomeMessage],
    "photoUrl": meModel.photoUrl
  };
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>', data)
  let res3 = await createConversation({data, conversationId});
  console.log('venus------>res3', res3);
// console.log('********************************')
  // send message
  let msg = [{
    text: `Hello, ${otherModel.name}.`,
    sender: meModel.id,
    type: "UserMessage"
  }];
  let res4 = await sendMessage({msg, conversationId});

  if (res1 && res2 && res3 && res4) {
    if (res) {
      return res.json({ status: true });
    } else {
      return res.status(404).json({ error: "Something went wrong"})
    }
  } else {
    return res.status(404).json({ error: "Something went wrong"})
  }
};
