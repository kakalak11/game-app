"use strict";
cc._RF.push(module, 'a4e11PjIMFMT4Osa70g24BT', 'ShipControl');
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
    },
    onKeyUp: function onKeyUp(event) {
        if (event.keyCode == cc.macro.KEY.space) {
            var bullet = cc.instantiate(this.bulletPrefab);
            bullet.parent = this.bulletHolder;
            bullet.position = this.node.getPosition();
        }

        var isReturnToIdle = event.keyCode === cc.macro.KEY.d || event.keyCode === cc.macro.KEY.a;
        if (isReturnToIdle) {
            this._sprite.spriteFrame = this.steerForward;
            if (this.horizontalTween) this.horizontalTween.stop();
        }

        var stopVertical = event.keyCode == cc.macro.KEY.w || event.keyCode == cc.macro.KEY.s;
        if (stopVertical) this.verticalTween.stop();

        cc.warn(isReturnToIdle);
    },
    onKeyDown: function onKeyDown(event) {
        if (event.keyCode == cc.macro.KEY.d) {
            this._steerHorizontal({ isRight: true });
        } else if (event.keyCode == cc.macro.KEY.a) {
            this._steerHorizontal({ isRight: false });
        } else if (event.keyCode == cc.macro.KEY.w) {
            this._steerVertical({ isForward: true });
        } else if (event.keyCode == cc.macro.KEY.s) {
            this._steerVertical({ isForward: false });
        }
    },
    _steerHorizontal: function _steerHorizontal(_ref) {
        var _ref$isRight = _ref.isRight,
            isRight = _ref$isRight === undefined ? true : _ref$isRight;

        if (isRight) this._sprite.spriteFrame = this.steerLeft;else this._sprite.spriteFrame = this.steerRight;
        if (this.horizontalTween) this.horizontalTween.stop();

        this.horizontalTween = cc.tween(this.node).repeatForever(cc.tween().by(1, { x: isRight ? this.speed : this.speed * -1 })).start();
    },
    _steerVertical: function _steerVertical(_ref2) {
        var _ref2$isForward = _ref2.isForward,
            isForward = _ref2$isForward === undefined ? true : _ref2$isForward;

        if (this.verticalTween) this.verticalTween.stop();

        this.verticalTween = cc.tween(this.node).repeatForever(cc.tween().by(1, { y: isForward ? this.speed : this.speed * -1 })).start();
    }
});

cc._RF.pop();