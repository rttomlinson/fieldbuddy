import React, { Component } from 'react';
import 'isomorphic-fetch';
import serialize from 'form-serialize';
class App extends Component {
  render() {
    return (
      <div className="App">
        Please log in
        <form onSubmit={(e) => {
            console.log("form submitted!");
            e.preventDefault();
            //get form data
            const form = serialize(e.target, {hash: true});
            const myHeaders = new Headers({
                'Content-Type': 'application/json'
            });
            
            const _options = {
                headers: myHeaders,
                method: 'post',
                body: JSON.stringify(form)
            }
            fetch('/auth/login', _options)
            .then((response) => {
                if(!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then((json) => {
                console.log("json", json);
            })
            .catch((err) => {
                console.log("dispatch auth error", err.status, err.statusText);
            });
        }}>
            <input type="text" name="email"/>
            <input type="text" name="password"/>
            <button type="submit">login</button>
        </form>
      </div>
    );
  }
}

export default App;
