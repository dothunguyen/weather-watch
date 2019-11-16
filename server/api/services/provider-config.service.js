'use strict';
import axios from 'axios'
import l from '../../common/logger';

const providers = [
  {
    url: `${process.env.WEATHERSTACK_API_BASE}?access_key=${process.env.WEATHERSTACK_API_KEY}&query=`,
    name: 'weatherstack',
    status: 'live',     
    type: 'official'
  },
  {
    url: `${process.env.OPENWEATHER_API_BASE}?appid=${process.env.OPENWEATHER_API_KEY}&q=`,
    name: 'openweather',
    status: 'live',
    type: 'backup'      
  }
];

let currentProvider = providers[0];

class ProviderConfig {

  getProvider() {
    return currentProvider;
  }

  reportProviderDown() {
    currentProvider.status = 'down';
    let clone = {...currentProvider};
    setTimeout(this.pingProvider, process.env.PING_INTERVAL, clone);

    for (let i = 0; i < providers.length; i ++) {
      const p = providers[i];
      if (p.status === 'live') {
        currentProvider = p;
        return;
      }
    }
    currentProvider = null;
  }

  async pingProvider(p) {
    // ping provider to update status
    try {
      const res = await axios.get(`${p.url}melbourne`);
      if (res.status !== 200 || (p.name === 'weatherstack' && res.body && res.body['error'] !== null))
        setTimeout(this.pingProvider, process.env.PING_INTERVAL, p);
      else {
        p.status = 'live';
        if (p.type === 'official')
          currentProvider = p;
      }  
    } catch (err) {
      l.error(err);
    }
  }
}

export default new ProviderConfig();