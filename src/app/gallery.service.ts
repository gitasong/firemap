import { Injectable } from '@angular/core';
import { Gallery } from './gallery.model';
import { GALLERIES } from './mock-galleries';

@Injectable()
export class GalleryService {

  constructor() { }

  getGalleries() {
    return GALLERIES;
  }

  getGalleryById(galleryId: number){
    for (var i = 0; i <= GALLERIES.length - 1; i++) {
      if (GALLERIES[i].id === galleryId) {
        return GALLERIES[i];
      }
    }
  }

}
