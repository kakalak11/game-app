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
        steerForward: cc.SpriteFrame,

        speed: 500
    },

    onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        this._sprite = this.node.getComponentInChildren(cc.Sprite);
        this.node.state = this.state = {
            isMoving: false,
            isMovingLeft: false,
            isMovingRight: false

        };
    },
    onKeyUp: function onKeyUp(event) {
        if (event.keyCode == cc.macro.KEY.space) {
            return shootCommand();
        }
        var _cc$macro$KEY = cc.macro.KEY,
            a = _cc$macro$KEY.a,
            d = _cc$macro$KEY.d,
            s = _cc$macro$KEY.s,
            w = _cc$macro$KEY.w;

        switch (event.keyCode) {
            case a:
                this.state.isMovingLeft = false;
                break;
            case d:
                this.state.isMovingRight = false;
                break;
            case w:
                // this._steerVertical({ isForward: true });
                break;
            case s:
                // this._steerVertical({ isForward: false });
                break;
        }
        var isMovingHorizontal = this.state.isMovingLeft && this.state.isMovingRight;
        var isMoving = (this.state.isMovingLeft || this.state.isMovingRight) && !isMovingHorizontal;
        this.state.isMoving = isMoving;

        if (!isMoving) this._sprite.spriteFrame = this.steerForward;
    },
    shootCommand: function shootCommand() {
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.parent = this.bulletHolder;
        bullet.position = this.node.getPosition();
    },
    onKeyDown: function onKeyDown(event) {
        var _cc$macro$KEY2 = cc.macro.KEY,
            a = _cc$macro$KEY2.a,
            d = _cc$macro$KEY2.d,
            s = _cc$macro$KEY2.s,
            w = _cc$macro$KEY2.w;

        switch (event.keyCode) {
            case a:
                this._steerHorizontal({ isRight: false });
                this.state.isMovingLeft = true;
                break;
            case d:
                this._steerHorizontal({ isRight: true });
                this.state.isMovingRight = true;
                break;
            case w:
                this._steerVertical({ isForward: true });
                break;
            case s:
                this._steerVertical({ isForward: false });
                break;
        }
        var isMovingHorizontal = this.state.isMovingLeft && this.state.isMovingRight;
        this.state.isMoving = (this.state.isMovingLeft || this.state.isMovingRight) && !isMovingHorizontal;
    },
    _steerHorizontal: function _steerHorizontal(_ref) {
        var _ref$isRight = _ref.isRight,
            isRight = _ref$isRight === undefined ? true : _ref$isRight;

        if (isRight) this._sprite.spriteFrame = this.steerRight;else this._sprite.spriteFrame = this.steerLeft;
    },
    update: function update(dt) {
        var _state = this.state,
            isMovingLeft = _state.isMovingLeft,
            isMovingRight = _state.isMovingRight,
            isMoving = _state.isMoving;

        if (!isMoving) return;
        if (isMovingLeft) this.node.x += this.speed * -1 * dt;
        if (isMovingRight) this.node.x += this.speed * dt;
    },
    _steerVertical: function _steerVertical(_ref2) {
        var _ref2$isForward = _ref2.isForward,
            isForward = _ref2$isForward === undefined ? true : _ref2$isForward;

        if (this.verticalTween) this.verticalTween.stop();
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
        