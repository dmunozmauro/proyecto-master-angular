import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects: Project;
  public url: string;

  constructor(private _projectService: ProjectService) {
    this.url = Global.url;
  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this._projectService.getProjects().subscribe(
      res => {
        if (res.projects) {
          this.projects = res.projects;
          console.log(this.projects);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}