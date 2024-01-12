import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'YT Playlist Player Angular';
  PlaylistID:any="PLHTZwvmFtBB-4Fqkid3Zx242eFm0V-tSw";
  
  dangerousVideoUrl!: string;
  IframeShow:boolean= false;
  videoUrl!: SafeResourceUrl;
  applyForm = new FormGroup({
    youtubePlaylistId: new FormControl(''),
    
  });
  constructor(private sanitizer: DomSanitizer) {
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/videoseries?list='+this.PlaylistID+'&controls=0&rel=0&showinfo=0&autoplay=1';
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }
  

  updateVideoUrl() {
   
    this.IframeShow = true;
    this.PlaylistID = this.applyForm.value.youtubePlaylistId ?? "";
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/videoseries?list='+this.PlaylistID+'&controls=0&rel=0&showinfo=0&autoplay=1';
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
    this.applyForm.reset();
  }


}
