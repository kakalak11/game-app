"use strict";
cc._RF.push(module, '4a153KxrlBPRoFnXQw65tDa', 'GameManager');
// scripts/core/GameManager.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        bulletHolder: cc.Node,
        impactHolder: cc.Node,

        bulletPrefab: cc.Prefab,
        impactPrefab: cc.Prefab
    },

    onLoad: function onLoad() {
        this.bulletHolder.on('BULLET_IMPACT', this.createImpactVFX, this);
        this.node.on('BULLET_FIRE', this.createBullet, this);
    },
    createImpactVFX: function createImpactVFX(_ref) {
        var position = _ref.position;

        var impact = cc.instantiate(this.impactPrefab);
        impact.parent = this.impactHolder;
        impact.setPosition(position);
        impact.getComponent(cc.Animation).play();
    },
    createBullet: function createBullet(_ref2) {
        var position = _ref2.position;

        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.parent = this.bulletHolder;
        bullet.position = position;
    }
});

cc._RF.pop();