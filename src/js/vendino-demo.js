import { SplashScreen } from '@capacitor/splash-screen';
import { Camera } from '@capacitor/camera';
import { VendinoMachinePlugin } from 'vendino-machine';

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
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        .container {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
          max-width: 420px;
          text-align: center;
        }
        capacitor-welcome-titlebar {
          display: block;
          background: linear-gradient(135deg, #FFC107, #E0A800);
          color: white;
          padding: 18px;
          font-size: 1.3em;
          font-weight: bold;
          border-radius: 16px 16px 0 0;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        }
        .button {
          display: block;
          width: 100%;
          padding: 14px;
          margin-top: 12px;
          background: #FFD54F;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1.1em;
          transition: transform 0.2s, background 0.3s;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        .button:hover {
          background: #FFC107;
          transform: scale(1.05);
        }
        .button:active {
          transform: scale(0.98);
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
        }
      </style>
      <div class="container">
        <capacitor-welcome-titlebar>
          <h1>Vendino Web SDK</h1>
        </capacitor-welcome-titlebar>
        <main>
          <p>Test your Vendino app by triggering internal functions.</p>
          <button class="button" id="dispense-item">Dispense Slot 1</button>
          <a id="dispense-result"></a>
          <button class="button" id="check-health">Check Health</button>
          <a id="health-result"></a>
          <button class="button" id="request-payment">Request Payment</button>
          <a id="payment-result"></a>
        </main>
      </div>
    `;
    }

    connectedCallback() {
      const self = this;

      self.shadowRoot.querySelector('#dispense-item').addEventListener('click', async function () {
        try {
          const dispenseRequest = { slotNo: 1, reference: "TEST" + Math.random().toString(36).substring(7) };
          const dispenseResult = await VendinoMachinePlugin.dispense(dispenseRequest);
          self.shadowRoot.querySelector('#dispense-result').innerText = dispenseResult.status === "SUCCESS" ? "Dispense successful" : "Dispense failed";
        } catch (e) {
          console.warn('User cancelled', e);
        }
      });

      self.shadowRoot.querySelector('#check-health').addEventListener('click', async function () {
        try {
          const healthStatus = await VendinoMachinePlugin.checkMachineHealth();
          self.shadowRoot.querySelector('#health-result').innerText = healthStatus.status == "OK" ? "Health is OK" : "Health is KO";
        } catch (e) {
          console.warn('User cancelled', e);
        }
      });

      self.shadowRoot.querySelector('#request-payment').addEventListener('click', async function () {
        try {
          const payload = { amount: 1, reference: "TEST-" + Math.random().toString(36).substring(7), paymentMethod: "grabpayQR" };
          const paymentStatus = await VendinoMachinePlugin.requestPayment(payload);
          self.shadowRoot.querySelector('#payment-result').innerText = paymentStatus.status == "SUCCESS" ? "Payment is OK" : "Payment Failed " + paymentStatus.failedReason;
        } catch (e) {
          console.warn('User cancelled', e);
        }
      });
    }
  }
);
