import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './App.css';
import './NavBar.css';
import './SignUp.css';
import League from './League.js';
import Test from './Test.js';
import {SignUp, LogIn} from './SignUp.js';
import ScoreBoard from './ScoreBoard.js';
import Landing from './Landing.js';
import LeagueDetails from "./LeagueDetails";
import LeagueConfig from "./LeagueConfig";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <League/>
  },{
    path: "/Testeo/",
    element: <Test/>
  },{
    path: "/SignUp/",
    element: <SignUp/>
  },{
    path: "/LogIn/",
    element: <LogIn/>
  },
  {
    path: ":leagueID/games/:gameID/",
    loader: ({params}) => <ScoreBoard leagueID={params.leagueID} gameID={params.gameID}></ScoreBoard>,
  },{
    path: ":leagueID/configuration/",
    loader: ({params}) => <LeagueConfig leagueID={params.leagueID}></LeagueConfig>,
  },{
    path: ":leagueID/",
    loader: ({params}) => <LeagueDetails leagueID={params.leagueID}></LeagueDetails>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
