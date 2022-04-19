import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({
    keyword: new FormControl(''),
  });

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  myData:any=[]
  //result:any=null
  onSubmit() {
    this.searchService
      .search(this.searchForm.value.keyword)
      .subscribe((data) => {
        alert("getting the data");
        this.myData=data;
        console.log(data);
      });
  }
}
