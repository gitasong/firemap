import { Component, OnInit } from '@angular/core';
import { Gallery } from '../gallery.model';
import { Router } from '@angular/router';
import { GalleryService} from '../gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [GalleryService]
})

export class GalleryComponent implements OnInit {

  galleries: Gallery[];

  constructor(private router: Router, private galleryService: GalleryService) { }

  ngOnInit() {
    this.galleries = this.galleryService.getGalleries();
  }

  goToDetailPage(clickedGallery: Gallery) {
    this.router.navigate(['galleries', clickedGallery.id]);
  }

}
