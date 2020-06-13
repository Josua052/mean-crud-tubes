import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  response : any = {};
  angForm : FormGroup;
  constructor(private fb : FormBuilder, private us: NewsService) {
    this.angForm = this.fb.group({
      title: ['', Validators.required ],
      content: ['', Validators.required ],
      phone_number: ['', Validators.required ]
    });
  }

  ngOnInit() {
  }

  addNews() {
    this.us.addNews(this.angForm.value).subscribe(res => {
      this.response = res;
      if (this.response.status == 'success'){
        this.us.alert('News added successfully!','success');
        this.angForm.reset();
      } else {
        this.us.alert('Error saving news!','error');
      }
    })
  }
}
