import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'flora-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadImageComponent implements OnInit {
  imageError: string;
  cardImageBase64: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  @Output() convertedImage: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  fileChangeEvent(fileInput: any) {
      this.imageError = null;
      if (fileInput.target.files && fileInput.target.files[0]) {
          // Size Filter Bytes
          const max_size = 20971520;
          const allowed_types = ['image/png', 'image/jpeg'];
          const max_height = 15200;
          const max_width = 25600;

          if (fileInput.target.files[0].size > max_size) {
              this.imageError =
                  'Maximum size allowed is ' + max_size / 1000 + 'Mb';

              return false;
          }

          if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
              this.imageError = 'Only Images are allowed ( JPG | PNG )';
              return false;
          }
          const reader = new FileReader();
          reader.onload = (e: any) => {
              const image = new Image();
              image.src = e.target.result;
              image.onload = rs => {
                  const img_height = rs.currentTarget['height'];
                  const img_width = rs.currentTarget['width'];
                  if (img_height > max_height && img_width > max_width) {
                      this.imageError =
                          'Maximum dimentions allowed ' +
                          max_height +
                          '*' +
                          max_width +
                          'px';
                      return false;
                  } else {
                      const imgBase64Path = e.target.result;
                      this.convertedImage.emit(imgBase64Path);
                      this.cardImageBase64.next(imgBase64Path);
                  }
              };
          };

          reader.readAsDataURL(fileInput.target.files[0]);
      }
  }

  removeImage() {
      this.cardImageBase64 = null;
  }
}
