import React from 'react';
import {Link, redirect} from "react-router-dom";
import {SideNav} from "./NavBar.js";

function isValid(char) {
    return (/[0-9a-zA-Z]/).test(char);
}

class LeagueCard extends React.Component {
    render() {
        return (<div>
            <div className="LeagueTeams">
                {"this.props.teamList.toString()"}
            </div>
            <h2>
                {this.props.league}
            </h2>
            <p>{this.props.lastEdit}</p>
        </div>);
    }
}

class League extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myLeagues: [{
                id: "0",
                name: "0",
                startingDate: "0"
            },{
                id: "0",
                name: "0",
                startingDate: "0"
            },{
                id: "0",
                name: "0",
                startingDate: "0"
            },{
                id: "0",
                name: "0",
                startingDate: "0"
            }],
            showNewLeagueCard: false,
            redirect: null
        };
    }

    componentDidMount() {
    }

    showNewLeagueCard() {
        this.setState({
            showNewLeagueCard: true
        });
    }

    cancelLeague() {
        this.setState({
            showNewLeagueCard: false
        });
    }

    addLeague() {
        const input = document.getElementById("newLeagueInput");
        let id = input.value.toLowerCase().replaceAll(" ", "");
        for (let i = 0; i < id.length; ++i) {
            if (!isValid(id[i]) || id[i] === 'ñ') {
                id = id.replaceAll(id[i], "");
            }
        }
        let size=0;
        for (let key in this.state.myLeagues) {
            size++;
        }
        id += `-${size}`;
        let date = new Date();
    }

    render() {
        if (this.state.redirect) {
            return redirect(this.state.redirect)
        }

        let leagues = [];
        for (let key in this.state.myLeagues) {
            const league = this.state.myLeagues[key];
            leagues.push(<Link to={"/" + key + "/"} className={"frosted Card"}>
                <LeagueCard teamList={league.teams}
                            league={league.name}
                            lastEdit={league.lastEdit}/>
            </Link>);
        }


        return (<div className={"OuterFlex"}>
            <SideNav/>
            <section className={"container"}>
                <div className={"Manager Manager-Center"}>

                    <div className={"container-Cards"}>
                        <button className={"newGameButton"} onClick={() => this.showNewLeagueCard()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-plus" viewBox="0 0 16 16">
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                            New League
                        </button>
                        {leagues.map(league => {
                            return (league)
                        })}
                    </div>
                </div>
            </section>
            {this.state.showNewLeagueCard && <section className={"Above-Card"} id={"NewLeagueCard"}>
                <div className={"Card"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-x-lg Cancel-Action" viewBox="0 0 16 16"
                         onClick={() => this.cancelLeague()}>
                        <path
                            d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                        <path
                            d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                    </svg>
                    <input id={"newLeagueInput"} type="text" placeholder={"Your League's Name"}/>
                    <button onClick={() => this.addLeague()}>Confirm</button>
                </div>
            </section>}
        </div>);
    }
}

export default League;
