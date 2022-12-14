cc.Class({
    extends: cc.Component,

    properties: {
        speed: 100,
    },

    ctor() {
        this.canvasSize = cc.view._originalDesignResolutionSize;
    },

    onLoad() {
        cc.tween(this.node).repeatForever(
            cc.tween()
                .by(1, { y: this.speed }))
            .start();
    },

    update() {
        if (this.node.y > this.canvasSize.width + this.node.width) {
            this.node.destroy();
        }
    },

    onCollisionEnter(other, self) {
        console.log('on collision enter');
        this.node.destroy();

        const eventObj = new cc.Event.EventCustom('BULLET_IMPACT', true);
        eventObj.position = this.node.getPosition();

        this.node.dispatchEvent(eventObj);
    },

    onDestroy() {
        cc.log('Bullet destroyed');
    },
});
