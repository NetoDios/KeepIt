import React from 'react';
import {redirect} from "react-router-dom";
import {SideNav} from "./NavBar.js";

class LeagueConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            "inningVal": 9,
            "playersVal": 9,
            "strikesVal": 3,
            "ballsVal": 4,
        };
    }

    componentDidMount() {
    }

    saveData(){
        let inningVal = document.getElementById("Innings").value;
        let playersVal = document.getElementById("Players").value;
        let strikesVal = document.getElementById("Strikes").value;
        let ballsVal = document.getElementById("Balls").value;
    }

    render() {
        if(this.state.redirect){
            return redirect(this.state.redirect);
        }
        return (
            <div className={"OuterFlex"}>
                <SideNav/>
                <div className={"Manager Manager-Center container"}>
                    <div className={"container-Cards"}>

                        <div className={"frosted Card"}>
                            <label htmlFor="Innings">Default innings:</label>
                            <input id={"Innings"} type="number" defaultValue={this.state.inningVal}/>
                        </div>
                        <div className={"frosted Card"}>
                            <label htmlFor="Players">Players:</label>
                            <input id={"Players"} type="number" defaultValue={this.state.playersVal}/>
                        </div>
                        <div className={"frosted Card"}>
                            <label htmlFor="Strikes">Strikes:</label>
                            <input id={"Strikes"} type="number" defaultValue={this.state.strikesVal}/>
                        </div>
                        <div >
                            <label htmlFor="Balls">Balls:</label>
                            <input id={"Balls"} type="number" defaultValue={this.state.ballsVal} className={"frosted Card"}/>
                        </div>
                        <button onClick={() => this.saveData()}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeagueConfig;
