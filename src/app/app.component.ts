import { Component, Inject  } from '@angular/core';
import { CommonModule, DOCUMENT  } from '@angular/common';
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
  IsDisabled:boolean=true;
  videoUrl!: SafeResourceUrl;
  applyForm = new FormGroup({
    youtubePlaylistId: new FormControl(''),
    
  });
  constructor(private sanitizer: DomSanitizer, @Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;
    if(localStorage){
      this.PlaylistID = localStorage.getItem('localPlayListID');
      console.log(this.PlaylistID);
      this.dangerousVideoUrl = 'https://www.youtube.com/embed/videoseries?list='+this.PlaylistID+'&controls=1&rel=0&showinfo=0&autoplay=1';
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
      this.IframeShow = true;
    }
  
  }
  
  Onchanage(event: any){
    let youtubePlaylistId = event.target.value;
    console.log(youtubePlaylistId);
    if(youtubePlaylistId!=="" && youtubePlaylistId!=undefined){
      this.IsDisabled =false;
    }
    else {
      this.IsDisabled =true;
    }
  }
  updateVideoUrl() {
   
    this.IframeShow = true;
    this.PlaylistID = this.applyForm.value.youtubePlaylistId ?? "";
    localStorage.setItem('localPlayListID',  this.PlaylistID);
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/videoseries?list='+this.PlaylistID+'&controls=1&rel=0&showinfo=0&autoplay=1';
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
    this.applyForm.reset();
  }


}
