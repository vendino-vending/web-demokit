import { SplashScreen } from '@capacitor/splash-screen';
import { Camera } from '@capacitor/camera';
import { VendinoMachinePlugin } from 'vendino-machine'


window.customElements.define(
  'vendino-demo',
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: 'open' });

      root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      h1, h2, h3, h4, h5 {
        text-transform: uppercase;
      }
      .button {
        display: inline-block;
        padding: 10px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 0.9em;
        border: 0;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
      main {
        padding: 15px;
      }
      main hr { height: 1px; background-color: #eee; border: 0; }
      main h1 {
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      main h2 {
        font-size: 1.1em;
      }
      main h3 {
        font-size: 0.9em;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
    </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1>Vendino Web SDK</h1>
      </capacitor-welcome-titlebar>
      <main>
        <p>
          Test your vendino app by triggering internal function
        </p>
        <h2>Slot Testing</h2>
        <p>
          This will dispense items from the vending machine
        </p>
        <p>
          <button class="button" id="dispense-item">Dispense Slot 1</button>
          <a id="dispense-result"></a>
        </p>
        <h2>Health Testing</h2>
        <p>
          Test machine health based on hardware signals
        </p>
        <p>
          <button class="button" id="check-health">Check</button>
          <a id="health-result"></a>
        </p>
        <h2>Request Payment</h2>
        <p>
          Use this function to trigger payment request
        </p>
        <p>
          <button class="button" id="request-payment">Request Payment</button>
          <a id="payment-result"></a>
        </p>
      </main>
    </div>
    `;
    }

    connectedCallback() {
      const self = this;

      self.shadowRoot.querySelector('#dispense-item').addEventListener('click', async function (e) {
        try {
          const dispenseResult = await VendinoMachinePlugin.dispense(1);
          console.log('Dispense Item', dispenseResult);
          if (dispenseResult.status === "SUCCESS") {
            self.shadowRoot.querySelector('#dispense-result').innerText = `Dispense successful`;
          } else {
            self.shadowRoot.querySelector('#dispense-result').innerText = `Dispense failed`;
          }
          
        } catch (e) {
          console.warn('User cancelled', e);
        }
      });

      self.shadowRoot.querySelector('#check-health').addEventListener('click', async function (e) {
        try {
          const healthStatus = await VendinoMachinePlugin.checkMachineHealth();
          console.log('health status', healthStatus);
          if (healthStatus.status == "OK") {
            self.shadowRoot.querySelector('#health-result').innerText = `Health is OK`;
          } else {
            self.shadowRoot.querySelector('#health-result').innerText = `Health is KO`;
          }
          
        } catch (e) {
          console.warn('User cancelled', e);
        }
      });

      self.shadowRoot.querySelector('#request-payment').addEventListener('click', async function (e) {
        try {
          const healthStatus = await VendinoMachinePlugin.requestPayment(1, "TEST11", "GRABPAY");
          console.log('health status', healthStatus);
          if (healthStatus.status == "SUCCESS") {
            self.shadowRoot.querySelector('#payment-result').innerText = `Payment is ok`;
          } else {
            self.shadowRoot.querySelector('#payment-result').innerText = `Payment Failed ${healthStatus.failedReason}`;
          }
          
        } catch (e) {
          console.warn('User cancelled', e);
        }
      });
    }
  }
);

window.customElements.define(
  'capacitor-welcome-titlebar',
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  }
);
