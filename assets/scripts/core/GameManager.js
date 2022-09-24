cc.Class({
    extends: cc.Component,

    properties: {
        bulletHolder: cc.Node,
        impactHolder: cc.Node,

        bulletPrefab: cc.Prefab,
        impactPrefab: cc.Prefab,
    },

    onLoad() {
        this.bulletHolder.on('BULLET_IMPACT', this.createImpactVFX, this);
        this.node.on('BULLET_FIRE', this.createBullet, this);
    },

    createImpactVFX({ position }) {
        const impact = cc.instantiate(this.impactPrefab);
        impact.parent = this.impactHolder;
        impact.setPosition(position);
        impact.getComponent(cc.Animation).play();
    },

    createBullet({ position }) {
        const bullet = cc.instantiate(this.bulletPrefab);
        bullet.parent = this.bulletHolder;
        bullet.position = position;
    }
});
