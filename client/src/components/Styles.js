const Styles = {
  scoreboardContainer: {
    height: 200,
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    display: 'inline-block',
  },
  questionContainer : {
    height: 230,
    width: '100%',
    margin: 0,
    textAlign: 'center',
    display: 'inline-block',
  },
  questionHeader : {
    height: 50,
    width: '100%',
    fontSize: '20px',
  },
  questionBody: {
    fontSize: '17px',
    padding: '20px 20px',
    textAlign: 'left',
  },
  answerContainer: {
    height: 100,
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    display: 'inline-block',
    padding: '20px 20px',
  },
  userButton: {
    color: 'white',
    width: 170
  },
  toolbarTitle: {
    color: 'white'
  },
  gameOverContainer: {
    height: 230,
    width: '100%',
    marginTop: 200,
    textAlign: 'center',
    display: 'inline-block',
    padding: '50px 100px',
  },
  gameOverHeader: {
    fontSize: '30px'
  },
  gameOverBody: {
    fontSize: '20px',
    marginTop: '10px'
  }
};

export default Styles;

// Question: Don't know why it doesn't work when 'export const Styles = {..}'
