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
            isMovingForward: false,
            isMovingBackward: false,
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
                this.state.isMovingForward = false;
                // this._steerVertical({ isForward: true });
                break;
            case s:
                this.state.isMovingBackward = false;
                // this._steerVertical({ isForward: false });
                break;
        }
        this._updateState();

        if (!this.state.isMoving) this._sprite.spriteFrame = this.steerForward;
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
                this.state.isMovingForward = true;
                break;
            case s:
                this._steerVertical({ isForward: false });
                this.state.isMovingBackward = true;
                break;
        }
        this._updateState();
    },

    _updateState() {
        const { isMovingLeft, isMovingRight, isMovingBackward, isMovingForward } = this.state
        const isStopMovingHorizontal = isMovingLeft && isMovingRight;
        const isStopMovingVertical = isMovingForward && isMovingBackward;
        const isMoving = !isStopMovingHorizontal && !isStopMovingVertical || isMovingLeft
            || isMovingRight || isMovingBackward || isMovingForward;
        this.state.isMoving = isMoving;
    },

    _steerHorizontal({ isRight = true }) {
        if (isRight) this._sprite.spriteFrame = this.steerRight;
        else this._sprite.spriteFrame = this.steerLeft;
    },

    update(dt) {
        const { isMovingLeft, isMovingRight, isMoving, isMovingForward, isMovingBackward } = this.state
        if (!isMoving) return;
        if (isMovingLeft) this.node.x += this.speed * -1 * dt;
        if (isMovingRight) this.node.x += this.speed * dt;
        if (isMovingForward) this.node.y += this.speed * dt;
        if (isMovingBackward) this.node.y += this.speed * dt * -1;
    },

    _steerVertical({ isForward = true }) {
        if (this.verticalTween) this.verticalTween.stop();
    },
});
