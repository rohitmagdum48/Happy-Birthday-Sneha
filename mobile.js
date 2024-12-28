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

  init(paper) {
    const moveHandler = (e) => {
      e.preventDefault();
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;

      if (this.holdingPaper) {
        this.velX = x - this.prevX;
        this.velY = y - this.prevY;
        this.currentX += this.velX;
        this.currentY += this.velY;

        paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
        this.prevX = x;
        this.prevY = y;
      }
    };

    const startHandler = (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ++;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;

      this.startX = x;
      this.startY = y;
      this.prevX = x;
      this.prevY = y;
    };

    const endHandler = () => {
      this.holdingPaper = false;
    };

    // Attach event listeners for touch
    paper.addEventListener('touchstart', startHandler);
    paper.addEventListener('touchmove', moveHandler);
    window.addEventListener('touchend', endHandler);
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
