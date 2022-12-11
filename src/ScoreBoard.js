import React from 'react';
import {SideNav} from "./NavBar";


function ScoreHeader(props) {
    return (
        <div className="ScoreLine ScoreHeader">
            <div className="ScorePlayer">
                <div>
                    <span className="ScoreNumber">#</span>
                    <span className="ScoreName">Player</span>
                    <span className="ScorePosition">Pos</span>
                </div>
            </div>

            <div className="ScoreInnings">
                {
                    props.innings.inning.map((value, index) => {
                        if (value)
                            return (<span key={"inning-" + (index + 1).toString()}
                                          onClick={props.onClick}>{index + 1}</span>);
                        return null;
                    })
                }
            </div>
        </div>
    );
}

function Turn(props) {
    let bases = props.value[0].bases;
    let value = props.value[0].outcome || "";
    if (!bases[0].active) {
        return (
            <div className={`Turn ${props.highlight}`} onClick={() => props.handleClick(props.inning)}>
                <span className={"turnOutcome"}>{value}</span>
            </div>);
    } else {
        let aux = -1;
        bases.forEach((base, index) => {
            if (base.active) {
                aux = index;
            }
        })
        let cssClass = "";
        if (aux === 0) cssClass = "FB-BG";
        if (aux === 1) cssClass = "SB-BG";
        if (aux === 2) cssClass = "TB-BG";
        if (aux === 3) cssClass = "HB-BG";
        return (
            <div className={`Turn ${cssClass} ${props.highlight}`} onClick={() => props.handleClick(props.inning)}>
                <span className={"turnOutcome"}>{value}</span>
            </div>
        );
    }
}

function EditableTurn(props) {
    let value = props.outecome || "";
    return (
        <div className={"Turn Turn-Edit FB-BG"}>
            <div className={"baseSquare baseSquare-1"}>
                <input id={"FirstBase"} type="text" placeholder={"B"} onChange={() => props.callback()}
                       defaultValue={props.bases[0].value}/>
            </div>
            <div className={"baseSquare baseSquare-2"}>
                <input id={"SecondBase"} type="text" placeholder={"2B"} onChange={() => props.callback()}
                       defaultValue={props.bases[1].value}/>
            </div>
            <div className={"baseSquare baseSquare-3"}>
                <input id={"ThirdBase"} type="text" placeholder={"3B"} onChange={() => props.callback()}
                       defaultValue={props.bases[2].value}/>
            </div>
            <div className={"baseSquare baseSquare-4"}>
                <input id={"HomeBase"} type="text" placeholder={"HR"} onChange={() => props.callback()}
                       defaultValue={props.bases[3].value}/>
            </div>
            <input id={"Outcome"} className={"turnOutcome"} defaultValue={value} onChange={() => props.callback()}/>
        </div>
    );
}

function AssistanceViejo(props) {
    console.log(props.data);
    console.log(props.player);
    let hlBase = 0;
    props.data.bases.forEach((base, index) => {
        if (base.active) {
            hlBase = index;
        }
    })
    let cssClass = "FB-BG";
    let advance = "SB-BG";
    if (hlBase > 0) {
        cssClass = advance;
        advance = "TB-BG";
    }
    if (hlBase > 1) {
        cssClass = advance;
        advance = "HB-BG";
    }
    return (
        <div className={"Assistance"}>
            <span>{props.player[0].name}</span>
            <div>
                <div className={`Turn ${cssClass}`}>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                    <path
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                </svg>
                <div className={`Turn ${advance}`}>
                    <input id={"AssistOutcome"} className={"turnOutcome"} defaultValue={""}/>
                </div>
            </div>
        </div>
    );
}

function Assistance(props) {
    console.log(props.data);
    console.log(props.player);
    let hlBase = 0;
    props.data.bases.forEach((base, index) => {
        if (base.active) {
            hlBase = index;
        }
    })
    let cssClass = "FB-BG";
    if (hlBase > 0) cssClass = "SB-BG";
    if (hlBase > 1)cssClass = "TB-BG";
    return (
        <div className={"Assistance"}>
            <span>{props.player[0].name}</span>
            <div>
                <div className={`Turn ${cssClass}`}>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                    <path
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                </svg>
                <div className={`Turn`}>
                    <input id={"AssistOutcome"} className={"turnOutcome"} defaultValue={""}/>
                </div>
            </div>
        </div>
    );
}

function Circle(props) {
    return <div className={`BallCircle ${props.isActive ? "ActiveBall" : ""}`} onClick={() => props.callback()}>
        <span>{props.value}</span>
    </div>;
}

function Strikes(props) {
    let balls = [];
    props.value.forEach((value, index) => {
        balls.push(<Circle key={`Strike-${index}`} isActive={!!value} value={value === 2 ? "Foul" : ""}
                           callback={() => props.callback(index)}/>);
    });
    return <div className={"BallSection"}>
        <h3>Strikes</h3>
        {balls.map(value => value)}
    </div>
}

function Balls(props) {
    let balls = [];
    props.value.forEach((value, index) => {
        balls.push(<Circle key={`Ball-${index}`} isActive={value} value={""} callback={() => props.callback(index)}/>);
    });
    return <div className={"BallSection"}>
        <h3>Balls</h3>
        {balls.map(value => value)}
    </div>
}

function Batter(props) {
    let players = props.value.batter;
    let innings = props.value.inning;
    return (
        <div className="ScoreLine">
            <div className="ScorePlayer">
                {players.map((value, index) => {
                    return (
                        <div key={`player-${props.prefix}-${props.index.toString()}-${index.toString()}`}>
                            <input
                                id={`playerNumber-${props.prefix}-${props.index.toString()}-${index.toString()}`}
                                type="text" className="ScoreNumber" placeholder={"23"} defaultValue={value.number}
                                onChange={() => props.updateBatter(index)}/>
                            <input
                                id={`playerName-${props.prefix}-${props.index.toString()}-${index.toString()}`}
                                type="text" className="ScoreName" placeholder={"Name here"}
                                defaultValue={value.name} onChange={() => props.updateBatter(index)}/>
                            <input
                                id={`playerPos-${props.prefix}-${props.index.toString()}-${index.toString()}`}
                                type="text" className="ScorePosition" placeholder={"1"} defaultValue={value.pos}
                                onChange={() => props.updateBatter(index)}/>
                        </div>
                    );
                })}
                <div className="AddPlayer" onClick={props.addPlayer}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-plus" viewBox="0 0 16 16">
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </div>
            </div>
            <div className="ScoreInnings">
                {
                    innings.map((value, index) => {
                        let hl = "";
                        if (props.highlight[0] && index === props.highlight[1])
                            hl = props.highlight[3];
                        return (
                            <Turn key={index.toString()}
                                  value={value}
                                  handleClick={props.updateTurns}
                                  inning={index}
                                  highlight={hl}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "showTeam": "awayTeam",
            "homeTeam": null,
            "awayTeam": null,
            "loading": true,
            "editing": false,
        };
    }

    componentDidMount() {
    }

    newBatter(row) {
        let team = this.state.showTeam;
        let newValue = this.state[team].slice();
        newValue[row].batter.push({
            "name": "",
            "number": "",
            "pos": "",
        });

        if (team === "homeTeam")
            this.setState({
                "homeTeam": newValue
            });
        else if (team === "awayTeam")
            this.setState({
                "awayTeam": newValue
            });
    }

    extraInning() {
        let team = this.state.showTeam;
        let newValue = this.state[team].slice();
        newValue.forEach(row => {
            row.inning.push([{
                "bases": [
                    {"active": false, "value": ""},
                    {"active": false, "value": ""},
                    {"active": false, "value": ""},
                    {"active": false, "value": ""}
                ],
                "strikes": [0, 0, 0],
                "balls": [0, 0, 0, 0],
            }]);
        });

        if (team === "homeTeam")
            this.setState({
                "homeTeam": newValue
            });
        else if (team === "awayTeam")
            this.setState({
                "awayTeam": newValue
            });
    }

    editTurn(row, inningIndex, turn = 0) {
        let team = this.state.showTeam;
        let data = this.state[team];

        let fb = document.getElementById("FirstBase");
        let sb = document.getElementById("SecondBase");
        let tb = document.getElementById("ThirdBase");
        let hb = document.getElementById("HomeBase");
        let oc = document.getElementById("Outcome");
        if (fb && sb && tb && hb) {
            fb.value = data[row].inning[inningIndex][turn].bases[0].active ? data[row].inning[inningIndex][turn].bases[0].value : "";
            sb.value = data[row].inning[inningIndex][turn].bases[1].active ? data[row].inning[inningIndex][turn].bases[1].value : "";
            tb.value = data[row].inning[inningIndex][turn].bases[2].active ? data[row].inning[inningIndex][turn].bases[2].value : "";
            hb.value = data[row].inning[inningIndex][turn].bases[3].active ? data[row].inning[inningIndex][turn].bases[3].value : "";
            oc.value = data[row].inning[inningIndex][turn].outcome ? data[row].inning[inningIndex][turn].outcome : "";
        }
        let currentlyEditing = [
            {
                "row": row,
                "inning": inningIndex,
                "turn": turn,
            }
        ];
        data.forEach((player, index) => {
            if (!player.inning[inningIndex][0].outcome && player.inning[inningIndex][0].bases[0].active && !player.inning[inningIndex][0].bases[3].active && index != row) {
                currentlyEditing.push({
                    "row": index,
                    "inning": inningIndex,
                    "turn": 0,
                });
            }
        });
        this.setState({
            "editing": currentlyEditing,
        });
    }

    updateTurn() {
        let team = this.state.showTeam;
        let currentlyEditing = this.state.editing;
        let newValue = this.state[team].slice();
        let aux = [
            {"active": false, "value": ""},
            {"active": false, "value": ""},
            {"active": false, "value": ""},
            {"active": false, "value": ""}
        ];

        aux[0].value = document.getElementById("FirstBase").value.trim().toUpperCase() || "";
        aux[1].value = document.getElementById("SecondBase").value.trim().toUpperCase() || "";
        aux[2].value = document.getElementById("ThirdBase").value.trim().toUpperCase() || "";
        aux[3].value = document.getElementById("HomeBase").value.trim().toUpperCase() || "";
        let outcome = document.getElementById("Outcome").value.trim().toUpperCase() || null;

        if (aux[0].value !== "") aux[0].active = true;
        if (aux[1].value !== "") {
            aux[0].active = true;
            aux[1].active = true;
        }
        if (aux[2].value !== "") {
            aux[0].active = true;
            aux[1].active = true;
            aux[2].active = true;
        }
        if (aux[3].value !== "") {
            aux[0].active = true;
            aux[1].active = true;
            aux[2].active = true;
            aux[3].active = true;
        }


        let row = currentlyEditing[0].row;
        let inning = currentlyEditing[0].inning;
        let turn = currentlyEditing[0].turn;

        newValue[row].inning[inning][turn].bases = aux;
        if (outcome) newValue[row].inning[inning][turn].outcome = outcome;

        if (team === "homeTeam")
            this.setState({
                "homeTeam": newValue
            });
        else if (team === "awayTeam")
            this.setState({
                "awayTeam": newValue
            });
        this.updateDB();
    }

    updateBatterInfo(row, playerIndex) {
        let team = this.state.showTeam;
        let newValue = this.state[team].slice();
        let prefix = team === "awayTeam" ? "at" : "ht"
        const playerNumber = document.getElementById(`playerNumber-${prefix}-${row.toString()}-${playerIndex.toString()}`);
        const playerName = document.getElementById(`playerName-${prefix}-${row.toString()}-${playerIndex.toString()}`);
        const playerPos = document.getElementById(`playerPos-${prefix}-${row.toString()}-${playerIndex.toString()}`);
        newValue[row].batter[playerIndex] = {
            "name": playerName.value || "",
            "number": playerNumber.value || "",
            "pos": playerPos.value || "",
        };
        if (team === "homeTeam")
            this.setState({
                "homeTeam": newValue
            });
        else if (team === "awayTeam")
            this.setState({
                "awayTeam": newValue
            });
        this.updateDB();
    }

    updateStrike(index) {
        let team = this.state.showTeam;
        let currentlyEditing = this.state.editing;
        let row = currentlyEditing[0].row;
        let inning = currentlyEditing[0].inning;
        let turn = currentlyEditing[0].turn;
        let newStrikeCount = this.state[team];
        let aux = newStrikeCount[row].inning[inning][turn].strikes;
        if (aux[index] !== 0) {
            aux[index] = ++aux[index] % 3;
            if (index === aux.length - 1 && aux[index] === 2)
                aux.push(0);
            if (index !== aux.length - 1 && aux[index + 1] !== 0 && aux[index] === 0)
                aux.splice(index, 1);
            else if (index === aux.length - 2 && aux[index + 1] === 0 && aux[index] === 0)
                aux.pop();
            if (aux.length < 3) aux.push(0);
        } else {
            for (let i = 0; i < aux.length; ++i) {
                if (aux[i] === 0) {
                    aux[i]++;
                    break;
                }
            }
        }
        newStrikeCount[row].inning[inning][0].strikes = aux;
        if (aux[aux.length - 1] === 1)
            newStrikeCount[row].inning[inning][0].outcome = "K";
        else
            newStrikeCount[row].inning[inning][0].outcome = null;
        if (team === "homeTeam")
            this.setState({
                "homeTeam": newStrikeCount
            });
        else if (team === "awayTeam")
            this.setState({
                "awayTeam": newStrikeCount
            });
    }

    updateBall(index) {
        let team = this.state.showTeam;
        let currentlyEditing = this.state.editing;
        let row = currentlyEditing[0].row;
        let inning = currentlyEditing[0].inning;
        let turn = currentlyEditing[0].turn;
        let newBallCount = this.state[team];
        let aux = newBallCount[row].inning[inning][turn].balls;
        if (aux[index] === 1) {
            for (let i = aux.length - 1; i >= 0; --i) {
                if (aux[i] === 1) {
                    aux[i]--;
                    break;
                }
            }
        } else {
            for (let i = 0; i < aux.length; ++i) {
                if (aux[i] === 0) {
                    aux[i]++;
                    break;
                }
            }
        }
        newBallCount[row].inning[inning][0].balls = aux;
        if (team === "homeTeam")
            this.setState({
                "homeTeam": newBallCount
            });
        else if (team === "awayTeam")
            this.setState({
                "awayTeam": newBallCount
            });
    }

    updateDB() {
        const updates = {};
        updates[`user1/Leagues/${this.props.leagueID}/games/${this.props.gameID}/homeTeam`] = this.state.homeTeam;
        updates[`user1/Leagues/${this.props.leagueID}/games/${this.props.gameID}/awayTeam`] = this.state.awayTeam;

    }

    changeTeam() {
        if (this.state.showTeam === "homeTeam")
            this.setState({
                "showTeam": "awayTeam",
                "editing": false,
            });
        else
            this.setState({
                "showTeam": "homeTeam",
                "editing": false,
            });
    }

    render() {
        let sheet = null;
        let editable = null;
        if (!this.state.loading) {
            sheet = (
                <div className={"container-ScoreBoard"}>
                    <div className="ScoreBoard frosted">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-chevron-left GamesPlayed--Left" viewBox="0 0 16 16"
                             onClick={() => this.changeTeam()}>
                            <path
                                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                        <div className={"ScoreBoard--Team"}>
                            {this.state.showTeam === "awayTeam" ? this.state.teamNames[1] : this.state.teamNames[0]}
                        </div>
                        <div className={"ScoreBoard--Content"}>
                            <ScoreHeader innings={this.state[this.state.showTeam][0]}
                                         onClick={() => this.extraInning()}/>
                            {
                                this.state[this.state.showTeam] && this.state[this.state.showTeam].map((value, index) => {
                                    let currentHighlight = false;
                                    if (this.state.editing) {
                                        this.state.editing.forEach(val => {
                                            if (val.row === index)
                                                currentHighlight = [true, val.inning, val.turn];
                                        });
                                        if (currentHighlight) {
                                            if (index === this.state.editing[0].row) currentHighlight.push("Turn--MainHL")
                                            else currentHighlight.push("Turn--HL");
                                        }
                                    }
                                    return <Batter
                                        key={"row-" + index.toString()}
                                        value={value}
                                        index={index}
                                        highlight={currentHighlight}
                                        prefix={this.state.showTeam === "awayTeam" ? "at" : "ht"}
                                        addPlayer={() => this.newBatter(index)}
                                        updateBatter={(playerIndex) => this.updateBatterInfo(index, playerIndex)}
                                        updateTurns={(inning) => this.editTurn(index, inning)}
                                    />;
                                })
                            }
                            <ScoreHeader innings={this.state[this.state.showTeam][0]}
                                         onClick={() => this.extraInning()}/>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-chevron-right GamesPlayed--Right" viewBox="0 0 16 16"
                             onClick={() => this.changeTeam()}>
                            <path
                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                </div>
            );


            if (this.state.editing) {
                let team = this.state.showTeam;
                let currentlyEditing = this.state.editing;
                let row = currentlyEditing[0].row;
                let inning = currentlyEditing[0].inning;
                let turn = currentlyEditing[0].turn;
                let data = this.state[team];
                let otherPlayers = [];

                let strikeCount = data[row].inning[inning][turn].strikes;
                let ballCount = data[row].inning[inning][turn].balls;
                let bases = data[row].inning[inning][turn].bases;
                let outcome = data[row].inning[inning][turn].outcome;

                currentlyEditing.forEach((affected, index) => {
                    if (index)
                        otherPlayers.push(<Assistance
                            data={data[affected.row].inning[affected.inning][affected.turn]}
                            player={data[affected.row].batter}/>);
                });
                editable = (<div className={"ThisTurn frosted"}>
                    <EditableTurn callback={() => this.updateTurn()} bases={bases} outecome={outcome}/>
                    <Strikes value={strikeCount} callback={index => this.updateStrike(index)}/>
                    <Balls value={ballCount} callback={index => this.updateBall(index)}/>
                    {
                        otherPlayers.map(value => value)
                    }
                </div>);
            }
        }
        return (
            <div className="OuterFlex">
                <SideNav/>
                {sheet}
                {editable}
            </div>
        );
    }
}

export default ScoreBoard;