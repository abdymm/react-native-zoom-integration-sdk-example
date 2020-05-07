import React, {Component} from 'react';
import ZoomBridge from 'react-native-zoom-bridge';
import {Text, View, Button, TextInput} from 'react-native';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      meetingId: '',
      password: '',
    };
  }

  handleChangeDisplayName = displayName => this.setState({displayName});
  handleChangeMeetingId = meetingId => this.setState({meetingId});
  handleChangePassword = password => this.setState({password});

  async componentDidMount() {
    try {
      const initializeResult = await ZoomBridge.initialize(
        '', //your app key
        '', //your app secret
        'zoom.us', //domain
      );
      console.warn({initializeResult});
    } catch (e) {
      console.log(e);
      console.warn({e});
    }
  }
  async join() {
    const {displayName, meetingId, password} = this.state;
    try {
      const joinMeetingResult = await ZoomBridge.joinMeeting(
        displayName,
        meetingId,
        password,
      );
      console.log('Join', joinMeetingResult);
      console.warn({joinMeetingResult});
    } catch (e) {
      console.warn({e});
    }
  }
  render() {
    const {displayName, meetingId, password} = this.state;
    return (
      <View>
        <TextInput
          value={displayName}
          placeholder={'Enter your display name'}
          onChangeText={this.handleChangeDisplayName}
        />
        <TextInput
          value={meetingId}
          placeholder={'Enter meeting id'}
          onChangeText={this.handleChangeMeetingId}
        />
        <TextInput
          value={password}
          placeholder={'Enter Password'}
          onChangeText={this.handleChangePassword}
        />
        <Button
          title={'JOIN MEETING'}
          onPress={() => {
            this.join();
          }}
        />
      </View>
    );
  }
}

export default App;
