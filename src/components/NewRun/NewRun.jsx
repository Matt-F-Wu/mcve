import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddCircle';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';

import Search from './Search';
import DependencyMap from './DependencyMap';
import CommandInput from './CommandInput';
import './NewRun.css';
import theme from './theme.js';

export default class NewRun extends Component {

  // dependencies if an array of { name, bundle } can be
  // interpreted as "bundle as name", a key value pair becomes
  // an object like { name: data, bundle: data(0x41a160) }.
  state = {
    bottom: false,
    dependencies: [],
  }

  toggleDrawer = (bool) => () => {
    this.setState({ bottom: bool });
  }

  addDependency = (query, bundle) => {
    if (!bundle) {
      // TODO: didn't find anything.
      return;
    }
    const { dependencies } = this.state;
    const nDep = {
      name: bundle.bundleName.substring(0, bundle.bundleName.indexOf('(')),
      bundle: bundle.bundleName,
    };
    dependencies.push(nDep);
    this.setState({ dependencies });
  }

  updateDependencyMapping = (idx) => (event) => {
    const newName = event.target.value;
    this.setState((state) => {
      const { dependencies } = this.state;
      const bundle = dependencies[idx];
      bundle.name = newName;
      return { dependencies };
    });
  }

  removeDependency = (idx) => () => {
    const { dependencies } = this.state;
    dependencies.splice(idx, 1);
    this.setState({ dependencies });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  handleCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { bottom, dependencies } = this.state;

    return <div>
      <MuiThemeProvider theme={ theme }>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="Add"
        onClick={ this.toggleDrawer(true) }
      >
        <AddIcon style={ { marginRight: 16 } } />
        New Run
      </Fab>
      <Drawer
        anchor="bottom"
        open={ bottom }
        onClose={ this.toggleDrawer(false) }
        PaperProps={ { style: {
          minHeight: '75vh',
          width: '80vw',
          marginLeft: '10vw',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        } } }
      >
        <div
          style={ {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: 16,
            justifyContent: 'space-between',
          } }
        >
          <div
            style={ {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
              zIndex: 10,
            } }
          >
            <div
              style={ { flex: 1 } }
            >
              <div className="sectionTitle">Dependencies</div>
              <table>
                <tbody>
                {
                  dependencies
                  .map((ele, idx) => <DependencyMap
                    key={ idx }
                    name={ ele.name }
                    bundle={ ele.bundle }
                    onChange={
                      this.updateDependencyMapping(idx)
                    }
                    onRemove={
                      this.removeDependency(idx)
                    }
                  />)
                }
                </tbody>
              </table>
              <Search
                searchHandler={ this.addDependency }
              />
            </div>
            <div
              style={ { flex: 1 } }
            >
              <div className="sectionTitle">Configuration</div>
              <div className="row configSection">
                <div className="inlineLabel">
                  Docker Image
                </div>
                <NativeSelect
                  defaultValue={"codalab/ubuntu:1.9"}
                  onChange={ this.handleChange('docker') }
                  input={
                    <Input
                      name="Unit"
                      inputProps={ {
                        style: { paddingLeft: 8 }
                      } }
                    />
                  }
                >
                  <option value="codalab/ubuntu:1.9">codalab/ubuntu:1.9</option>
                  <option value="codalab/ubuntu:1.8">codalab/ubuntu:1.8</option>
                  <option value="codalab/ubuntu:1.7">codalab/ubuntu:1.7</option>
                  <option value="codalab/ubuntu:1.6">codalab/ubuntu:1.6</option>
                </NativeSelect>
              </div>
              <div className="row configSection">
                <div className="inlineLabel">Memory</div>
                <Input
                  defaultValue={ 2 }
                  style={ {
                    width: 60,
                    borderRight: '1px solid #ccc',
                  } }
                  onChange={ this.handleChange('memVal') }
                />
                <NativeSelect
                  defaultValue={"g"}
                  onChange={ this.handleChange('memUnit') }
                  input={
                    <Input
                      name="Unit"
                      inputProps={ {
                        style: { paddingLeft: 8 }
                      } }
                    />
                  }
                >
                  <option value=""/>
                  <option value="k">K</option>
                  <option value="m">M</option>
                  <option value="g">G</option>
                  <option value="t">T</option>
                </NativeSelect>
              </div>
              <div className="row configSection">
                <div className="inlineLabel">Disk</div>
                <Input
                  defaultValue={ 10 }
                  style={ {
                    width: 60,
                    borderRight: '1px solid #ccc',
                  } }
                  onChange={ this.handleChange('diskVal') }
                />
                <NativeSelect
                  defaultValue={"g"}
                  onChange={ this.handleChange('diskUnit') }
                  input={
                    <Input
                      name="Unit"
                      inputProps={ {
                        style: { paddingLeft: 8 }
                      } }
                    />
                  }
                >
                  <option value=""/>
                  <option value="k">K</option>
                  <option value="m">M</option>
                  <option value="g">G</option>
                  <option value="t">T</option>
                </NativeSelect>
              </div>
              <div className="row configSection">
                <div className="inlineLabel">CPUs</div>
                <Input
                  defaultValue={ 2 }
                  style={ {
                    width: 60,
                  } }
                  onChange={ this.handleChange('cpus') }
                />
              </div>
              <div className="row configSection">
                <div className="inlineLabel">GPUs</div>
                <Input
                  style={ {
                    width: 60,
                  } }
                  onChange={ this.handleChange('gpus') }
                />
              </div>
              <div className="row configSection">
                <div className="inlineLabel">Allocate Time</div>
                <Input
                  style={ {
                    width: 60,
                    borderRight: '1px solid #ccc',
                  } }
                  onChange={ this.handleChange('time') }
                />
                <NativeSelect
                  defaultValue={"g"}
                  onChange={ this.handleChange('time') }
                  input={
                    <Input
                      name="Unit"
                      inputProps={ {
                        style: { paddingLeft: 8 }
                      } }
                    />
                  }
                >
                  <option value=""/>
                  <option value="k">m</option>
                  <option value="m">h</option>
                  <option value="g">d</option>
                </NativeSelect>
              </div>
              <div className="row">
                <Checkbox
                  checked={ this.state.network }
                  onChange={ this.handleCheck('network') }
                  value="checkedA"
                />
                <div className="inlineLabel">
                  Allow Network Access
                </div>
              </div>
              <div className="row">
                <Checkbox
                  checked={ this.state.failedOkay }
                  onChange={ this.handleCheck('failedOkay') }
                  value="checkedA"
                />
                <div className="inlineLabel">
                  Allow failed Dependencies
                </div>
              </div>
            </div>
          </div>
          <CommandInput />
        </div>
      </Drawer>
      </MuiThemeProvider>
    </div>;
  }
}