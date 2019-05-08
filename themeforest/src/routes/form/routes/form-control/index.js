import React from 'react';
import { Route } from 'react-router-dom';

import AutoComplete from './routes/autocomplete/';
import Cascader from './routes/cascader/';
import Checkbox from './routes/checkbox/';
import DatePicker from './routes/datepicker/';
import Input from './routes/input/';
import InputNumber from './routes/input-number/';
import Mention from './routes/mention/';
import Radio from './routes/radio/';
import Rate from './routes/rate/';
import Select from './routes/select/';
import Slider from './routes/slider/';
import Switch from './routes/switch/';
import TimePicker from './routes/timepicker/';
import Transfer from './routes/transfer/';
import TreeSelect from './routes/tree-select/';
import Upload from './routes/upload/';

const FormComponents = ({ match }) => (
  <div>
    <Route path={`${match.url}/autocomplete`} component={AutoComplete}/>
    <Route path={`${match.url}/cascader`} component={Cascader}/>
    <Route path={`${match.url}/checkbox`} component={Checkbox}/>
    <Route path={`${match.url}/datepicker`} component={DatePicker}/>
    <Route path={`${match.url}/input`} component={Input}/>
    <Route path={`${match.url}/input-number`} component={InputNumber}/>
    <Route path={`${match.url}/mention`} component={Mention}/>
    <Route path={`${match.url}/radio`} component={Radio}/>
    <Route path={`${match.url}/rate`} component={Rate}/>
    <Route path={`${match.url}/select`} component={Select}/>
    <Route path={`${match.url}/slider`} component={Slider}/>
    <Route path={`${match.url}/switch`} component={Switch}/>
    <Route path={`${match.url}/timepicker`} component={TimePicker}/>
    <Route path={`${match.url}/transfer`} component={Transfer}/>
    <Route path={`${match.url}/tree-select`} component={TreeSelect}/>
    <Route path={`${match.url}/upload`} component={Upload}/>
  </div>
)

export default FormComponents;
