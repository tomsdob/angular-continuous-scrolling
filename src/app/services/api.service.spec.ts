import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the correct API URL', () => {
    expect(service.apiURL).toBe('https://rickandmortyapi.com/api/character');
  });

  it('should call getData and return APIData', () => {
    const mockAPIData = {
      info: {
        count: 20,
        pages: 1,
        next: null,
        prev: null,
      },
      results: [
        {
          id: 1,
          name: 'mock',
          status: 'mock',
          species: 'mock',
          type: 'mock',
          gender: 'mock',
          origin: {
            name: 'mock',
            url: 'mock',
          },
          location: {
            name: 'mock',
            url: 'mock',
          },
          image: 'mock',
          episode: ['mock'],
          url: 'mock',
          created: 'mock',
        },
      ],
    };

    service.getData().subscribe((response) => {
      expect(response).toEqual(mockAPIData);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: service.apiURL,
    });

    req.flush(mockAPIData);
  });
});
