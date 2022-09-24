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
        this.node.state = this.state = {
            isMoving: false,
            isMovingLeft: false,
            isMovingRight: false,

        };
    },

    onKeyUp(event) {
        if (event.keyCode == cc.macro.KEY.space) {
            return shootCommand();
        }
        const { a, d, s, w } = cc.macro.KEY;
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
        const isMovingHorizontal = this.state.isMovingLeft && this.state.isMovingRight;
        const isMoving = (this.state.isMovingLeft || this.state.isMovingRight) && !isMovingHorizontal;
        this.state.isMoving = isMoving;

        if (!isMoving) this._sprite.spriteFrame = this.steerForward;
    },

    shootCommand() {
        const bullet = cc.instantiate(this.bulletPrefab);
        bullet.parent = this.bulletHolder;
        bullet.position = this.node.getPosition();
    },

    onKeyDown(event) {
        const { a, d, s, w } = cc.macro.KEY;
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
        const isMovingHorizontal = this.state.isMovingLeft && this.state.isMovingRight;
        this.state.isMoving = (this.state.isMovingLeft || this.state.isMovingRight) && !isMovingHorizontal;
    },

    _steerHorizontal({ isRight = true }) {
        if (isRight) this._sprite.spriteFrame = this.steerRight;
        else this._sprite.spriteFrame = this.steerLeft;
    },

    update(dt) {
        const { isMovingLeft, isMovingRight, isMoving } = this.state
        if (!isMoving) return;
        if (isMovingLeft) this.node.x += this.speed * -1 * dt;
        if (isMovingRight) this.node.x += this.speed * dt;
    },

    _steerVertical({ isForward = true }) {
        if (this.verticalTween) this.verticalTween.stop();
    },
});
