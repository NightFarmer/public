require=function e(t,n,i){function o(s,r){if(!n[s]){if(!t[s]){var d="function"==typeof require&&require;if(!r&&d)return d(s,!0);if(c)return c(s,!0);var h=new Error("Cannot find module '"+s+"'");throw h.code="MODULE_NOT_FOUND",h}var a=n[s]={exports:{}};t[s][0].call(a.exports,function(e){var n=t[s][1][e];return o(n?n:e)},a,a.exports,e,t,n,i)}return n[s].exports}for(var c="function"==typeof require&&require,s=0;s<i.length;s++)o(i[s]);return o}({HelloWorld:[function(e,t,n){"use strict";cc._RFpush(t,"280c3rsZJJKnZ9RqbALVwtK","HelloWorld"),cc.Class({"extends":cc.Component,properties:{label:{"default":null,type:cc.Label},text:"Hello, World!"},onLoad:function(){this.label.string=this.text},update:function(e){}}),cc._RFpop()},{}],bullet:[function(e,t,n){"use strict";cc._RFpush(t,"a4a91np4ABCYbC600YYQC9j","bullet"),cc.Class({"extends":cc.Component,properties:{bullet:{"default":[],type:[cc.Node]},speed:{"default":200,type:Number,visible:!1},audio:{"default":null,url:cc.AudioClip},ground:{"default":null,type:cc.Node,visible:!1}},onLoad:function(){cc.audioEngine.playEffect(this.audio),this.maxX=cc.director.getVisibleSize().height/2},update:function(e){this.node.y+=e*this.speed,this.checkDamage(),this.checkDestory()},checkDestory:function(){this.node.y>this.maxX&&this.node.destroy()},checkDamage:function(){for(var e=this.ground.children,t=e.length-1;t>=0;t--)if(e[t]&&e[t].isValid){var n=Math.abs(e[t].x-this.node.x)<e[t].width/2&&Math.abs(e[t].y-this.node.y)<e[t].height/2;n&&e[t].getComponent("enemy").damage()&&this.node.destroy()}}}),cc._RFpop()},{}],enemyCreator:[function(e,t,n){"use strict";cc._RFpush(t,"99433ZnB49JkKgvQAb+c+Q7","enemyCreator"),cc.Class({"extends":cc.Component,properties:{enemys:{"default":[],type:[cc.Prefab]}},onLoad:function(){this.schedule(this.createOneEnemy.bind(this),.5)},createOneEnemy:function(){var e=Math.floor(this.enemys.length*cc.random0To1()),t=cc.instantiate(this.enemys[e]);t.setPosition(this.newEnemyPosition(t)),this.node.addChild(t)},newEnemyPosition:function(e){return new cc.p(cc.director.getVisibleSize().width/2*cc.randomMinus1To1(),cc.director.getVisibleSize().height/2+e.height/2)}}),cc._RFpop()},{}],enemy:[function(e,t,n){"use strict";cc._RFpush(t,"af0b62VZ69Hf7xr3pgXbs7D","enemy"),cc.Class({"extends":cc.Component,properties:{speed:{"default":200,type:Number,visible:!1},destoryAudio:{"default":null,url:cc.AudioClip},life:{"default":1,type:Number},score:{"default":100,type:Number}},onLoad:function(){this.minX=-cc.director.getVisibleSize().height/2},update:function(e){this.node.y-=e*this.speed,this.checkDestory()},checkDestory:function(){this.node.y<this.minX-this.node.height/2&&this.node.destroy()},damage:function(){return this.life-=1,0===this.life&&this.killed(),this.life>=0?!0:!1},killed:function(){var e=new cc.Event("getScore",!0);e.score=this.score,this.node.dispatchEvent(e),cc.audioEngine.playEffect(this.destoryAudio);var t=this.node.getComponent(cc.Animation),n=0;t&&(t.play(t.getClips()[0]._name),n=1),this.scheduleOnce(function(){this.node.destroy()}.bind(this),n)}}),cc._RFpop()},{}],game:[function(e,t,n){"use strict";cc._RFpush(t,"5ba9fiybSxL57XoZ061Jqqt","game"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){cc.game.addPersistRootNode(this.node)},startGame:function(){cc.director.loadScene("fight")}}),cc._RFpop()},{}],pause:[function(e,t,n){"use strict";cc._RFpush(t,"e46f8Hv35NF151kQH+z8V/O","pause"),cc.Class({"extends":cc.Component,properties:{pauseImg:{"default":null,type:cc.SpriteFrame},startImg:{"default":null,type:cc.SpriteFrame}},onLoad:function(){this.node.on("touchend",function(){cc.director.isPaused()?(cc.director.resume(),this.getComponent(cc.Sprite).spriteFrame=this.pauseImg):(cc.director.pause(),this.getComponent(cc.Sprite).spriteFrame=this.startImg)},this)}}),cc._RFpop()},{}],player:[function(e,t,n){"use strict";cc._RFpush(t,"398e39+LdtHmaPGo/SD8ZDb","player"),cc.Class({"extends":cc.Component,properties:{ground:{"default":null,type:cc.Node},bullets:{"default":[],type:[cc.Prefab]}},onLoad:function(){this._touchAnchor={},this.node.on("touchstart",function(e){var t=e.touch.getLocation();this._touchAnchor=this.node.convertToNodeSpaceAR(t)},this),this.node.on("touchmove",function(e){var t=e.touch.getLocation();t=this.node.parent.convertToNodeSpaceAR(t),this.node.x=t.x-this._touchAnchor.x,this.node.y=t.y-this._touchAnchor.y},this),this.schedule(this.attack.bind(this),.2)},attack:function(){var e=cc.instantiate(this.bullets[0]);e.x=this.node.x,e.y=this.node.y,e.getComponent("bullet").speed=600,e.getComponent("bullet").ground=this.ground,this.node.parent.addChild(e)},checkAttack:function(){for(var e=this.ground.children,t=e.length-1;t>=0;t--)if(e[t]&&e[t].isValid&&e[t].getComponent("enemy").life>0){var n=Math.abs(e[t].x-this.node.x)<e[t].width/4+this.node.width/4&&Math.abs(e[t].y-this.node.y)<e[t].height/4+this.node.height/4;if(n){var i=new cc.Event("playerKilled",!0);this.node.dispatchEvent(i),this.node.getComponent(cc.Animation).play("playerKilled"),this.scheduleOnce(function(){this.node.destroy()}.bind(this),.8)}}},update:function(e){this.checkAttack()}}),cc._RFpop()},{}],scoreListener:[function(e,t,n){"use strict";cc._RFpush(t,"ff113G6EU1IHLS083/7VvAJ","scoreListener"),cc.Class({"extends":cc.Component,properties:{scoreLabel:{"default":null,type:cc.Label}},onLoad:function(){this.score=0,this.node.on("getScore",function(e){this.score+=e.score,this.scoreLabel.string=""+this.score},this),this.node.on("playerKilled",function(e){cc.find("dialog",this.node).active=!0},this)},resetGame:function(){cc.director.loadScene("fight")}}),cc._RFpop()},{}]},{},["HelloWorld","player","game","enemyCreator","bullet","enemy","pause","scoreListener"]);