import React from 'react';
import {Link, redirect} from "react-router-dom";
import {SideNav} from "./NavBar.js";

function monthToString(month) {
    console.log(month);
    switch (month) {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
        default:
            return "";
    }
}

class Standing extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            team: this.props.team,
            wins: this.props.wins,
            loss: this.props.loss
        };
    }

    render() {
        return (
            <span className={this.props.header === "true" ? "Standing-Item Standing-Header" : "Standing-Item"}>
                <span className={"Standing-Team"}><p>{this.state.team}</p></span>
                <div>
                    <span className={"Standing-Wins"}><p>{this.state.wins}</p></span>
                    <span className={"Standing-Loss"}><p>{this.state.loss}</p></span>
                </div>
            </span>
        );
    }
}

class GameCard extends React.Component {
    render() {
        let date = new Date(this.props.gameDay);
        let displayDate = `${monthToString(date.getMonth())} ${date.getDate()} ${date.getFullYear()}`;
        return (
            <div>
                <p className={"GameCardScore GoBetween"}>
                    <span className="TextRight">
                        {this.props.score[0]}
                    </span>
                    -
                    <span className="TextLeft">
                        {this.props.score[1]}
                    </span>
                </p>
                <div className={"GoBetween"}>
                    <h3 className="TextRight">
                        {this.props.teams[0]}
                    </h3>
                    <h3 className="TextLeft">
                        {this.props.teams[1]}
                    </h3>
                </div>
                <p className={"GameDate"}>{displayDate}</p>
            </div>
        );
    }
}

class League extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            showNewGameCard: false,
            leagueGames: [],
            teamList: [],
            pageNumber: 0,
            pageGames: 7,
        };
    }

    componentDidMount() {
    }

    prevPage() {
        if (this.state.pageNumber >= 1)
            this.setState({
                pageNumber: this.state.pageNumber - 1
            });
        console.log(this.state.pageNumber);
    }

    nextPage(numberOfPages) {
        if (this.state.pageNumber < Math.floor(numberOfPages))
            this.setState({
                pageNumber: this.state.pageNumber + 1
            });
        console.log(this.state.pageNumber);
    }

    newTeam(teamNames) {
        console.log("New Team Registered With Success");
    }

    newGame() {
        const ht = document.getElementById("HometeamInput");
        const at = document.getElementById("AwayteamInput");

        let newHT = this.state.teamList.hasOwnProperty(ht.value.trim().toLowerCase());
        let newAT = this.state.teamList.hasOwnProperty(ht.value.trim().toLowerCase());

        console.log(this.state.teamList)
        console.log(ht.value, "->", newHT);
        console.log(at.value, "->", newAT);

        if (!newHT && !newAT) this.newTeam([ht.value.trim(), at.value.trim()]);
        else if (!newHT) this.newTeam([ht.value.trim()]);
        else if (!newAT) this.newTeam([at.value.trim()]);

        let date = new Date();
        let score = [0, 0];
        let teams = [ht.value.trim(), at.value.trim()];
        let basicSet = [];

        let strikes = [];
        let balls = [];
        let inning = [];
        for (let i = 0; i < this.state.configStrikes; i++)
            strikes.push(0);
        for (let i = 0; i < this.state.configBalls; i++)
            balls.push(0);
        for (let i = 0; i < this.state.configInnings; i++)
            inning.push([{
                "bases": [
                    {"active": false, "value": ""},
                    {"active": false, "value": ""},
                    {"active": false, "value": ""},
                    {"active": false, "value": ""}
                ],
                "strikes":strikes,
                "balls": balls,
            }]);
        for (let i = 0; i < this.state.configPlayers; i++) {
            basicSet.push({
                "inning": inning,
                "batter": [
                    {
                        "number": "",
                        "pos": "",
                        "name": "",
                    }
                ],
            });
        }
        let size = 0;
        for (let key in this.state.leagueGames) {
            size++;
        }
        let id = `${ht.value.substring(0, 3)}-${at.value.substring(0, 3)}-${size}`;
    }

    showNewGameCard() {
        this.setState({
            showNewGameCard: true
        });
    }

    cancelGame() {
        this.setState({
            showNewGameCard: false
        });
    }

    render() {
        if (this.state.redirect) {
            return redirect(this.state.redirect)
        }


        let showGames = [];
        let start = this.state.pageNumber * this.state.pageGames;
        let end = start + this.state.pageGames;


        for (let key in this.state.leagueGames) {
            const game = this.state.leagueGames[key];
            showGames.push(
                <Link key={game.id.toString()} to={`/${this.props.leagueID}/games/${game.id}`}
                      className={"frosted Card GameCard"}>
                    <GameCard score={game.score} teams={game.teams} gameDay={game.gameDay}/>
                </Link>);
        }
        let numberOfPages = showGames.length / this.state.pageGames;
        showGames = showGames.slice(start, end);


        let showStanding = [];
        for (let key in this.state.teamList) {
            let team = this.state.teamList[key];
            showStanding.push(<Standing key={key} header="false" team={team.name}
                                        wins={team.record[0]}
                                        loss={team.record[0]}/>);
        }

        let datalistOptions = [];
        for (let key in this.state.teamList) {
            const team = this.state.teamList[key];
            datalistOptions.push(<option>{team.name}</option>);
        }

        return (
            <div className={"OuterFlex"}>
                <SideNav/>
                <div className={"Manager Manager-Center container"}>
                    <div className={"container-Cards"}>
                        <button className={"newGameButton"} onClick={() => this.showNewGameCard()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-plus" viewBox="0 0 16 16">
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                            New Game
                        </button>

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-chevron-left GamesPlayed--Left" viewBox="0 0 16 16"
                             onClick={() => this.prevPage()}>
                            <path
                                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                        {
                            showGames.map(game => game)
                        }
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-chevron-right GamesPlayed--Right" viewBox="0 0 16 16"
                             onClick={() => this.nextPage(numberOfPages)}>
                            <path
                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                    <div className={"Standings frosted Card"}>
                        <Standing header="true" team={"Team"} wins={"W"} loss={"L"}/>
                        {
                            showStanding.map(team => team)
                        }
                    </div>
                    <div className={"Graph frosted Card"}>
                    </div>
                </div>
                {this.state.showNewGameCard &&
                    <section className={"Above-Card"} id={"NewLeagueCard"}>
                        <div className={"Card"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-x-lg Cancel-Action" viewBox="0 0 16 16"
                                 onClick={() => this.cancelGame()}>
                                <path
                                    d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                <path
                                    d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                            </svg>
                            <input id={"HometeamInput"} type="text" placeholder={"Home Team"} list={"teams"}/>
                            <input id={"AwayteamInput"} type="text" placeholder={"Away Team"} list={"teams"}/>
                            <datalist id="teams">
                                {
                                    datalistOptions.map(value => value)
                                }
                            </datalist>
                            <button onClick={() => this.newGame()}>Confirm</button>
                        </div>
                    </section>
                }
            </div>
        );
    }
}

export default League;
