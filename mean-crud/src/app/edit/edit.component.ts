import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  news: any = {};
  angForm: FormGroup;
  response: any = {};
	constructor(private route: ActivatedRoute,
		private fb: FormBuilder,
		private router: Router,
		private us: NewsService) {
		this.angForm = this.fb.group({
			title: ['', Validators.required ],
			content: ['', Validators.required ],
			phone_number: ['', Validators.required ]
		});
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.us.editNews(params['id']).subscribe(res => {
				this.news = res;
				this.news = this.news.news;
			});
		});
	}

  updateNews() {
    this.route.params.subscribe(params => {
      this.us.updateNews(params['id'], this.angForm.value).subscribe(res => {
				this.response = res;
				if (this.response.status == 'success'){
					this.us.alert('News updated successfully!','success');
					this.router.navigate(['news']);
				} else {
					this.us.alert('Error updating news!','error');
				}
			});
		});
	}
}
