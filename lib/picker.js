import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Picker,
  Dimensions,
  PropTypes,
} from 'react-native'

const PickerItem = Picker.Item

const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
  basicContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  modalContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#F5FCFF',
  },

  buttonView: {
    width: SCREEN_WIDTH,
    padding: 8,
    borderTopWidth: 0.5,
    borderTopColor: 'lightgrey',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  bottomPicker: {
    width: SCREEN_WIDTH,
  },
})

class CustomPicker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      buttonColor: this.props.buttonColor || '#007AFF',
      modalVisible: false,
      selectedOption: this.props.options[0],
    };

    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  onPressCancel() {
    this.setState({
      modalVisible: false,
    });
  }

  onPressSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.selectedOption);
    }

    this.setState({
      modalVisible: false,
    });
  }

  onValueChange(option) {
    this.setState({
      selectedOption: option,
    });
  }

  show() {
    this.setState({
      modalVisible: true,
    });
  }

  renderItem(option, index) {
    const label = (this.props.labels) ? this.props.labels[index] : option;
    return (
      <PickerItem
        key={option}
        value={option}
        label={label}
      />
    );
  }

  render() {
    const { buttonColor } = this.state;
    const itemStyle = this.props.itemStyle || {};

    return (
      <Modal
        animated
        transparent
        visible={this.state.modalVisible}
      >
        <View style={styles.basicContainer}>
          <View style={styles.modalContainer}>
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={this.onPressCancel}>
                <Text style={{ color: buttonColor }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.onPressSubmit}>
                <Text style={{ color: buttonColor }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.mainBox}>
              <Picker
                ref={'picker'}
                style={styles.bottomPicker}
                selectedValue={this.state.selectedOption}
                onValueChange={(option) => this.onValueChange(option)}
                itemStyle={itemStyle}
              >
                {this.props.options.map((option, index) => this.renderItem(option, index))}
              </Picker>
            </View>

          </View>
        </View>
      </Modal>
    );
  }
}

CustomPicker.propTypes = {
  buttonColor: PropTypes.string,
  options: PropTypes.array.isRequired,
  labels: PropTypes.array,
  itemStyle: PropTypes.object,
  onSubmit: PropTypes.func,
}

export default CustomPicker
