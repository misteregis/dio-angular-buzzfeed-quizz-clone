import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css'],
})
export class ZoomComponent implements OnInit {
  percentageText!: string;
  percentage: number = 1;
  _fontSize: number = 16;
  fontSize = this._fontSize;
  max: number = 1.5;
  min: number = 0.5;
  step = this.fontSize * 0.1;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setPercentage();
  }

  setFontSize(): void {
    const newFontSize = this.fontSize + 'px';

    this.percentage = parseFloat((this.fontSize / this._fontSize).toFixed(1));
    this.renderer.setStyle(document.documentElement, 'font-size', newFontSize);

    this.setPercentage();
  }

  setPercentage(): void {
    const percentage = Math.round(this.percentage * 100);

    this.percentageText = `${percentage}%`;
  }

  zoomIn(): void {
    const fontSize = parseFloat((this.fontSize / this._fontSize).toFixed(1));

    if (fontSize < this.max) {
      this.fontSize += this.step;
      this.setFontSize();
    }
  }

  zoomOut(): void {
    const fontSize = parseFloat((this.fontSize / this._fontSize).toFixed(1));

    if (fontSize > this.min) {
      this.fontSize -= this.step;
      this.setFontSize();
    }
  }
}
