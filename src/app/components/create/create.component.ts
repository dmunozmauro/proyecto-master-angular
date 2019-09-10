import { Component, OnInit, ɵConsole } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;

  constructor(
    private _projectService: ProjectService
  ) {
    this.title = 'Crear proyecto';
    this.project = new Project('', '', '', '', '', 2019, '');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(this.project);
    this._projectService.saveProject(this.project).subscribe(
      response => {
        alert('Formulario enviado con exito');
        console.log('la respuesta', response);
      },
      error => {
        alert('Ha ocurrido un error');
        console.log('el error', <any>error);
      }
    );
  }

}
