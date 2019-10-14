import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accuracy: 0,
      latency: 0,
      modelData: new FormData()
    }
  }

  handleUsernameChange(e) {
    let newModelData = this.state.modelData;
    newModelData.set('username', e.target.value);

    this.setState({
      modelData: newModelData
    })
  }

  handleUploadFileChange(e) {
    let newModelData = this.state.modelData;
    newModelData.append('file', e.target.files[0]);

    this.setState({
      modelData: newModelData
    })
  }

  handleSubmit(e) {
    axios.post('/stats/submitModel', this.state.modelData)
    .then(res => {
      this.setState({
        accuracy: res.data.accuracy,
        latency: res.data.latency
      });
    });
  }
/*
  getData(e) {
    axios.post('/data/getAll')
    .then(res => {
      my_list = res;
      return render(
      <div> 
        <table>
          <tr>
            <th>username</th>
            <th>accuracy</th>
            <th>latency</th>
            <th>submitted on</th>
          for (i=0; i< my_list.length; i++){
            element = my_list[i];
            <tr> 
             <td>element[1];</td>
             <td>element[2];</td>
             <td>element[3];</td>
             <td>element[4];</td>
            </tr>
          )}
        </table>
      </div>
    })
  }*/

  render() {
    return (
      <div>
        Username:
        <div>
          <input onChange={this.handleUsernameChange.bind(this)} placeholder="username"/>
          <input type="file" onChange={this.handleUploadFileChange.bind(this)}/>
          <button onClick={this.handleSubmit.bind(this)}>Submit</button>
        </div>
        <div>
        Accuracy:
          {this.state.accuracy}
        </div>
        <div>
        Latency:
          {this.state.latency}
        </div>
        <div>
          <h2> Leaderboard </h2>
          // data here
        </div>
      </div>
    )
  }
}
