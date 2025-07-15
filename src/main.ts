import {
  Application,
  Assets,
  Container,
  Graphics,
  RenderTexture,
  Sprite,
  Texture,
} from "pixi.js";

(async () => {
  // Create a new application
  const app = new Application();

  let key = {
    y: 0,
    x: 0,
    dash: false,
  };
  window.addEventListener("keydown", (ev) => {
    switch (ev.key) {
      case "ArrowUp":
      case "w":
        key.y = -1;
        break;
      case "ArrowDown":
      case "s":
        key.y = 1;
        break;
      case "ArrowLeft":
      case "a":
        key.x = -1;
        break;
      case "ArrowRight":
      case "d":
        key.x = 1;
        break;
      case "Shift":
        key.dash = true;
        break;
    }
  });

  window.addEventListener("keyup", (ev) => {
    switch (ev.key) {
      case "ArrowUp":
      case "w":
        key.y = 0;
        break;
      case "ArrowDown":
      case "s":
        key.y = 0;
        break;
      case "ArrowLeft":
      case "a":
        key.x = 0;
        break;
      case "ArrowRight":
      case "d":
        key.x = 0;
        break;
      case "Shift":
        key.dash = false;
        break;
    }
  });

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const bg = new Sprite({
    texture: Texture.EMPTY,
    width: app.screen.width,
    height: app.screen.height,
    interactive: true,
  });

  app.stage.addChild(bg);

  // Create a bunny Sprite
  const bunny = new Sprite({
    texture: await Assets.load("/assets/bunny.png"),
    anchor: 0.5,
    position: { x: app.screen.width / 2, y: app.screen.height / 2 },
  });

  // Add the bunny to the stage
  app.stage.addChild(bunny);

  const graphics = new Graphics().circle(0, 0, 15).fill("white");

  const container = new Container();

  app.stage.addChild(container);

  let bullets: Sprite[] = [];

  bg.on("pointerdown", (ev) => {
    console.log(ev);
    const bullet = new Sprite({
      anchor: 0.5,
    });
    bullet.addChild(graphics.clone());
    container.addChild(bullet);
    bullets.push(bullet);
  });

  // Listen for animate update
  app.ticker.add((time) => {
    // console.log(key);
    let double = 1;
    if (key.dash) {
      double = 3;
    }
    if (key.x != 0) {
      bunny.x += key.x * time.deltaTime * double;
    }
    if (key.y != 0) {
      bunny.y += key.y * time.deltaTime * double;
    }
      bullets.forEach((v,i,array)=>{
      console.log(array[i])
    })
  });
})();
