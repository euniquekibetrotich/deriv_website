import WebSocket from 'ws';
import { env } from '../config/env.js';

class DerivWSService {
  constructor() {
    this.ws = null;
    this.connected = false;
    this.reqId = 1;
  }

  async connect() {
    return new Promise((resolve, reject) => {

      const url =
        `wss://ws.derivws.com/websockets/v3?app_id=${env.derivAppId}`;

      this.ws = new WebSocket(url);

      this.ws.on('open', () => {
        console.log('✅ Deriv WS connected');

        if (env.derivApiToken) {
          this.authorize();
        }

        this.connected = true;
        resolve(true);
      });

      this.ws.on('message', (raw) => {
        try {
          const msg = JSON.parse(raw);

          if (msg.error) {
            console.error('❌ Deriv error:', msg.error);
          }

          if (msg.msg_type === 'authorize') {
            console.log('✅ Deriv authorized');
          }

        } catch (err) {
          console.error(err);
        }
      });

      this.ws.on('close', () => {
        console.log('⚠️ Deriv WS closed');
        this.connected = false;
      });

      this.ws.on('error', (err) => {
        console.error('❌ WebSocket error:', err);
        reject(err);
      });

    });
  }

  authorize() {
    this.send({
      authorize: env.derivApiToken
    });
  }

  send(data) {
    if (!this.ws) return;

    this.ws.send(
      JSON.stringify({
        ...data,
        req_id: this.reqId++
      })
    );
  }

  subscribeTicks(symbol, callback) {
    this.send({
      ticks: symbol,
      subscribe: 1
    });

    this.ws.on('message', (raw) => {
      try {
        const msg = JSON.parse(raw);

        if (msg.tick?.symbol === symbol) {
          callback(msg.tick);
        }

      } catch (err) {
        console.error(err);
      }
    });
  }
}

export const derivWS = new DerivWSService();