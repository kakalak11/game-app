cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: cc.Prefab,
        bulletHolder: cc.Node,

        steerLeft: cc.SpriteFrame,
        steerRight: cc.SpriteFrame,
        steerForward: cc.SpriteFrame,

        speed: 500,
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        this._sprite = this.node.getComponentInChildren(cc.Sprite);
    },

    onKeyUp(event) {
        if (event.keyCode == cc.macro.KEY.space) {
            const bullet = cc.instantiate(this.bulletPrefab);
            bullet.parent = this.bulletHolder;
            bullet.position = this.node.getPosition();
        }

        const isReturnToIdle = event.keyCode === cc.macro.KEY.d || event.keyCode === cc.macro.KEY.a;
        if (isReturnToIdle) {
            this._sprite.spriteFrame = this.steerForward;
            if (this.horizontalTween) this.horizontalTween.stop();
        }

        const stopVertical = event.keyCode == cc.macro.KEY.w || event.keyCode == cc.macro.KEY.s;
        if (stopVertical) this.verticalTween.stop();

        cc.warn(isReturnToIdle);
    },

    onKeyDown(event) {
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

    _steerHorizontal({ isRight = true }) {
        if (isRight) this._sprite.spriteFrame = this.steerLeft;
        else this._sprite.spriteFrame = this.steerRight;
        if (this.horizontalTween) this.horizontalTween.stop();

        this.horizontalTween = cc.tween(this.node).repeatForever(cc.tween().by(1, { x: isRight ? this.speed : this.speed * -1 })).start();
    },

    _steerVertical({ isForward = true }) {
        if (this.verticalTween) this.verticalTween.stop();

        this.verticalTween = cc.tween(this.node).repeatForever(cc.tween().by(1, { y: isForward ? this.speed : this.speed * -1 })).start();
    },
});
