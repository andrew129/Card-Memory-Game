import React from 'react';
import pics from '../../../cards.json';
import CardList from '../../CardList/index';
import ScoreForm from '../../scoreForm/scoreForm';
import './Game.css';
// sort scorelist by score descending order
class Game extends React.Component {
    state = {
        pics,
        cardArr: [],
        points: 0,
        gameStart: false, //change when you click on the start button
        seconds: 5,
        formShow: false,
        scoreList: []
    }

    componentDidMount() {
        this.retrieveItems()
    }

    startGame = () => {
        const newArray = this.randomize()
        this.setState({
            pics: newArray,
            gameStart: true
        })
        this.startTimer()
    }

    startTimer = () => {
        setInterval(this.decrement, 1000)
    }

    decrement = () => {
        this.setState({
           seconds: this.state.seconds - 1 
        })
        if (this.state.seconds <= 0) {
            this.setState({
                seconds: "Time's Up",
                formShow: true,
                gameStart: false
            })
        }
    }

    scoreSubmit = name => {
        if (this.state.scoreList.length > 10) {
            var lastItem = this.state.scoreList[this.state.scoreList.length - 1]
            if (lastItem.score > this.state.points) {
                console.log('loser')
            }
            else {
                if (this.state.points > 0) {
                    localStorage.setItem(name, this.state.points)
                }
            }
        }
        else {
            if (this.state.points > 0) {
                localStorage.setItem(name, this.state.points)
            }
        }
    }

    retrieveItems = () => {
        const storageKeys = Object.keys(localStorage)
        const scoreArr = []
        
        storageKeys.forEach(key => {
            const value = localStorage.getItem(key)
            let scoreObj = {}
            scoreObj.name = key
            scoreObj.score = value
            scoreArr.push(scoreObj)
        })
        this.setState({
            scoreList: scoreArr
        })
    }

    handleClickedImage = id => {
        const filteredCard = this.state.pics.filter(pic => pic.id === id)
        filteredCard[0].animate = true
            filteredCard[0].animate = false
            filteredCard[0].clicked = true
            // callback so the new state can be used immediately
            this.setState({
                cardArr: [...this.state.cardArr, filteredCard[0]]
            }, () => {
                if (this.state.cardArr.length === 2) {
                    this.checkForMatch(this.state.cardArr)
                }
            })
    }

    checkForMatch = arr => {
        if (arr[0].image === arr[1].image) {
            this.setState({
                points: this.state.points + 3,
                cardArr: [],
                seconds: this.state.seconds + 5
            })
        }
        else {
            arr[0].clicked = false
            arr[1].clicked = false
            this.setState({
                cardArr: []
            })
        }
    }

    randomize = () => { 
        const newArray = this.state.pics;
        for (let i = newArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray
    }

    render() {
        const sortedArray = this.state.scoreList.sort((a, b) => b.score - a.score)
        return (
            <div>
                <header className='header' style={{background: '#00ff00', height: 60, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', borderBottom: 'solid 1px white'}}>
                    <h2>Time: {this.state.seconds}</h2>
                    <h1>Card Flip Game</h1>
                    <h2>Points: {this.state.points}</h2>
                </header>
                
                <div id='game-container'>
                    {(this.state.gameStart && !this.state.formShow) &&
                        <CardList 
                            pics={this.state.pics}
                            onClick={this.handleClickedImage}
                        />
                    }
                    {(!this.state.gameStart && !this.state.formShow) &&
                        <div className='startDiv'>
                            <h2 style={{color: 'white'}}>Match as many pictures as you can in the time limit, You will get five seconds added to the clock every time you get a match. Click the start button to begin.</h2>
                            <h2 style={{color: 'white'}}>Try to make the high scores list.</h2>
                            <button className='startbtn' onClick={this.startGame}>Start Game</button>
                        </div>
                    }
                    {(this.state.formShow && !this.state.gameStart) &&
                        <ScoreForm 
                            scoreSubmit={this.scoreSubmit}
                        />
                    }
                    <div id='score' style={{background: 'grey'}}>
                        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: 10}}>
                            <h2 style={{ color: '#00ff00' }}>High Scores</h2>
                        </div>
                        {(this.state.scoreList.length > 0) &&
                            <table>
                                <tr>
                                    <th>Name</th>
                                    <th>Score</th>
                                </tr>
                                {sortedArray.map(score => (
                                    <tr>
                                        <td><strong>{score.name}</strong></td>
                                        <td><strong>{score.score} Points</strong></td>
                                    </tr>
                                ))}
                            </table>
                        }
                        {(this.state.scoreList.length === 0) &&
                            <p>No Scores to show, click the start button to be the first</p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;