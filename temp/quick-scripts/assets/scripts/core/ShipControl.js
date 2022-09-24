(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/core/ShipControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a4e11PjIMFMT4Osa70g24BT', 'ShipControl', __filename);
// scripts/core/ShipControl.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        steerLeft: cc.SpriteFrame,
        steerRight: cc.SpriteFrame,
        steerForward: cc.SpriteFrame,
        ship: cc.Node,

        speed: 500
    },

    onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

<<<<<<< HEAD
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
=======
        this._sprite = this.ship.getComponentInChildren(cc.Sprite);
        this._canMoveHorizontally = true;
        this._canMoveVertically = true;
        this._isMovingY = true;
        this._isMovingX = true;
        this.directionX = 0;
        this.directionY = 0;
    },
    onKeyUp: function onKeyUp(event) {
        if (event.keyCode == cc.macro.KEY.space) {
            this.node.emit('BULLET_FIRE', this.ship.position);
            return;
        }
        var isStopX = event.keyCode === cc.macro.KEY.d || event.keyCode === cc.macro.KEY.a;
        if (isStopX) {
            this._sprite.spriteFrame = this.steerForward;
            this.directionX = 0;
            this.callbackX && this.callbackX();
            this.callbackX = null;
        }
        var isStopY = event.keyCode == cc.macro.KEY.w || event.keyCode == cc.macro.KEY.s;
        if (isStopY) {
            this._canMoveVertically = true;
            this.directionY = 0;
            this.callbackY && this.callbackY();
            this.callbackY = null;
        }
    },
    onKeyDown: function onKeyDown(event) {
        var _this = this;

        switch (event.keyCode) {
            case cc.macro.KEY.d:
                this.directionX = 1;
                if (this.directionX != 0) this.callbackX = function () {
                    return _this.directionX = 1;
                };
                break;
            case cc.macro.KEY.a:
                this.directionX = -1;
                if (this.directionX != 0) this.callbackX = function () {
                    return _this.directionX = -1;
                };
                break;
            case cc.macro.KEY.w:
                this.directionY = 1;
                if (this.directionY != 0) this.callbackY = function () {
                    return _this.directionY = 1;
                };
                break;
            case cc.macro.KEY.s:
                this.directionY = -1;
                if (this.directionY != 0) this.callbackY = function () {
                    return _this.directionY = -1;
                };
>>>>>>> e4ea711b27b0d189e11445f28b343159d82b74db
                break;
        }
        var isMovingHorizontal = this.state.isMovingLeft && this.state.isMovingRight;
        this.state.isMoving = (this.state.isMovingLeft || this.state.isMovingRight) && !isMovingHorizontal;
    },
<<<<<<< HEAD
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
=======
    update: function update() {
        if (this._isMovingX) {
            this.ship.x += this.speed * this.directionX;
        }
        if (this._isMovingY) {
            this.ship.y += this.speed * this.directionY;
        }
    },
    _changeStatic: function _changeStatic(isRight) {
        if (isRight) this._sprite.spriteFrame = this.steerRight;else this._sprite.spriteFrame = this.steerLeft;
>>>>>>> e4ea711b27b0d189e11445f28b343159d82b74db
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
        