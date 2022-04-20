import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AssetList, SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  assets: any;
  assetList:any;

  baseUrl = 'http://training-otmm.acheron-tech.com:11090';

  searchForm: FormGroup = new FormGroup({
    keyword: new FormControl(''),
  });

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}


  imgUrl:string = "http://training-otmm.acheron-tech.com:11090/";
  myData:any
  //result:any=null
  onSubmit() {
    this.searchService
      .search(this.searchForm.value.keyword)
      .subscribe((value) => {
        console.log(value);
        this.myData=value;
        this.assetList = this.myData['search_result_resource']['asset_list']
        console.log(this.assetList);
        
      });
      
  }
  // asset = () => {
  //   if(this.assetClick == false){
  //     this.folderClick = false;
  //     this.assetClick = true;
  //   }
  // }

  getDetails(){

  }
}
