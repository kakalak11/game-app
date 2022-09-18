// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        gameScore: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    _win: function () {
        this.node.getChildByName('score').getComponent(cc.Label).string = this.gameScore.getComponent(cc.Label).string;
        this.node.runAction(this.node.runAction(cc.moveTo(0.5, 0, 0).easing(cc.easeExponentialInOut(0.5))));
    },

    onClickReturnButton: function () {
        this.node.runAction(this.node.runAction(cc.moveTo(0.5, 0, 800).easing(cc.easeExponentialInOut(0.5))));
        Emitter.instance.emit('showMenu');
        Emitter.instance.emit('hideWindow');
    },

    onLoad() {
        this.node.on('winBoard', this._win, this);
    },

    start() {

    },

    // update (dt) {},
});
