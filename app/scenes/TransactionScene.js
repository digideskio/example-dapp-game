import { Scene } from 'phaser';

const labelStyle = {
    fontSize: '64px',
    fontFamily: 'Arial',
    color: '#ffffff',
    align: 'center'
};

const whatsHappeningStyle = {
    backgroundColor: '#333333',
    font: '32px Arial',
    fill: 'white',
    wordWrap: { width: 200 }
}

const labelConfig = {
    x: 600,
    y: 600,
    padding: 20,
    origin: {x: 0.5, y: 0.5 },
    text: 'Waiting for approval.',
    style: labelStyle
};

const buttonStyle = {
    fontSize: '64px',
    fontFamily: 'Arial',
    color: '#ffffff',
    align: 'center',
    backgroundColor: '#2B67AB'
};

let backButtonConfig = {
    x: 0,
    y: 0,
    origin: { x: 0, y: 0 },
    padding: 20,
    text: 'Back',
    style: buttonStyle
};

export default class TransactionScene extends Scene {
    constructor() {
        super({ key: 'transaction', active: false });
        this.callback = null;
    }

    back() {
        this.scene.stop('unit');
        this.scene.start('boot');
    }

    create(config) {

        this.make.text({
            x: 0,
            y: 0,
            origin: { x: 0, y: 1 },
            padding: 20,
            text: "Whats Happening?\n\nYou've requested a transation on the ethereum network. That transaction needs to be signed by your wallet. Once it is signed it is submitted to the ethereum network where it will either be accepted or rejected.",
            style: whatsHappeningStyle
        });

        let message = this.make.text(labelConfig);

        if (config.method) {
            this.send(config.method, message, config.completion);
        }
    }

    send(method, message, completion) {
        var completionCalled = false;
        method.send({ gas: 700000 })
        .on('transactionHash', function (hash) {
           message.setText('Waiting for first confirmation.');
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            if (confirmationNumber >= 2 && !completionCalled) {
                if (completion) {
                    completion(receipt);
                    completionCalled = true;
                }
            } else {
                message.setText('Got confirmation ' + confirmationNumber + ", waiting for 2.");
            }
        })
        .on('error', (error) => {
            message.setText('Error: ' + error.message);
            const back = this.make.text(backButtonConfig);
            back.setInteractive();
            back.on('pointerup', this.back, this);
        });
    }
}
