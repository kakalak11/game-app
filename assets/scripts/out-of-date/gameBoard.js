// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        tilePrefab: cc.Prefab,
        _tilesMatrix: [],
        _temp: [],
        _time: 0.25 / 8,
        _check: true,
        _combined: false,
        _skip: false,
        _turn: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    //Move logic

    _moveRow: function (directionRight) {
        this._tilesMatrix.forEach((element, rowIndex) => {
            let numbers = element.filter(element => element.active);
            let zeros = element.filter(element => !element.active);
            directionRight ? element = zeros.concat(numbers) : element = numbers.concat(zeros);
            for (let i = 0; i < 4; i++) this._tilesMatrix[rowIndex][i] = element.shift();
        });
        return;
    },

    _moveCollumn: function (directionDown, adjust) {
        for (let i = 0; i < 4; i++) {
            let collumn = [];
            for (let j = 0; j < 4; j++) collumn.push(this._tilesMatrix[j][i]);
            let numbers = collumn.filter(element => element.active);
            let zeros = collumn.filter(element => !element.active);
            directionDown ? collumn = zeros.concat(numbers) : collumn = numbers.concat(zeros);
            for (let j = 0; j < 4; j++) this._tilesMatrix[j][i] = collumn.shift();
        }
        return;
    },

    //Combine logic

    _combineRow: function (directionRight) {
        this._tilesMatrix.forEach((element, index) => {
            directionRight ? this.array = element.reverse() : this.array = element;
            this.array.forEach((element, index, array) => {
                if (this.skip) {
                    this.skip = false;
                    return;
                }
                this.nextElement = array[index + 1];
                this.elementScript = element.getComponent('tilesScript');
                if (this.nextElement === undefined) return;
                this.nextElementScript = this.nextElement.getComponent('tilesScript');
                if (this.elementScript.number === 0) return;
                if (this.elementScript.number === this.nextElementScript.number) {
                    this.skip = true;
                    this.elementScript.setNumber(this.elementScript.number *= 2);
                    element.runAction(cc.sequence(cc.scaleTo(this._time / 2, 1.25), cc.scaleTo(this._time / 2, 1)));
                    this.nextElementScript.moveCombine(element.getPosition(cc.v2()), this._time / 2);
                    this._combined = true;
                }
            });
            directionRight ? this.array.reverse() : null;
        });
        return;
    },

    _combineCollumn: function (directionDown) {

        for (let i = 0; i < 4; i++) {
            this.collumn = [];
            for (let j = 0; j < 4; j++) {
                this.collumn.push(this._tilesMatrix[j][i]);
            }
            directionDown ? this.collumn.reverse() : null;
            this.collumn.forEach((element, index, array) => {
                if (this.skip) {
                    this.skip = false;
                    return;
                }
                this.nextElement = array[index + 1];
                this.elementScript = element.getComponent('tilesScript');
                if (this.nextElement === undefined) return;
                this.nextElementScript = this.nextElement.getComponent('tilesScript');
                if (this.elementScript.number === 0) return;
                if (this.elementScript.number === this.nextElementScript.number) {
                    this.skip = true;
                    this.elementScript.setNumber(this.elementScript.number *= 2);
                    element.runAction(cc.sequence(cc.scaleTo(this._time / 2, 1.25), cc.scaleTo(this._time / 2, 1)));
                    this.nextElementScript.moveCombine(element.getPosition(cc.v2()), this._time / 2);
                    this._combined = true;
                }
            });
            directionDown ? this.collumn.reverse() : null;
        }
        return;
    },

    // Board logic

    _adjustPosition: function () {
        this._tilesMatrix.forEach((element, rowIndex) => element.forEach((element, collumnIndex) => {
            if (element.active) {
                let lastPos = element.getPosition(cc.v2());
                this.action = cc.sequence(
                    cc.moveTo(this._time, -157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex),
                    cc.callFunc(() => {
                        let currentPos = element.getPosition(cc.v2());
                        if (Math.abs(Math.floor(lastPos.x - currentPos.x)) > 25 || Math.abs(Math.floor(lastPos.y - currentPos.y)) > 25) {
                            this._check = true;
                        }
                    }),
                );
                element.runAction(this.action);
                return;
            } else {
                element.setPosition(cc.v2(-157.5 + 105 * collumnIndex, 157.5 - 105 * rowIndex));
                return;
            }
        }));
        this.scheduleOnce(() => {
            if (this._combined) {
                Emitter.instance.emit('sound', 'combine');
                this._combined = false;
            }
            this._generateRandomValue();
            Emitter.instance.emit('updateScore', this._turn);
            Emitter.instance.emit('canMove');
        }, this._time * 2);
        return;
    },

    _generateRandomValue() {
        if (!this._check) {
            return;
        }
        do {
            this.randomCollumn = Math.floor(Math.random() * 4);
            this.randomRow = Math.floor(Math.random() * 4);
            if (this._tilesMatrix.flat().every(element => element.active)) {
                return;
            }
        } while (this._tilesMatrix[this.randomRow][this.randomCollumn].active);
        this.randomTile = this._tilesMatrix[this.randomRow][this.randomCollumn];
        this.number = this.randomTile.getComponent('tilesScript');
        this.randomTile.active = true;
        this.randomTile.scale = 0;
        this.number.setNumber(Math.random() > 0.7 ? 4 : 2);
        this.randomTile.setPosition(cc.v2(-157.5 + 105 * this.randomCollumn, 157.5 - 105 * this.randomRow));
        this.randomTile.runAction(cc.sequence(cc.scaleTo(this._time, 1), cc.callFunc(() => {
            this.node.emit('checkWin');
            this.node.emit('checkLose');
        })));
        this._check = false;
    },

    _setupGrid() {
        let numberIndex = 1;
        this._tilesMatrix.push([], [], [], []);
        for (let collumn = 0; collumn < 4; collumn++) {
            for (let row = 0; row < 4; row++) {
                this.tile = cc.instantiate(this.tilePrefab);
                this.tile.active = false;
                this.tile.on('mousedown', this._onClick, this.tile);
                this.tile.name = `tile ${numberIndex++}`;
                this.tile.setPosition(cc.v2(-157.5 + 105 * row, 157.5 - 105 * collumn));
                this._tilesMatrix[Number(String((this.tile.getPosition().y - 157.5) * -1)[0])][Number(String(this.tile.getPosition().x + 157.5)[0])] = this.tile;
                this.node.addChild(this.tile);
            }
        }
        // if (playing) return;
        for (let i = 0; i < 2; i++) {
            this._check = true;
            this._generateRandomValue();
        }
        Emitter.instance.emit('canMove', false);

        this._check = false;
    },

    _checkWin: function () {
        let win = false;
        this._tilesMatrix.flat().forEach(element => element.getComponent('tilesScript').number === 2048 ? win = true : null);
        if (win) {
            cc.log('you have won');
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
            this.scheduleOnce(() => {
                Emitter.instance.emit('win');
                Emitter.instance.emit('canMove', false);
            }, 0.5);
            return true;
        }
        return false;
    },

    _checkLose: function () {
        if (!this._tilesMatrix.flat().every(element => element.active)) return;
        this.checkRow = this._tilesMatrix.every((element) => {
            if (element.every((element, index, array) => {
                if (array[index + 1] === undefined) return true;
                this.number = element.getComponent('tilesScript').number;
                this.nextNumber = array[index + 1].getComponent('tilesScript').number;
                if (this.number !== this.nextNumber) return true;
                return false;
            })) return true;
            return false;
        });
        this.checkCollumn = this._tilesMatrix.flat().every((element, index, array) => {
            if (array[index + 4] === undefined) return true;
            this.number = element.getComponent('tilesScript').number;
            this.nextNumber = array[index + 4].getComponent('tilesScript').number;
            if (this.number !== this.nextNumber) return true;
            return false;
        });
        if (this.checkCollumn && this.checkRow) {
            cc.log('you have lost');
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
            this.scheduleOnce(() => {
                Emitter.instance.emit('lose');
                Emitter.instance.emit('canMove', false);
            }, 0.5);
            return true;
        }
        return false;
    },

    _reset() {
        this.node.children.forEach(item => item.stopAllActions());
        this.node.children.forEach(element => element.destroy());
        this.node.removeAllChildren(true);
        this._tilesMatrix = [];
        this._temp = [];
        this._turn = 0;
        Emitter.instance.emit('updateScore', this._turn);
        this.node.emit('reset');
        Emitter.instance.emit('canMove', false);
    },

    _undo: function () {
        cc.log('this is undo');
        if (this._temp.length === 0) return;
        let temp = this._temp.pop();
        this._turn--;
        this._tilesMatrix.flat().forEach((element, index) => {
            this.script = element.getComponent('tilesScript');
            // element.setPosition(temp[index].position);
            element.active = temp[index].active;
            this.script.setNumber(temp[index].number);
        });
        Emitter.instance.emit('canMove');
        Emitter.instance.emit('updateScore', this._turn);
    },

    _save: function () {
        this._temp.push([])
        this._tilesMatrix.flat().forEach(element => {
            let data = { position: null, number: 0, active: null };
            data.position = element.getPosition(cc.v2());
            data.number = element.getComponent('tilesScript').number;
            data.active = element.active;
            this._temp[this._turn].push(data);
        });
    },

    _onClick: function () {
        cc.log(this.name);
        this.script = this.getComponent('tilesScript');
        this.script.setNumber(2048);
        return;
    },

    _addEvent: function () {
        // This is the game director
        Emitter.instance.registerEvent('moveRow', (directionRight) => {
            this._save();
            this._turn++;
            this._moveRow(directionRight);
            this._combineRow(directionRight);
            // We can add a callback function here so when the moving animation complete, it can use the callback to continue the game
            this.scheduleOnce(() => {
                this._moveRow(directionRight);
                this._adjustPosition();
            }, this._time);
        }, this);

        Emitter.instance.registerEvent('moveCollumn', (directionDown) => {
            this._save();
            this._turn++;
            this._moveCollumn(directionDown);
            this._combineCollumn(directionDown);
            // We can add a callback function here so when the moving animation complete, it can use the callback to continue the game
            this.scheduleOnce(() => {
                this._moveCollumn(directionDown);
                this._adjustPosition();
            }, this._time);
        }, this);

        // Add events
        this.node.on('checkWin', this._checkWin, this);
        this.node.on('checkLose', this._checkLose, this);
        this.node.on('move', (event) => {
            event.stopPropagation();
            this._check = true;
        }, this);
    },

    onLoad() {
        this._addEvent();
        Emitter.instance.registerEvent('playing', () => this._playing = true);
        Emitter.instance.registerEvent('notPlaying', () => this._playing = false);
        Emitter.instance.registerEvent('start', this._setupGrid.bind(this));
        Emitter.instance.registerEvent('undo', this._undo.bind(this));
    },

    start() {
    },

    update(dt) {
    },
});
