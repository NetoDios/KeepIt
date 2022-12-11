import React from 'react';

function Turnos(props) {
    return (<div className={"Cuadro"}>
        <div className={"baseSquare baseSquare-1"}>
            <input type="text"/>
        </div>
        <div className={"baseSquare baseSquare-2"}>
            <input type="text"/>
        </div>
        <div className={"baseSquare baseSquare-3"}>
            <input type="text"/>
        </div>
        <div className={"baseSquare baseSquare-4"}>
            <input type="text"/>
        </div>
    </div>);
}



class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            strikes: [0, 0, 0], balls: [0, 0, 0, 0]
        };
    }

    updateStrike(index) {
        let newStrikeCount = this.state.strikes;
        if (newStrikeCount[index] !== 0) {
            newStrikeCount[index] = ++newStrikeCount[index] % 3;
            if (index === newStrikeCount.length - 1 && newStrikeCount[index] === 2)
                newStrikeCount.push(0);
            if (index !== newStrikeCount.length - 1 && newStrikeCount[index + 1] !== 0 && newStrikeCount[index] === 0)
                    newStrikeCount.splice(index, 1);
            else if(index === newStrikeCount.length - 2 && newStrikeCount[index + 1] === 0 && newStrikeCount[index] === 0)
                    newStrikeCount.pop();
            if(newStrikeCount.length<3) newStrikeCount.push(0);
        } else {
            for (let i = 0; i < newStrikeCount.length; ++i) {
                if (newStrikeCount[i] === 0) {
                    newStrikeCount[i]++;
                    break;
                }
            }
        }
        this.setState({
            strikes: newStrikeCount
        });
    }

    updateBall(index) {
        let newBallCount = this.state.balls;
        if (newBallCount[index] === 1) {
            for (let i = newBallCount.length - 1; i >= 0; --i) {
                if (newBallCount[i] === 1) {
                    newBallCount[i]--;
                    break;
                }
            }
        } else {
            for (let i = 0; i < newBallCount.length; ++i) {
                if (newBallCount[i] === 0) {
                    newBallCount[i]++;
                    break;
                }
            }
        }
        this.setState({
            balls: newBallCount
        });
    }

    render() {
        return (<div className={"DontMater"}>
            <div>
                <Turnos/>
            </div>
        </div>);
    }
}

export default Test;
