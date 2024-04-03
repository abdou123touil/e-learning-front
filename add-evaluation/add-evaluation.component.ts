import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/Models/CourseModels/course';
import { Evaluation } from 'src/app/Models/EvaluationModels/evaluation';
import { EvaluationService } from 'src/app/Services/EvaluationServices/evaluation.service';
import { CourseServicesService } from 'src/app/Services/CourseServices/course-services.service';
import { TeacherService } from 'src/app/Services/UserServices/TeacherServices/teacher.service'
import { Teacher } from 'src/app/Models/UserModels/teacher';

import { result } from 'lodash-es';

@Component({
  selector: 'app-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  evaluationForm!: FormGroup;
  teacher: Teacher[]=[];
  selectedTeachers: Teacher[]=[];
  courses: any[]=[];

  constructor(private formBuilder: FormBuilder, private coursS: CourseServicesService, private evaluationS: EvaluationService, private router: Router) { }

  ngOnInit(): void {
    this.evaluationForm = this.formBuilder.group({
      Question1: ['', Validators.required],
      Question2: ['', Validators.required],
      Question3: ['', Validators.required],
      Question4: ['', Validators.required],
      Question5: ['', Validators.required],
      Question6: ['', Validators.required],
      description: ['',],
      courses: ['', Validators.required]
    });}



  onSubmit() {
    const selectedValues = {
      Question1: +this.evaluationForm.get('Question1')?.value || 0,
      Question2: +this.evaluationForm.get('Question2')?.value || 0,
      Question3: +this.evaluationForm.get('Question3')?.value || 0,
      Question4: +this.evaluationForm.get('Question4')?.value || 0,
      Question5: +this.evaluationForm.get('Question5')?.value || 0,
      Question6: +this.evaluationForm.get('Question6')?.value || 0,
    };
    const average1 = (selectedValues.Question1 + selectedValues.Question2 + selectedValues.Question3
      + selectedValues.Question4+ selectedValues.Question5 + selectedValues.Question6) / 6;
    const newEvaluation: Evaluation = {
      description: this.evaluationForm.value.description,
      average: average1,
      questions: this.evaluationForm.value.questions,
      evaluationId: this.evaluationForm.value.evaluationId,
      user: this.evaluationForm.value.user
    };

    this.evaluationS.AddEvaluation(newEvaluation).subscribe(evaluation => {
      console.log('Evaluation added successfully', evaluation);
      alert('Evaluation added successfully!!');
      this.router.navigate(['/user']);

      this.evaluationForm.reset();
    });
  }
}
