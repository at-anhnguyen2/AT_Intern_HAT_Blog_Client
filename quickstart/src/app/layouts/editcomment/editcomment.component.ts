import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { APIService } from '../../share/services/api.service';
@Component({
  selector: 'app-edit-comment',
  templateUrl: './editcomment.component.html'
})

export class EditCommentComponent  {
	@Input() inputComment: any = null;
	@Input() inputID: number = 0;
	@Input() inputSlug: string = '';
	@Output() result: EventEmitter<any> = new EventEmitter();
	showEdit: boolean;
	inputEditComment: string;
	id: number;
	slug: string;
	constructor(private _apiService: APIService) {
		this.showEdit = true;
		this.inputEditComment = "";
		this.id = 0;
		this.slug = "";
	}
	ngOnChanges() {
		if (this.inputComment.id === this.inputID) {
			this.showEdit = true;
			this.inputEditComment = this.inputComment.content;
		} else {
			this.showEdit = false;
		}
		this.id = this.inputID;
		this.slug = this.inputSlug;
	}
	updateComment() {
		console.log(this.inputEditComment);
		this._apiService.updateComment(this.slug, this.id, this.inputEditComment)
		.subscribe((data: any) => {
			if(data && data.status) {
				this.showEdit = false;
				let obj = {
					type: "update",
					id: this.id,
					content: this.inputEditComment
				}
				this.result.emit(obj);
			} else {
				alert(data.errors[0].message[0].valid);
			}
		})
	}
	deleteComment() {
		this._apiService.deleteComment(this.slug, this.id)
		.subscribe((data: any) => {
			if(data && data.status) {
				this.showEdit = false;
				let obj = {
					type: "delete",
					id: this.id,
				}
				this.result.emit(obj);
			} else {
				alert(data.errors[0].message[0].valid);
			}
		})
		this.showEdit = false;
	}
}
