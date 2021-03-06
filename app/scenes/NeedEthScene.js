import { Scene } from 'phaser';
import TokenService from '../services/TokenService.js';

const labelStyle = {
    fontSize: '64px',
    fontFamily: 'Arial',
    color: '#ffffff',
    align: 'center',
    backgroundColor: '#2DAA58'
};

const labelConfig = {
    x: 600,
    y: 0,
    origin: { x: 0.5, y: 0 },
    padding: 20,
    text: 'Your Wallet Is Empty',
    style: labelStyle
};

const whatsHappeningStyle = {
    backgroundColor: '#333333',
    font: '32px Arial',
    fill: 'white',
    wordWrap: { width: 1200 }
}

export default class NeedEthScene extends Scene {
    constructor() {
        super({key: 'need-eth', active: false});
    }

    create(config) {

        this.make.text({
            x: 0,
            y: 1200,
            origin: { x: 0, y: 1 },
            padding: 20,
            text: "Whats Happening?\n\nYou don't have any ETH in your current account. We need a small amount of eth to create new tokens on the network. You will need to fund your account before you can continue.\nOnce you have some ETH you can hit refresh to use this app.",
            style: whatsHappeningStyle
        });

        this.make.text(labelConfig);

        const ethButton = document.getElementById("get-eth");
        ethButton.style.display = 'block';
    }

    shutdown() {
        super.shutdown();
        document.getElementById("eth-button").style.display = 'none';
    }
}
