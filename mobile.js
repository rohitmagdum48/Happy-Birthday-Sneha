let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  rotating = false;

  init(paper) {
    // Event listener for mouse and touch move
    const moveHandler = (e) => {
      e.preventDefault();
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;

      if (!this.rotating) {
        this.velX = x - this.prevX;
        this.velY = y - this.prevY;
      }

      if (this.holdingPaper) {
        this.currentX += this.velX;
        this.currentY += this.velY;

        paper.style.transform = `translateX(${this.currentX}px) translateY(${this.currentY}px) rotateZ(${this.rotation}deg)`;
        this.prevX = x;
        this.prevY = y;
      }
    };

    // Event listener for mouse and touch start
    const startHandler = (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;

      this.startX = x;
      this.startY = y;
      this.prevX = x;
      this.prevY = y;
    };

    // Event listener for mouse and touch end
    const endHandler = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    // Mouse and touch events
    paper.addEventListener('mousemove', moveHandler);
    paper.addEventListener('touchmove', moveHandler);
    
    paper.addEventListener('mousedown', startHandler);
    paper.addEventListener('touchstart', startHandler);

    window.addEventListener('mouseup', endHandler);
    window.addEventListener('touchend', endHandler);
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
