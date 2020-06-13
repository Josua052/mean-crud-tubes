import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import News from '../News';

@Component({
   selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {
 nw: News[];
  response: any = {};
  responseDelete: any = {};
    constructor(private us: NewsService) { }

    ngOnInit() {
      this.getNw();
        }

        getNw() {
          this.us.getNews().subscribe((res) => {
            this.response = res;
            // tslint:disable-next-line: triple-equals
            if (this.response.status == 'success'){
              this.nw = this.response.nw;
            } else {}
          });
        }

        deleteNews(id) {
          this.us.deleteNews(id).subscribe(res => {
            this.responseDelete = res;
            // tslint:disable-next-line: triple-equals
            if (this.responseDelete.status == 'success'){
              this.us.alert('News deleted successfully!', 'success');
              this.getNw();
            } else {
              this.us.alert('Error deleting user!', 'error');
            }
          });
        }
}
