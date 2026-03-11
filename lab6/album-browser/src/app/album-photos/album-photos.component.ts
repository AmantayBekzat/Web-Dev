import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { AlbumService } from '../services/album.service';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-album-photos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './album-photos.component.html',
  styleUrl: './album-photos.component.css'
})
export class AlbumPhotosComponent implements OnInit {
  photos = signal<Photo[]>([]);
  albumId = signal<number | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = Number(params.get('id'));
          this.albumId.set(id);
          this.isLoading.set(true);
          this.error.set(null);
          return this.albumService.getAlbumPhotos(id);
        })
      )
      .subscribe({
        next: (photos) => {
          this.photos.set(photos);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Unable to load photos.');
          this.isLoading.set(false);
        }
      });
  }

  onImageError(event: Event, photo: Photo): void {
    const img = event.target as HTMLImageElement | null;
    if (!img) {
      return;
    }
    img.src = `https://picsum.photos/seed/${photo.id}/150/150`;
  }
}
