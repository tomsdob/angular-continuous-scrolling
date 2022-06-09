import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Types
import { APIData } from '../types/APIData';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiURL: string = 'https://rickandmortyapi.com/api/character';

  constructor(private httpClient: HttpClient) {}

  getImages(page: number): Observable<APIData> {
    return this.httpClient.get<APIData>(`${this.apiURL}?page=${page}`);
  }
}
