import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ImageService } from './services/image.service';
import { ImageComponent } from './components/image/image.component';

// Types
import { Image } from './types/Image';
import { Character } from './types/Character';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
  pageQueryParameter: number = 1;
  images: Image[] = [];
  // TODO:
  lastImageObserver!: IntersectionObserver;

  @ViewChildren(ImageComponent, { read: ElementRef })
  lastImage!: QueryList<Element>;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.getImages(this.pageQueryParameter);
    this.intersectionObserver();
  }

  ngAfterViewInit(): void {
    this.lastImage.changes.subscribe(
      (queryList: QueryList<ElementRef<Element>>) => {
        if (queryList.last) {
          this.lastImageObserver.observe(queryList.last.nativeElement);
        }
      }
    );
  }

  getImages(page: number): void {
    this.imageService.getImages(page).subscribe((apiData) => {
      this.isLoading = true;

      apiData.results.forEach((character: Character) => {
        const image: Image = {
          title: character.name,
          src: character.image,
        };

        this.images.push(image);
      });

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    });
  }

  intersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.lastImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(() => {
        // TODO:
        if (entries[0].isIntersecting) {
          this.pageQueryParameter += 1;
          this.getImages(this.pageQueryParameter);
        }
      });
    }, options);
  }
}
