import React from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { changeColorOption } from 'actions/settingsActions';

class ColorOptions extends React.Component {

  onColorChange = (e) => {
    const { handleChange } = this.props;
    let newColorOption = e.target.value;
    handleChange(newColorOption);
  }

  render() {
    const { colorOption } = this.props;

    return (
      <section>
        <h4 className="section-header">Color Options</h4>
        <p className="small m-0"></p>
        <div className="divider my-3"></div>

        <div className="row">
          <div className="col-4">
            <label className="color-option-check">
              <input type="radio" name="color" value="11" checked={colorOption === '11'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-dark item-header"></span>
                <span className="bg-white item-header"></span>
                <span className="bg-dark"></span>
                <span className="bg-page"></span>
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="12" checked={colorOption === '12'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-primary item-header"></span>
                <span className="bg-white item-header"></span>
                <span className="bg-dark"></span>
                <span className="bg-page"></span>
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="13" checked={colorOption === '13'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-success item-header"></span>
                <span className="bg-white item-header"></span>
                <span className="bg-dark"></span>
                <span className="bg-page"></span>
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="14" checked={colorOption === '14'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-info item-header"></span>
                <span className="bg-white item-header"></span>
                <span className="bg-dark"></span>
                <span className="bg-page"></span>
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="15" checked={colorOption === '15'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-warning item-header"></span>
                <span className="bg-white item-header"></span>
                <span className="bg-dark"></span>
                <span className="bg-page"></span>
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="16" checked={colorOption === '16'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-danger item-header"></span>
                <span className="bg-white item-header"></span>
                <span className="bg-dark"></span>
                <span className="bg-page"></span>
              </span>
            </label>
          </div>

          <div className="col-4">
            <label className="color-option-check">
              <input type="radio" name="color" value="21" checked={colorOption === '21'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-white item-header"></span>
                <span className="bg-white item-header"></span>
                <span className="bg-dark"></span>
                <span className="bg-page"></span>
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="22" checked={colorOption === '22'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-primary item-header"></span>
                <span className="bg-primary item-header"></span>
                <span className="bg-dark"></span>
                <span className="bg-page"></span>
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="23" checked={colorOption === '23'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-success item-header"></span>
                <span className="bg-success item-header"></span>
                <span className="bg-dark"></span>
                <span className="bg-page"></span>
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="24" checked={colorOption === '24'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-info item-header"></span>
                <span className="bg-info item-header"></span>
                <span className="bg-dark"></span>
                <span className="bg-page"></span>
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="25" checked={colorOption === '25'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-warning item-header"></span>
                <span className="bg-warning item-header"></span>
                <span className="bg-dark"></span>
                <span className="bg-page"></span>
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="26" checked={colorOption === '26'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-danger item-header"></span>
                <span className="bg-danger item-header"></span>
                <span className="bg-dark"></span>
                <span className="bg-page"></span>
              </span>
            </label>                 
          </div>
          <div className="col-4">
            <label className="color-option-check">
              <input type="radio" name="color" value="31" checked={colorOption === '31'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-dark item-header"></span>
                <span className="bg-dark item-header"></span>
                <span className="bg-white"></span>
                <span className="bg-page"></span>
              </span>
            </label> 
            <label className="color-option-check">
              <input type="radio" name="color" value="32" checked={colorOption === '32'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-primary item-header"></span>
                <span className="bg-primary item-header"></span>
                <span className="bg-white"></span>
                <span className="bg-page"></span>
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="33" checked={colorOption === '33'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-success item-header"></span>
                <span className="bg-success item-header"></span>
                <span className="bg-white"></span>
                <span className="bg-page"></span>
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="34" checked={colorOption === '34'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-info item-header"></span>
                <span className="bg-info item-header"></span>
                <span className="bg-white"></span>
                <span className="bg-page"></span>
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="35" checked={colorOption === '35'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-warning item-header"></span>
                <span className="bg-warning item-header"></span>
                <span className="bg-white"></span>
                <span className="bg-page"></span>
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="36" checked={colorOption === '36'} onChange={this.onColorChange} />
              <span className="color-option-item bg-page">
                <span className="overlay"><Icon type="check-circle" theme="filled" /></span>
                <span className="bg-danger item-header"></span>
                <span className="bg-danger item-header"></span>
                <span className="bg-white"></span>
                <span className="bg-page"></span>
              </span>
            </label>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    colorOption: state.settings.colorOption
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (colorOption) => {
      dispatch( changeColorOption(colorOption) );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorOptions);
