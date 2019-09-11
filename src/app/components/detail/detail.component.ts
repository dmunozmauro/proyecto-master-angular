import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from 'src/app/services/global';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public proyecto: Project;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
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
        this.proyecto = res.project;
      },
      err => {
        console.log('err', err);
      }
    );
  }
  
  deleteProject(id) {
    this._projectService.deleteProject(id).subscribe(
      res => {
        if (res.project) {
          this._router.navigate(['/proyectos']);
        }
      },
      err => {
        console.log('err', err);
      }
    );
  }
}
