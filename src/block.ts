export class Block {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor({
    x,
    y,
    width,
    height,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.draw = this.draw.bind(this);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#ff384e";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class BlockMap {
  blocks: Block[];
  stageWidth: number;
  stageHeight: number;
  blockWidth: number;
  blockHeight: number;

  constructor({
    stageWidth,
    stageHeight,
    blockWidth,
    blockHeight,
  }: {
    stageWidth: number;
    stageHeight: number;
    blockWidth: number;
    blockHeight: number;
  }) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.blockWidth = blockWidth;
    this.blockHeight = blockHeight;

    this.blocks = [];
    this.createBlocks = this.createBlocks.bind(this);
    this.draw = this.draw.bind(this);

    this.createBlocks();
  }

  createBlocks() {
    for (let i = 0; i < Math.floor(this.stageWidth / 2); i += this.blockWidth) {
      for (
        let j = 0;
        j < Math.floor(this.stageHeight / 2);
        j += this.blockHeight
      ) {
        this.blocks.push(
          new Block({
            x: i,
            y: j,
            width: this.blockWidth,
            height: this.blockHeight,
          })
        );
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.blocks.forEach((block) => {
      block.draw(ctx);
    });
  }
}
