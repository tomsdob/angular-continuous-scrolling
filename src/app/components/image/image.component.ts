import { Component, Input, OnInit } from '@angular/core';

// Types
import { Image } from 'src/app/types/Image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
})
export class ImageComponent implements OnInit {
  @Input() image: Image = { title: '', src: '' };
  @Input() images: Image[] = [];
  @Input() key: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
