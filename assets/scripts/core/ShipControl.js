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
        this._canMoveHorizontally = true;
        this._canMoveVertically = true;
    },

    onKeyUp(event) {
        if (event.keyCode == cc.macro.KEY.space) {
            const bullet = cc.instantiate(this.bulletPrefab);
            bullet.parent = this.bulletHolder;
            bullet.position = this.node.getPosition();
            return;
        }
        const isReturnToIdle = event.keyCode === cc.macro.KEY.d || event.keyCode === cc.macro.KEY.a;
        if (isReturnToIdle) {
            this._canMoveHorizontally = true;
            this._sprite.spriteFrame = this.steerForward;
            if (this.horizontalTween) this.horizontalTween.stop();
        }

        const stopVertical = event.keyCode == cc.macro.KEY.w || event.keyCode == cc.macro.KEY.s;
        if (stopVertical) {
            this._canMoveVertically = true;
            this.verticalTween.stop();
        }

        cc.warn(isReturnToIdle);
    },

    onKeyDown(event) {
        if (this._canMoveHorizontally) {
            this._canMoveHorizontally = false;
            if (this.horizontalTween) this.horizontalTween.stop();

            if (event.keyCode == cc.macro.KEY.d) {
                this._steerHorizontal({ isRight: true });
            }

            if (event.keyCode == cc.macro.KEY.a) {
                this._steerHorizontal({ isRight: false });
            }
        }

        if (this._canMoveVertically) {
            this._canMoveVertically = false;
            if (this.verticalTween) this.verticalTween.stop();

            if (event.keyCode == cc.macro.KEY.w) {
                this._steerVertical({ isForward: true });
            }
            if (event.keyCode == cc.macro.KEY.s) {
                this._steerVertical({ isForward: false });
            }
        }
    },

    _steerHorizontal({ isRight = true }) {
        this._changeStatic(isRight);

        this.horizontalTween = cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .by(1, { x: isRight ? this.speed : this.speed * -1 })
            ).start();
    },

    _steerVertical({ isForward = true }) {
        this.verticalTween = cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .by(1, { y: isForward ? this.speed : this.speed * -1 })
            ).start();
    },

    _changeStatic(isRight) {
        if (isRight) this._sprite.spriteFrame = this.steerRight;
        else this._sprite.spriteFrame = this.steerLeft;
    }
});
