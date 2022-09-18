"use strict";
cc._RF.push(module, '201f5Qk5upJQ6BZKnz/St4C', 'BulletComp');
// scripts/core/BulletComp.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 100
    },

    ctor: function ctor() {
        this.canvasSize = cc.view._originalDesignResolutionSize;
    },
    onLoad: function onLoad() {

        cc.tween(this.node).repeatForever(cc.tween().by(1, { y: this.speed })).start();
    },
    update: function update() {
        if (this.node.y > this.canvasSize.width + this.node.width) {
            this.node.destroy();
        }
    },
    onDestroy: function onDestroy() {
        cc.log('Bullet destroyed');
    }
});

cc._RF.pop();