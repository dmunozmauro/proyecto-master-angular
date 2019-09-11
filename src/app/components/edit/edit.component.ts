import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadServices } from '../../services/upload.services';
import { Global } from 'src/app/services/global';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadServices]
})
export class EditComponent implements OnInit {
  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadServices,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = 'Editar proyecto';
    this.url = Global.url;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id;

      this.getProject(id);
    });
  }

  getProject(id) {
    this._projectService.getProject(id).subscribe(
      res => {
        this.project = res.project;
      },
      err => {
        console.log('err', err);
      }
    );
  }

  onSubmit(form) {
    this._projectService.editProject(this.project).subscribe(
      response => {
        if (response.project) {
          if (this.filesToUpload) {
            this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.project._id, [], this.filesToUpload, 'image').then((res: any) => {
              //this._router.navigate(['/proyectos']);
              this.status = 'success';

            });
          }
          //this._router.navigate(['/proyectos']);
          this.status = 'success';
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
