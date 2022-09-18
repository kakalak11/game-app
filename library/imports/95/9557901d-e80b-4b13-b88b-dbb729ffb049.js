"use strict";
cc._RF.push(module, '95579Ad6AtLE7iL27cp/7BJ', 'EnemyComp');
// scripts/core/EnemyComp.js

'use strict';

cc.Class({
    extends: cc.Component,

    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },
    onCollisionEnter: function onCollisionEnter(other, self) {
        console.log('on collision enter');

        // Collider Manager will calculate the value in world coordinate system, and put them into the world property
        var world = self.world;

        // Collider Component aabb bounding box
        var aabb = world.aabb;

        // The position of the aabb collision frame before the node collision
        var preAabb = world.preAabb;

        // world transform
        var t = world.transform;

        // Circle Collider Component world properties
        var r = world.radius;
        var p = world.position;

        // Rect and Polygon Collider Component world properties
        var ps = world.points;
    }
});

cc._RF.pop();