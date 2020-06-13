import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

@Injectable({
	providedIn: 'root'
})
export class NewsService {
	url = 'http://localhost:3000/news';

	constructor(private http: HttpClient) { }

	addNews(news) {
		return this.http.post(this.url+'/add', news);
	}

	getNews() {
		return this.http.get(this.url);
	}

	editNews(id) {
		return this.http.get(this.url+'/edit/'+id);
	}

	updateNews(id, news) {
		return this.http.post(this.url+'/update/'+id, news);
	}

	deleteNews(id) {
		return this.http.get(this.url+'/delete/'+id);
	}

	alert(mssg, status) {
		swal.fire(mssg, "", status);
	}
}
