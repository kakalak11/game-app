cc.Class({
    extends: cc.Component,

    properties: {
        steerLeft: cc.SpriteFrame,
        steerRight: cc.SpriteFrame,
        steerForward: cc.SpriteFrame,
        ship: cc.Node,

        speed: 500,
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        this._sprite = this.ship.getComponentInChildren(cc.Sprite);
        this._canMoveHorizontally = true;
        this._canMoveVertically = true;
        this._isMovingY = true;
        this._isMovingX = true;
        this.directionX = 0;
        this.directionY = 0;
    },

    onKeyUp(event) {
        if (event.keyCode == cc.macro.KEY.space) {
            this.node.emit('BULLET_FIRE', this.ship.position);
            return;
        }
        const isStopX = event.keyCode === cc.macro.KEY.d || event.keyCode === cc.macro.KEY.a;
        if (isStopX) {
            this._sprite.spriteFrame = this.steerForward;
            this.directionX = 0;
            this.callbackX && this.callbackX();
            this.callbackX = null;
        }
        const isStopY = event.keyCode == cc.macro.KEY.w || event.keyCode == cc.macro.KEY.s;
        if (isStopY) {
            this._canMoveVertically = true;
            this.directionY = 0;
            this.callbackY && this.callbackY();
            this.callbackY = null;
        }
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.d:
                this.directionX = 1;
                if (this.directionX != 0) this.callbackX = () => this.directionX = 1;
                break;
            case cc.macro.KEY.a:
                this.directionX = -1;
                if (this.directionX != 0) this.callbackX = () => this.directionX = -1;
                break;
            case cc.macro.KEY.w:
                this.directionY = 1;
                if (this.directionY != 0) this.callbackY = () => this.directionY = 1;
                break;
            case cc.macro.KEY.s:
                this.directionY = -1;
                if (this.directionY != 0) this.callbackY = () => this.directionY = -1;
                break;
        }
    },

    update() {
        if (this._isMovingX) {
            this.ship.x += this.speed * this.directionX;
        }
        if (this._isMovingY) {
            this.ship.y += this.speed * this.directionY;
        }
    },

    _changeStatic(isRight) {
        if (isRight) this._sprite.spriteFrame = this.steerRight;
        else this._sprite.spriteFrame = this.steerLeft;
    }
});
