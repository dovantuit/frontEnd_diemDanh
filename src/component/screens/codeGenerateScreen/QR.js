import QRCode from 'react-native-qrcode-image';
import Share from 'react-native-share';

class QR extends React.Component {
  static navigationOptions = {
    title: Strings.dashboardTitle
  };

  constructor(props) {
    super(props);
    this.qrCode = '';
  }

  openShareScreen() {
    if (this.qrCode) {
      const shareOptions = {
        type: 'image/jpg',
        title: '',
        url: this.qrCode
      };
      Share.open(shareOptions)
        .then(res => console.log(res))
        .catch(err => console.error(err));
    }
  }

  render() {
    const { type, address } = this.state;
    return (
      <TouchableHighlight onPress={this.openShareScreen}>
        <View>
          <QRCode
            getBase64={base64 => {
              this.qrCode = base64;
            }}
            value={address}
            size={150}
            bgColor="#FFFFFF"
            fgColor="#000000"
          />
        </View>
      </TouchableHighlight>
    );
  }
}

export default QR;
