import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.css'
})
export class AlbumDetailComponent implements OnInit {
  album = signal<Album | null>(null);
  editableTitle = signal('');
  isLoading = signal(true);
  error = signal<string | null>(null);
  saveMessage = signal('');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = Number(params.get('id'));
          this.isLoading.set(true);
          this.error.set(null);
          return this.albumService.getAlbum(id);
        })
      )
      .subscribe({
        next: (album) => {
          this.album.set(album);
          this.editableTitle.set(album.title);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Unable to load album details.');
          this.isLoading.set(false);
        }
      });
  }

  onSave(): void {
    const current = this.album();
    if (!current) {
      return;
    }

    const updated: Album = {
      ...current,
      title: this.editableTitle().trim() || current.title
    };

    this.albumService.updateAlbum(updated).subscribe({
      next: (album) => {
        this.album.set(album);
        this.editableTitle.set(album.title);
        this.saveMessage.set('Album title updated.');
        setTimeout(() => {
          this.saveMessage.set('');
        }, 2000);
      },
      error: () => {
        this.error.set('Unable to save album title.');
      }
    });
  }
}
