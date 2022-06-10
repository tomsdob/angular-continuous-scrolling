import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ApiService } from './services/api.service';
import { ImageComponent } from './components/image/image.component';

// Types
import { Image } from './types/Image';
import { Character } from './types/Character';
import { APIData } from './types/APIData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
  page: number = 1;
  images: Image[] = [];
  // TODO: assign the value before ngOnInit, as I don't know how to do it yet
  pageAmount: number | null = null;
  lastImageObserver!: IntersectionObserver;

  // Get all of the ImageComponents as elements for the IntersectionObserver
  @ViewChildren(ImageComponent, { read: ElementRef })
  imageComponents!: QueryList<Element>;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getPageAmount();
    this.getImages(this.page);
    this.intersectionObserver();
  }

  ngAfterViewInit(): void {
    this.imageComponents.changes.subscribe(
      (queryList: QueryList<ElementRef<Element>>) => {
        // Disconnect the observer prior to observing, so it doesn't observe the
        // previous last element/-s too
        this.lastImageObserver.disconnect();

        if (queryList.last) {
          this.lastImageObserver.observe(queryList.last.nativeElement);
        }
      }
    );
  }

  getPageAmount(): void {
    this.apiService
      .getData()
      .subscribe((data: APIData) => (this.pageAmount = data.info.pages));
  }

  getImages(page: number): void {
    // Checking if it's the last page
    if (this.pageAmount && this.pageAmount <= this.page - 1) {
      return;
    }

    this.isLoading = true;

    this.apiService.getData(page).subscribe((data: APIData) => {
      data.results.forEach((character: Character) => {
        const image: Image = {
          title: character.name,
          src: character.image,
        };

        // Add each image to the images array
        this.images.push(image);
      });
    });

    this.page += 1;
    this.isLoading = false;
  }

  intersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.lastImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(() => {
        // If the element is in view, fetch new images
        if (entries[0].isIntersecting) {
          this.getImages(this.page);
        }
      });
    }, options);
  }
}
