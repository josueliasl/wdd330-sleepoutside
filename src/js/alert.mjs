import { getJSON } from "./utils.mjs";

function alertTemplate(alert) {
    return `p style="bakcground:${alert.background}; color:${alert.color}; padding:10px; text-align:center; margin:0;">${alert.message}</p>`;
}

export default class Alert {
    constructor() {
        this.alertSource = "../public/json/alerts.json";
        this.parentElement = document.querySelector('main');
    }


    async init() {
       const alerts = await getJSON(this.alertSource);
    
    if (alerts && alerts.length > 0) {
        this.renderAlerts(alerts);
    }
}
}
renderAlerts(alerts);{
    const alertSection = document.createElement('section');
    alertSection.className = 'alert-list';

    const alertHTML = alerts.map(alertTemplate).join('');
    alertSection.innerHTML = alertHTML;

    this.parentElement.prepend(alertSection);
}