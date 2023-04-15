import { PhysicianService } from './../../physician.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-deleteobservation',
  templateUrl: './deleteobservation.component.html',
  styleUrls: ['./deleteobservation.component.scss'],
})
export class DeleteobservationComponent {
  constructor(private service: PhysicianService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  testid: any = sessionStorage.getItem('testIdForDelete');

  deletestbyiddata: any;
  delete() {
    console.log('id to be delete', this.testid);
    this.service.deletetest(this.testid).subscribe((response: any) => {
      this.deletestbyiddata = response;
      console.log('deleted');
    });
  }
}
