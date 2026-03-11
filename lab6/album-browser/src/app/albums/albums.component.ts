import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent implements OnInit {
  albums = signal<Album[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  constructor(private readonly albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe({
      next: (albums) => {
        this.albums.set(albums);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Unable to load albums. Please try again.');
        this.isLoading.set(false);
      }
    });
  }

  onDelete(album: Album, event: Event): void {
    event.stopPropagation();
    this.albumService.deleteAlbum(album.id).subscribe({
      next: () => {
        this.albums.set(this.albums().filter((item) => item.id !== album.id));
      },
      error: () => {
        this.error.set('Unable to delete album. Please try again.');
      }
    });
  }
}
