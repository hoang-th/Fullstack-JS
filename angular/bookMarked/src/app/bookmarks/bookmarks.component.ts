import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../bookmark.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  bookmarkList: object[] = [];

  constructor(private bookmarkService: BookmarkService) {

  }
  ngOnInit(): void {
    this.bookmarkList = this.bookmarkService.getBookmarks();
  }

  clearBookmarks(): void {
    this.bookmarkService.clearBookmarks();
    this.bookmarkList = [];
    alert("Cleared!")
  }
}
