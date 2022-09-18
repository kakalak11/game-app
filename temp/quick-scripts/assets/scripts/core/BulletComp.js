(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/core/BulletComp.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '201f5Qk5upJQ6BZKnz/St4C', 'BulletComp', __filename);
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
        //# sourceMappingURL=BulletComp.js.map
        