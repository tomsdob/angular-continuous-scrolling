import { Component, Input } from '@angular/core';

// Types
import { Image } from 'src/app/types/Image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
})
export class ImageComponent {
  @Input() image: Image = { title: '', src: '' };
}
