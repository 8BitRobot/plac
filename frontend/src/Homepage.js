import logo from './logo.svg';
import './Homepage.css';
import { useEffect } from 'react';

let client_id = "66e07c977ca0164c8fa6";
let scopes = "read:user read:org repo"
// let randomState;

function Homepage() {
  // let randomStateParams = "num=1&len=20&digits=on&upperalpha=on&loweralpha=on&unique=off&format=plain&rnd=new";
  // fetch(
  //   `https://www.random.org/strings/?${randomStateParams}`, {
  // }).then(async (resp) => {
  //   randomState = await randomState.text();
  // });
  useEffect(async () => {
    const url = window.location.href;
    const urlParams = new URLSearchParams((new URL(url)).search);
    let code = urlParams.get("code");
    // if (urlParams.get("state")) {
    //   console.log("Uh-oh! Something bad is happening!");
    // } else {
    // }

    if (url.includes("?code=")) {
      let response = await (await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authcode: code,
        }),
      }).catch((error) => {
        console.error(error);
      })).json()
      console.log("Success!");
      console.log(response);
    }
  });
    
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a href={ `https://github.com/login/oauth/authorize?scope=${scopes}&client_id=${client_id}` }>
          Login
        </a>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Homepage;
