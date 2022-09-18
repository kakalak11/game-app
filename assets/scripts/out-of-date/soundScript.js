const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        soundButtonText: cc.Label,
        swipeSound: cc.AudioSource,
        combineSound: cc.AudioSource,
        undoSound: cc.AudioSource,
        gameWin: cc.AudioSource,
        gameOver: cc.AudioSource,
        _muted: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Emitter.instance.registerEvent('sound', this._playSound.bind(this));
    },

    onClickSound: function () {
        if (!this._muted) {
            this.node.children.forEach(element => element.getComponent(cc.AudioSource).volume = 0);
            this.soundButtonText.string = 'Sounds OFF';
            this._muted = true;
            return;
        }
        this.node.children.forEach(element => element.getComponent(cc.AudioSource).volume = 1);
        this.soundButtonText.string = 'Sounds ON';
        this._muted = false;
        return;
    },

    _playSound: function (data) {
        switch (data) {
            case 'swipe':
                this.swipeSound.play();
                break;
            case 'combine':
                this.combineSound.play();
                break;
            case 'gameWin':
                this.gameWin.play();
                break;
            case 'gameOver':
                this.gameOver.play();
                break;
            case 'undo':
                this.undoSound.play();
                break;
        }
    },

    start() {

    },

    // update (dt) {},
});
