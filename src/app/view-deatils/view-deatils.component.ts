import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDetailService } from '../services/get-detail.service';

export interface Result {
  group_name: string;
  results: {
    name: string;
    value: any;
  }[];
}

@Component({
  selector: 'app-view-deatils',
  templateUrl: './view-deatils.component.html',
  styleUrls: ['./view-deatils.component.css'],
})
export class ViewDeatilsComponent implements OnInit {
  id: any;
  assetId!: string;
  data: any;
  
  values: Result[] = [];
  constructor(
    private _route: ActivatedRoute,
    private _getDetails: GetDetailService
  ) {}

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    this.getOne();
  }

  getOne() {
    this._getDetails.getOne(this.id).subscribe((data) => {
      // @ts-ignore
      this.data = data.asset_resource.asset.metadata.metadata_element_list;
      let x: Result[] = this.data.map((item: any) => {
        let f = item.metadata_element_list.filter((item: any) => item.value);

        let g = f.filter((item: any) => item.value.value);

        let results = g.map((d: any) => {
          return {
            name: d.name,
            value: d.value.value.value,
          };
        });

        return {
          group_name: item.name,
          results,
        } as Result;
      });

      this.values = x;
    });
  }
}
