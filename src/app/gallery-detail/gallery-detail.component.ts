import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Gallery } from '../gallery.model';
import { GalleryService} from '../gallery.service';

@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.css'],
  providers: [GalleryService]
})

export class GalleryDetailComponent implements OnInit {

  galleryId: number;
  galleryToDisplay: Gallery;

  constructor(private route: ActivatedRoute, private location: Location, private galleryService: GalleryService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.galleryId = parseInt(urlParameters['id']);
    });
    this.galleryToDisplay = this.galleryService.getGalleryById(this.galleryId);
  }

}
