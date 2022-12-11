import React from 'react';
import {Link, redirect} from "react-router-dom";
import googleIcon from './assets/google.png';
import facebookIcon from './assets/facebook.png';

function ExternalAuth(props) {
    return (
        <div className="LoginType" onClick={props.handleClick}>
            <img src={props.icon} alt={"Image to "+props.source}/>
            <span>{props.action} with {props.source}</span>
        </div>
    );
}

class SignUp extends React.Component {
    handleSignUp(e){
        e.preventDefault();
        console.log('Sign Up '+e.toString());
        return redirect("/Leagues/");
    }
    render() {
        return (
            <div className={"FullCenter"}>
                <div className={"RegisterArea"}>
                    <Link to={"/"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </Link>
                    <div className={"RegisterForm"}>
                        <div className={"CenterForm"}>
                            <h1>
                                Expand your data knowledge
                            </h1>
                            <ExternalAuth action={"Sign Up"} source={"Google"} icon={googleIcon}
                                          handleClick={()=>console.log("Google")}/>
                            <ExternalAuth action={"Sign Up"} source={"Facebook"} icon={facebookIcon}
                                          handleClick={()=>console.log("Facebook")}/>
                            <span className={"Separate"}>Use Email</span>

                            <div className={"MyForm"}>
                                <div>
                                    <label htmlFor={"Name"}>Name</label>
                                    <input type="text" id="Name" name="Name"/>
                                </div>
                                <div>
                                    <label htmlFor={"Email"}>E-Mail</label>
                                    <input type="email" id="Email" name="Email"/>
                                </div>
                                <div>
                                    <label htmlFor={"Pass"}>Password</label>
                                    <input type="password" id="Pass" name="Pass"/>
                                </div>
                                <button onClick={this.handleSignUp.bind(this)}>Sign Up</button>
                            </div>
                                <Link to={"/LogIn/"} className={"NormalLink"}>Log In</Link>
                        </div>
                    </div>
                    <div className={"RegisterExtra"}></div>
                </div>
            </div>
        );
    }
}

class LogIn extends React.Component {
    handleLogIn(e){
        e.preventDefault();
        console.log('Se hizo click '+e.toString());
    }
    render() {
        return (
            <div className={"FullCenter"}>
                <div className={"RegisterArea"}>
                    <Link to={"/"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </Link>
                    <div className={"RegisterForm"}>
                        <div className={"CenterForm"}>
                            <h1>
                                Welcome Back!
                            </h1>
                            <ExternalAuth action={"Sign Up"} source={"Google"} icon={googleIcon}
                                          handleClick={()=>console.log("Google")}/>
                            <ExternalAuth action={"Sign Up"} source={"Facebook"} icon={facebookIcon}
                                          handleClick={()=>console.log("Facebook")}/>
                            <span className={"Separate"}>Use Email</span>

                            <div className={"MyForm"}>
                                <div>
                                    <label htmlFor={"Email"}>E-Mail</label>
                                    <input type="email" id="Email" name="Email"/>
                                </div>
                                <div>
                                    <label htmlFor={"Pass"}>Password</label>
                                    <input type="password" id="Pass" name="Pass"/>
                                </div>
                                <button onClick={this.handleLogIn.bind(this)}>Log In</button>
                            </div>
                            <Link to={"/SignUp/"} className={"NormalLink"}>Sign Up</Link>
                        </div>
                    </div>
                    <div className={"RegisterExtra"}></div>
                </div>
            </div>
        );
    }
}

export
{
    SignUp, LogIn
};