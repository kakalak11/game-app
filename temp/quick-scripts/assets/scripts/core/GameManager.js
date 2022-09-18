(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/core/GameManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4a153KxrlBPRoFnXQw65tDa', 'GameManager', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameManager.js.map
        