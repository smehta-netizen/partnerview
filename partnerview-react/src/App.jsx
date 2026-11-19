import React from 'react';
import PartnerViewLogic from './logic/PartnerViewLogic';
import AppView from './views/AppView';

// The logic class owns state and builds a view-model (renderVals); AppView renders it.
export default class App extends PartnerViewLogic {
  render() {
    return <AppView v={this.renderVals()} />;
  }
}
