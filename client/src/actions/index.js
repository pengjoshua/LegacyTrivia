import * as _ from 'lodash';
import { hashHistory } from 'react-router'
//import { streamSpeech } from '../components/Watson';
export const postAnswer = (answer) => {
  socket.emit('answer', answer , correct => console.log('Answer was ' + (!correct ? 'not correct' : 'correct')));
  return {
    type: 'POST_ANSWER',
    answer
  }
}

export const getQuestion = (question, options, difficulty) => ({
  type: 'GET_QUESTION',
  question,
  options,
  difficulty
})

export const updateScore = (scoreObj) => {
  return {
    type: 'UPDATE_SCORE',
    scoreObj
  }
}

export const speechToText = (text) => {  // figureout how to get the text here
  console.log("speechToText");
  return {
    type: 'SPEECH_TO_TEXT',
    text
  }
}

const listenTrivia = (socket, isOwner) => {
  socket.on('user enter', (name, count) => {
    console.log(`User ${name} has entered, ${count} in room`);
    console.log(isOwner.owner);
    if (isOwner.owner && count === 2) {
      socket.emit('game start');
    }
  });

  socket.on('question', question => {
    store.dispatch(getQuestion(question.question, question.options, question.difficulty));
  });

  socket.on('answered', user => {
    console.log(user + ' answered the question correctly!');
  });

  socket.emit('scoreboard', scoreObj => {
    store.dispatch(updateScore(scoreObj));
  });

  socket.on('game end', winningUser => {
    console.log('Game ended, ' + winningUser + ' won the game! :)')
  });
}

const connectSocket = (roomID, isOwner) => {
  console.log('... starting trivia socket connection');
  let token = window.sessionStorage.getItem('token');
  // Once socket connected, store as window variable
  let socket = window.socket;
  // Authentication
  socket
    .emit('authenticate', {token: token})
    .on('authenticated', () => {
      console.log('Client authorized for /trivia');
      listenTrivia(socket, isOwner);
    })
    .on('unauthorized', msg => {
      console.log('Unauthorized' + JSON.stringify(msg.data));
    });
}


const postGuest = (name, roomID) => {
  let data = roomID ? {name: name} : {name: name, roomID: roomID}
  return dispatch => {
      dispatch(sendRequest)
      return fetch('http://localhost:8080/guest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log('CreateGame POST data from /guest ->', json);
        const isOwner = json.owner;
        console.log('isOwner'+ isOwner);
        // Take token from json and store it persistently into sessionStorage
        window.sessionStorage.setItem('token', json.token);
        dispatch(receivePosts(data, json))
        dispatch(connectSocket(data, json, isOwner))

      });
  }
}
const sendRequest = () => {
  return{
    type: 'SEND_REQUEST'
  }
}

const receivePosts = (data, json) => {
  console.log('receivePosts')
  hashHistory.push('/game')
  return {
    type: 'CREATE_GAME',
    gameID: json.roomID,
    gameHost: data.name
  }
}

export const createGame = (gameHost) => {
  return(dispatch) => {
    dispatch(postGuest(gameHost))
  }
}

export const joinGame = (guestName, roomID) => {
  console.log('joinGame:');
  console.log(roomID);
  return(dispatch) => {
    dispatch(postGuest(guestName, roomID))
  }
}



