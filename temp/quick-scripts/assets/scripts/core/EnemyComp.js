(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/core/EnemyComp.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '95579Ad6AtLE7iL27cp/7BJ', 'EnemyComp', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=EnemyComp.js.map
        