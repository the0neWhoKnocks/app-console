import { connect } from 'react-redux';
import { actions } from '../../store';
import FlagsConsolePlugin from './component';

const mapFlagProps = (state) => ({
  flags: state.flags,
});

const mapFlagDispatch = {
  setFlags: actions.setFlags,
};

const flagsPlugin = {
  Component: connect(mapFlagProps, mapFlagDispatch)(FlagsConsolePlugin),
  icon: 'book',
  id: 'flagsToggle',
  name: 'Flags',
};

export default flagsPlugin;