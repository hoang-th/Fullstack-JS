import { Injectable } from '@angular/core';
import { Bookmark } from './models/Bookmark';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  bookmarkList: Bookmark[] = [];
  constructor() { }

  getBookmarks() {
    return this.bookmarkList;
  }

  addToBookmarks(bookmark: any) {
    this.bookmarkList.push(bookmark)
    return this.bookmarkList
  }

  clearBookmarks() {
    this.bookmarkList = [];
    return this.bookmarkList;
  }
}
