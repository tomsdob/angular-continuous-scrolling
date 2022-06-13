import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { finalize } from 'rxjs';
import { ApiService } from './services/api.service';
import { ImageComponent } from './components/image/image.component';

// Types
import { APIData } from './types/APIData';
import { Character } from './types/Character';
import { Image } from './types/Image';

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

  // Get all of the ImageComponents as DOM elements for the IntersectionObserver
  @ViewChildren(ImageComponent, { read: ElementRef })
  imageComponents!: QueryList<Element>;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getPageAmount();
    this.getImages(this.page);
    this.lastImageIntersectionObserver();
  }

  ngAfterViewInit(): void {
    this.imageComponents.changes.subscribe(
      (queryList: QueryList<ElementRef<Element>>) => {
        // Disconnect the observer prior to observing, so it doesn't observe the
        // previous last element anymore
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
    this.isLoading = true;

    this.apiService
      .getData(page)
      .pipe(
        finalize(() => {
          this.page += 1;
          this.isLoading = false;
        })
      )
      .subscribe((data: APIData) => {
        data.results.forEach((character: Character) => {
          // Add each character to the images array as an image
          this.images.push({
            title: character.name,
            src: character.image,
          });
        });
      });
  }

  lastImageIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.lastImageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If the last element is in view/intersecting and it's not the last
        // page, fetch new images
        if (entry.isIntersecting && !this.isLastPage()) {
          this.getImages(this.page);
        }
      });
    }, options);
  }

  isLastPage(): boolean {
    if (this.pageAmount) {
      return this.pageAmount <= this.page - 1;
    } else {
      return false;
    }
  }
}
