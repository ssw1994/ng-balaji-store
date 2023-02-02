import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent {
  @Input()
  editable = false;

  @Input()
  rating = 0;

  get ratings(): Array<string> {
    const stars = [];
    let counter = 0;
    while (counter < Math.floor(this.rating)) {
      stars.push('star');
      counter++;
    }

    if (counter < this.rating) {
      stars.push('star_half');
    }

    if (stars.length < 5) {
      while (stars.length < 5) {
        stars.push('star_border');
      }
    }
    return stars;
  }
}
