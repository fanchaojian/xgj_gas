import _ from 'lodash';

export class LefaminTouchHandler {
  constructor(ps) { //console.log("LefaminTouchHandler constructor")
    this.ps = ps; Object.assign(this, ps);
    this.confirmDistance = 20; this.confirmRatio = 0.3; this.freq = 2; this.movecount = 0;
    this.p = { x: -1, y: -1 }; this.path = [];

    this.el = (ps.el || document.getElementById(ps.id)); if (!this.els) this.els = [this.el];
    this.els.forEach(el => {
      if (typeof el === 'string') el = document.getElementById(el);
      el.addEventListener("touchstart", this.handleStart.bind(this), { passive: false });
      el.addEventListener("touchend", this.handleEnd.bind(this), { passive: false });
      el.addEventListener("touchcancel", this.handleCancel.bind(this), { passive: false });
      el.addEventListener("touchmove", this.handleMove.bind(this), { passive: false });
    });
  }

  handleStart(event) {
    //console.log("handleStart");
    if (this.prevent) event.preventDefault();
    event.stopImmediatePropagation(); event.stopPropagation();
    this.stopped = false; let t = event.changedTouches[0], x = t.pageX, y = t.pageY;
    this.pds = { x, y }; this.isFromLeft = (x < 10);
    this.p = this.pds; this.pd = { x: 0, y: 0 }; //this.path.push(this.p);
    if (this.start) { this.start(this, this.obj); }
  }

  handleMove(event) {
    //console.log("touch handleMove");
    if ((this.movecount++) % this.freq) return;
    if (this.prevent) event.preventDefault();
    event.stopImmediatePropagation(); event.stopPropagation();
    if (this.stopped || !this.p || !this.pds) return;

    let x, y; let t = event.changedTouches[0]; x = t.pageX; y = t.pageY;
    this.pr = this.p; this.p = { x, y };   //console.log('touch move postion:',this.p.x, this.p.y);
    this.pd = { x: x - this.pr.x, y: y - this.pr.y }; this.path.push(this.pd); this.pd2 = { x: x - this.pds.x, y: y - this.pds.y }; let pd2 = this.pd2;
    if (this.move) this.move(this, this.obj);

    if (this.gesture) {
      if (pd2.x > this.confirmDistance && Math.abs(pd2.y / pd2.x) < this.confirmRatio && this.right) {
        this.stopped = true;
        if (this.isFromLeft && this.fromLeft) this.fromLeft(this, this.obj); else this.right(this, this.obj);
      }
      else if (pd2.x < -this.confirmDistance && Math.abs(pd2.y / pd2.x) < this.confirmRatio && this.left) {
        this.stopped = true; this.left(this, this.obj);
      }
      if (pd2.y > this.confirmDistance && Math.abs(pd2.x / pd2.y) < this.confirmRatio && this.down) {
        this.stopped = true; this.down(this, this.obj);
      }
      if (pd2.y < -this.confirmDistance && Math.abs(pd2.x / pd2.y) < this.confirmRatio && this.up) {
        this.stopped = true; this.up(this, this.obj);
      }
    }
  }

  handleEnd(event) {
    //console.log("handleEnd");
    if (this.prevent) event.preventDefault();
    event.stopImmediatePropagation(); event.stopPropagation();
    if (this.end) this.end(this, this.obj); // console.log(this.path);
    if (this.path.length < 2) return;
    let x = _.meanBy(this.path, (p) => Math.abs(p.x));
    let y = _.meanBy(this.path, (p) => Math.abs(p.y));
    let last = this.path.last(); this.lastDiff = last; let lastx = (last.x), lasty = (last.y); //console.log({x,y,lastx, lasty})
    if (Math.abs(lastx) > 20 && Math.abs(lastx) > x && this.fastx) this.fastx(this, this.obj);
    if (Math.abs(lasty) > 20 && Math.abs(lasty) > y && this.fasty) this.fasty(this, this.obj);
    //if (this.stopped) return;
    //if (this.click) this.click();
  }

  handleCancel(event) {
    if (this.prevent) event.preventDefault();
    event.stopImmediatePropagation(); event.stopPropagation();
  }

}



