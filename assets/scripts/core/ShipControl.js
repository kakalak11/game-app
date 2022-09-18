cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: cc.Prefab,
        bulletHolder: cc.Node,

        steerLeft: cc.SpriteFrame,
        steerRight: cc.SpriteFrame,
        steerForward: cc.SpriteFrame,
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
        if (isReturnToIdle) this._sprite.spriteFrame = this.steerForward;
        cc.warn(isReturnToIdle);
    },

    onKeyDown(event) {
        if (event.keyCode == cc.macro.KEY.a) {
            this._steerHorizontal({ isLeft: true });
        } else if (event.keyCode == cc.macro.KEY.d) {
            this._steerHorizontal({ isLeft: false });
        }
    },

    _steerHorizontal({ isLeft = true }) {
        if (isLeft) this._sprite.spriteFrame = this.steerLeft;
        else this._sprite.spriteFrame = this.steerRight;
    }
});
