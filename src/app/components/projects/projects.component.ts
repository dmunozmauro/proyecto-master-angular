import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public project: Project;
  constructor( private _projectService: ProjectService ) {
    this.project = new Project('', '', '', '', '', 2019, '');
  }

  ngOnInit() {
    this._projectService.getProjects().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

}