import { Application, Assets, Graphics, RenderTexture, Sprite, Texture } from "pixi.js";

(async () => {
  let key = {
    y: 0,
    x: 0,
    dash: false,
  };
  window.addEventListener("keydown", (ev) => {
    switch (ev.key) {
      case "ArrowUp":
        key.y = -1;
        break;
      case "ArrowDown":
        key.y = 1;
        break;
      case "ArrowLeft":
        key.x = -1;
        break;
      case "ArrowRight":
        key.x = 1;
        break;
      case "Shift":
       key.dash = true
       break;
    }
  });
  window.addEventListener("keyup", (ev) => {
    switch (ev.key) {
      case "ArrowUp":
        key.y = 0;
        break;
      case "ArrowDown":
        key.y = 0;
        break;
      case "ArrowLeft":
        key.x = 0;
        break;
      case "ArrowRight":
        key.x = 0;
        break;
      case "Shift":
       key.dash = false
       break;
    }
  });
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  // Create a bunny Sprite
  const bunny = new Sprite({
    texture: await Assets.load("/assets/bunny.png"),
    anchor: 0.5,
    position: { x: app.screen.width / 2, y: app.screen.height / 2 },
  });

  // Add the bunny to the stage
  app.stage.addChild(bunny);

  const graphics = new Graphics().circle(0,0,15).fill("white")

 const circle = new Sprite({
  position: {
    x : 50,
    y : 0,
  },
  anchor:0.5
 }).addChild(graphics)

app.stage.addChild(circle)

  // Listen for animate update
  app.ticker.add((time) => {
    console.log(key);
    let double = 1;
    if (key.dash){
      double = 3;
    }
    if (key.x != 0) {
      bunny.x += key.x * time.deltaTime * double;
    }
    if (key.y != 0) {
      bunny.y += key.y * time.deltaTime * double;
    }
    circle.rotation += 0.1 * time.deltaTime
  });
})();