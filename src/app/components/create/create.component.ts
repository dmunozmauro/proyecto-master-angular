import { Component, OnInit, ɵConsole } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { $ } from 'protractor';
import { UploadServices } from '../../services/upload.services';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadServices]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadServices
  ) {
    this.title = 'Crear proyecto';
    this.project = new Project('', '', '', '', '', 2019, '');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if (response.project) {
          this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.project._id, [], this.filesToUpload, 'image').then((res: any) => {
            this.status = 'success';
            form.reset();
          });
          
        } else {
          this.status = 'failed';
        }
      },
      error => {
        alert('Ha ocurrido un error');
        console.log('el error', <any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
