const Application = PIXI.Application;

const app = new Application({
  transparent: false,
  antialias: false,
});

app.renderer.backgroundColor = 0x23395D;

app.renderer.resize(window.innerWidth, window.innerHeight)

app.renderer.view.style.position = 'absolute'

document.body.appendChild(app.view)

let keys = {};
let playerSheet = {};

app.loader.add("batman", "images/batman.png")
app.loader.load(doneLoading);

function doneLoading(e) {
  createPlayerSheet()
  createPlayer()
  app.ticker.add(moveBatman)
}

function createPlayerSheet() {
  let sheet = new PIXI.BaseTexture.from(app.loader.resources["batman"].url);
  let w = 36;
  let h = 43;

  playerSheet["standEast"] = [
    new PIXI.Texture(sheet, new PIXI.Rectangle(67, 0, w, h))
  ];

  playerSheet["walkEast"] = [
    new PIXI.Texture(sheet, new PIXI.Rectangle(4, 113, 56, 40)),
    new PIXI.Texture(sheet, new PIXI.Rectangle(60, 113, 53, 40)),
    new PIXI.Texture(sheet, new PIXI.Rectangle(113, 113, 52, 39)),
    new PIXI.Texture(sheet, new PIXI.Rectangle(165, 113, 43, 38)),
    new PIXI.Texture(sheet, new PIXI.Rectangle(208, 113, 45, 42)),
    new PIXI.Texture(sheet, new PIXI.Rectangle(253, 114, 58, 37)),
    new PIXI.Texture(sheet, new PIXI.Rectangle(312, 113, 56, 37)),
    new PIXI.Texture(sheet, new PIXI.Rectangle(368, 113, 52, 39)),
    new PIXI.Texture(sheet, new PIXI.Rectangle(420, 113, 45, 41)),
  ]

  playerSheet["walkWest"] = [
    new PIXI.Texture(sheet, new PIXI.Rectangle(4, 113, 56, 40)),
    new PIXI.Texture(sheet, new PIXI.Rectangle(60, 113, 53, 40)),
    new PIXI.Texture(sheet, new PIXI.Rectangle(113, 113, 52, 39)),
    new PIXI.Texture(sheet, new PIXI.Rectangle(165, 113, 43, 38)),
    new PIXI.Texture(sheet, new PIXI.Rectangle(208, 113, 45, 42)),
    new PIXI.Texture(sheet, new PIXI.Rectangle(253, 114, 58, 37)),
    new PIXI.Texture(sheet, new PIXI.Rectangle(312, 113, 56, 37)),
    new PIXI.Texture(sheet, new PIXI.Rectangle(368, 113, 52, 39)),
    new PIXI.Texture(sheet, new PIXI.Rectangle(420, 113, 45, 41)),
  ]
}

function createPlayer() {
  player = new PIXI.AnimatedSprite(playerSheet.standEast);
  player.anchor.set(0.5);
  player.animationSpeed = 0.2;
  player.loop = false;
  player.x = app.view.width / 2;
  player.y = app.view.height / 2;
  player.scale.set(2)
  app.stage.addChild(player);
  player.play();
}

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

function keyDown(e) {
  keys[e.keyCode] = true;
  e.preventDefault()
}

function keyUp(e) {
  keys[e.keyCode] = false;
  e.preventDefault()
  player.textures = playerSheet.standEast;
  
}

function moveBatman() {
  
  if (keys['38']) {
    player.y -= 5
  }

  if (keys['37']) {
    if (!player.playing) {
      player.textures = playerSheet.walkWest;
      if (player.scale.x > 0) {
        player.scale.x *= -1
      }
      player.play()
    }
    player.x -= 5
  }

  if (keys['40']) {
    player.y += 5

  }

  if (keys['39']) {
    if (!player.playing) {
      player.textures = playerSheet.walkEast;
      if (player.scale.x < 0) {
        player.scale.x *= -1
      }
      player.play()
    }
    player.x += 5
  }

}
