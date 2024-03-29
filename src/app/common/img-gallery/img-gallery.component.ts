import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-gallery',
  templateUrl: './img-gallery.component.html',
  styleUrls: ['./img-gallery.component.scss'],
})
export class ImgGalleryComponent implements OnInit {
  @HostListener('click', ['$event'])
  imageAreaClick(event: any) {
    event && event.stopPropagation();
  }

  @Input()
  images: Array<string>;

  @Input()
  preview = false;

  private _currentIndex = 0;

  get currentIndex(): number {
    return this._currentIndex;
  }

  set currentIndex(index: number) {
    this._currentIndex = index;
  }

  get currentImage(): string | undefined {
    return this.images.at(this.currentIndex);
  }

  get previewHeight(): string {
    return 100 / this.images.length + '%';
  }

  constructor() {}

  nextImage() {
    try {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    } catch (error) {
      console.error(error);
    }
  }

  setImage(event: any, index: number) {
    try {
      event && event.stopPropagation();
      this.currentIndex = index;
    } catch (error) {
      console.error(error);
    }
  }

  prevImage() {
    try {
      this.currentIndex = (this.currentIndex - 1) % this.images.length;
    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit(): void {}
}
