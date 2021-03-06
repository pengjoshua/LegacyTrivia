import { connect } from 'react-redux'
import GameOverView from '../components/GameOverView'

const mapStateToProps = (state) => ({
  scoreObj: state.scoreObj,
  userName: state.userName
})

const ShowGameOver = connect(
  mapStateToProps
)(GameOverView)

export default ShowGameOver
