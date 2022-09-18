(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/core/ShipControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a4e11PjIMFMT4Osa70g24BT', 'ShipControl', __filename);
// scripts/core/ShipControl.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: cc.Prefab,
        bulletHolder: cc.Node,

        steerLeft: cc.SpriteFrame,
        steerRight: cc.SpriteFrame,
        steerForward: cc.SpriteFrame
    },

    onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        this._sprite = this.node.getComponentInChildren(cc.Sprite);
    },
    onKeyUp: function onKeyUp(event) {
        if (event.keyCode == cc.macro.KEY.space) {
            var bullet = cc.instantiate(this.bulletPrefab);
            bullet.parent = this.bulletHolder;
            bullet.position = this.node.getPosition();
        }

        var isReturnToIdle = event.keyCode === cc.macro.KEY.d || event.keyCode === cc.macro.KEY.a;
        if (isReturnToIdle) this._sprite.spriteFrame = this.steerForward;
        cc.warn(isReturnToIdle);
    },
    onKeyDown: function onKeyDown(event) {
        if (event.keyCode == cc.macro.KEY.a) {
            this._steerHorizontal({ isLeft: true });
        } else if (event.keyCode == cc.macro.KEY.d) {
            this._steerHorizontal({ isLeft: false });
        }
    },
    _steerHorizontal: function _steerHorizontal(_ref) {
        var _ref$isLeft = _ref.isLeft,
            isLeft = _ref$isLeft === undefined ? true : _ref$isLeft;

        if (isLeft) this._sprite.spriteFrame = this.steerLeft;else this._sprite.spriteFrame = this.steerRight;
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
        //# sourceMappingURL=ShipControl.js.map
        