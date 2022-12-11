import React from 'react';
import {Link} from "react-router-dom";
import {HomeNav} from "./NavBar.js";
import tank from "./assets/Tank.png"

class Landing extends React.Component {
    render() {
        return (
            <div>
                <HomeNav/>
                <main>
                    <div className={"Hero"}>
                        <div className={"container"}>
                            <div className={"HeroText"}>
                                <h1>Choose a service & get started.</h1>
                                <p>Your home is where our heart is. We're honored to provide professional, reliable home
                                    services.</p>
                                <Link to={"/SignUp"} className={"SignupButton"}>Sign up</Link>
                            </div>
                        </div>
                    </div>
                    <section className={"Features"}>
                        <div className={"container"}>
                            <div className={"Halves"}>
                                <h2>
                                    Featured services that take by most
                                </h2>
                                <p>Your home is where our heart is. We're honored to provide professional, reliable home
                                    services.</p>
                                <img src={tank} alt="Tank" width={"80%"}/>
                            </div>
                            <div className={"Halves"}>
                                <div className={"FeatureCard"}>
                                    <h3>Accent Wall Painting</h3>
                                    <p>Your home is where our heart is.</p>
                                    <span>Featured</span>
                                </div>
                                <div className={"FeatureCard"}>
                                    <h3>Accent Wall Painting</h3>
                                    <p>Your home is where our heart is.</p>
                                    <span>Featured</span>
                                </div>
                                <div className={"FeatureCard"}>
                                    <h3>Accent Wall Painting</h3>
                                    <p>Your home is where our heart is.</p>
                                    <span>Featured</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        );
    }
}

export default Landing;
