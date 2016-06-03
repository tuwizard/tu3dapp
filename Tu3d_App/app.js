/// <reference path="phaser.d.ts"/>
var player;
var platforms;
var cursors;
var stars;
var score = 0;
var scoreText;
var Tu3dApps = (function () {
    function Tu3dApps() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create,
            update: this.update
        });
    }
    //players: any;
    //--1--
    Tu3dApps.prototype.preload = function () {
        this.game.stage.backgroundColor = '#FDEEF4';
        this.game.load.image('tuphan', 'assets/TuPhan.jpg');
        this.game.load.image('cplogo', 'assets/creativityandpassion.png');
        this.game.load.image('ground', 'assets/games/platform.png');
        this.game.load.image('star', 'assets/games/star.png');
        this.game.load.spritesheet('littleBobo', 'assets/games/dude.png', 32, 48);
    };
    //--2--
    Tu3dApps.prototype.create = function () {
        //--set up
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.add.sprite(0, 0, 'tuphan');
        platforms = this.game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, this.game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        /*var cplogo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'cplogo');
        cplogo.anchor.setTo(0.5, 0.5);
        cplogo.scale.setTo(0.2, 0.2);
        this.game.add.tween(cplogo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);*/
        var cplogo = platforms.create(this.game.world.centerX, 436, 'cplogo');
        cplogo.anchor.setTo(0.5, 0.5);
        cplogo.scale.setTo(0.2, 0.2);
        this.game.add.tween(cplogo.scale).to({ x: 0.8, y: 0.8 }, 2000, Phaser.Easing.Bounce.Out, true);
        cplogo.body.immovable = true;
        //var ledge = platforms.create(400, 400, 'ground');
        //ledge.body.immovable = true;
        //ledge = platforms.create(-150, 250, 'ground');
        //ledge.body.immovable = true;
        player = this.game.add.sprite(32, this.game.world.height - 150, 'littleBobo');
        this.game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        stars = this.game.add.group();
        stars.enableBody = true;
        for (var i = 0; i < 12; i++) {
            var star = stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        scoreText = this.game.add.text(300, 16, 'Little Bobo Adventure score: 0', { fontSize: '26px', fill: '#000' });
        //--user control
        cursors = this.game.input.keyboard.createCursorKeys();
    };
    //--3--
    Tu3dApps.prototype.update = function () {
        //  Collide the player and the stars with the platforms
        this.game.physics.arcade.collide(player, platforms);
        this.game.physics.arcade.collide(stars, platforms);
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.game.physics.arcade.overlap(player, stars, collectStar, null, this);
        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -150;
            player.animations.play('left');
        }
        else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 150;
            player.animations.play('right');
        }
        else {
            //  Stand still
            player.animations.stop();
            player.frame = 4;
        }
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -400;
        }
    };
    return Tu3dApps;
})();
function collectStar(player, star) {
    // Removes the star from the screen
    star.kill();
    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;
}
window.onload = function () {
    var game = new Tu3dApps();
};
//# sourceMappingURL=app.js.map